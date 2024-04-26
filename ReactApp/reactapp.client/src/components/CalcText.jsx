import styles from '../styles/Result.module.css';

/**
 * CalcText component for rendering a describing text and image .
 * @returns {JSX.Element} The JSX representation of the text and images.
 */
export default function CalcText() {
    return (
        <div className={styles.div}>
            <img src='/accounting.png' alt='calculating' />
            <h6>Calculate the estimated <br />
                emissions on your <br />
                Azure resources</h6>
            <img src='/arrow.png' alt='arrow' />
        </div>
    );
}