import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import ScatterPlot from './components/ScatterPlot';
import { namesFiles } from './data/main';

interface Props {

}

const App: React.FC<Props> = (props) => {
  const [championId, setChampionId] = useState("Ahri");
  const [patch, setPatch] = useState(namesFiles[namesFiles.length]);

  return (
    <div className="App">
      <div>
        <div>
          <h1>Select Patch</h1>
          <Select
            labelId="patch-ids-label"
            id="patch-ids"
            value={namesFiles[namesFiles.length - 1]}
            onChange={(event: SelectChangeEvent) => {
                setPatch(event.target.value);
            }}
          >
            {namesFiles.map((fileName) => (
              <MenuItem
                key={fileName}
                value={fileName}
              >
                {fileName}
              </MenuItem>
            ))}
          </Select>
        </div>
        
        <ScatterPlot
          Patch={patch}
          OnChange={championIdSP => {
            setChampionId(championIdSP);
          }}
        />
        {/* <Radar/> */}
            
        </div>
    </div>
  );
}

export default App;
