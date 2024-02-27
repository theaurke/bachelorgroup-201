import Col from 'react-bootstrap/Col';
import styles from '../styles/NavButton.module.css'
export default function NavButton(props) {
    const { text, src, alt, isSidebarCollapsed} = props;

    return (
        <Col className={styles.colStyle}>
            {isSidebarCollapsed ? (
                <button className={`${styles.imgContainer} ${styles.hoverStyle} ${styles.buttonStyle}`}>
                    <img className={styles.imgStyle} src={src} alt={alt} />
                </button>
            ): (
                <>
                    <button className={`${styles.buttonStyle} ${styles.hoverStyle}`}>
                        {text}
                    </button>
                    <button className={`${styles.imgContainer} ${styles.hoverStyle} ${styles.buttonStyle}`}>
                        <img className={styles.imgStyle} src={src} alt={alt} />
                    </button>
                </>
            )}
            
        </Col>
    );

}