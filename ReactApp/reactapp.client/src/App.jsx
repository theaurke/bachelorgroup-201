// Importing useState hook from React library
import { React, useState, useEffect } from 'react';

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

    const minWindowWidth = 992; // Large breakpoint in Bootstrap Grid
    // Using useState hook to manage state for if window is small or not, and layout of Main is different
    const [isWindowSmall, setIsWindowSmall] = useState(window.innerWidth < minWindowWidth ? true : false);

    // useState hook to manage state for sidebar width
    const [sidebarWidth, setSidebarWidth] = useState(isWindowSmall ? 1 : 3);

    // useState to manage state for active calculation tab at the "top"(App), 
    // so it can be passed to Main after change from Sidebar
    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        // Function to handle resizing of the window
        const handleResize = () => {
            // Get the new current width of window
            const newWindowWidth = window.innerWidth;

            // Update sidebarWidth and navbarHeight based on windowWidth
            if (newWindowWidth < minWindowWidth) {
                // If the window width is smaller than the minimum breakpoint
                setIsWindowSmall(true);
                setSidebarWidth(1);
            } else {
                // If the window width is greater than or equal to the minimum breakpoint
                if (sidebarWidth === 3 || sidebarWidth === 1) setSidebarWidth(sidebarWidth);
                else setSidebarWidth(3);
                setIsWindowSmall(false);
            }
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [sidebarWidth]);

    // Function to toggle sidebar width or navbar height on toggle button click from Navbar
    const toggleSidebar = () => {
        if (isWindowSmall) {
            // If window is small and sidebarWidth is 1, set it to 6, else set it to 1
            setSidebarWidth(sidebarWidth === 1 ? 6 : 1);
        } else {
            // If sidebarWidth is 3, set it to 1, else set it to 3
            setSidebarWidth(sidebarWidth === 3 ? 1 : 3);
        }

    };

    // Returns layout and content of App, using Container, Row and Col.
    // The Container is fluid, meaning it's width is 100% across all viewport.
    // Sidebar Col has lg breakpoint that is set to span 'sidebarWidth' columns,
    // while Main Col span the rest of the space.
    return (
        <Container className="vh-100" style={{ padding: '1em', overflowY: 'auto', minWidth: isWindowSmall ? '768px' : 'auto' }} fluid>
            <Row style={{ height: '96vh', minHeight: '600px' }}>
                <Col {...(isWindowSmall ? { xs: sidebarWidth } : { lg: sidebarWidth })}
                    style={{
                        height: '100%',
                        zIndex: '100'
                    }}
                >
                    <Sidebar
                        // Passing toggleSidebar, sidebarWidth, activeTab, 
                        // and setActiveTab as props.
                        toggleSidebar={toggleSidebar}
                        sidebarWidth={sidebarWidth}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        isWindowSmall={isWindowSmall}
                    />
                </Col>
                <Col style={{
                    height: '100%',
                    // Move Main so that Sidebar Col has overlay effect
                    marginLeft: isWindowSmall && sidebarWidth === 6 ? '-41.67%' : 0
                }}
                >
                    <Main activeTab={activeTab} />
                </Col>
            </Row >
        </Container>
    );
}