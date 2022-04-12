import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ItemsList() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes()
    }, [])

    async function getNotes() {
        await axios.get('http://localhost:4000/api/notes')
            .then(function (res) {
                setNotes(res.data)
            })
    }

    const deleteNote = async (id) => {
        await axios.delete('http://localhost:4000/api/notes/' + id)
            .then(function (res) {
                if (res.status === 200) {
                    window.alert('Nota eliminada.')
                    getNotes()
                }
            })
    }

    return (<
        div className="row" > {
            notes.map(note =>
                <div className="col-md-4 p-2" key={note._id} >
                    <div className="card" >
                        <div className="card-header d-flex justify-content-between">
                            <h5> {note.title} </h5>
                            <Link className="btn btn-secondary"
                                to={"/edit/" + note._id}>
                                Edit
                            </Link> </div >
                        <div className="card-body">
                            <p> {note.content} </p>
                            <p> {note.author} </p>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-danger"
                                onClick={
                                    () => deleteNote(note._id)
                                } >
                                Delete
                            </button>
                        </div >
                    </div>
                </div >
            )
        } </div>
    )
}

export default ItemsList;