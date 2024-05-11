import Information from './Information';
import { Container, Col, Row }  from 'react-bootstrap';
import ResourcePanel from './ResourcePanel';
import ResultPanel from './ResultPanel';


/**
 * Main component for the application.
 * Renders the main content of the webpage, either the information page or the resources and results.
 * @param {number} activeTab - The ID of the activeTab.
 * @param {list} tabList - List of tab content.
 * @param {Function} setLayout - Function to update main layout.
 * @param {string} layout - String describing the layout.
 * @param {Function} setActiveList - Function for updating the activeList.
 * @param {list} activeList - List of resources that correlates to the activeTab.
 * @param {Function} handleCalculate - Function for handling calculation.
 * @param {boolean} home - Boolean to decide if showing activeTab or information page.
 * @param {boolean} showInput - Boolean to indicate whether the input form should be visible or not.
 * @param {Function} setShowInput - Function to update if the input form should be visible or not.
 * @param {boolean} showList - Boolean to indicate whether the list of resources should be visible or not.
 * @param {Function} setShowList - Function to update if the list of resources should be visible or not.
 * @returns {JSX.Element} The JSX representation of the main content.
 */
export default function Main({ activeTab, tabList, setLayout, layout, setActiveList, activeList, handleCalculate, home, showInput, setShowInput, showList, setShowList }) {

    // Finding the index of the activeTab
    const tabIndex = tabList.findIndex(tab => tab.id === activeTab.id);

    // Style for the columns
    const colStyle = {
        height: '100%',
        padding: '0'
    };

    // Returning the main part of the application with either the information page or the set layout.
    return (
        <Container fluid style={{ height: '100%', padding: '0em', border: '4px solid #45654C' }}>

            {/*Checking if there are any active tabs, and setting the main to the information page if not.*/ }
                {!activeTab.id || home ? (
                    <Information />
            ) : (
                    <Row data-testid='resourceContent' style={{ margin: '0', height: '100%' }}>

                        {/*Checking which layout is set at the activeTab index, and filling the row based on that.*/}
                        {tabIndex !== -1 && tabList[tabIndex].layout === 'resource' ?(  

                            <>
                                <Col style={colStyle}>
                                    <ResultPanel layout={layout} />
                                </Col>
                                <Col style={colStyle}>
                                    <ResourcePanel
                                        handleCalculate={handleCalculate}
                                        setLayout={setLayout}
                                        layout={layout}
                                        setAddedResources={setActiveList}
                                        addedResources={activeList}
                                        calculated={false}
                                        showInput={showInput}
                                        setShowInput={setShowInput}
                                        showList={showList}
                                        setShowList={setShowList}
                                    />
                                </Col>
                            </>

                        ) : (

                            <>
                                <Col style={colStyle}> 
                                        <ResourcePanel
                                            handleCalculate={handleCalculate}
                                            setLayout={setLayout}
                                            layout={layout}
                                            setAddedResources={setActiveList}
                                            addedResources={activeList}
                                            calculated={true}
                                            showInput={showInput}
                                            setShowInput={setShowInput}
                                            showList={showList}
                                            setShowList={setShowList}
                                        />
                                </Col>
                                <Col style={colStyle}>
                                    <ResultPanel layout={layout} calcData={tabList[tabIndex]?.calcData || []} tabname={activeTab.title} />
                                </Col>
                            </>

                        )}
                    </Row>
                )}
            
        </Container>
    );
}