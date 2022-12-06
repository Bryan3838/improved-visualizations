import { Champions, ChampionsKey } from "./constants/Champions";
import { PatchFiles } from "./constants/PatchFiles";
import { ChampionData } from "./types/ChampionData";

//File extention
const fileType = ".csv";

//Folder where the data is located
const dataPath = "./archive";

//Create an instance with the object MAP with the data types that were already defined
export const DataFiles = new Map<string, Map<string, ChampionData[]>>();

export const loadData = async () => {
    for(const patchFile of PatchFiles){
        const championMap = new Map<string, ChampionData[]>();
        const path = `${dataPath}/${patchFile}${fileType}`;
        
        const file = require("".concat(path));
        await fetch(file)
            .then(response => response.text())
            .then(text => {
                const dataRows = text.split("\n");
                for (let i = 0; i < dataRows.length; i++) {
                    if (i === 0) continue; // Remove first row = column names row

                    const data = dataRows[i].split(";");
                    
                    let l = 0;
                    while(l < data.length-1){
                        let dataElement: ChampionData = {
                            name: String(data[l++]),
                            class: String(data[l++]),
                            role: String(data[l++]),
                            tier: String(data[l++]),
                            score: String(data[l++]),
                            trend: String(data[l++]),
                            winRate: Number(data[l++].replace("%", "")),
                            rolePickRate: Number(data[l++].replace("%", "")),
                            pickRate: Number(data[l++].replace("%", "")),
                            banRate: Number(data[l++].replace("%", "")),
                            kda: String(data[l++])
                        }
                        
                        const existingData = championMap.get(dataElement.name);
                        if (existingData) {
                            existingData.push(dataElement);
                        } else {
                            championMap.set(dataElement.name, [dataElement]);
                        }
                    }
                }
            });
        DataFiles.set(patchFile, championMap);
    }
}

export function getChampionIconLink(champion: string) {
    const id = Champions[champion as ChampionsKey];
    if (!id) {
        console.error("No id found for:", champion);
    }
    return `https://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${id}.png`;
}