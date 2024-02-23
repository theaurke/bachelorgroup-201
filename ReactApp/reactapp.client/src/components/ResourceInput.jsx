import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import styles from '../styles/InputList.module.css'

export default function ResourceInput() {
    return (
        <Container className={styles.containerStyle}>
            {/* The title banner of the resource on top */}
            <div className={styles.resourceBanner}>
                <span className={styles.resourceText}>Virtual Machine</span>
            </div>
            
            <Form className={styles.formStyle}>
                <Row className={"mb-3"}>
                    <Form.Group as={Col}>
                        <Form.Label> Number of CPUs </Form.Label>
                        <Form.Control placeholder={"..."}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label> Number of GPUs </Form.Label>
                        <Form.Control placeholder={"..."}/>
                    </Form.Group>
                </Row>

                <Row className={"mb-3"}>
                    <Form.Group className={"mb-3"}>
                        <Form.Label> CPU Power Consumption </Form.Label>
                        <Form.Control placeholder={"..."}/>
                    </Form.Group>

                    <Form.Group className={"mb-3"}>
                        <Form.Label> GPU Power Consumption </Form.Label>
                        <Form.Control placeholder={"..."}/>
                    </Form.Group>

                    <Form.Group className={"mb-3"}>
                        <Form.Label> Memory Power Consumption </Form.Label>
                        <Form.Control placeholder={"..."}/>
                    </Form.Group>
                </Row>

                {/* Create the range that should represent 'Time' */}
                <Row className={"mt-0"}>
                    <Form.Label> Time </Form.Label>
                    <Form.Range/>
                </Row>

                {/* Buttons */}
                <Row className={"mt-5"}>
                    <Col>
                        <button className={styles.inputButton}> Clear</button>
                    </Col>
                    <Col>
                        <button className={styles.inputButton}> Add</button>
                    </Col>
                </Row>
            </Form>

        </Container>
    );
}