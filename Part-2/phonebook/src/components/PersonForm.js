import React from 'react';
import Input from './Input';

const PersonForm = (props) => {
  const { name, handleNameChange, number, handleNumberChange, addPerson } =
    props;

  return (
    <form>
      <Input text="Name: " onChange={handleNameChange} value={name} />
      <Input text="Number: " onChange={handleNumberChange} value={number} />
      <div>
        <button type="submit" onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
