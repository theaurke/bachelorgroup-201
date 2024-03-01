import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import styles from '../styles/Navbar.module.css';

export default function NavTab(props) {
    const { id, title, isActive, onDelete, isSidebarCollapsed, onEdit } = props;
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const handleDelete = () => {
        onDelete(id); // Call the onDelete function with the tab id
    };

    const handleEditName = () => {
        setEditMode(true);
    };

    const handleSaveName = () => {
        // Save the edited name
        onEdit(id, newTitle);
        setEditMode(false);
    };

    const handleInputChange = (event) => {
        setNewTitle(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSaveName();
        }
    };

    const handleInputBlur = () => {
        // Save the edited name when the input field loses focus
        handleSaveName();
    };


    return (
        <Nav.Item className={styles.navItem}>
            <Nav.Link eventKey={id} className={`${styles.navLink} ${isActive ? styles.activeTab : ''}`}>
                {editMode ? (
                    <input
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
                ) }
                {!isSidebarCollapsed && isActive && (
                    <>
                        <img src='editPencil.svg' alt='More options' className={styles.optionsIcon} onClick={handleEditName} />
                        <img src='deleteBlack.png' alt='Delete' className={styles.deleteIcon} onClick={handleDelete} />
                    </>
                )} 
                
                    
            </Nav.Link>
        </Nav.Item>
    );
}


/*
<>
    <img src='deleteGreen.png' alt='Delete' className={`${styles.deleteIcon} ${styles.optionsIcon}`} onClick={handleDelete} />
    <img src='verticalDots.svg' alt='More options' className={styles.optionsIcon} onClick={handleEditName} />              
    
</>



<div className={styles.optionsContainer}>
    <img src='deleteGreen.png' alt='Delete' className={`${styles.deleteIcon} ${styles.optionsIcon}`} onClick={handleDelete} />
    <img src='verticalDots.svg' alt='More options' className={styles.optionsIcon} onClick={toggleOptions} />
    {showOptions && (
        <ul className={styles.optionsList}>
            <li onClick={handleEditName}>Edit Name</li>             
        </ul >
    )}
</div >
*/
                       