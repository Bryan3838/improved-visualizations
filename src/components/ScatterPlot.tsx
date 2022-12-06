import React, { useEffect } from "react";
import {
    Chart as ChartJS,
    ChartData,
    ChartOptions,
    registerables,
    ScatterDataPoint,
    Tick,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { DataFiles, getChampionIconLink } from "../data/data";
import { useState } from "react";
import Annoation from "chartjs-plugin-annotation";
import { ChampionData } from "../data/types/ChampionData";
import { Champions, ChampionsKey } from "../data/constants/Champions";

interface Props {
    patch: string;
    onChange(championId: string): void;
}

interface ChampionDataSet {
    label?: string;
    data: ChampionData[];
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

    };
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
        const patchData = DataFiles.get(props.patch)!;
        patchData.forEach((data, name) => {
            const id = Champions[name as ChampionsKey];
            if (!id) {
                console.warn("No id found for:", name);
                return;
            }
            const image = new Image(IMAGE_SIZE, IMAGE_SIZE);
            image.src = getChampionIconLink(id);

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
                            return `Role: ${championData.role}\nWin Delta: ${y.toFixed(2)}% \nPresence: ${x.toFixed(2)}%`;
                        }

                    }
                },
                annotation: {
                    annotations: {
                        idealWinDeltaLine: {
                            type: "line",
                            yMin: 0,
                            yMax: 0,
                            borderColor: "rgba(255, 99, 132, 0.5)",
                            borderWidth: 2,
                            drawTime: "afterDatasetsDraw",
                            label: {
                                display: true,
                                content: "IDEAL WIN DELTA",
                                backgroundColor: "rgba(255, 99, 132, 0.4)",
                            }
                        },
                        avgPresenceLine: {
                            type: "line",
                            xMin: avgPickRate,
                            xMax: avgPickRate,
                            borderColor: "rgba(255, 99, 132, 0.5)",
                            borderWidth: 2,
                            drawTime: "afterDatasetsDraw",
                            label: {
                                display: true,
                                content: "AVERAGE PRESENSE",
                                rotation: -90,
                                backgroundColor: "rgba(255, 99, 132, 0.4)",
                            }
                        },
                        // label1: {
                        //     type: 'label',
                        //     position: {
                        //         x: "start",
                        //         y: "end",
                        //     },
                        //     content: ["test"],
                        //     font: {
                        //         size: 18,
                        //     },
                        //     backgroundColor: 'rgb(245, 245, 245)',
                        //     yAdjust: -30,
                        //     drawTime: "beforeDatasetsDraw",
                        // }
                    }
                }
            },
            onClick: function(evt, element) {
                if(element.length > 0) {
                    const datasetIndex = element[0].datasetIndex;
                    const dataIndex = element[0].index;
                    const championData = championDatasets.datasets[datasetIndex].data[dataIndex];
                    props.onChange(championData.name);
                }
            }
        }
        
        setData({ datasets: datasets, options: options});
    }, [props, props.patch]);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                margin: "0 auto",
            }}
        >
            <h1>WIN DELTA PER CHAMPION VS. PRESENCE BY PATCH</h1>
            <Scatter
                data={data.datasets}
                options={data.options}
            />
        </div>
    );
}

export default ScatterPlot;
