import React from 'react';
import Col from 'react-bootstrap/Col';
import styles from '../styles/NavButton.module.css'

/**
 * NavButton component for the application.
 * Renders a navigation button with optional text and/or image.
 * The appearance of the button changes based on the sidebar collapse state.
 * @param {Object} props - Props passed to the NavButton component.
 * @param {string} props.text - Text displayed on the button.
 * @param {string} props.src - URL of the image displayed on the button.
 * @param {string} props.alt - Alternate text for the image.
 * @param {boolean} props.isSidebarCollapsed - Indicates whether the sidebar is collapsed.
 * @param {Function} props.onClick - Function to handle button click.
 * @returns {JSX.Element} The JSX representation of the NavButton.
 */
export default function NavButton(props) {
    // Destructuring props
    const { text, src, alt, isSidebarCollapsed, onClick } = props;

    // Return the NavButton component
    return (
        <button data-testid='navBtn' onClick={onClick} className={styles.buttonStyle} style={{ paddingLeft: 0, paddingRight: 0 }}>
            {!isSidebarCollapsed ? (
                <>
                <img data-testid='navBtnImg' className={styles.imgStyle} src={src} alt={alt} />
                {text}
                </>
            ) : (
                <img data-testid='navBtnImg' className={styles.imgStyle} src={src} alt={alt} />
            )}
        </button>
    );
}