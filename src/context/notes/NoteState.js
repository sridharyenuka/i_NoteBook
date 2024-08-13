
import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "http://localhost:5503"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  //Get all notes
  const getNotes = async() => {
      const myHeaders = new Headers();
      myHeaders.append(
        "Content-Type", "application/json"
      );
      myHeaders.append(
        "auth-token", localStorage.getItem("token"))  
      const request = new Request(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: myHeaders,
      });
      const response = await fetch(request);
      const json=await response.json()
      setNotes(json)
      
  }
// add a note
const addNote = async ( title, description,tag) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Content-Type", "application/json"

  );
  myHeaders.append(
     "auth-token", localStorage.getItem("token")
  );
  // API call
  const request = new Request(`${host}/api/notes/addnote`, {
    method: "POST",
    body: JSON.stringify({ title,description,tag }),
    headers: myHeaders,
  });
  const response = await fetch(request);
   const note=await response.json();
   setNotes(notes.concat(note))
}  

  // Delete a note
  const deleteNote = async(id) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Content-Type", "application/json"

    );
    myHeaders.append(
       "auth-token", localStorage.getItem("token")
    );
    // API call
    const request = new Request(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: myHeaders,
    });
    const response = await fetch(request);
    const json=response.json()
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Content-Type", "application/json"

    );
    myHeaders.append(
       "auth-token", localStorage.getItem("token")
    );
    // API call
    const request = new Request(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title,description,tag }),
      headers: myHeaders,
    });
    // const json=response.json()
    const response = await fetch(request);
    console.log(response);
    let newNotes=JSON.parse(JSON.stringify(notes))
    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, getNotes,deleteNote,editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;