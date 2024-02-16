import Col from 'react-bootstrap/Col';
import styles from '../styles/NavButton.module.css'
export default function NavButton(props) {
    const { text, src, alt } = props;

    return (
        <Col className={styles.colStyle}>
            <button className={`${styles.buttonStyle} ${styles.navBtnStyle}`}>{text}</button>
            <button className={`${styles.buttonStyle} ${styles.imgButton}`}> <img className={styles.imgStyle} src={src} alt={alt} /> </button>
        </Col>
    );

}