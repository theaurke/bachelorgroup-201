import { React, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import styles from '../styles/Navbar.module.css';

/**
 * NavTab component for the application.
 * Renders a navigation tab with options for editing and deleting.
 * @param {Object} props - Props passed to the NavTab component.
 * @param {number} props.id - Id of the tab.
 * @param {string} props.title - Title of the tab.
 * @param {boolean} props.isActive - Indicates whether the tab is active.
 * @param {Function} props.onDelete - Function to handle tab deletion.
 * @param {boolean} props.isSidebarCollapsed - Indicates whether the sidebar is collapsed.
 * @param {Function} props.onEdit - Function to handle tab title editing.
 * @returns {JSX.Element} The JSX representation of the NavTab.
 */
export default function NavTab(props) {
    const { id, title, isActive, onDelete, isSidebarCollapsed, onEdit } = props;

    // State for handling edit mode and new title
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    // Function to handle tab deletion
    const handleDelete = () => {
        onDelete(id);
    };

    // Function to enter edit mode for tab title
    const handleEditName = () => {
        setEditMode(true);
    };

    // Function to save edited tab title
    const handleSaveName = () => {
        onEdit(id, newTitle);
        setEditMode(false);
    };

    // Function to handle input change for editing tab title
    const handleInputChange = (event) => {
        setNewTitle(event.target.value);
    };

    // Function to handle key press events
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSaveName();
        }
    };

    // Function to handle input blur events
    const handleInputBlur = () => {
        // Save the edited name when the input field loses focus
        handleSaveName();
    };

    // Renter NavTab component
    return (
        // Nav item and link components for the tab
        <Nav.Item className={styles.navItem}>
            <Nav.Link eventKey={id} className={`${styles.navLink} ${isActive ? styles.activeTab : ''}`} style={{ color: isActive ? 'black' : 'white', display: 'flex', backgroundColor: isActive ? 'white' : ''}}>
                {/* Render input field if in edit mode, otherwise render tab title */}
                {editMode ? (
                    <input
                        data-testid='inputField'
                        className={styles.tabTitle}
                        type='text'
                        value={newTitle}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        onBlur={handleInputBlur}
                        autoFocus
                    />
                ) : (
                    <span className={styles.tabTitle}>{title}</span>
                )}
                {/* Render edit and delete icons if sidebar is expanded and tab is active */}
                {!isSidebarCollapsed && isActive && (
                    <div>
                        {/* Edit icon for editing tab title */}
                        <img data-testid='editIcon' src='editPencil.svg' alt='More options' className={styles.optionsIcon} onClick={handleEditName} />
                        {/* Delete icon for deleting tab */}
                        <img src='deleteBlack.png' alt='Delete' className={styles.deleteIcon} onClick={handleDelete} />
                    </div>
                )} 
                
                    
            </Nav.Link>
        </Nav.Item>
    );
}
                       