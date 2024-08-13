import React, { useEffect } from 'react'
import { useContext, useRef,useState } from 'react';
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import {useNavigate } from 'react-router-dom'
// import NoteState from '../context/notes/NoteState';

const Notes = (props) => {
    const context = useContext(noteContext)
    // eslint-disable-next-line
    const { notes, getNotes,editNote } = context;
    let navigate=useNavigate()
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        }else{
            navigate("/login");
        }
        
    }, [])
    const ref = useRef(null)
    const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
    
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
        
    }
    const refClose = useRef(null);
    const handleClick=(e)=>{
        console.log("updating the note",note)
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
        props.showAlert("Updated Successfully","Success")
       
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="form-group mb-3">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} required/>

                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} required/>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="tag">tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} required/>
                                </div>

                                {/* <button type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 ||note.edescription.length<5||note.etag.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container">
                    {notes.length===0&& "No Notes to Display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
