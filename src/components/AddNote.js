import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
// import NoteState from '../context/notes/NoteState';


const AddNote = (props) => {
    const context=useContext(noteContext)
    
    const {addNote}=context
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully","Success")
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
        <h2>Add Notes</h2>
        <form className='my-3'>
          <div className="form-group mb-3">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} required/>
            
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" name="description"  value={note.description} onChange={onChange} required/>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="tag">tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} required/>
          </div>
          
          <button disabled={note.title.length<5 ||note.description.length<5||note.tag.length<5}type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
