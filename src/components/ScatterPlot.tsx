import React, { useEffect } from "react";
import {
    Chart as ChartJS,
    ChartData,
    ChartOptions,
    PointStyle,
    registerables,
    ScatterDataPoint,
    Tick,
} from 'chart.js';
import { Scatter } from "react-chartjs-2";
import { Champions, DataFiles } from "../data/data";
import { useState } from "react";
import Annoation from 'chartjs-plugin-annotation';
import { GLOBAL } from "../data/types/GLOBAL";

interface Props {
    Patch: string;
    OnChange(championId: string): void;
}

interface ChampionDataSet {
    label?: string;
    data: GLOBAL[];
}
interface ChampionDataSets {
    datasets: ChampionDataSet[];
}

const IMAGE_SIZE = 35;

const ScatterPlot: React.FC<Props> = (props) => {
    const emptyDatasets: ChartData<"scatter"> = {
        datasets: [],
    };
    const emptyOptions: ChartOptions<"scatter"> = {

    }
    const [data, setData] = useState({ datasets: emptyDatasets, options: emptyOptions });

    ChartJS.register(...registerables, Annoation);

    useEffect(() => {
        let sumPickRate = 0;
        let championCount = 0;
        const datasets: ChartData<"scatter"> = {
            datasets: [],
        };
        const championDatasets: ChampionDataSets = {
            datasets: [],
        }
        const patchData = DataFiles.get(props.Patch)!;
        patchData.forEach((data, name) => {
            const id = Champions.get(name)!;
            const image = new Image(IMAGE_SIZE, IMAGE_SIZE);
            image.src = `http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${id}.png`;

            for (const championData of data) {
                const dataPoint: ScatterDataPoint = {
                    x: championData.pickRate,
                    y: championData.winRate-50,
                }

                const role = championData.role;
                let dataset = datasets.datasets!.find(set => {
                    return set.label === role;
                });
                if (!dataset) {
                    datasets.datasets!.push({
                        label: role,
                        data: [],
                        pointStyle: [],
                    });
                    championDatasets.datasets.push({
                        label: role,
                        data: [],
                    })
                }
                dataset = datasets.datasets!.find(set => {
                    return set.label === role;
                });
                let championDataset = championDatasets.datasets!.find(set => {
                    return set.label === role;
                })
                dataset!.data.push(dataPoint);
                // @ts-ignore
                dataset!.pointStyle!.push(image);
                championDataset!.data.push(championData);

                sumPickRate += championData.pickRate;
                championCount++;
            }
        });
        const avgPickRate = sumPickRate/championCount;

        const options: ChartOptions<"scatter"> = {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: "WIN DELTA (IN %)",
                    },
                    ticks: {
                        callback: function(value: string | number, index: number, ticks: Tick[]) {
                          return `${Number(value).toFixed(2)}%`;
                        }
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: "PRESENCE (IN %)",
                    },
                    ticks: {
                        callback: function(value: string | number, index: number, ticks: Tick[]) {
                          return `${Number(value)}%`;
                        },
                    },
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(ctx) {
                            const championData = championDatasets.datasets[ctx.datasetIndex].data[ctx.dataIndex];
                            return championData.name;
                        },
                        afterLabel: function(ctx) {
                            const championData = championDatasets.datasets[ctx.datasetIndex].data[ctx.dataIndex];
                            const rawData = ctx.raw as ScatterDataPoint;
                            const x = rawData.x;
                            const y = rawData.y;
                            return `Role: ${championData.role}\nWin Delta: ${x.toFixed(2)}% \nPresence: ${y.toFixed(2)}%`;
                        }

                    }
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: "line",
                            yMin: 0,
                            yMax: 0,
                            borderColor: "rgba(255, 99, 132, 0.5)",
                            borderWidth: 2,
                            drawTime: "beforeDatasetsDraw",
                        },
                        line2: {
                            type: "line",
                            xMin: avgPickRate,
                            xMax: avgPickRate,
                            borderColor: "rgba(255, 99, 132, 0.5)",
                            borderWidth: 2,
                            drawTime: "beforeDatasetsDraw",
                        },
                        label1: {
                            type: 'label',
                            position: {
                                x: "center",
                                y: "center",
                            },
                            content: ["test"],
                            font: {
                                size: 18,
                            },
                            backgroundColor: 'rgb(245, 245, 245)',
                            yAdjust: -30,
                            drawTime: "beforeDatasetsDraw",
                        }
                    }
                }
            }
            // elements: {
            //     point: {
            //         hoverRadius: 50,
            //     },
            // },
        }
        setData({ datasets: datasets, options: options});
    }, [props.Patch]);

    return (
        <div
            style={{
                width: "75%",
                height: "75%",
                margin: "0 auto",
            }}
        >
            <Scatter
                data={data.datasets}
                options={data.options}
            />
        </div>
    );
}

export default ScatterPlot;
