import CalcText from './CalcText';
import CalcResult from './CalcResult';
import Container from 'react-bootstrap/Container';

/**
 * ResultPanel component for rendering a panel to display calculation results.
 * @returns {JSX.Element} The JSX representation of the result panel.
 */
export default function ResultPanel() {
    return (
        <Container fluid style={{padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', margin:'0'}}>
            <CalcText />
        </Container>
        
    );
}