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
import styles from '../styles/Diagram.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


/**
 * Renders a bar diagram to display either energy consumption, region carbonintensity or embodied emissions.
 * @param {string} info - String indicating what the diagram should display.
 * @param {list} emissions - List containing all info about the emissions of the resources.
 * @param {list} backgroundColor - List of colors for the columns in the diagram.
 * @returns {JSX.Element} The JSX representation of the diagram.
 */
export default function BarDiagram({ info, emissions, backgroundColor }) {
    const variable = info === "Region" ? "carbonIntensity" : (info === "Energy" ? "energy" : "embodied"); // Variable used to extract the right info from emissions list.
    const categoryLabel = info === "Region" ? "regionName" : "instance"; // Variable used to get the right data for the labels from the emissions list.

    // Data containing the labels, values and colors for the diagram.
    const data = {
        labels: emissions.map(item => item.resource.toString()),
        datasets: [
            {
                data: emissions.map(item => item[variable]),
                backgroundColor: backgroundColor,
            },
        ],
    };

    // Options to customize the look of the diagram.
    const options = {
        plugins: {
            title: {
                display: true,
                // Setting the text based on what data to display.
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

                // Shortening the United Arab Emirates for a cleaner looking diagram.
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

                // Adding a 15% wiggleroom ontop of the diagram.
                max: Math.max(...emissions.map(item => item[variable])) + (Math.max(...emissions.map(item => item[variable])) * 0.15),
                title: {
                    display: true,
                    text: `${info === "Energy" ? 'kWh' : (info === "Region" ? 'gCO2eq' : 'mgCO2eq') }`,
                },
            },
        },
    };


    // Custom plugin to make labels for the diagram.
    const chartLabel = {
        id: 'chartLabel',
        afterDraw(chart) {
            const { ctx } = chart;

            ctx.save();
            chart.data.datasets.forEach((dataset, i) => {
                chart.getDatasetMeta(i).data.forEach((datapoint, index) => {

                    // Line ontop of the diagrams in the same color.
                    ctx.beginPath();
                    ctx.strokeStyle = dataset.backgroundColor[index];
                    ctx.lineWidth = 3;
                    const halfWidth = datapoint.width / 2;
                    ctx.moveTo(datapoint.x - halfWidth, datapoint.y - 6);
                    ctx.lineTo(datapoint.x + halfWidth, datapoint.y - 6);
                    ctx.stroke();

                    // Text containing the value of that coulmn
                    ctx.font = 'bold 0.6em sans-serif';
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'center';
                    ctx.fillText(dataset.data[index], datapoint.x, datapoint.y - 10);


                })
            })
        }
    }
   

    return (
        <div data-testId={`barDiagram${info}`} className={styles.barDiv} >
            <Bar data={data} options={options} plugins={[chartLabel]} />
        </div>
    );
}