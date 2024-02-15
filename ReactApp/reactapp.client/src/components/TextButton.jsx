import styles from '../styles/TextButton.module.css';

export default function TextButton({text}) {
    return <button className={styles.button}>{text}</button>;
    
}