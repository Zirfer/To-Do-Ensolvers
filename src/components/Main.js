import { Button, Row, Col } from 'react-bootstrap'

function Main() {
    return (
        <Row className="m-4">
            <Col className="center">
                <h1>ToDo Ensolvers</h1>
                <h2>Juan David Avellaneda Molina</h2>
                <Button
                    href="https://github.com/Zirfer/To-Do-Ensolvers"
                    size="lg"
                    variant="link"
                    target='blank'
                >
                    GitHub
                </Button>
            </Col>
        </Row>
    )
}

export default Main;