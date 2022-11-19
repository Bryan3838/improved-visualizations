import React from "react";
import { loadData, DataFiles } from "./data/main";

const App = () => {
    console.log("DATA FILES", DataFiles);
    return (
        <div>
            <h1>Buil the document</h1>
            <button onClick={() => loadData()}>Run</button>
        </div>
    );
}

export default App;