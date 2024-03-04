import Navbar from './Navbar';
import { Container, Row } from 'react-bootstrap';

/**
 * Sidebar component for the application.
 * Renders a sidebar with a logo and a navigation bar.
 * @param {Object} props - Props passed to the Sidebar component.
 * @param {Function} props.toggleSidebar - Function to toggle the sidebar.
 * @param {number} props.sidebarWidth - Width of the sidebar.
 * @param {string} props.activeTab - Active tab in the navigation bar.
 * @param {Function} props.setActiveTab - Function to set the active tab.
 * @returns {JSX.Element} The JSX representation of the sidebar.
 */
export default function Sidebar(props) {
    const { toggleSidebar, sidebarWidth, activeTab, setActiveTab } = props;

    // Check if sidebar is collapsed
    const isSidebarCollapsed = sidebarWidth === 1;  

    // Return sidebar component with flex column Container, placing the Rows vertically
    return (
        <Container fluid style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Logo row */}
            <Row style={{ height: '20%', backgroundColor: '#45654C', textAlign: 'center', padding: '1em' }}>
                <img alt='logo' src='logo.png' style={{ height: '100%', objectFit: 'contain' }} />
            </Row>
            {/* Navigation bar row */}
            <Row style={{ backgroundColor: '#45654C', flex: '1', marginTop: '1em' }}>
                {/* Navbar component */}
                <Navbar
                    // Passing toggleSidebar, isSidebarCollapsed, 
                    // activeTab, and setActiveTab as props.
                    toggleSidebar={toggleSidebar}
                    isSidebarCollapsed={isSidebarCollapsed}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </Row>
        </Container>
    );
}