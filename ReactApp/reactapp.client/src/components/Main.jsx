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
export default function Main({ activeTab, tabList, setLayout, layout, setActiveList, activeList }) {
    const [calcData, setCalcData] = useState([]); // State to hold the fetched calculation data

    // Function to handle calculation submit
    const handleCalculate = async (l) => {
        setLayout(l);   // Set new layout

        console.log(activeList);


        // Array to store promises for each fetch request, avoid potential timing issues
        const fetchPromises = activeList.map(async resource => {
            // Fetch VM data based on form data submitted on calculate
            const vmResponse = await fetch('/vm/' + resource.formData.instance);
            if (!vmResponse.ok) {
                throw new Error('Failed to fetch VM data');
            }
            const vmData = await vmResponse.json();


            // Fetch region data based on form data
            const carbonIntensityResponse = await fetch('/region/carbonIntensity/' + resource.formData.region);
            if (!carbonIntensityResponse.ok) {
                throw new Error('Failed to fetch carbon intensity');
            }
            const carbonIntensityData = await carbonIntensityResponse.json();

            const pueResponse = await fetch('/region/pue/' + resource.formData.region);
            if (!pueResponse.ok) {
                throw new Error('Failed to fetch PUE');
            }
            const pueData = await pueResponse.json();

            return {
                vmData: vmData,
                carbonIntensity: carbonIntensityData,
                pue: pueData
            };
        });

        // Wait for all fetch requests to complete
        try {
            const responseData = await Promise.all(fetchPromises);

            // Update calcData state with all fetched data
            setCalcData(responseData);
        } catch (error) {
            console.error('Error fetching VM data:', error);
        }


        // Use calcData for calculations. 
        // (calcData.carbonIntensity, calcData.pue, calcData.vmData.cpu_num, etc.)

    };

    // Log vmData whenever it changes
    useEffect(() => {
        console.log(calcData);
    }, [calcData]);



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
                                    <ResourcePanel handleCalculate={handleCalculate} layout={layout} setAddedResources={setActiveList} addedResources={activeList} calculated={false} />
                                </Col>
                            </>

                        ) : (

                            <>
                                <Col style={{ height: '100%', padding: '0' }}>
                                    <ResourcePanel handleCalculate={handleCalculate} layout={layout} setAddedResources={setActiveList} addedResources={activeList} calculated={true} />
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