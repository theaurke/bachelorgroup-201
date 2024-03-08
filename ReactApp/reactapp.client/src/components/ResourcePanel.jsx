import React from 'react';
import styles from '../styles/ResourceList.module.css'
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import ResourceList from './ResourceList';
import AddedResourcesList from './AddedResourcesList';
import TextButton from './TextButton';


/**
 * ResourcePanel component for the application.
 * Renders a panel with either a button to add resources, a list of resources to choose from, 
 *  or the list of added resources.
 * @param {string} layout - The layout main should have.
 * @param {Function} handleCalculate - Function to updating the layout of main after calculation.
 * @param {array} addedResources - Array of resources added to the calculation.
 * @param {Function} setAddedResources - Function to update the addedResources array.
 * @param {boolean} calculated - Boolean to change content based on if the resources are calculated or not.
 * @returns {JSX.Element} The JSX representation of the ResourcePanel.
 */
export default function ResourcePanel({ layout, handleCalculate, addedResources, setAddedResources, calculated }) {
    const [showList, setShowList] = useState(false); // State managing the visibility of the list of resource to choose from.


    // Returning the correct content based on different conditions.
    return (

        showList ? ( // Returning the resource list if showList is true.

            <ResourceList setAddedResources={setAddedResources} addedResources={addedResources} setShowList={setShowList} />

        ) : (

                addedResources?.length === 0 ? ( // Returning the Add resource button if no resources added in the addedResources list.

                    <Container style={{ height: '96vh', borderLeft: '4px solid #45654C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button className={styles.addResourceButton} onClick={() => setShowList(!showList)}> Add Resource </button>
                    </Container>

                ) : (

                        <Container className={styles.container} style={{ padding: '0em', margin: '0em', overflowY: 'scroll', borderRight: calculated ? '4px solid #45654C' : 'none', borderLeft: !calculated ? '4px solid #45654C' : 'none'}}>

                            <Row style={{ padding: '0em', margin: '0em' }}>
                                <h4 className={styles.banner}> Added Resources </h4>
                            </Row>

                            <Row style={{ padding: '0em', margin: '0em', height: '80vh' }}>
                                <AddedResourcesList addedResources={addedResources} setAddedResources={setAddedResources} />
                            </Row>

                            {!calculated && ( // Rendering the TextButtons if resources are not calculated.

                                <Row style={{ padding: '0em', margin: '0em 0em 2em 0em', zIndex: '1', borderTop: '2px solid #45654C', position: 'relative' }}>
    
                                    <Col style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
                                        <TextButton text='Add Resource' type='button' onClick={() => setShowList(!showList)} />
                                    </Col>

                                    <Col style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
                                        <TextButton text='Calculate' type='button' onClick={() => handleCalculate(layout === 'resource' ? 'result' : 'resource')} />
                                    </Col>

                                </Row>

                            )}

                        </Container>
                )
        )
    );
}