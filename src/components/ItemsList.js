import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios'

function ItemsList() {

    const [items, setItems] = useState([])
    const [data, setData] = useState({
        folder: 0,
        title: '',
        content: '',
        userId: 1,
        _id: ''
    })

    useEffect(() => {
        getItems();
    }, [])

    async function getItems() {
        await axios.get('http://localhost:4000/api/items')
            .then(function (res) {
                setItems(res.data)
            })
    }

    async function saveItem() {
        if (data._id == undefined) {
            await axios.post('http://localhost:4000/api/items', data)
                .then(function (res) {
                    getItems()
                    setData({
                        folder: 0,
                        title: '',
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
                        folder: 0,
                        title: '',
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
                            className="left"
                            onClick={() => saveItem()}
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
                            <th>Folder</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item =>
                            <tr key={item._id}>
                                <td>{item.folder}</td>
                                <td>{item.title}</td>
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