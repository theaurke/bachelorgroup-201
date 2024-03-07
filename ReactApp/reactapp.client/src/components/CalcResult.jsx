import Diagram from './Diagram';
import Col from 'react-bootstrap/Col';
import styles from '../styles/CalcResult.module.css';

/**
 * CalcResult component for rendering the total emissions calculation result.
 * Renders the total emissions calculation result with diagrams and a button to convert to PDF.
 * @returns {JSX.Element} The JSX representation of the calculation result.
 */
export default function CalcResult() {
    return (
        <Col className={styles.resultCol}>
            <h2>Total Emissions</h2>
            <Diagram />
            <Diagram />
            <button className={styles.pdfButton}>Convert to PDF</button>
        </Col>
    );
}