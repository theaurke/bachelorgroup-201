import React from 'react';
import Col from 'react-bootstrap/Col';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from '../styles/Navbar.module.css';

/**
 * ToggleButton component for the application.
 * Renders a button to toggle the sidebar with an overlay tooltip.
 * @param {Object} props - Props passed to the ToggleButton component.
 * @param {Function} props.toggleSidebar - Function to toggle the sidebar.
 * @returns {JSX.Element} The JSX representation of the ToggleButton.
 */
export default function ToggleButton({ toggleSidebar }) {

    // Function to render the tooltip
    const renderTooltip = (props) => (
        <Tooltip id='toggle-tooltip' {...props}>
            Toggle Sidebar
        </Tooltip>
    )

    // Render the ToggleButton component
    return (
        <Col className={styles.toggleContainer} style={{ padding: '0' }}>

            {/* Overlay trigger for the tooltip */}
            <OverlayTrigger
                placement='right'
                delay={{ show: 50, hide: 100 }}
                overlay={renderTooltip}
            >

                {/* Button to toggle the sidebar */}
                <button data-testid='toggleButton' className={styles.toggleBtn} onClick={toggleSidebar} >
                    <img src='toggleWhite.png' alt='toggleSidebar' className={styles.toggleImg} style={{ padding: '0' }} />
                </button>
            </OverlayTrigger>

        </Col>
    );
}