import Information from './Information';
import { Container, Col, Row }  from 'react-bootstrap';
import ResourcePanel from './ResourcePanel';
import ResultPanel from './ResultPanel';


/**
 * Main component for the application.
 * Renders the main content of the webpage, either the information page or the resources and results.
 * @param {number} activeTab - The ID of the activeTab.
 * @returns {JSX.Element} The JSX representation of the main content.
 */
export default function Main({ activeTab, tabList, setLayout, layout, setActiveList, activeList, handleCalculate }) {

    // Finding the index of the activeTab
    const tabIndex = tabList.findIndex(tab => tab.id === activeTab.id);

    // Returning the main part of the application with either the information page or the set layout.
    return (
        <Container fluid style={{ height: '100%', padding: '0em', border: '4px solid #45654C'}}>

            {/*Checking if there are any active tabs, and setting the main to the information page if not.*/ }
                {!activeTab.id ? (
                    <Information />
                ) : (
                    <Row data-testid='resourceContent' style={{ margin:'0', height: '100%' }}>

                        {/*Checking which layout is set at the activeTab index, and filling the row based on that.*/}
                        {tabIndex !== -1 && tabList[tabIndex].layout === 'resource' ?(  

                            <>
                                <Col style={{ height: '100%', padding: '0' }}>
                                    <ResultPanel layout={layout} />
                                </Col>
                                <Col style={{ height: '100%', padding:'0' }}>
                                    <ResourcePanel handleCalculate={handleCalculate} setLayout={setLayout} layout={layout} setAddedResources={setActiveList} addedResources={activeList} calculated={false} />
                                </Col>
                            </>

                        ) : (

                            <>
                                <Col style={{ height: '100%', padding: '0' }}>
                                        <ResourcePanel handleCalculate={handleCalculate} setLayout={setLayout} layout={layout} setAddedResources={setActiveList} addedResources={activeList} calculated={true} />
                                </Col>
                                    <Col style={{ height: '100%', padding: '0' }}>
                                        <ResultPanel layout={layout} calcData={tabList[tabIndex]?.calcData || []} tabname={activeTab.title} />
                                </Col>
                            </>

                        )}
                    </Row>
                )}
            
        </Container>
    );
}