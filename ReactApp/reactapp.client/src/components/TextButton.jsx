import styles from '../styles/TextButton.module.css';

export default function TextButton({ text, type, onClick}) {
    return <button type={type} className={styles.button} onClick={onClick }>{text}</button>;
    
}