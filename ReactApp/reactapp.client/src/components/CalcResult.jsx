import React, { useEffect, useState } from 'react';
import Diagram from './Diagram';
import Col from 'react-bootstrap/Col';
import styles from '../styles/CalcResult.module.css';

/**
 * CalcResult component for rendering the total emissions calculation result.
 * Renders the total emissions calculation result with diagrams and a button to convert to PDF.
 * @returns {JSX.Element} The JSX representation of the calculation result.
 */
export default function CalcResult({ calcData }) {
    const [emissions, setEmissions] = useState([]); // list of emissionData for each resource
    const [totalEmission, setTotalEmission] = useState(0); // State to manage total emission of all resources

    // Calculating the total emission when calcData is updated
    useEffect(() => {
        if (calcData && calcData.length !== 0) {
            const emissionList = []; // Temporary array to store emissions data

            // Going through the data for each resource
            calcData.forEach(data => {
                const energy = data.vmData.pkWh * data.pue; // Calculating the total energy consumption
                const region = data.carbonIntensity; // Retrieving the carbon intensity for the region
                const embodied = data.vmData.embodied_Emissions; // Retrieving the emboddied emissions for the resource

                // Using the SCI formula to calculate a resource emissions in grams
                const emission = (energy * region) + embodied;

                const emissionData = {
                    energy: energy,
                    region: region,
                    embodied: embodied,
                    emission: emission
                };

                emissionList.push(emissionData);
            })

            setEmissions(emissionList);

            // Adding all the resource emissions together to get total emission.
            const newTotalEmission = emissionList.reduce((accumulator, currentValue) => accumulator + currentValue.emission, 0);
            setTotalEmission(newTotalEmission.toFixed(3)); //Setting the total emissions and limit decimals to 3 numbers
        } 

    }, [calcData]);

    return (
        <Col className={styles.resultCol}>
            <h2>Total Emissions</h2>
            <p>{totalEmission} gCO2eq</p>
            <p>
                {emissions.map(data => (
                    <span key={data.energy}>{`Energy:${data.energy}, Region:${data.region}, Embodied:${data.embodied}, Emission:${data.emission} `}</span>
                ))}
            </p>
            <Diagram />
            <Diagram />
        </Col>
    );
}