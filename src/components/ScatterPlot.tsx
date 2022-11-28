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

interface ChartDataElement {
    roles: Map<string, ScatterDataPoint[]>;
    pointStyle: PointStyle;
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
        const ChampionRoleData = new Map<string, ChartDataElement>();
        
        const patchData = DataFiles.get(props.Patch)!;
        patchData.forEach((data, name) => {
            const id = Champions.get(name)!;
            const image = new Image(50, 50);
            image.src = `http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${id}.png`;
            let chartDataPoint = {
                roles: new Map<string, ScatterDataPoint[]>(),
                pointStyle: image,
            };
            ChampionRoleData.set(id, chartDataPoint);

            for (const championData of data) {
                const dataPoint: ScatterDataPoint = {
                    x: championData.pickRate,
                    y: championData.winRate,
                }
                
                const existingRole = chartDataPoint.roles.get(championData.role);
                if (existingRole) {
                    existingRole.push(dataPoint);
                } else {
                    chartDataPoint.roles.set(championData.role, [dataPoint]);
                }
            }
        });

        const datasets: ChartData<"scatter"> = {
            datasets: [],
        };
        
        // ChampionRoleData.forEach((element, champion) => {
        //     element.roles.forEach((dataPoints, role) => {
        //         const dataset = datasets.datasets.find(set => {
        //             return set.label === role;
        //         });
        //         if (!dataset) {
        //             datasets.push({
        //                 role
        //             })
        //         }
        //     });
        // });
        console.log(ChampionRoleData);
       
        const options: ChartOptions<"scatter"> = {
            elements: {
                point: {
                    hoverRadius: 50,
                },
            },
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
