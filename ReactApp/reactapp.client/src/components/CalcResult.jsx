import React, { useEffect, useState } from 'react';
import DoughnutDiagram from './DoughnutDiagram';
import BarDiagram from './BarDiagram';
import LoadDiagram from './LoadDiagram';
import { Col, Row } from 'react-bootstrap';
import styles from '../styles/Result.module.css';
import diagramStyles from '../styles/Diagram.module.css';
import Labels from './Labels';


/**
 * CalcResult component for rendering the total emissions calculation result.
 * Renders the total emissions calculation result with diagrams and a button to convert to PDF.
 * @returns {JSX.Element} The JSX representation of the calculation result.
 */
export default function CalcResult({ calcData, tabname, scroll}) {
    const [emissions, setEmissions] = useState([]); // list of emissionData for each resource
    const [totalEmission, setTotalEmission] = useState(0); // State to manage total emission of all resources
    const [calculationComplete, setCalculationComplete] = useState(false);  // State to manage calculation stage

    // List of colors so that the same resource will have the same color in all diagrams.
    const backgroundColor = [
        '#FF1493',
        '#87CEEB',
        '#FF8C00',
        '#40E0D0',
        '#9370DB',
        '#008000',
        '#FFD700',
        '#EE82EE',
        '#FF0000',
        '#4682B4',
        '#A0522D',
        '#808080',
        '#00FF00',
        '#F0E68C',
        '#008B8B',
    ];

    // Calculating the total emission when calcData is updated
    useEffect(() => {
        async function calculateEmissions() {
            if (calcData && calcData.length !== 0) {
                const emissionList = []; // Temporary array to store emissions data

                // Going through the data for each resource
                calcData.forEach(data => {
                    const energy = data.vmData.pkWh * data.pue; // Calculating the total energy consumption
                    const carbonIntensity = data.carbonIntensity; // Retrieving the carbon intensity for the region
                    const embodied = data.vmData.embodied_Emissions; // Retrieving the emboddied emissions for the resource
                    const time = (data.time.year * 8766) + (data.time.month * 730) + (data.time.day * 24) + data.time.hour; // Calculating number of hours

                    // Using the SCI formula to calculate a resource emissions in grams
                    const emission = (energy * carbonIntensity) + embodied;

                    //Multiplying the emission with time
                    const emissionTime = emission * time;


                    // Saving the data as an object
                    const emissionData = {
                        resource: data.resource,
                        resourceShort: data.resourceShort,
                        regionName: data.region,
                        instance: data.instance,
                        carbonIntensity: carbonIntensity,
                        energy: parseFloat(energy.toFixed(2)),
                        embodied: parseFloat((embodied * 1000).toFixed(2)),  //Converting to mg
                        emission: parseFloat(emission.toFixed(2)),
                        emissionTime: parseFloat(emissionTime.toFixed(2)),
                    };

                    emissionList.push(emissionData); // Adding the data to a list
                })

                setEmissions(emissionList);

                // Adding all the resource emissions together to get total emission.
                const newTotalEmission = emissionList.reduce((accumulator, currentValue) => accumulator + currentValue.emissionTime, 0);
                setTotalEmission(newTotalEmission.toFixed(2)); //Setting the total emissions and limit decimals to 2 numbers

                // Set calculation completion to true
                setCalculationComplete(true);
            }
        }

        calculateEmissions();

    }, [calcData]);


    return (
        <Col className={styles.resultCol} style={{ width: '100%', overflowY: scroll }}>
            <h2>{tabname}</h2>
            {!calculationComplete ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Row className={diagramStyles.labelRow} >
                        <Labels emissions={emissions} backgroundColor={backgroundColor} />
                    </Row> 
                    <Row style={{ width: '100%' }}>
                        <DoughnutDiagram emissions={emissions} totalEmission={totalEmission} backgroundColor={backgroundColor} />
                    </Row>
                    <Row style={{ width: '100%' }}>
                        <BarDiagram info={'Energy'} emissions={emissions} backgroundColor={backgroundColor} />
                        <BarDiagram info={'Region'} emissions={emissions} backgroundColor={backgroundColor} />
                        <BarDiagram info={'Embodied'} emissions={emissions} backgroundColor={backgroundColor} />
                    </Row>
                    <Row className={diagramStyles.tableRow} data-testid={"labels"}>
                        <LoadDiagram emissions={emissions} backgroundColor={backgroundColor} />
                    </Row>
                </>
            )}
        </Col>
    );
}