import React from "react";
import { loadData, DataFiles } from "./data/main";

const App = () => {
    console.log("DATA FILES", DataFiles);
    return (
        <><div>
            <h1>Build the document</h1>
            <button onClick={() => loadData()}>Run</button>
        </div>
        <div>
            HelloWorld
            </div></>
    );
}

export default App;