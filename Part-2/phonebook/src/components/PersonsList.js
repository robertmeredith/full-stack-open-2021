import React from 'react';
import Person from './Person';

const PersonsList = ({ filteredPersons, deletePerson }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <Person person={person} deletePerson={deletePerson} />
      ))}
    </div>
  );
};

export default PersonsList;
