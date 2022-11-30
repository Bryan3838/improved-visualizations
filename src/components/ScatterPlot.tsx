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

interface Props {
    Patch: string;
    OnChange(championId: string): void;
}

interface DataElement {
    roles: Map<string, ScatterDataPoint[]>;
    pointStyle: PointStyle;
    championName: string;
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
        const ChampionRoleData = new Map<string, DataElement>();
        const patchData = DataFiles.get(props.Patch)!;
        patchData.forEach((data, name) => {
            const id = Champions.get(name)!;
            const image = new Image(IMAGE_SIZE, IMAGE_SIZE);
            image.src = `http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${id}.png`;
            let dataElement: DataElement = {
                roles: new Map<string, ScatterDataPoint[]>(),
                pointStyle: image,
                championName: name, 
            };
            ChampionRoleData.set(id, dataElement);

            for (const championData of data) {
                const dataPoint: ScatterDataPoint = {
                    x: championData.pickRate,
                    y: championData.winRate-50,
                }
                
                const existingRole = dataElement.roles.get(championData.role);
                if (existingRole) {
                    existingRole.push(dataPoint);
                } else {
                    dataElement.roles.set(championData.role, [dataPoint]);
                }
            }
        });

        let sumPickRate = 0;
        let championCount = 0;
        const datasets: ChartData<"scatter"> = {
            datasets: [],
        };
        ChampionRoleData.forEach((element, champion) => {
            element.roles.forEach((dataPoints, role) => {
                let dataset = datasets.datasets!.find(set => {
                    return set.label === role;
                });
                if (!dataset) {
                    datasets.datasets!.push({
                        label: role,
                        data: [],
                        pointStyle: [],
                    });
                }
                dataset = datasets.datasets!.find(set => {
                    return set.label === role;
                });
                for (const point of dataPoints) {
                    if (dataset!.label !== role) continue; 
                    dataset!.data.push(point);
                    // @ts-ignore
                    dataset!.pointStyle!.push(element.pointStyle);

                    sumPickRate += point.x;
                    championCount++;
                }
            });
        });
        let avgPickRate = sumPickRate/championCount;
       
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
                            console.log(ctx);
                            console.log(datasets.datasets[ctx.datasetIndex].data[ctx.dataIndex])
                            return ctx.label;
                        },
                        afterLabel: function(ctx) {
                            const rawData = ctx.raw as ScatterDataPoint;
                            const x = rawData.x;
                            const y = rawData.y;
                            return `Win Delta: ${x.toFixed(2)}% \nPresence: ${y.toFixed(2)}%`;
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