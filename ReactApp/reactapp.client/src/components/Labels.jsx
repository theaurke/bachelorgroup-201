import styles from '../styles/Diagram.module.css';

export default function Labels({ emissions }) {

    const backgroundColor = [
        'deeppink',
        'skyblue',
        'darkorange',
        'turquoise',
        'mediumpurple',
        'green',
        'gold',
        'violet',
        'red',
        'steelblue',
        'sienna',
        'gray',
        'lime',
        'khaki',
        'darkcyan',
    ];
  

    return (
        <>
            {emissions.map((item, index) => (
                <span key={index} style={{ display: 'flex', width: '8em', padding: '0 0.2em 0.2em 0.2em' }}>
                    <p className={styles.colorKey} style={{ backgroundColor: backgroundColor[index] }}>&nbsp;&nbsp;</p>
                    <p className={styles.resourceText}>&nbsp;&nbsp;{item.resource.toString()}</p>
                </span>
            ))}
        </> 
    );
}

