import React from "react";
import { orderData, DataFiles, namesFiles } from "./data/main";

const generatePatches = () => {

    // Get patch data
    const select = document.getElementById("selectPatch");
    for(let i = 0; i < namesFiles.length; i++) {
        const opt = namesFiles[i].replace(/[^0-9\.]/g, '');
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
    const champs = data[patch][patchName].champions;

    return champs
}

const generateChamps = async () => {
    
    const champs = await getChamps();
    const uniqueChamps = [...new Set(Object.keys(champs))];
   
    console.log(uniqueChamps.length);

    // Append champion list to option
    const select = document.getElementById("selectChampion");
    for(let i = 0; i < uniqueChamps.length; i++) {
        const opt = uniqueChamps[i];
        const el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

const plot = async () => {
    
    const champs = await getChamps();
    const select = document.getElementById("selectChampion");
    const champ = champs[select.value][0];
    console.log(champ.name);
    console.log(champ["pick %"]);
}


const App = () => {
    // console.log("DATA FILES", DataFiles);
    return (
        <div>
            <h1>Build the document</h1>
            <button onClick={() => generatePatches()}>Run</button>

            <br/>
            <br/>

            <select id="selectPatch" onChange={() => generateChamps()}>
                <option>Choose a patch</option>
            </select>

            <select id="selectChampion" onChange={plot}>
                <option>Choose a champion</option>
            </select>
        </div>
    );
}

export default App;