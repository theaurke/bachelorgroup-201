import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from '../styles/Diagram.module.css';


export default function DoughnutDiagram({ emissions, totalEmission }) {

    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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
                data: emissions.map(item => item.emissionTime),
                backgroundColor: backgroundColor,
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
            datalabels: {
                display: false,
            },
            textCenter: {
                totalEmission: totalEmission,
            },
        },
        
        layout: {
            padding: {
                top: 20,
                bottom: 40,
                left: 0,
                right: 0,
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
            ctx.font = 'bolder 1em sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${pluginOptions.totalEmission >= 1000 ? (pluginOptions.totalEmission / 1000).toFixed(1) : pluginOptions.totalEmission}`,
                chart.getDatasetMeta(0).data[0].x,
                chart.getDatasetMeta(0).data[0].y - 8);
            ctx.fillText(`total ${pluginOptions.totalEmission >= 1000 ? 'kgCO2eq' : 'gCO2eq'}`,
                chart.getDatasetMeta(0).data[0].x,
                chart.getDatasetMeta(0).data[0].y + 14);

        },
    };


    function calculateLabelPos(chart) {
        const { ctx, chartArea: { width, height } } = chart;
        const previousLabels = [];

        chart.data.datasets.forEach((dataset, i) => {
            chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
                const { x, y } = datapoint.tooltipPosition();
                const halfWidth = width / 2;
                const textXpos = x >= halfWidth ? 'left' : 'right';

                /* LINE */
                // Define the length of the line
                const lineLength = textXpos === "left" ? 60 : 40;
                const angle = Math.atan2(y - height, x - halfWidth);
                const xLine = x + Math.cos(angle) * lineLength;
                const yLine = y + Math.sin(angle) * lineLength;


                /* LABEL */
                const value = chart.data.datasets[0].data[index];
                const text = value >= 10000 ? `${(value / 1000).toFixed(2)} kgCO2eq` : `${value} gCO2eq`;
                const textWidth = ctx.measureText(text.trim()).width;


                // Calculate the position for the rectangle based on the text position
                let rectX, rectY;
                if (textXpos === 'left') {
                    rectX = xLine; 
                } else {
                    rectX = xLine - textWidth; 
                }
                rectY = yLine - 10; 



                //COLISSION TEST AND RESOLVE HERE
                const labelWidth = textWidth - 20;
                const labelHeight = 15;
                let collision;

                // Check for collision with the previous label
                do {
                    collision = false;

                    // Check for collision with previously drawn labels
                    for (const previousLabel of previousLabels) {
                        const previousLabelRight = previousLabel.rectX + previousLabel.width;
                        const previousLabelBottom = previousLabel.rectY + previousLabel.height;

                        if (
                            rectX < previousLabelRight && rectX + labelWidth > previousLabel.rectX &&
                            rectY < previousLabelBottom && rectY + labelHeight > previousLabel.rectY
                        ) {
                            collision = true;
                            // Adjust label position to avoid collision
                            if (textXpos === 'left') {
                                rectX += 6;
                                rectY += 5;
                            } else {
                                rectX -= 6;
                                rectY -= 5;
                            }
                            break; // No need to check further collisions
                        }
                    }
                } while (collision);

                previousLabels.push({
                    x: x,
                    y: y,
                    rectX: rectX,
                    rectY: rectY,
                    width: labelWidth,
                    height: labelHeight,
                    color: dataset.backgroundColor[index],
                    text: text,
                    side: textXpos,
                }

                );
            })

        })

        return previousLabels;
    }

    const doughnutLabelsLine = {
        id: 'doughnutLablesLine',
        afterDraw(chart) {
            const { ctx } = chart;
            
            const positions = calculateLabelPos(chart)
            let updatedX;
            let updatedY;

                    
            positions.forEach(label => {
                updatedX = label.side === 'left' ? label.rectX : label.rectX + label.width - 10;
                updatedY = label.side === 'left' ? label.rectY : label.rectY + label.height;

                // Drawing the line
                ctx.beginPath();
                ctx.moveTo(label.x, label.y);
                ctx.lineTo(updatedX, updatedY);
                ctx.strokeStyle = label.color;
                ctx.stroke();

            });
            
            positions.forEach(label => {
                // Draw the filled rectangle as background for the text
                ctx.fillStyle = label.color;
                ctx.fillRect(label.rectX - 5, label.rectY, label.width, label.height);

                ctx.font = 'bolder 0.7em sans-serif';
                ctx.textAlign = "left";
                ctx.textBaseline = 'middle';
                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.fillText(label.text, label.rectX, label.rectY + 8);
            });

                    
               
        }
    };

    const legendMargin = {
        id: 'legendMargin',
        beforeInit(chart) {
            const fitValue = chart.legend.fit;

            chart.legend.fit = function fit() {
                fitValue.bind(chart.legend)();
                return this.height += 30;
            }
        }
    };

    return (
        <div className={styles.doughnutDiv}>
            <Doughnut data={data} options={options} plugins={[textCenter, doughnutLabelsLine, legendMargin]} />
        </div>
    );
}