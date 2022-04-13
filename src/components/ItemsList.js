import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import axios from 'axios'

function ItemsList() {

    const [items, setItems] = useState([])
    const [folders, setFolders] = useState([])
    const [folder, setFolder] = useState([])
    const [data, setData] = useState({
        folderId: 0,
        content: '',
        userId: 1,
        _id: ''
    })

    let { idFolder } = useParams();
    console.log(idFolder);

    useEffect(() => {
        getItems(idFolder);
        getFolders();
        getFolder(idFolder);
    }, [idFolder])

    async function getFolders() {
        await axios.get('http://localhost:4000/api/folders')
            .then(function (res) {
                setFolders(res.data)
            })
    }

    async function getFolder(idFolder) {
        if (idFolder !== undefined) {
            await axios.get('http://localhost:4000/api/folders/' + idFolder)
                .then(function (res) {
                    setFolder(res.data)
                })
        }
    }

    async function getItems(idFolder) {
        var url;
        idFolder ? url = 'http://localhost:4000/api/items/folder/' + idFolder : url = 'http://localhost:4000/api/items'
        await axios.get(url)
            .then(function (res) {
                setItems(res.data)
            })
    }

    async function saveItem() {
        if (data._id === '') {
            await axios.post('http://localhost:4000/api/items', data)
                .then(function (res) {
                    getItems()
                    setData({
                        folderId: 0,
                        content: '',
                        userId: 1,
                        _id: ''
                    })
                    alert(res.data.message)
                })
        } else {
            await axios.put('http://localhost:4000/api/items/' + data._id, data)
                .then(function (res) {
                    getItems()
                    setData({
                        folderId: 0,
                        content: '',
                        userId: 1,
                        _id: ''
                    })
                    alert(res.data.message)
                })
        }
    }

    async function getItem(id) {
        await axios.get('http://localhost:4000/api/items/' + id)
            .then(function (res) {
                setData(res.data)
            })
    }
    async function deleteItem(id) {
        if (window.confirm('¿Do you want to delete this item?')) {
            await axios.delete('http://localhost:4000/api/items/' + id)
                .then(function (res) {
                    getItems()
                    alert(res.data.message)
                })
        }
    }

    function cleanItem() {
        setData({
            folderId: 0,
            content: '',
            userId: 1,
            _id: ''
        })
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
            <Col md={8} className="p-4">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Folder</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item =>
                            <tr key={item._id}>
                                <td>{item.folderId ? item.folderId.name : ''}</td>
                                <td>{item.content}</td>
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
    )
}

export default ItemsList;