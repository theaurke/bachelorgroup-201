import NavButton from './NavButton';
import ToggleButton from './ToggleButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import styles from '../styles/Navbar.module.css'
import { useState } from 'react';


export default function Navbar() {
    const [activeTab, setActiveTab] = useState(''); // Initialize active tab state


    return (
        <Container fluid className={styles.container}>
            <Row style={{ flex: '1', padding: '0.1em' }}>
                <NavButton text='Start new calculation' src='plusWhite.png' alt='New calculation' />
            </Row>

            <Row style={{flex: '9', padding: '0.1em'}}>
                <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                    <Col style={{padding: '0'} }>
                        <Nav variant='pills' className={styles.navContainer}>
                            <Nav.Item className={styles.navItem}>
                                <Nav.Link eventKey='first' className={`${styles.navLink} ${activeTab === 'first' ? styles.activeTab : ''}`}>
                                    Tab 1
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Tab.Container>
            </Row>

            <Row style={{flex: '1'}}>
                <ToggleButton />
            </Row>
        </Container>
    );
}

