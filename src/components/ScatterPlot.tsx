import React, { useEffect } from "react";
import {
    Chart as ChartJS,
    ChartData,
    ChartOptions,
    PointStyle,
    registerables,
    ScatterDataPoint,
} from 'chart.js';
import { Scatter } from "react-chartjs-2";
import { Champions, DataFiles } from "../data/main";
import { useState } from "react";

interface Props {
    Patch: string;
    OnChange(championId: string): void;
}

const ScatterPlot: React.FC<Props> = (props) => {
    const emptyDatasets: ChartData<"scatter"> = {
        datasets: [],
    };
    const emptyOptions: ChartOptions<"scatter"> = {

    }
    const [data, setData] = useState({ datasets: emptyDatasets, options: emptyOptions });

    ChartJS.register(...registerables);

    useEffect(() => {
        const dataset: ScatterDataPoint[] = [];

        const patchData = DataFiles.get(props.Patch)!;
        const pointStyles: PointStyle[] = [];
        patchData.forEach((data, name) => {
            const id = Champions.get(name)!;
            const image = new Image(50, 50);
            image.src = `http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${id}.png`;
            pointStyles.push(image);
        });

        
        for (let i = 0; i < 20; i++) {
            const dataPoint: ScatterDataPoint = {
                x: Math.random() * 10,
                y: Math.random() * 10,
            };
            dataset.push(dataPoint);
        }

        const datasets: ChartData<"scatter"> = {
            datasets: [{
                label: "test",
                data: dataset,
                backgroundColor: `rgba(255, 99, 132, 0.5)`,
            }]
        };
        const options: ChartOptions<"scatter"> = {
            elements: {
                point: {
                    pointStyle: pointStyles,
                    hoverRadius: 50,
                },
            },
            scales: {
                x: {
                    beginAtZero: true,
                },
                y: {
                    beginAtZero: true,
                },
            }
        }
        setData({ datasets: datasets, options: options});
    }, [props.Patch]);

    return (
        <div>
            <Scatter
                data={data.datasets}
                options={data.options}
            />
        </div>
    );
}

export default ScatterPlot;
