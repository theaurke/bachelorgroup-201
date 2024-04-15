import React from 'react';
import styles from '../styles/Resource.module.css'
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
export default function ResourcePanel({ setLayout,layout, handleCalculate, addedResources, setAddedResources, calculated }) {
    const [showList, setShowList] = useState(false); // State managing the visibility of the list of resource to choose from.


    // Returning the correct content based on different conditions.
    return (

        showList ? ( // Returning the resource list if showList is true.
            <Container fluid style={{ height: '100%', padding: '0' }} >
                <ResourceList setAddedResources={setAddedResources} addedResources={addedResources} setShowList={setShowList} />
            </Container>
        ) : (

            addedResources?.length === 0 ? ( // Returning the Add resource button if no resources added in the addedResources list.

                <Container className={styles.addBtnContainer}>
                    <button data-testid='addResourceButton'  className={styles.addResourceButton} onClick={() => setShowList(!showList)}> Add Resource </button>
                </Container>

            ) : (

                <Container fluid className={styles.panelContainer} style={{ padding: '0', borderRight: calculated ? '4px solid #45654C' : 'none', borderLeft: !calculated ? '4px solid #45654C' : 'none' }}>

                    <Row style={{ margin:'0' }} >
                        <h4 data-testid='addedResourceList' className={styles.banner}> Added Resources </h4>
                    </Row>

                            <Row className={styles.addedListRow} style={{ margin: '0' }}>
                                <AddedResourcesList addedResources={addedResources} setAddedResources={setAddedResources} handleCalculate={handleCalculate} setLayout={setLayout} />
                    </Row>

                    {!calculated && ( // Rendering the TextButtons if resources are not calculated.

                                <Row data-testid='addedResourcesButtons' className={styles.textBtnRow} style={{ margin: '0' }} >
    
                            <Col >
                                <TextButton text='Add Resource' type='button' onClick={() => setShowList(!showList)} />
                            </Col>

                            <Col >
                                <TextButton text='Calculate' type='button' onClick={() => handleCalculate(layout === 'resource' ? 'result' : 'resource')} />
                            </Col>

                        </Row>

                    )}

                </Container>
            )
        )
    );
}