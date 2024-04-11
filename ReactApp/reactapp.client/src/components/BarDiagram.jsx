import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import * as Chart from 'chart.js';
import styles from '../styles/Result.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function BarDiagram({ info, emissions }) {

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

    const data = {
        labels: emissions.map(item => item.resource.toString()),
        datasets: [
            {
                data: emissions.map(item => item[info.toLowerCase()]),
                backgroundColor: backgroundColor,
            },
        ],
    };


    const options = {
        plugins: {
            title: {
                display: true,
                text: `${info === "Energy" ? 'Energy Consumption per Hour' : (info === "Embodied" ? 'Hardware Emission per hour' : 'Region Carbon Emission')}`,
            },
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
            datalabels: {
                color: 'white',
                font: {
                    size: '12',
                    weight: 'bold'
                }
            }
        },
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                type: 'category',
                labels: emissions.map(item => item.resource.toString()),
            },
            y: {
                type: 'linear',
                min: 0,
                max: Math.max(...emissions.map(item => item[info.toLowerCase()])),
                title: {
                    display: true,
                    text: `${info === "Energy" ? 'kWh' : 'gCO2eq' }`,
                },
            },
        },
    };
   

    return (
        <div className={styles.barDiv} >
            <Bar data={data} options={options} />
        </div>
    );
}