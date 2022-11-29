import { Champions, DataFiles } from "../data/data";
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

      const name = champion.name;
      const win = champion.winRate;
      const pos = champion.role;
      // const role = champion.rolePickRate;
      const pick = champion.pickRate;
      const ban = champion.banRate;
      const kda = champion.kda;

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
