import { React, useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import styles from '../styles/Navbar.module.css';
import NavButton from './NavButton';
import NavTab from './NavTab';
import ToggleButton from './ToggleButton';
import WarningPopup from './WarningPopup';
import pdfstyles from '../styles/Result.module.css';
import NewWindow from 'react-new-window';
import CalcResult from './CalcResult';

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
    const { toggleSidebar, isSidebarCollapsed, activeTab, setActiveTab, isWindowSmall, tabList, setTabList, setHome } = props;

    // State management for tabs, tabId, warning popup, and tab deletion
    const [tabs, setTabs] = useState([]);
    const [tabId, setTabId] = useState(1); // Using state so the id count won't re-render
    const [showWarningPopup, setShowWarningPopup] = useState(false); // State to show/hide warning popup
    const [tabToDelete, setTabToDelete] = useState(null); // State to store tab id for deletion


    // Function to add new tab to the Navbar
    const addNewTab = () => {
        // Set new unique tab id
        const newId = tabId;
        // Create a new tab object with the id and default title
        const newTab = {
            id: newId.toString(), 
            title: `Calculation ${newId}`
        };
        // Append the new tab to the list of existing tabs
        setTabs([...tabs, newTab]);
        setTabId(tabId + 1); // Increment tabId for the next tab

        // Set the newly added tab as the active tab using function from props
        setActiveTab(newTab); 
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

        // Deleting the same tab from the tabList
        const updatedTabList = tabList.filter(list => list.id !== tabToDelete);
        setTabList(updatedTabList);
    };


    // Runs everytime tabs updates
    useEffect(() => {
        // Check if the active tab has been deleted
        if (!tabs.some(tab => tab.id === activeTab.id)) {
            // If the active tab has been deleted, set activeTab to empty object
            setActiveTab({});
        }

        // Finding the tab in the tabs list that is the activeTab, and checking if the title is changed
        const editedTab = tabs.find(tab => tab.id === activeTab.id && tab.title !== activeTab.title);

        // Checking if a tab was found
        if (editedTab) { 
            setActiveTab(editedTab); // Updating the activeTab with the new tab title
        }

    }, [tabs]); 


    // Function to copy tab
    const copyTab = (id) => {
        const tabToCopy = tabList.find(tab => tab.id === id);
        if (tabToCopy) {
            const newId = tabId;
            const newTab = {
                id: newId.toString(),
                title: `Calculation ${newId}`,
                list: [...tabToCopy.list], // Copy the list data
                layout: tabToCopy.layout, // Copy the layout
                calcData: [...tabToCopy.calcData] // Copy the calcData
            };
            setTabs([...tabs, {id: newId.toString(), title: `Calcualtion ${newId}`}]); // Add the new tab to the tabs state
            setTabId(tabId + 1); // Increment tabId for the next tab
            setTabList([...tabList, newTab]); // Add the new tab and its data to tabList
        }
    };


    const [isOpen, setIsOpen] = useState(false);
    const [PDFTabs, setPDFTabs] = useState([]);
    // Converting multiple tabs to PDF

    const handleConvertToPDF = () => {
        const resultTabs = tabList.filter(tab => tab.layout === "result");

        
        if (tabList.length !== 0 && resultTabs.length !== 0) {
            setPDFTabs(resultTabs);
            setIsOpen(true);
        }
    };

    return (
        // Container component to hold the navbar content
        <Container fluid className={styles.container} >
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
            <Row className={styles.navBtnRow }>
                {((!isWindowSmall) || (isWindowSmall && !isSidebarCollapsed)) && (
                    <NavButton
                        // text, src, alt, and isSidebarCollapsed as props
                        text='Start new calculation'
                        src='plusWhite.png'
                        alt='New calculation'
                        isSidebarCollapsed={isSidebarCollapsed}
                        onClick={addNewTab} // Handler function onclick
                    />
                )}
            </Row>

            {/* Row for the tabs */}
            <Row className={styles.tabsRow} >
                {/* Using Tab and Nav from react bootstrap to make pill tabs */}
                {((!isWindowSmall) || (isWindowSmall && !isSidebarCollapsed)) && (
                    <Tab.Container
                        activeKey={activeTab.id || ''}
                        onSelect={(key) => {
                            setHome(false);
                            const selectedTab = tabs.find(tab => tab.id === key);
                            if (selectedTab) {
                                setActiveTab(selectedTab);
                            }
                        }
                    }>
                        <Col style={{ padding: '0' }}>
                            <Nav data-testid='navTabs' variant='pills' className={styles.navContainer}>
                                {/* Map through the tabs and render each tab */}
                                {tabs.map((tab) => {
                                    return (
                                        <NavTab
                                            key={tab.id}
                                            id={tab.id}
                                            title={tab.title}
                                            isActive={activeTab.id === tab.id}
                                            onDelete={deleteTab}
                                            isSidebarCollapsed={isSidebarCollapsed}
                                            onEdit={editTabName}
                                            onCopy={copyTab}
                                        />
                                    );
                                })}
                            </Nav>
                        </Col>
                    </Tab.Container>
                )}
            </Row>
            

            {/* Row for the toggle button */}
            <Row style={{ padding: '0.1em' }}>
                {((!isWindowSmall) || (isWindowSmall && !isSidebarCollapsed)) && (
                    <div className={pdfstyles.buttonDiv}>
                        <button type='button' className={styles.pdfBtn} onClick={handleConvertToPDF}>Convert All Tabs to PDF</button>
                        {isOpen && (
                            <NewWindow title={'Calculations'} onOpen={(w) => setTimeout(() => {
                                w.print();
                                w.close();
                                setIsOpen(false);
                            }, 1000)}>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                                {PDFTabs.map((tab, index) => (
                                    <div key={tab.title} style={{ pageBreakBefore: index > 0 ? 'always' : 'aviod' }}>
                                        <CalcResult calcData={tab.calcData} tabname={tab.title} />
                                    </div>
                                   
                                ))}
                                </div>
                                <style>{pdfstyles.print}</style>
                            </NewWindow>
                        )}
                    </div>
                )}
                <ToggleButton toggleSidebar={toggleSidebar} />
            </Row>
        </Container>
    );
}

