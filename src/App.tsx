import { Divider, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import ScatterPlot from "./components/ScatterPlot";
import { DataFiles, loadData } from "./data/data";
import RadarChart from "./components/RadarChart";
import LineChart from "./components/LineChart";
import { PatchFiles } from "./data/constants/PatchFiles";
import { ChartData } from "chart.js";

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
  
  const labels = [1, 2, 3, 4, 5, 6, 7];
  const dataWinrateOverPatch: ChartData<"line"> = {
    labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

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
          
          <div
            style={{
                width: "75%",
                margin: "0 auto",
            }}
          >
            <ScatterPlot
              Patch={patch}
              OnChange={championIdSP => {
                setChampionId(championIdSP);
              }}
            />
          </div>

          <Divider
            variant="middle"
            sx={{marginLeft: "5%", marginRight: "5%", marginTop: "20px", marginBottom: "20px"}}
            flexItem
          /> 

          {championId ?
            <div
              style={{
                  width: "75%",
                  margin: "0 auto",
              }}
            >
              <div
                style={{
                    width: "30%",
                    margin: "0 auto",
                    float: "left",
                }}
              >
                <h1>CHAMPION STATS</h1>
                <RadarChart Patch={patch} Champion={championId}/>
              </div>

              <Divider
                orientation="vertical"
                variant="middle"
                sx={{marginLeft: "20px", marginRight: "20px"}}
              />  

              <div
                style={{
                    width: "70%",
                    height: "70%",
                    margin: "0 auto",
                    float: "left",
                }}
              >
                <h1>WINRATE BY PATCH</h1>
                <LineChart
                  data={dataWinrateOverPatch}
                />
              </div>
            </div>
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
