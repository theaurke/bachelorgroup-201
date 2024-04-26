import styles from '../styles/Information.module.css';

/**
 * Step component for rendering a step with title, description, and image.
 * @param {Object} props - Props passed to the Step component.
 * @param {string} props.title - Title of the step.
 * @param {string} props.description - Description of the step.
 * @param {number} props.split - Index to split the description into parts.
 * @param {string} props.src - Source URL of the image for the step.
 * @returns {JSX.Element} The JSX representation of the step.
 */
export default function Step(props) {
    const { title, description, split, src } = props;
    const firstDesc = description.slice(0, split); // First half of description text
    const endDesc = description.slice(split); // Last half of description text

    // Returning img, title and description for a step
    return (
        <>
            <img data-testid='stepImg' src={src} alt={title} />
            <h6 data-testid='stepTitle' className={styles.stepTitle}>{title}</h6>
            <p data-testid='stepDesc' className={styles.stepP}>{firstDesc} <br /> {endDesc}</p>
        </>
    );
}