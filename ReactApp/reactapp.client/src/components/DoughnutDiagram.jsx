import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


export default function DoughnutDiagram({ emissions, totalEmission }) {

    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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
                data: emissions.map(item => item.emission),
                backgroundColor: backgroundColor,
            },
        ],
    };


    const options = {
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                enabled: false,
            },
            datalabels: {
                display: false,
                color: 'white',
                textAlign: 'center',
                font: {
                    size: '12',
                    weight: 'bold'
                },
                formatter: (value) => `${value}gCO2eq`
            },
            textCenter: {
                totalEmission: totalEmission,
            },
        },
        cutout: 80,
        layout: {
            padding: {
                top: 10,
                bottom: 40,
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    };


    const textCenter = {
        id: 'textCenter',
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx } = chart;

            ctx.save();
            ctx.font = 'bolder 1.2em sans-serif';    //20px
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${pluginOptions.totalEmission}`,
                chart.getDatasetMeta(0).data[0].x,
                chart.getDatasetMeta(0).data[0].y - 8);
            ctx.fillText('total gCO2eq',
                chart.getDatasetMeta(0).data[0].x,
                chart.getDatasetMeta(0).data[0].y + 14);

        },
    };

    const doughnutLabelsLine = {
        id: 'doughnutLablesLine',
        afterDraw(chart, args, options) {
            const { ctx, chartArea: { top, bottom, left, right, width, height }
            } = chart;

            chart.data.datasets.forEach((dataset, i) => {
                chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
                    const { x, y } = datapoint.tooltipPosition();

                    const halfWidth = width / 2;

                    // Define the length of the line
                    const lineLength = 30;

                    // Calculate the angle from the center of the chart to the tooltip point
                    const angle = Math.atan2(y - height, x - halfWidth);

                    // Calculate the endpoint coordinates based on the angle and line length
                    const xLine = x + Math.cos(angle) * lineLength;
                    const yLine = y + Math.sin(angle) * lineLength;

                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(xLine, yLine);
                    ctx.strokeStyle = dataset.backgroundColor[index];
                    ctx.stroke();

                    const textXpos = x >= halfWidth ? 'left' : 'right';
                    const text = `${chart.data.datasets[0].data[index]}gCO2eq`;
                    const textWidth = ctx.measureText(text.trim()).width;

                    // Calculate the position for the rectangle based on the text position
                    let rectX, rectY;
                    if (textXpos === 'left') {
                        rectX = xLine; // Adjust the padding of the rectangle
                    } else {
                        rectX = xLine - textWidth; // Adjust the padding of the rectangle
                    }
                    rectY = yLine - 10; // Adjust the y-position of the rectangle
                    
                    // Draw the filled rectangle as background for the text
                    ctx.fillStyle = dataset.backgroundColor[index];
                    ctx.fillRect(rectX - 5, rectY, textWidth + 10, 15); 

                    ctx.font = 'bolder 0.7em sans-serif'; //11px
                    ctx.textAlign = textXpos;
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = 'rgb(255, 255, 255)'; //dataset.backgroundColor[index];
                    //ctx.fillText(text, xLine + extraSpace, yLine);
                    ctx.fillText(text, xLine, rectY + 8);
                })

            })
        }
    };

    const legendMargin = {
        id: 'legendMargin',
        beforeInit(chart, legend, options) {
            const fitValue = chart.legend.fit;

            chart.legend.fit = function fit() {
                fitValue.bind(chart.legend)();
                return this.height += 20;
            }
        }
    };

    return (
        <>
            <Doughnut data={data} options={options} plugins={[textCenter, doughnutLabelsLine, legendMargin]} />
        </>
    );
}