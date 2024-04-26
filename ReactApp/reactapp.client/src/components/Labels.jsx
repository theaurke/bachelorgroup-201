import styles from '../styles/Diagram.module.css';


/**
 * Renders labels for all the diagrams with color codes to easily identify the resources across all diagrams.
 * @param {list} emissions - List containing all info about the emissions of the resources.
 * @param {list} backgroundColor - List of colors for the columns in the diagram.
 * @returns {JSX.Element} The JSX representation of the color key and resource name.
 */
export default function Labels({ emissions, backgroundColor }) {
  
    return (
        <>
            {emissions.map((item, index) => (
                <span key={index} style={{ display: 'flex', width: '8em', padding: '0 0.2em 0.2em 0.2em' }}>
                    <p data-testId={"labelColor"} className={styles.colorKey} style={{ backgroundColor: backgroundColor[index] }}>&nbsp;&nbsp;</p>
                    <p data-testId={"labelName"} className={styles.resourceText}>&nbsp;&nbsp;{item.resource.toString()}</p>
                </span>
            ))}
        </> 
    );
}

