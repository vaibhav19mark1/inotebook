import { useState } from "react";
import { json } from "react-router-dom";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3000";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  //! Get all notes
  const getNotes = async() => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiZjAyOGU3OTQxNWRhMzRiMDk0MjkwIn0sImlhdCI6MTY3MzQ2MjU4MX0.L9muGQ54s-hCc3MEPXcLFCCA6BlEmHGkCnXoqZrILuk",
      },
    });
    const json=await response.json();
    setNotes(json)
  };

  //! Add a note
  const addNote = async(title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiZjAyOGU3OTQxNWRhMzRiMDk0MjkwIn0sImlhdCI6MTY3MzQ2MjU4MX0.L9muGQ54s-hCc3MEPXcLFCCA6BlEmHGkCnXoqZrILuk",
      },
      body: JSON.stringify({title,description,tag})
    });
    const note=await response.json();
    setNotes(notes.concat(note));
  };

  //! Delete a note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiZjAyOGU3OTQxNWRhMzRiMDk0MjkwIn0sImlhdCI6MTY3MzQ2MjU4MX0.L9muGQ54s-hCc3MEPXcLFCCA6BlEmHGkCnXoqZrILuk",
      },
    });

    // Deleting a note in client side
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //! Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiZjAyOGU3OTQxNWRhMzRiMDk0MjkwIn0sImlhdCI6MTY3MzQ2MjU4MX0.L9muGQ54s-hCc3MEPXcLFCCA6BlEmHGkCnXoqZrILuk",
      },
      body: JSON.stringify({title,description,tag})
    });
    const json=response.json();

    // Logic to edit note in client side

    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
