import {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "63c025f435fd02ca58f9d01a",
      user: "63bf028e79415da34b094290",
      title: "Note 1",
      description: "Description 1",
      tag: "General",
      date: "2023-01-12T15:23:32.574Z",
      __v: 0,
    },
    {
      _id: "63c025f435fd02ca58f9d01a",
      user: "63bf028e79415da34b094290",
      title: "Note 1",
      description: "Description 1",
      tag: "General",
      date: "2023-01-12T15:23:32.574Z",
      __v: 0,
    },
    {
      _id: "63c025f435fd02ca58f9d01a",
      user: "63bf028e79415da34b094290",
      title: "Note 1",
      description: "Description 1",
      tag: "General",
      date: "2023-01-12T15:23:32.574Z",
      __v: 0,
    },
    {
      _id: "63c025f435fd02ca58f9d01a",
      user: "63bf028e79415da34b094290",
      title: "Note 1",
      description: "Description 1",
      tag: "General",
      date: "2023-01-12T15:23:32.574Z",
      __v: 0,
    },
    {
      _id: "63c025f435fd02ca58f9d01a",
      user: "63bf028e79415da34b094290",
      title: "Note 1",
      description: "Description 1",
      tag: "General",
      date: "2023-01-12T15:23:32.574Z",
      __v: 0,
    },
    {
      _id: "63c025f435fd02ca58f9d01a",
      user: "63bf028e79415da34b094290",
      title: "Note 1",
      description: "Description 1",
      tag: "General",
      date: "2023-01-12T15:23:32.574Z",
      __v: 0,
    },
    {
      _id: "63c1bf0ab4cf2ad157d41c7d",
      user: "63bf028e79415da34b094290",
      title: "Note 2",
      description: "Description 2",
      tag: "General",
      date: "2023-01-13T20:28:58.813Z",
      __v: 0,
    }
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
