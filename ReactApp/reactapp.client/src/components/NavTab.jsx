import Nav from 'react-bootstrap/Nav';
import styles from '../styles/Navbar.module.css'

export default function NavTab(props) {
    const { id, title, isActive, onDelete, isSidebarCollapsed } = props;

    const handleDelete = () => {
        onDelete(id); // Call the onDelete function
    }

    return (
        <Nav.Item className={styles.navItem}>
            <Nav.Link eventKey={id} className={`${styles.navLink} ${isActive ? styles.activeTab : ''}`}>
                <span className={styles.tabTitle}>{title}</span>
                {!isSidebarCollapsed && isActive && <img src='deleteGreen.png' alt='Delete' className={styles.deleteIcon} onClick={handleDelete} />}
            </Nav.Link>
        </Nav.Item>
    );
}