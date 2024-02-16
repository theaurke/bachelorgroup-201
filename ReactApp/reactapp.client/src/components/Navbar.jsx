import NavButton from './NavButton';
import ToggleButton from './ToggleButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


export default function Navbar() {
    return (
        <Container fluid style={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Row style={{ flex: '8', padding: '0.1em' }}>
                <NavButton text='Start new calculation' src='plusWhite.png' alt='New calculation'/>
            </Row>
            <Row style={{ flex: '1' } }>
                <ToggleButton />
            </Row>
        </Container>
    );
}

