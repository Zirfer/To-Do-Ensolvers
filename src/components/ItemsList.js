import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useParams, Link } from "react-router-dom";
import axios from 'axios'

function ItemsList() {

    const [items, setItems] = useState([])
    const [folders, setFolders] = useState([])
    const [folder, setFolder] = useState([])
    const [data, setData] = useState({
        folderId: 0,
        content: '',
        userId: 1,
        completed: false,
        _id: ''
    })

    let { idFolder } = useParams();
    let baseURL = 'https://to-do-ensolvers-backend.herokuapp.com';

    useEffect(() => {
        getItems(idFolder);
        getFolders();
        getFolder(idFolder);
    }, [idFolder])

    async function getFolders() {
        await axios.get(baseURL + '/api/folders')
            .then(function (res) {
                setFolders(res.data)
            })
    }

    async function getFolder(idFolder) {
        if (idFolder !== undefined) {
            await axios.get(baseURL + '/api/folders/' + idFolder)
                .then(function (res) {
                    setFolder(res.data)
                })
        }
    }

    async function getItems(idFolder) {
        var url;
        idFolder ? url = baseURL + '/api/items/folder/' + idFolder : url = baseURL + '/api/items'
        await axios.get(url)
            .then(function (res) {
                setItems(res.data)
            })
    }

    async function saveItem() {
        if (data._id === '') {
            await axios.post(baseURL + '/api/items', data)
                .then(function (res) {
                    getItems(idFolder)
                    setData({
                        folderId: 0,
                        content: '',
                        userId: 1,
                        completed: false,
                        _id: ''
                    })
                    alert(res.data.message)
                })
        } else {
            await axios.put(baseURL + '/api/items/' + data._id, data)
                .then(function (res) {
                    getItems(idFolder)
                    setData({
                        folderId: 0,
                        content: '',
                        userId: 1,
                        completed: false,
                        _id: ''
                    })
                    alert(res.data.message)
                })
        }
    }

    async function getItem(id) {
        await axios.get(baseURL + '/api/items/' + id)
            .then(function (res) {
                setData(res.data)
            })
    }
    async function deleteItem(id) {
        if (window.confirm('¿Do you want to delete this item?')) {
            await axios.delete(baseURL + '/api/items/' + id)
                .then(function (res) {
                    getItems(idFolder)
                    alert(res.data.message)
                })
        }
    }

    function cleanItem() {
        setData({
            folderId: 0,
            content: '',
            userId: 1,
            completed: false,
            _id: ''
        })
    }

    async function handleCompleted(e) {
        const id = e.target.id;
        const completed = e.target.checked
        await axios.put(baseURL + '/api/items/completed/' + id, { completed })
            .then(function (res) {
                getItems(idFolder)
                setData({
                    folderId: 0,
                    content: '',
                    userId: 1,
                    completed: false,
                    _id: ''
                })
                alert(res.data.message)
            })
    }

    function handleInput(e) {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <div>
            {idFolder ?
                <Row style={{ marginBottom: '-30px' }}>
                    <Col md={9} sm={8} xs={8} className="p-4">
                        <h2>{'Folder > ' + folder.name}</h2>
                    </Col>
                    <Col md={3} sm={4} xs={4} className="p-4">
                        <Link
                            className="btn btn-secondary justify-content left m-1"
                            to={"/folders"}
                        >
                            Go back
                        </Link>
                    </Col>
                </Row>
                : ''
            }
            <Row>
                <Col md={5} className="p-4">
                    <div className="card" >
                        <div className="card-body">
                            <Form.Group className="mb-3">
                                <Form.Label>Folder</Form.Label>
                                <Form.Select
                                    name="folderId"
                                    value={data.folderId}
                                    onChange={(e) => handleInput(e)}
                                >
                                    <option>Select one</option>
                                    {
                                        folders.map((folder, index) =>
                                            <option key={index} value={folder._id}>{folder.name}</option>
                                        )
                                    }
                                </Form.Select>
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="content"
                                    placeholder="Enter a content"
                                    value={data.content}
                                    onChange={(e) => handleInput(e)}
                                />
                                <Form.Check
                                    checked={data.completed}
                                    name="completed"
                                    type='checkbox'
                                    label='Completed'
                                    onChange={(e) => handleInput(e)}
                                />
                            </Form.Group>
                        </div>
                        <div className="card-footer">
                            <Button
                                variant="success"
                                className="left m-1"
                                onClick={() => saveItem()}
                            >
                                Save
                            </Button>
                            <Button
                                variant="primary"
                                className="left m-1"
                                onClick={() => cleanItem()}
                            >
                                Clean
                            </Button>
                        </div >
                    </div>
                </Col>
                <Col md={7} className="p-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Folder</th>
                                <th>Content</th>
                                <th>Completed</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item =>
                                <tr key={item._id}>
                                    <td>{item.folderId ? item.folderId.name : ''}</td>
                                    <td>{item.content}</td>
                                    <td align='center'>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={item.completed}
                                                name={"completed_" + item._id}
                                                id={item._id}
                                                onChange={(e) => handleCompleted(e)}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            className="justify-content left m-1"
                                            onClick={() => getItem(item._id)}
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            className="justify-content left m-1"
                                            onClick={() => deleteItem(item._id)}
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
        </div >
    )
}

export default ItemsList;