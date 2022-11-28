import { Champions, DataFiles } from "../data/main";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from "react-chartjs-2";
import "../styles/RadarChart.css"

interface Props {
    Patch: string;
    Champion: string;
}

interface AnyObject {
  [key: string]: any
}

const RadarChart: React.FC<Props> = (props) => {

    const champStats = DataFiles.get(props.Patch)?.get(props.Champion)
    const finalData: Array<any> = []

    champStats?.forEach(champion => {

      const obj: AnyObject = {}

      // const name = champion.name;
      // const win = champion["win %"];
      // const pos = champion.role;
      // const role = champion["role %"];
      // const pick = champion["pick %"];
      // const ban = champion["ban %"];
      // const kda = champion.kda;

      const name = champion.name;
      const pos = champion.role;
      const win = parseFloat(champion["win %"].replace(/[^0-9.]/g, ''));
      const pick = parseFloat(champion["pick %"].replace(/[^0-9.]/g, ''));
      const ban = parseFloat(champion["ban %"].replace(/[^0-9.]/g, ''));
      const kda = parseFloat(champion.kda.replace(/[^0-9.]/g, ''));

      const stats = [ban, pick, win-50, kda]      
      obj.label = name.concat(" ", pos);
      obj.data = stats;

      finalData.push(obj);
    })

    // console.log(finalData);

    ChartJS.register(
      RadialLinearScale,
      PointElement,
      LineElement,
      Filler,
      Tooltip,
      Legend
    );

    const data = {
      labels: ['Ban Rate', 'Pick Rate', 'Win Rate', 'KDA'],
      datasets: finalData,
    };

    return (
      <div className="container">
        <Radar data={data} />;
      </div>
    )
}

export default RadarChart;
