import React from 'react';

const AddPerson = (props) => {
  const {addPerson, newName, handleNameChange, newNumber, handleNumberChange} = props;
  return (
    <form onSubmit={addPerson} >
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <p>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </p>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
};

export default AddPerson;