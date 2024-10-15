import './App.css';
import React, { useState } from 'react';
import { Label, Note } from "./types"; 
import { dummyNotesList } from "./constants"; 
import ClickCounter from "./hooksExercise";
import HeartButton from './toggleHeart';
import NoteTitlesList from './NoteTitlesList';

function App() {

  const [notes, setNotes] = useState<Note[]>(dummyNotesList); 
  const initialNote: Note = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState<Note>(initialNote);

  // New State to track selected note for editing
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };

  const updateNoteHandler = (id: number, updatedContent: Partial<Note>) => {
    const updatedNotes = notes.map((note) => 
      note.id === id ? { ...note, ...updatedContent } : note
    );
    setNotes(updatedNotes);
  };
  
  return (
    <div className='app-container'>
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            name="title"
            placeholder="Note Title"
            value={createNote.title} // Controlled component
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })}
            required
          />
        </div>
  
        <div >
          <textarea 
            name="content"
            placeholder="Note Content"
            value={createNote.content} // Controlled component
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })}
            required
          />
        </div>
  
        <div>
          <select
            name="label"
            value={createNote.label} // Controlled component
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label })}
            required
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>
  
        <div><button type="submit">Create Note</button></div>
      </form>
  
      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note-item"
            onClick={() => setSelectedNote(note)} // Set note as selected when clicked
          >
            <div className="notes-header">
              <HeartButton />
              <button
                onClick={(event) => {
                  event.stopPropagation(); // Prevent selecting the note when deleting
                  setNotes(notes.filter((n) => n.id !== note.id));
                }}
              >
                x
              </button>
            </div>

            <h2
              contentEditable={selectedNote?.id === note.id} // Make editable if selected
              suppressContentEditableWarning
              onBlur={(event) => {
                if (selectedNote?.id === note.id) {
                  updateNoteHandler(note.id, { title: event.target.innerText });
                  setSelectedNote(null); // Deselect note after editing
                }
              }}
            >
              {note.title}
            </h2>

            <div
              contentEditable={selectedNote?.id === note.id} 
              suppressContentEditableWarning
              onBlur={(event) => {
                if (selectedNote?.id === note.id) {
                  updateNoteHandler(note.id, { content: event.target.innerText });
                  setSelectedNote(null); 
                }
              }}
            >
              {note.content}
            </div>
            <p>{note.label}</p>
          </div>
        ))}
      </div>
      
      <ClickCounter/>
      <div className="favorite-section">
  <h2 className="favorite-title">List of Favorite</h2>
  <div className="Favorite_List">
    <NoteTitlesList />
  </div>
</div>
    </div>
  );
}

export default App;
