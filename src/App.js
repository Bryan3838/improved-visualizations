import React from "react";
import { namesFiles, DataFiles } from "./data/main";
import Radar from "./components/Radar"
import Filters from "./components/Filters"

const generatePatches = () => {

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

const App = () => {
    console.log("DATA FILES", DataFiles);

    return (
        <div>
            <h1>Build the document</h1>
            <button onClick={() => generatePatches()}>Run</button>
            
            <Filters/>
            
            <Radar/>
            
        </div>
    );
}

export default App;