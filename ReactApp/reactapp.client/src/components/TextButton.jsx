import React from 'react';
import styles from '../styles/App.module.css';

/**
 * TextButton component for rendering a button with text.
 * Renders a button with provided text and styling.
 * @param {Object} props - Props passed to the TextButton component.
 * @param {string} props.text - Text to be displayed on the button.
 * @param {string} props.type - Type of the button (e.g., "button", "submit", "reset").
 * @param {Function} props.onClick - Function to be called when the button is clicked.
 * @returns {JSX.Element} The JSX representation of the text button.
 */
export default function TextButton({ text, type, onClick}) {
    return <button type={type} className={styles.button} onClick={onClick }>{text}</button>;
    
}