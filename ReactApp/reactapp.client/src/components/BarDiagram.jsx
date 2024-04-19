import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import styles from '../styles/Diagram.module.css';

ChartJS.register(
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function BarDiagram({ info, emissions }) {
    const variable = info === "Region" ? "carbonIntensity" : (info === "Energy" ? "energy" : "embodied");
    const categoryLabel = info === "Region" ? "regionName" : "instance";

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

    const data = {
        labels: emissions.map(item => item.resource.toString()),
        datasets: [
            {
                data: emissions.map(item => item[variable]),
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
                display: false,
                color: 'white',
                font: {
                    size: '10em',
                    weight: '450',
                },
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                type: 'category',
                labels: emissions.map(item => item.resourceShort.toString() + " - " + (item[categoryLabel] === "United Arab Emirates" ? 'UAE' : item[categoryLabel])),
                ticks: {
                    font: {
                        size: '12em',
                    }
                }
            },
            y: {
                type: 'linear',
                min: 0,
                max: Math.max(...emissions.map(item => item[variable])) + (Math.max(...emissions.map(item => item[variable])) * 0.15),
                title: {
                    display: true,
                    text: `${info === "Energy" ? 'kWh' : (info === "Region" ? 'gCO2eq' : 'mgCO2eq') }`,
                },
            },
        },
    };


    const chartLabel = {
        id: 'chartLabel',
        afterDraw(chart) {
            const { ctx } = chart;

            ctx.save();
            chart.data.datasets.forEach((dataset, i) => {
                chart.getDatasetMeta(i).data.forEach((datapoint, index) => {

                    // Line
                    ctx.beginPath();
                    ctx.strokeStyle = dataset.backgroundColor[index];
                    ctx.lineWidth = 3;
                    const halfWidth = datapoint.width / 2;
                    ctx.moveTo(datapoint.x - halfWidth, datapoint.y - 6);
                    ctx.lineTo(datapoint.x + halfWidth, datapoint.y - 6);
                    ctx.stroke();

                    // Text
                    ctx.font = 'bold 0.6em sans-serif';
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'center';
                    ctx.fillText(dataset.data[index], datapoint.x, datapoint.y - 10);


                })
            })
        }
    }
   

    return (
        <div className={styles.barDiv} >
            <Bar data={data} options={options} plugins={[chartLabel]} />
        </div>
    );
}