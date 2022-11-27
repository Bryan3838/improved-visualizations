import React from "react";
import { DataFiles } from "./data/main";
import Radar, { generatePatches } from "./components/Radar.js"

const App = () => {
    console.log("DATA FILES", DataFiles);

    return (
        <div>
            <h1>Build the document</h1>
            <button onClick={() => generatePatches()}>Run</button>

            <Radar/>
            
        </div>
    );
}

export default App;