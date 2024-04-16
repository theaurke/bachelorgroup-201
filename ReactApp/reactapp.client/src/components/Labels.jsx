export default function DoughnutLegends({ emissions }) {

    const backgroundColor = [
        '#FF3784',
        '#36A2EB',
        '#4BC0C0',
        '#F77825',
        '#9966FF',
        '#FFD700',
        '#8A2BE2',
        '#20B2AA',
        '#FF6347',
        '#1E90FF',
        '#FFA07A',
        '#00CED1',
        '#FF4500',
        '#4682B4',
        '#FF69B4',
        '#7B68EE',
        '#00FF7F',
        '#8B008B',
        '#2E8B57',
        '#A0522D',
        '#87CEEB',
        '#6A5ACD',
        '#00FA9A',
        '#BDB76B',
        '#800000',
        '#008080',
        '#FF1493',
        '#DAA520',
        '#808080',
        '#CD5C5C',
    ];
  

    return (
        <>
            {emissions.map((item, index) => (
                <span key={index} style={{ display: 'flex', minWidth: '25%', maxWidth: "25%" }}>
                    <p style={{minWidth: '15%', maxWidth: '15%', height: '40%', backgroundColor: backgroundColor[index] }}>&nbsp;&nbsp;</p>
                    <p style={{margin: '0', fontSize: '0.8em' }}>&nbsp;&nbsp;{item.resource.toString()}</p>
                </span>
            ))}
        </> 
    );
}

