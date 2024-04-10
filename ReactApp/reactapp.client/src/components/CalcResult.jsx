import React, { useEffect, useState } from 'react';
import DoughnutDiagram from './DoughnutDiagram';
import BarDiagram from './BarDiagram';
import ScoreDiagram from './ScoreDiagram';
import { Col, Row } from 'react-bootstrap';
import styles from '../styles/CalcResult.module.css';


/**
 * CalcResult component for rendering the total emissions calculation result.
 * Renders the total emissions calculation result with diagrams and a button to convert to PDF.
 * @returns {JSX.Element} The JSX representation of the calculation result.
 */
export default function CalcResult({ calcData, tabname}) {
    const [emissions, setEmissions] = useState([]); // list of emissionData for each resource
    const [totalEmission, setTotalEmission] = useState(0); // State to manage total emission of all resources
    const [calculationComplete, setCalculationComplete] = useState(false);  // State to manage calculation stage

    // Calculating the total emission when calcData is updated
    useEffect(() => {
        async function calculateEmissions() {
            if (calcData && calcData.length !== 0) {
                const emissionList = []; // Temporary array to store emissions data

                // Going through the data for each resource
                calcData.forEach(data => {
                    const energy = data.vmData.pkWh * data.pue; // Calculating the total energy consumption
                    const region = data.carbonIntensity; // Retrieving the carbon intensity for the region
                    const embodied = data.vmData.embodied_Emissions; // Retrieving the emboddied emissions for the resource
                    const time = (data.time.year * 8766) + (data.time.month * 730) + (data.time.day * 24)+ data.time.hour;

                    // Using the SCI formula to calculate a resource emissions in grams
                    const emission = (energy * region) + embodied;

                    const emissionTime = time !== 0 ? emission * time : emission;

                    const emissionData = {
                        resource: data.resource,
                        energy: parseFloat(energy.toFixed(3)),
                        region: region,
                        embodied: parseFloat(embodied.toFixed(3)),
                        emission: parseFloat(emission.toFixed(3)),
                        emissionTime: parseFloat(emissionTime.toFixed(3))
                    };

                    emissionList.push(emissionData);
                })

                setEmissions(emissionList);

                // Adding all the resource emissions together to get total emission.
                const newTotalEmission = emissionList.reduce((accumulator, currentValue) => accumulator + currentValue.emission, 0);
                setTotalEmission(newTotalEmission.toFixed(3)); //Setting the total emissions and limit decimals to 3 numbers

                // Set calculation completion to true
                setCalculationComplete(true);
            }
        }

        calculateEmissions();

    }, [calcData]);

    return (
        <Col className={styles.resultCol} style={{ width: '100%', overflowY: 'auto' }}>
            <h2>{tabname}</h2>
            {!calculationComplete ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Row style={{width: '100%'} }>
                       <DoughnutDiagram emissions={emissions} totalEmission={totalEmission} />
                    </Row>
                    <Row>
                        <BarDiagram info={'Energy'} emissions={emissions} />
                        <BarDiagram info={'Region'} emissions={emissions} />
                        <BarDiagram info={'Embodied'} emissions={emissions} />
                    </Row>
                </>
            )}
        </Col>
    );
}