// Importing useState hook from React library
import { useState, useEffect } from 'react';

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
    // Using useState hook to manage state for window width, so alter layout based on width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const minWindowWidth = 992; // Large breakpoint in Bootstrap Grid

    // useState hook to manage state for sidebar width
    const [sidebarWidth, setSidebarWidth] = useState(3);
    // manage state for navbar height, for when the window is small and layout of navbar is different
    const [navbarHeight, setNavbarHeight] = useState(window.innerWidth < minWindowWidth ? '20vh' : '75vh');

    // useState to manage state for active calculation tab at the "top"(App), 
    // so it can be passed to Main after change from Sidebar
    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        // Function to handle resizing of the window
        const handleResize = () => {
            // Get the new current width of window
            const newWindowWidth = window.innerWidth;
            // Update the state
            setWindowWidth(newWindowWidth);

            // Update sidebarWidth and navbarHeight based on windowWidth
            if (newWindowWidth < minWindowWidth) {
                // If the window width is smaller than the minimum breakpoint,
                // set the sidebar width to 10 columns (takes up whole width) and the navbar height to 20vh
                setSidebarWidth(10);
                setNavbarHeight('20vh');
            } else {
                // If the window width is greater than or equal to the minimum breakpoint,
                // set the sidebar width to 3 columns and the navbar height to 75vh
                setSidebarWidth(3);
                setNavbarHeight('75vh');
            }
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Function to toggle sidebar width or navbar height on toggle button click from Navbar
    const toggleSidebar = () => {
        if (windowWidth < minWindowWidth) {
            setNavbarHeight(navbarHeight === '20vh' ? '40vh' : '20vh');
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
        <Container className="vh-100" style={{ padding: '1em' }} fluid>
            <Row style={{ height: '100%' }}>
                <Col lg={sidebarWidth} >
                    <Sidebar
                        // Passing toggleSidebar, sidebarWidth, activeTab, 
                        // and setActiveTab as props.
                        toggleSidebar={toggleSidebar}
                        sidebarWidth={sidebarWidth}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        windowWidth={windowWidth}
                        minWindowWidth={minWindowWidth}
                        navbarHeight={navbarHeight}
                        setNavbarHeight={setNavbarHeight}
                    />
                </Col>
                <Col>
                    <Main activeTab={activeTab} windowWidth={windowWidth} />
                </Col>
            </Row >
        </Container>
    );
}