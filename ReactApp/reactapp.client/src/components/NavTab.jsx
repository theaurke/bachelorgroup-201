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
 * @param {Function} props.onCopy - Function to handle copying a tab.
 * @returns {JSX.Element} The JSX representation of the NavTab.
 */
export default function NavTab(props) {
    const { id, title, isActive, onDelete, isSidebarCollapsed, onEdit, onCopy } = props;

    // Refernce to option image and menu.
    const dotImageRef = useRef(null);
    const optionsMenuRef = useRef(null);

    // State for handling edit mode, new title, show options and option menu position.
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [showOptions, setShowOptions] = useState(false);
    const [optionsMenuPosition, setOptionsMenuPosition] = useState({});

    // Function to handle tab deletion
    const handleDelete = () => {
        onDelete(id);
        setShowOptions(false);
    };


    // Function to enter edit mode for tab title
    const handleEditName = () => {
        setEditMode(true);
        setShowOptions(false);
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

        // Allowing space in tab names
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
        setShowOptions(false);
    };


    // Function to handle clicking on the dots to toggle options menu
    const handleToggleOptions = () => {
        setShowOptions(prevShowOptions => !prevShowOptions);
    };


    // Function to find the position of the dot menu, to place the option menu
    useEffect(() => {
        if (dotImageRef.current) {
            const dotImageRect = dotImageRef.current.getBoundingClientRect();
            const position = {
                left: dotImageRect.left + dotImageRect.width -60, // Adjust placement
            };
            setOptionsMenuPosition(position);
        }
    }, [isActive, isSidebarCollapsed]); // Only re-run when tab is active or sidebar state changes.


    // Function to close options menu when clicking outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) {

                // Check if the click is outside of the options menu and not on the dots
                const dots = document.getElementsByClassName(styles.optionsIcon);
                let isDotClicked = false;
                for (let dot of dots) {
                    if (dot.contains(event.target)) {
                        isDotClicked = true;
                        break;
                    }
                }

                // Close the options menu only if the click is outside of it and not on the dots
                if (!isDotClicked) {
                    setShowOptions(false);
                }
            }

        }

        // Event listener for mouse click for the option menu
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [optionsMenuRef]); // Only re-run when optionsMenuRef changes.


    // Renter NavTab component
    return (

        // Nav item and link components for the tab
        <Nav.Item className={styles.navItem}>
            <Nav.Link data-testid='navLink' eventKey={id}
                className={`${styles.navLink} ${isActive ? styles.activeTab : ''}`}
                style={{
                    color: isActive ? 'black' : 'white', display: 'flex',
                    backgroundColor: isActive ? 'white' : '',
                    borderRadius: 0
                }}>

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
                    <img ref={dotImageRef} src='verticalDots.svg' alt='More options' className={styles.optionsIcon} onClick={handleToggleOptions} />
                )}
            </Nav.Link>

            {/* Render options menu */}
            {showOptions && (
                <div ref={optionsMenuRef} className={styles.optionsMenu} style={{ left: optionsMenuPosition.left }}>

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
                       