import { orderData, namesFiles } from "../data/main";
import Plot from "react-plotly.js"
import { useState } from "react"

export const generatePatches = () => {

    // Get selected patch
    const select = document.getElementById("selectPatch");
    // Create default option
    select.innerHTML = '';
    const el = document.createElement("option");
    el.textContent = 'Choose a patch';
    el.value = '';
    select.appendChild(el);
    // Create option tag for every patch file
    for(let i = 0; i < namesFiles.length; i++) {
        const opt = namesFiles[i].replace(/[^0-9.]/g, '');
        const el = document.createElement("option");
        el.textContent = opt;
        el.value = i;
        select.appendChild(el);
    }
}

const getChamps = async () => {
    
    // Get champion data
    const data = await orderData();
    // Get unique list of champions for the selected patch
    const e = document.getElementById("selectPatch");
    const patch = e.value;
    const patchName = "League of Legends Champion Stats".concat(" ", e.options[e.selectedIndex].text);
    // Get JSON of all champions data
    const champs = data[patch][patchName].champions;

    return champs
}

const generateChamps = async () => {
    
    const e = document.getElementById("selectPatch");
    if (e.value !== '') {

        const champs = await getChamps();
        const uniqueChamps = [...new Set(Object.keys(champs))];
    
        console.log(uniqueChamps.length);

        // Get selected champion
        const select = document.getElementById("selectChampion");
        // Create default option
        select.innerHTML = '';
        const el = document.createElement("option");
        el.textContent = 'Choose a champion';
        el.value = '';
        select.appendChild(el);
        // Create option tag for every champ in that patch
        for(let i = 0; i < uniqueChamps.length; i++) {
            const opt = uniqueChamps[i];
            const el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
    }
}

const plot = async () => {
    
    const selectChampion = document.getElementById("selectChampion");
    const selectPatch = document.getElementById("selectPatch");

    // Run if both options are not the default selection
    if (!(selectChampion.value === '' || selectPatch.value === '')) {
        
        const champs = await getChamps();
        const champ = champs[selectChampion.value][0];
        
        console.log(champ);
        // Change the title
        const title = document.getElementById("selectedChampion");
        title.textContent = champ.name;

        // Values
        const pick = parseFloat(champ["pick %"].replace(/[^0-9.]/g, ''));
        const ban = parseFloat(champ["ban %"].replace(/[^0-9.]/g, ''));
        const win = parseFloat(champ["win %"].replace(/[^0-9.]/g, ''));
        const kda = parseFloat(champ["kda"].replace(/[^0-9.]/g, ''));
        // const score = parseFloat(champ["score"].replace(/[^0-9.]/g, ''));
        const stats = [pick, ban, win-50, kda, pick];

        return stats;
    } 
}


const Radar = () => {
    
    const [data, setData] = useState([]);

    const dataHandler = async (event) => {
        const stats = await plot();
        console.log(stats);
        setData(stats);
    }

    return (
        <div>           
            <select id="selectPatch" onChange={() => generateChamps()}>
                <option>Choose a patch</option>
            </select>

            <select id="selectChampion" onChange={dataHandler}>
                <option>Choose a champion</option>
            </select>

            <h1 id="selectedChampion">Select a champion</h1>

            <Plot
                data={[
                    {
                        type: 'scatterpolar',
                        r: data,
                        // theta: ['Pick','Ban','Win','KDA','Score','Pick'],
                        theta: ['Pick','Ban','Win','KDA','Pick'],
                        fill: 'toself'
                    }
                ]}
                layout = {{width: 800, height: 500}}
            />
            

        </div>
    );
}

export default Radar;