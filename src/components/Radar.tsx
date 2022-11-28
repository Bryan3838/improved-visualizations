import Plot from "react-plotly.js"
import React, { useState } from "react"
// import { getChamps } from "./Filters"

// const getStats = async () => {
    
//     const selectChampion = document.getElementById("selectChampion");
//     const selectPatch = document.getElementById("selectPatch");

//     // Run if both options are not the default selection
//     if (!(selectChampion.value === '' || selectPatch.value === '')) {
        
//         const champs = await getChamps();
//         const champ = champs[selectChampion.value][0];
        
//         console.log(champ);
//         // Change the title
//         const title = document.getElementById("selectedChampion");
//         title.textContent = champ.name;

//         // Values
//         const pick = parseFloat(champ["pick %"].replace(/[^0-9.]/g, ''));
//         const ban = parseFloat(champ["ban %"].replace(/[^0-9.]/g, ''));
//         const win = parseFloat(champ["win %"].replace(/[^0-9.]/g, ''));
//         const kda = parseFloat(champ["kda"].replace(/[^0-9.]/g, ''));
//         // const score = parseFloat(champ["score"].replace(/[^0-9.]/g, ''));
//         const stats = [pick, ban, win-50, kda, pick];

//         return stats;
//     } 
// }

// const Radar = () => {
    
//     const [data, setData] = useState([]);

//     const dataHandler = async (event) => {
//         const stats = await getStats();
//         setData(stats);
//     }

//     return (
//         <div>           
//             <h1 id="selectedChampion">Select a champion</h1>
//             <Plot
//                 data={[
//                     {
//                         type: 'scatterpolar',
//                         r: data,
//                         // theta: ['Pick','Ban','Win','KDA','Score','Pick'],
//                         theta: ['Pick','Ban','Win','KDA','Pick'],
//                         fill: 'toself'
//                     }
//                 ]}
//                 layout = {{width: 800, height: 500}}
//             />

//             <button type="button" onClick={dataHandler}>Redraw</button>

//         </div>
//     );
// }

// export default Radar;

interface Props {
    Patch: string;
    Champion: string;
}

const Radar: React.FC<Props> = (props) => {
    return (
      <div>
        <Plot
          data = {[
            {
              type: 'scatterpolar',
              r: [12,24,25,17,12],
              // theta: ['Pick','Ban','Win','KDA','Score','Pick'],
              theta: ['Pick','Ban','Win','KDA','Pick'],
              fill: 'toself'
            }
          ]}
          layout = {{width: 800, height: 500}}
        />
      </div>
    )
}

export default Radar;
