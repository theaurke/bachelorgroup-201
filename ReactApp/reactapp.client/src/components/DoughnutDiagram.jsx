import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from '../styles/Diagram.module.css';

/**
 * Renders a doughnut diagram displaying the total emission as well as the emissions 
 * for all the resources in the calcualtion.
 * @param {list} emissions - List containing all info about the emissions of the resources.
 * @param {number} totalEmission - The calculated total emission for all resource in the calculation.
 * @param {list} backgroundColor - List of colors for the "pieces" in the diagram.
 * @returns {JSX.Element} The JSX representation of the diagram.
 */
export default function DoughnutDiagram({ emissions, totalEmission, backgroundColor }) {

    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

    // Data containing the labels, values and colors for the diagram
    const data = {
        labels: emissions.map(item => item.resource.toString()),
        datasets: [
            {
                data: emissions.map(item => item.emissionTime),
                backgroundColor: backgroundColor,
            },
        ],
    };

    // Options to customize the look of the diagram.
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

    // Custom plugin to get the total emission in the center of the diagram.
    const textCenter = {
        id: 'textCenter',
        beforeDatasetsDraw(chart, args, pluginOptions) {
            const { ctx } = chart;

            ctx.save();
            ctx.font = 'bolder 1em sans-serif';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Dividing the total emission to convert to kg if number is big to better fit the diagram.
            ctx.fillText(`${pluginOptions.totalEmission >= 1000 ? (pluginOptions.totalEmission / 1000).toFixed(1) : pluginOptions.totalEmission}`,
                chart.getDatasetMeta(0).data[0].x,
                chart.getDatasetMeta(0).data[0].y - 8);

            // Changing the measuring unit based on the number size to better fit the diagram.
            ctx.fillText(`total ${pluginOptions.totalEmission >= 1000 ? 'kgCO2eq' : 'gCO2eq'}`, 
                chart.getDatasetMeta(0).data[0].x,
                chart.getDatasetMeta(0).data[0].y + 14);

        },
    };


    // Custom plugin to make outside labels for the diagram
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

                // Collision test loop
                do {
                    collision = false;

                    // Checking for collision with previously drawn labels
                    for (const previousLabel of previousLabels) {
                        const previousLabelRight = previousLabel.rectX + previousLabel.width;
                        const previousLabelBottom = previousLabel.rectY + previousLabel.height;

                        if (
                            rectX < previousLabelRight && rectX + labelWidth > previousLabel.rectX &&
                            rectY < previousLabelBottom && rectY + labelHeight > previousLabel.rectY
                        ) {
                            collision = true;

                            // Adjusting the label position to avoid collision.
                            if (textXpos === 'left') {
                                rectX += 6;
                                rectY += 5;
                            } else {
                                rectX -= 6;
                                rectY -= 5;
                            }
                            break; // Breaking when no longer colliding.
                        }
                    }
                } while (collision); // Looping as long as the label is colliding.

                // Adding the label to the list when its no longer colliding.
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


    // Custom plugin to draw line from the doughnut diagram slice to the label.
    const doughnutLabelsLine = {
        id: 'doughnutLablesLine',
        afterDraw(chart) {
            const { ctx } = chart;

            // Getting the positions of the labels.
            const positions = calculateLabelPos(chart)
            let updatedX;
            let updatedY;

                    
            positions.forEach(label => {
                // Adjusting where the line is drawn to based on which side of the diagram the label is on.
                updatedX = label.side === 'left' ? label.rectX : label.rectX + label.width - 10;
                updatedY = label.side === 'left' ? label.rectY : label.rectY + label.height;

                // Drawing the line.
                ctx.beginPath();
                ctx.moveTo(label.x, label.y);
                ctx.lineTo(updatedX, updatedY);
                ctx.strokeStyle = label.color;
                ctx.stroke();

            });
            
            positions.forEach(label => {
                // Draw the filled rectangle as background for the text.
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


    // Custom plugin to add margin to the diagram.
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
        <div data-testid={"doughnutDiagram"} className={styles.doughnutDiv}>
            <Doughnut data={data} options={options} plugins={[textCenter, doughnutLabelsLine, legendMargin]} />
        </div>
    );
}