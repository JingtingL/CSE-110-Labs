import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import React, { useState, useEffect, useContext } from 'react';



// Function to get the note titles as a list
const NoteTitlesList = () => {
        return (
            <ul>
              {dummyNotesList.map((note) => (
                <li key={note.id}>{note.title}</li>
              ))}
            </ul>
          );
};

export default NoteTitlesList;