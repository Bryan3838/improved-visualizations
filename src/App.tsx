import { Divider, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import ScatterPlot from "./components/ScatterPlot";
import { DataFiles, loadData } from "./data/data";
import RadarChart from "./components/RadarChart";
import { PatchFiles } from "./data/constants/PatchFiles";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";
import { ChampionData } from "./data/types/ChampionData";

enum Status {
  LOADING,
  SUCCESS,
  ERROR,
}

interface Props {

}

const LINE_CHART_KEYS: Array<keyof ChampionData> = ["winRate", "pickRate", "banRate"];

const App: React.FC<Props> = (props) => {
  const [status, setStatus] = useState(Status.LOADING);
  const [patch, setPatch] = useState(PatchFiles[0]);
  const [champion, setChampion] = useState<string | undefined>();
  
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
                  {`Patch ${fileName.replace(/[a-zA-Z ]/g, "")}`}
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
              patch={patch}
              onChange={championIdSP => {
                setChampion(championIdSP);
              }}
            />
          </div>

          <Divider
            variant="middle"
            sx={{marginLeft: "5%", marginRight: "5%", marginTop: "20px", marginBottom: "20px"}}
            flexItem
          /> 

          {champion ?
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
                <RadarChart patch={patch} champion={champion}/>
                {/* {DataFiles.get(patch)!.get(champion)!.map(championData => {
                  for (const key in championData) {
                    return (
                      <div>{key}</div>
                    );
                  }
                  return null;
                })} */}
              </div>

              <div
                style={{
                    width: "70%",
                    height: "70%",
                    margin: "0 auto",
                    float: "left",
                }}
              >
                {LINE_CHART_KEYS.map(key => {
                  function average(array: number[]) {
                    return array.reduce((a, b) => a + b) / array.length;
                  }

                  const datasets: ChartData<"line"> = {
                    labels: [],
                    datasets: [{
                      data: []
                    }]
                  };
                  PatchFiles.forEach(patch => {
                    datasets.labels!.push(`Patch ${patch.replace(/[a-zA-Z ]/g, "")}`);
                    const patchData = DataFiles.get(patch)!;
                    patchData.forEach((data, name) => {
                      if (name === champion) {
                        const averageValue = average(data.map(championData => championData[key] as number));
                        datasets.datasets[0]!.data.push(averageValue);
                      }
                    });
                  });
                  
                  const averageValueOverPatches = average(datasets.datasets[0]!.data.map(x => x as number));
                  return (
                    <div>
                      <h1>{key.toUpperCase()} OVER PATCHES</h1>
                      <Line
                        data={datasets}
                        options={{
                          plugins: {
                            legend: {
                              display: false,
                            },
                            annotation: {
                              annotations: {
                                avgValue: {
                                  type: "line",
                                  yMin: averageValueOverPatches,
                                  yMax: averageValueOverPatches,
                                  borderColor: "rgba(255, 99, 132, 0.5)",
                                  borderWidth: 2,
                                  drawTime: "afterDatasetsDraw",
                                  label: {
                                      display: true,
                                      content: `AVERAGE ${key.toUpperCase()}`,
                                      backgroundColor: "rgba(255, 99, 132, 0.4)",
                                  }
                                },
                              }
                            }
                          }
                        }}
                      />
                    </div>
                  );
                })}
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
