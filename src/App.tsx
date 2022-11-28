import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ScatterPlot from './components/ScatterPlot';
import { DataFiles, loadData, patchFiles } from './data/main';
import RadarChart from './components/RadarChart'

enum Status {
  LOADING,
  SUCCESS,
  ERROR,
}

interface Props {

}

const App: React.FC<Props> = (props) => {
  const [championId, setChampionId] = useState("Akali");
  const [patch, setPatch] = useState(patchFiles[patchFiles.length - 1]);
  const [status, setStatus] = useState(Status.LOADING);
  
  useEffect(() => {
    loadData()
      .then(data => {
        console.log("DATAFILES:");
        console.log(DataFiles);
        setStatus(Status.SUCCESS);
      })
      .catch(error => {
        console.log(error);
        setStatus(Status.ERROR);
      });
  }, []);

  switch (status) {
    case Status.LOADING:
      return (
        <div>LOADING</div>
      );
    case Status.ERROR:
      return (
        <div>ERROR</div>
      );
    case Status.SUCCESS:
      return (
        <div className="App">
          <div>
            <div>
              <h1>Select Patch</h1>
              <Select
                labelId="patch-ids-label"
                id="patch-ids"
                value={patch}
                onChange={(event: SelectChangeEvent) => {
                    setPatch(event.target.value);
                }}
              >
                {patchFiles.map((fileName) => (
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

            <RadarChart Patch={patch} Champion={championId}/>
                
            </div>
        </div>
      );
  }
}

export default App;
