import Information from './Information';
import { Container, Col, Row }  from 'react-bootstrap';
import ResourcePanel from './ResourcePanel';
import ResultPanel from './ResultPanel';
import { useState, useEffect } from 'react';


/**
 * Main component for the application.
 * Renders the main content of the webpage, either the information page or the resources and results.
 * @param {number} activeTab - The ID of the activeTab.
 * @returns {JSX.Element} The JSX representation of the main content.
 */
export default function Main({ activeTab }) {
    const [layout, setLayout] = useState('resource'); // State to manage the layout of the page.   
    const [activeList, setActiveList] = useState([]); // State to manage the resources added to the list to be calculated.
    const [tabList, setTabList] = useState([]); // State to manage the tabs with their content


    // Updating the layout and activeList when activeTab changes
    useEffect(() => {
        if (activeTab) {
            // If a list does not exist at the index of the active tab, initialize it with an empty list
            if (!tabList[activeTab - 1]) {
                setTabList((prev) => [...prev, { list: [], layout: 'resource' }]); // Add a new object to the tabList containing an empty list and the default layout
            }
            // Set activeList and layout to the list and layout associated with the active tab
            setActiveList(tabList[activeTab - 1]?.list || []);
            setLayout(tabList[activeTab - 1]?.layout || 'resource');
        }
    }, [activeTab]); // Only re-run when activeTab changes



    // Update the tabList when activeList changes
    useEffect(() => {
        //If there is an activeTab and the list at the activeTab index does not match the activeList
        if (activeTab && tabList[activeTab - 1]?.list !== activeList) {
            const updatedList = [...tabList];
            updatedList[activeTab - 1] = { ...updatedList[activeTab - 1], list: activeList }; //updating the list at the activeTab index
            setTabList(updatedList);
        }
    }, [activeList]); // Only re-run when activeList changes



    // Update the tabList when layout changes
    useEffect(() => {
        //If there is an activeTab and the layout at the activeTab index does not match the layout
        if (activeTab && tabList[activeTab - 1]?.layout !== layout) {
            const updatedList = [...tabList];
            updatedList[activeTab - 1] = { ...updatedList[activeTab - 1], layout: layout }; //updating the layout at the activeTab index
            setTabList(updatedList);
        }
    }, [layout]); // Only re-run when layout changes



    // Returning the main part of the application with either the information page or the set layout.
    return (
        <Container fluid style={{ height: '100%', padding: '0em', border: '4px solid #45654C'}}>

            {/*Checking if there are any active tabs, and setting the main to the information page if not.*/ }
                {!activeTab ? (
                    <Information />
                ) : (
                    <Row data-testid='resourceContent' style={{ margin:'0', height: '100%' }}>

                        {/*Checking which layout is set at the activeTab index, and filling the row based on that.*/}
                        {tabList[activeTab - 1]?.layout === 'resource'  ? (  

                            <>
                                <Col style={{ height: '100%', padding: '0' }}>
                                    <ResultPanel  />
                                </Col>
                                <Col style={{ height: '100%', padding:'0' }}>
                                    <ResourcePanel handleCalculate={setLayout} layout={layout} setAddedResources={setActiveList} addedResources={activeList} calculated={false} />
                                </Col>
                            </>

                        ) : (

                            <>
                                <Col style={{ height: '100%', padding: '0' }}>
                                    <ResourcePanel handleCalculate={setLayout} layout={layout} setAddedResources={setActiveList} addedResources={activeList} calculated={true} />
                                </Col>
                                <Col style={{ height: '100%', padding: '0' }}>
                                    <ResultPanel  />
                                </Col>
                            </>

                        )}
                    </Row>
                )}
            
        </Container>
    );
}