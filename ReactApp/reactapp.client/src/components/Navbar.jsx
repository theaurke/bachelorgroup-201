import { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import styles from '../styles/Navbar.module.css';
import NavButton from './NavButton';
import NavTab from './NavTab';
import ToggleButton from './ToggleButton';
import WarningPopup from './WarningPopup';

/**
 * Navbar component for the application.
 * Renders a navigation bar with tabs, add new tab button, and toggle button.
 * Manages state for tabs, warning popup, and tab deletion.
 * @param {Object} props - Props passed to the Navbar component.
 * @param {Function} props.toggleSidebar - Function to toggle the sidebar.
 * @param {boolean} props.isSidebarCollapsed - Indicates whether the sidebar is collapsed.
 * @param {string} props.activeTab - Active tab in the navigation bar.
 * @param {Function} props.setActiveTab - Function to set the active tab.
 * @returns {JSX.Element} The JSX representation of the navbar.
 */
export default function Navbar(props) {
    const { toggleSidebar, isSidebarCollapsed, activeTab, setActiveTab, isNavbarCollapsed, setNavbarHeight, isWindowSmall } = props;

    // State management for tabs, tabId, warning popup, and tab deletion
    const [tabs, setTabs] = useState([]);
    const [tabId, setTabId] = useState(1); // Using state so the id count won't re-render
    const [showWarningPopup, setShowWarningPopup] = useState(false); // State to show/hide warning popup
    const [tabToDelete, setTabToDelete] = useState(null); // State to store tab id for deletion


    // Function to add new tab to the Navbar
    const addNewTab = () => {
        if (isNavbarCollapsed) {
            setNavbarHeight('40vh');
        }
        // Set new unique tab id
        const newId = tabId;
        // Create a new tab object with the id and default title
        const newTab = {
            id: newId,
            title: `Calculation ${newId}`
        };
        // Append the new tab to the list of existing tabs
        setTabs([...tabs, newTab]);
        // Set the newly added tab as the active tab using function from props
        setActiveTab(newId.toString()); // Convert it to string
        setTabId(tabId + 1); // Increment tabId for the next tab

    };

    // Function to edit the title of a tab
    const editTabName = (id, newName) => {
        // Map through the tabs array and update the title of the tab with the
        // specified id. If the tab id matches the provided id, 
        // update its title with the new name; otherwise, leave it unchanged.
        setTabs(tabs.map(tab => tab.id === id ? { ...tab, title: newName } : tab));
    };

    
    // Function to initiate tab deletion and show warning popup
    const deleteTab = (id) => {
        // Set showWarningPopup state to true to display the warning popup
        setShowWarningPopup(true);
        setTabToDelete(id); // Store tab id to be deleted for confirmation
    };

    // Function to confirm tab deletion
    const confirmDeleteTab = () => {
        // Filter out the tab to be deleted from the tabs array
        const updatedTabs = tabs.filter(tab => tab.id !== tabToDelete);
        // Update the tabs state with the filtered array
        setTabs(updatedTabs);
        // Hide the warning popup after deletion
        setShowWarningPopup(false);
    };

    useEffect(() => {
        // Check if the active tab has been deleted
        if (!tabs.some(tab => tab.id === parseInt(activeTab))) {
            // If the active tab has been deleted, set activeTab to empty string
            setActiveTab('');
        }
    }, [tabs, activeTab, setActiveTab]);

    return (
        // Container component to hold the navbar content
        <Container fluid className={styles.container}>
            {/* Display warning popup if showWarningPopup is true */}
            {showWarningPopup && (
                <WarningPopup
                    warning="Are you sure you want to delete this tab?"
                    // Handler function for confirming tab deletion
                    onConfirm={confirmDeleteTab}
                    // Handler function for canceling tab deletion
                    onCancel={() => setShowWarningPopup(false)}
                />
            )}

            {/* Row for the 'Start new calculation' button */}
            <Row style={{ padding: '0.1em' }}>
                <NavButton  
                    // text, src, alt, and isSidebarCollapsed as props
                    text='Start new calculation'
                    src='plusWhite.png'
                    alt='New calculation'
                    isSidebarCollapsed={isSidebarCollapsed}
                    onClick={addNewTab} // Handler function onclick
                />
            </Row>

            {/* Row for the tabs, rendered conditionally based on isSmallWindow */}
            {!isNavbarCollapsed && (
                <Row style={{ flex: '1', padding: '0.1em' }}>
                    {/* Using Tab and Nav from react bootstrap to make pill tabs */}
                    <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                        <Col style={{ padding: '0' }}>
                            <Nav variant='pills' className={styles.navContainer}>
                                {/* Map through the tabs and render each tab */}
                                {tabs.map((tab) => (
                                    <NavTab
                                        key={tab.id}
                                        id={tab.id}
                                        title={tab.title}
                                        isActive={activeTab === tab.id.toString()}
                                        onDelete={deleteTab}
                                        isSidebarCollapsed={isSidebarCollapsed}
                                        onEdit={editTabName}
                                    />
                                ))}
                            </Nav>
                        </Col>
                    </Tab.Container>
                </Row>
            )}

            {/* Row for the toggle button */}
            <Row style={{ marginTop: 'auto'}}>
                <ToggleButton toggleSidebar={toggleSidebar} isWindowSmall={isWindowSmall} />
            </Row>
        </Container>
    );
}

