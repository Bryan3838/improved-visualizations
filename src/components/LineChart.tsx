import { ChartData } from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

interface Props {
    data: ChartData<"line">;
}

const LineChart: React.FC<Props> = (props) => {
    return (
        <div>
            <Line
                data={props.data}
            />
        </div>
    )
}

export default LineChart;
