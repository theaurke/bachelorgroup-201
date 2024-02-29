import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function App() {
    const [sidebarWidth, setSidebarWidth] = useState(3); // Initial width of the sidebar
    const [activeTab, setActiveTab] = useState(''); // Initialize active tab state at the top, so it can be passed to Main

    const toggleSidebar = () => {
        setSidebarWidth(sidebarWidth === 3 ? 1 : 3); // Change the width based on current width
    };

    return (
        <Container className="vh-100" style={{padding: '1em' }} fluid>
            <Row style={{ height: '100%' }}>
                <Col xl={sidebarWidth} >
                    <Sidebar toggleSidebar={toggleSidebar} sidebarWidth={sidebarWidth} activeTab={activeTab} setActiveTab={setActiveTab} />
                </Col>
                <Col>
                    <Main activeTab={activeTab} setActiveTab={setActiveTab} />
                </Col>
            </Row >
        </Container>
    );
}

