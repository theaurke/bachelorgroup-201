
export default function Step(props) {
    const { title, description, src} = props;
    return (
        <>
            <img src={src}  alt='stepNr&Visual' />
            <h6 style={{ color: '#45654C' }}>{title}</h6>
            <p>{description}</p>
        </>
    );
}