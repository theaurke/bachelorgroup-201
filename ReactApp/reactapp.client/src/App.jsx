// Importing useState hook from React library
import { useState } from 'react';

// Importing necessary components from react-bootstrap library
import { Container, Row, Col } from 'react-bootstrap';

// Importing Sidebar and Main components from their respective files
import Sidebar from './components/Sidebar';
import Main from './components/Main';


/**
 * Function defining the App component, the main components of the application.
 * Renders a container with a sidebar and a main content area.
 * Manages state for the sidebar width and active calculation tab.
 * Handles toggling of the sidebar width.
 * @returns {JSX.Element} The JSX representation of App component.
 */
export default function App() {
    // Using useState hook to manage state for sidebar width
    const [sidebarWidth, setSidebarWidth] = useState(3);

    // useState to manage state for active calculation tab at the "top"(App), 
    // so it can be passed to Main after change from Sidebar
    const [activeTab, setActiveTab] = useState('');

    // Function to toggle sidebar width
    const toggleSidebar = () => {
        // If sidebarWidth is 3, set it to 1, else set it to 3
        setSidebarWidth(sidebarWidth === 3 ? 1 : 3);
    };

    // Returns layout and content of App, using Container, Row and Col.
    // The Container is fluid, meaning it's width is 100% across all viewport.
    // Sidebar Col has xl breakpoint that is set to span 'sidebarWidth' columns,
    // while Main Col span the rest of the space.
    return (
        <Container className="vh-100" style={{ padding: '1em' }} fluid>
            <Row style={{ height: '100%' }}>
                <Col xl={sidebarWidth} >
                    <Sidebar
                        // Passing toggleSidebar, sidebarWidth, activeTab, 
                        // and setActiveTab as props.
                        toggleSidebar={toggleSidebar}
                        sidebarWidth={sidebarWidth}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                </Col>
                <Col>
                    <Main activeTab={activeTab} />
                </Col>
            </Row >
        </Container>
    );
}