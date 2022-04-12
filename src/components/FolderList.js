import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios'

function FolderList() {

    const [folders, setFolders] = useState([])
    const [data, setData] = useState({
        name: '',
        userId: 1,
        _id: ''
    })

    useEffect(() => {
        getFolders();
    }, [])

    async function getFolders() {
        await axios.get('http://localhost:4000/api/folders')
            .then(function (res) {
                setFolders(res.data)
            })
    }

    async function saveFolder() {
        if (data._id == undefined) {
            await axios.post('http://localhost:4000/api/folders', data)
                .then(function (res) {
                    getFolders()
                    setData({
                        name: '',
                        userId: 1,
                        _id: ''
                    })
                    alert(res.data.message)
                })
        } else {
            await axios.put('http://localhost:4000/api/folders/' + data._id, data)
                .then(function (res) {
                    getFolders()
                    setData({
                        name: '',
                        userId: 1,
                        _id: ''
                    })
                    alert(res.data.message)
                })
        }
    }

    async function getFolder(id) {
        await axios.get('http://localhost:4000/api/folders/' + id)
            .then(function (res) {
                setData(res.data)
            })
    }
    async function deleteFolder(id) {
        if (window.confirm('¿Do you want to delete this folder?')) {
            await axios.delete('http://localhost:4000/api/folders/' + id)
                .then(function (res) {
                    getFolders()
                    alert(res.data.message)
                })
        }
    }

    function handleInput(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <Row>
            <Col md={4} className="p-4">
                <div className="card" >
                    <div className="card-body">
                        <Form.Group className="mb-3">
                            <Form.Label>Folder</Form.Label>

                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                name="title"
                                placeholder="Enter a title"
                                value={data.title}
                                onChange={(e) => handleInput(e)}
                            />
                        </Form.Group>
                    </div>
                    <div className="card-footer">
                        <Button
                            variant="success"
                            className="left"
                            onClick={() => saveFolder()}
                        >
                            Save
                        </Button>
                    </div >
                </div>
            </Col>
            <Col md={8} className="p-4">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Folder name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {folders.map(folder =>
                            <tr key={folder._id}>
                                <td>{folder.name}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        className="justify-content left m-1"
                                        onClick={() => getFolder(folder._id)}
                                    >
                                        <FaEdit />
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="justify-content left m-1"
                                        onClick={() => deleteFolder(folder._id)}
                                    >
                                        <FaTrashAlt />
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Col>
        </Row>
    )
}

export default FolderList;