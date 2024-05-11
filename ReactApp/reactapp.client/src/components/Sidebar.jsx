import React from 'react';
import Navbar from './Navbar';
import { Container, Row } from 'react-bootstrap';
import styles from '../styles/Sidebar.module.css';

/**
 * Sidebar component for the application.
 * Renders a sidebar with a logo and a navigation bar.
 * @param {Object} props - Props passed to the Sidebar component.
 * @param {Function} props.toggleSidebar - Function to toggle the sidebar.
 * @param {number} props.sidebarWidth - Width of the sidebar.
 * @param {string} props.activeTab - Active tab in the navigation bar.
 * @param {Function} props.setActiveTab - Function to set the active tab.
 * @param {boolean} props.isWindowSmall - Indicates whether the window is small or not.
 * @param {list} props.tabList - List containing the content of the tabs.
 * @param {Function} props.setTabList - Function to update the tabList.
 * @param {Function} props.setHome - Function to update if the information page should be shown or not.
 * @param {Function} props.setShowInput - Function to update if the input form should be visible or not.
 * @param {Function} props.setShowList - Function to update if the list of resources should be visible or not.
 * @returns {JSX.Element} The JSX representation of the sidebar.
 */
export default function Sidebar(props) {
    const { toggleSidebar, sidebarWidth, activeTab, setActiveTab, isWindowSmall, tabList, setTabList, setHome, setShowInput, setShowList } = props;

    // Check if sidebar is collapsed
    const isSidebarCollapsed = sidebarWidth === 1;

    // Return sidebar component with flex column Container, placing the Rows vertically
    return (
        <Container className={styles.container} fluid>

            {/* Logo row */ }
            <Row className={styles.logoRow}>
                <img alt='logo' src={!isSidebarCollapsed ? 'logo.png' : 'logoSmall.png'} className={styles.logo} onClick={() => { setHome(true); setActiveTab({}); }} />
            </Row>

            {/* Navigation bar row */}
            <Row className={styles.navbarRow} style={{ height: isWindowSmall ? '81vh' : '76vh' }}>

                {/* Navbar component */}
                <Navbar
                    toggleSidebar={toggleSidebar}
                    isSidebarCollapsed={isSidebarCollapsed}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isWindowSmall={isWindowSmall}
                    data-testid='navbarComponent'
                    tabList={tabList}
                    setTabList={setTabList}
                    setHome={setHome}
                    setShowInput={setShowInput}
                    setShowList={setShowList}
                />
            </Row>
        </Container>
    );

}