import Information from './Information';
import { Container, Col, Row }  from 'react-bootstrap';
import ResourcePanel from './ResourcePanel';
import ResultPanel from './ResultPanel';
import { useState } from 'react';
 
export default function Main({ activeTab }) {
    const [layout, setLayout] = useState('resource'); // State to manage the layout of the page.
    const [addedResources, setAddedResources] = useState([]); // State to manage the resources added to the list to be calculated.


    // Function to update the state of the page layout.
    const handleCalculate = () => {
        setLayout(layout === 'resource' ? 'result' : 'resource');
    }


    // Returning the main part of the application with either the information page or the set layout.
    return (
        <Container fluid style={{ height: '100%', padding: '0em', border: '4px solid #45654C' }}>

            {/*Checking if there are any active tabs, and setting the main to the informationg page if not.*/ }
                {activeTab ? (
                    <Information />
                ) : (
                    <Row>

                        {/*Checking which layout is set, and filling the row based on that.*/}
                        {layout === 'resource' ? (

                            <>
                                <Col>
                                    <ResultPanel addedResources={addedResources} />
                                </Col>
                                <Col style={{ height: '96vh' }}>
                                    <ResourcePanel handleCalculate={handleCalculate} setAddedResources={setAddedResources} addedResources={addedResources} calculated={false} />
                                </Col>
                            </>

                        ) : (

                            <>
                                <Col>
                                    <ResourcePanel handleCalculate={handleCalculate} setAddedResources={setAddedResources} addedResources={addedResources} calculated={true} />
                                </Col>
                                <Col style={{ height: '96vh' }}>
                                    <ResultPanel addedResources={addedResources} />
                                </Col>
                            </>

                        )}
                    </Row>
                )}
            
        </Container>
    );
}