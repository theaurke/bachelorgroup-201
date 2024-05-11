import styles from '../styles/Diagram.module.css';

/**
 * Renders a table with emissions based on different loads.
 * @param {list} emissions - List containing all info about the emissions of the resources.
 * @returns {JSX.Element} The JSX representation of the table.
 */
export default function LoadDiagram({ emissions }) {
    

    return (
        <>
            <h6>Hourly Emissions Based on Load</h6>
            <table data-testid={"loadDiagram"}>
                <thead className={styles.tableHead}>
                    <tr>
                        <th></th>
                        <th colSpan={5}>Load</th>
                    </tr>
                    <tr>
                        <th>Resource</th>
                        <th>10%</th>
                        <th>25%</th>
                        <th>50%</th>
                        <th>80%</th>
                        <th>100%</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {emissions.map((resource, index) => (
                        <tr key={index}>
                            <td>{resource.resource}</td>
                            <td>{(resource.emission * 0.10).toFixed(1)} gCO2eq</td>
                            <td>{(resource.emission * 0.25).toFixed(1)} gCO2eq</td>
                            <td>{(resource.emission * 0.50).toFixed(1)} gCO2eq</td>
                            <td>{(resource.emission * 0.80).toFixed(1)} gCO2eq</td>
                            <td>{(resource.emission).toFixed(1)} gCO2eq</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}