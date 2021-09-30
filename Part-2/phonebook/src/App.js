import React, { useState, useEffect } from 'react';
import Input from './components/Input';
import PersonForm from './components/PersonForm';
import PersonsList from './components/PersonsList';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // ADD NEW PERSON
  const addPerson = (event) => {
    event.preventDefault();

    const duplicate = persons.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicate) {
      if (
        window.confirm(
          `${duplicate.name} is already in the phonebook, update the details?`
        )
      ) {
        personService
          .update(duplicate.id, { ...duplicate, number })
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === updatedPerson.id ? updatedPerson : p
              )
            );
          })
          .catch((error) => {
            setPersons(persons.filter((person) => person.id !== duplicate.id));
            setNotification({
              status: 'danger',
              message: `The person "${duplicate.name}" was already deleted from the server`,
            });
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          });
      }
    } else {
      personService.create({ name, number }).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNotification({
          status: 'success',
          message: `Added ${returnedPerson.name} to the phonebook`,
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
    }
    setName('');
    setNumber('');
  };

  // DELETE PERSON
  const deletePerson = (personToDelete) => {
    if (
      window.confirm(`Do you really want to delete ${personToDelete.name}?`)
    ) {
      personService
        .destroy(personToDelete.id)
        .then(() => {
          setPersons(
            persons.filter((person) => person.id !== personToDelete.id)
          );
          setNotification({
            status: 'success',
            message: `${personToDelete.name} was deleted from the phone book`,
          });
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        })
        .catch((error) => {
          setPersons(
            persons.filter((person) => person.id !== personToDelete.id)
          );
          setNotification({
            status: 'danger',
            message: `The person ${personToDelete.name} was already deleted from the server`,
          });
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Input text="Search: " onChange={handleSearchChange} value={search} />
      <h3>Add a new person</h3>
      <PersonForm
        name={name}
        number={number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <PersonsList
        filteredPersons={filteredPersons}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
