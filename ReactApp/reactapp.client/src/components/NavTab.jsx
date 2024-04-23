import { React, useState, useRef, useEffect } from 'react';
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
    const { id, title, isActive, onDelete, isSidebarCollapsed, onEdit, onCopy } = props;

    const optionsMenuRef = useRef(null);

    // State for handling edit mode, new title, and show options
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [showOptions, setShowOptions] = useState(false);

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

        // Allowing spce in tab names
        if (event.key === " " || event.key === "Spacebar") {
            setNewTitle(prevTitle => prevTitle + ' ');
        }
    };

    // Function to handle input blur events
    const handleInputBlur = () => {
        // Save the edited name when the input field loses focus
        handleSaveName();
    };

    // Function to handle copy tab operation
    const handleCopyTab = () => {
        onCopy(id);
    };

    // Function to close options menu when clicking outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [optionsMenuRef]);

    // Renter NavTab component
    return (
        // Nav item and link components for the tab
        <Nav.Item className={styles.navItem}>
            <Nav.Link data-testid='navLink' eventKey={id}
                className={`${styles.navLink} ${isActive ? styles.activeTab : ''}`}
                style={{ color: isActive ? 'black' : 'white', display: 'flex', backgroundColor: isActive ? 'white' : '' }}>
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
                {/* Render edit, delete and copy options if sidebar is expanded and tab is active */}
                {!isSidebarCollapsed && isActive && (
                    <img src='verticalDots.svg' alt='More options' className={styles.optionsIcon} onClick={() => setShowOptions(!showOptions)} />
                )}
            </Nav.Link>
            {/* Render options menu */}
            {showOptions && (
                <div ref={optionsMenuRef} className={styles.optionsMenu}>
                    {/* Option to edit tab title */}
                    <p className={styles.option} onClick={handleEditName}>Edit</p>
                    {/* Option to copy tab */}
                    <p className={styles.option} onClick={handleCopyTab}>Copy</p>
                    {/* Option to delete tab */}
                    <p className={styles.option} onClick={handleDelete}>Delete</p>
                </div>

            )} 
                
        </Nav.Item>
    );
}
                       