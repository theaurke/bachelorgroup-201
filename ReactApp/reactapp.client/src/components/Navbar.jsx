import { useState, useEffect } from 'react';
import NavButton from './NavButton';
import NavTab from './NavTab';
import ToggleButton from './ToggleButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import styles from '../styles/Navbar.module.css'
import WarningPopup from './WarningPopup';



export default function Navbar({toggleSidebar, isSidebarCollapsed, activeTab, setActiveTab}) {
    const [tabs, setTabs] = useState([]);
    const [tabId, setTabId] = useState(1); // Using state so the id count won't re-render
    const [showWarningPopup, setShowWarningPopup] = useState(false); // State to show/hide warning popup
    const [tabToDelete, setTabToDelete] = useState(null); // State to store tab id for deletion


    // Function to add new tab
    const addNewTab = () => {
        const newId = tabId; // Use current tabId
        const newTab = {
            id: newId,
            title: `Calculation ${newId}`
        };
        setTabs([...tabs, newTab]);
        setActiveTab(newId.toString());
        setTabId(tabId + 1); // Increment tabId for the next tab
    };

    const editTabName = (id, newName) => {
        setTabs(tabs.map(tab => tab.id === id ? { ...tab, title: newName } : tab));
    };

    const deleteTab = (id) => {
        // Show the warning popup before deletion
        setShowWarningPopup(true);
        setTabToDelete(id); // Store tab id to delete
    };

    const confirmDeleteTab = () => {
        const updatedTabs = tabs.filter(tab => tab.id !== tabToDelete);
        setTabs(updatedTabs);
        // If the deleted tab was active, set activeTab to empty string
        if (activeTab === tabToDelete.toString()) {
            setActiveTab('');
        }
        setShowWarningPopup(false); // Hide the warning popup after deletion
    };

    useEffect(() => {
        // Check if the active tab has been deleted
        if (!tabs.some(tab => tab.id === parseInt(activeTab))) {
            // If the active tab has been deleted, set activeTab to empty string
            setActiveTab('');
        }
    }, [tabs, activeTab, setActiveTab]);

    return (
        <Container fluid className={styles.container}>
            {/* Render warning popup if showWarningPopup is true */}
            {showWarningPopup && (
                <WarningPopup
                    warning="Are you sure you want to delete this tab?"
                    onConfirm={confirmDeleteTab} // Pass confirmDeleteTab function to handle deletion
                    onCancel={() => setShowWarningPopup(false)} // Hide warning popup if canceled
                />
            )}

            <Row style={{ flex: '1', padding: '0.1em' }}>
                <NavButton text='Start new calculation' src='plusWhite.png' alt='New calculation' isSidebarCollapsed={isSidebarCollapsed} onClick={addNewTab} />
            </Row>

            <Row style={{flex: '9', padding: '0.1em'}}>
                <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
                    <Col style={{padding: '0'} }>
                        <Nav variant='pills' className={styles.navContainer}>
                            {tabs.map((tab) => (
                                <NavTab key={tab.id} id={tab.id} title={tab.title} isActive={activeTab === tab.id.toString()} onDelete={deleteTab} isSidebarCollapsed={isSidebarCollapsed} onEdit={editTabName} />
                            ))}
                        </Nav>
                    </Col>
                </Tab.Container>
            </Row>

            <Row style={{flex: '1'}}>
                <ToggleButton toggleSidebar={toggleSidebar} />
            </Row>
        </Container>
    );
}

