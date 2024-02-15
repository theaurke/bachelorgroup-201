
export default function Step(props) {
    const { title, description, split, src } = props;
    const firstDesc = description.slice(0, split);
    const endDesc = description.slice(split);
    return (
        <>
            <img src={src} alt={title} />
            <h6 style={{ color: '#45654C' }}>{title}</h6>
            <p>{firstDesc} <br /> {endDesc}</p>
        </>
    );
}