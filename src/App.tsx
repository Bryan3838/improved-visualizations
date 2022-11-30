import { Divider, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import ScatterPlot from "./components/ScatterPlot";
import { DataFiles, loadData } from "./data/data";
import RadarChart from "./components/RadarChart";
import { PatchFiles } from "./data/constants/PatchFiles";

enum Status {
  LOADING,
  SUCCESS,
  ERROR,
}

interface Props {

}

const App: React.FC<Props> = (props) => {
  const [championId, setChampionId] = useState<string | undefined>();
  const [patch, setPatch] = useState(PatchFiles[0]);
  const [status, setStatus] = useState(Status.LOADING);
  
  useEffect(() => {
    loadData()
      .then(data => {
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
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >Loading Champion Data...</div>
      );
    case Status.ERROR:
      return (
        <div>ERROR</div>
      );
    case Status.SUCCESS:
      return (
        <div className="App">
          <h1
            style={{
              paddingTop: "10px",
              textAlign: "center",
              color: "white",
              fontSize: "30px",
              backgroundColor: "#2576ce",
            }}
          >LOL Vizz</h1>
          <h3
            style={{
              padding: "10px",
              textAlign: "center",
              color: "white",
              fontSize: "15px",
              backgroundColor: "#2576ce",
            }}
          >League of Legends Champion Balancing Visualizations</h3>

          <Divider
            variant="middle"
            sx={{marginLeft: "5%", marginRight: "5%", marginTop: "20px", marginBottom: "20px"}}
            flexItem
          /> 
          
          <div
            style={{
                width: "75%",
                height: "75%",
                margin: "0 auto",
            }}
          >
            <h1>Select Patch</h1>
            <Select
              labelId="patch-ids-label"
              id="patch-ids"
              value={patch}
              onChange={(event: SelectChangeEvent) => {
                  setPatch(event.target.value);
              }}
            >
              {PatchFiles.map((fileName) => (
                <MenuItem
                  key={fileName}
                  value={fileName}
                >
                  {fileName}
                </MenuItem>
              ))}
            </Select>
          </div>

          <Divider
            variant="middle"
            sx={{marginLeft: "5%", marginRight: "5%", marginTop: "20px", marginBottom: "20px"}}
            flexItem
          /> 
          
          <ScatterPlot
            Patch={patch}
            OnChange={championIdSP => {
              setChampionId(championIdSP);
            }}
          />

          <Divider
            variant="middle"
            sx={{marginLeft: "5%", marginRight: "5%", marginTop: "20px", marginBottom: "20px"}}
            flexItem
          /> 

          {championId ?
            <RadarChart Patch={patch} Champion={championId}/>
            :
            <h3
              style={{
                padding: "10px",
                textAlign: "center",
                color: "gray",
                fontSize: "15px",
              }}
            >Click on a Champion to display more data.</h3>
          }

          <Divider
            variant="middle"
            sx={{marginLeft: "5%", marginRight: "5%", marginTop: "20px", marginBottom: "20px"}}
            flexItem
          /> 
          
        </div>
      );
  }
}

export default App;
