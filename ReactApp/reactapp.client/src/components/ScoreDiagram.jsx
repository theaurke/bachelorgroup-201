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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function ScoreDiagram() {

    const data = {
        labels: ['Score'], // Label for the single bar
        datasets: [
            {
                data: [100], // Data representing the single bar at 100%
                backgroundColor: '#FF3784', // Background color of the bar
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
            indexAxis: 'y',
        },
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                type: 'linear',
                display: false,
                min: 0, // Specify minimum value for the y scale
                max: 100, // Specify maximum value for the y scale
            },
        },
    };

    

    return (
        <>
            <Bar data={data} options={options} />
        </>
    );
}