import React from 'react';
import Step from './Step';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../styles/Information.module.css'

export default function Information() {
    return (
        <Container fluid className={styles.infoContainer}>
            <Row className={styles.infoDiv}>
                <h1 className={styles.h1}>Calculate the estimated emissions on your Azure IaaS resources</h1>
                <p className={styles.p}>Are you seeking a deeper understanding of the emissions generated by your Azure IaaS resources? <br />
                    Perhaps you&apos;re interested in comparing estimated emissions across various resources. <br />
                    This calculator is designed to provide valuable insights, enabling you to make informed <br />
                    choices and identify the most suitable solutions. Additionally, it can highlight significant contributors, <br />
                    empowering you to strategically  reduce emissions in your operations.</p>
            </Row>
            <Row className={styles.allStepsDiv}>
                <Col>
                    <Step
                        title='Choose resources'
                        description='Choose one or more resources you want to calculate emissions for.'
                        split={28}
                        src='step1.png'
                    />
                </Col>
                <Col>
                    <Step
                        title='Fill in the data'
                        description='Fill in the required data and let the calculator do the rest.'
                        split={29}
                        src='step2.png'
                    />
                </Col>
                <Col>
                    <Step
                        title='Present the results'
                        description='See the results from the calculations and convert them to PDF to easy present it.'
                        split={37}
                        src='step3.png'
                    />
                </Col>
            </Row>
        </Container>
    );
}