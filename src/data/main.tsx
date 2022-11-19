import { GLOBAL } from "./types/avg/GLOBAL";

//File names
const namesFiles = ['League of Legends Champion Stats 12.1','League of Legends Champion Stats 12.2','League of Legends Champion Stats 12.3','League of Legends Champion Stats 12.4','League of Legends Champion Stats 12.5','League of Legends Champion Stats 12.6','League of Legends Champion Stats 12.7','League of Legends Champion Stats 12.8','League of Legends Champion Stats 12.9','League of Legends Champion Stats 12.10','League of Legends Champion Stats 12.11','League of Legends Champion Stats 12.12','League of Legends Champion Stats 12.13','League of Legends Champion Stats 12.14','League of Legends Champion Stats 12.15','League of Legends Champion Stats 12.16','League of Legends Champion Stats 12.17','League of Legends Champion Stats 12.18','League of Legends Champion Stats 12.19','League of Legends Champion Stats 12.20']

//File extension
const fileType = ".csv";

//Folder where the files are located
const dataPath = "./archive";

//Create an instance with object MAP with the data type that have been already define
export const DataFiles = new Map<string, Array<GLOBAL>>();

//Charge the data
export const loadData = async() =>{
    for(const i of namesFiles){
       
        //Create an array to save the data per file
        const dataTypeMap = new Array<GLOBAL>();

        //Create the name of the file as ./archive/League of Legends Champion Stats 12.1.csv this is for each file type
        const path = `${dataPath}/${i}${fileType}`;
        console.log(`FOLDER ${path}`);
        
        //Require the file to read it
        const file = require("".concat(path));
        await fetch(file)
            .then(response => response.text())
            .then(text => {
                //Read each line
                const dataRows = text.split("\n");

                //Review the case of the file to read and build the data
                const dataArchive = new Array<GLOBAL>();
                for(const dataRow of dataRows){
                    //Return a new array when a space is found
                    const data = dataRow.split(";").filter(element => {
                        return element;
                    });
                    
                    let l = 0;
                    while(l < data.length -1){
                        let dataElement: GLOBAL = {
                            name: String(data[l++]),
                            class: String(data[l++]),
                            role: String(data[l++]),
                            tier: String(data[l++]),
                            score: String(data[l++]),
                            trend: String(data[l++]),
                            "win %": String(data[l++]),
                            "role %": String(data[l++]),
                            "pick %": String(data[l++]),
                            "ban %": String(data[l++]),
                            kda: String(data[l++])
                        }
                        dataArchive.push(dataElement);
                    }
                }
                dataTypeMap.push(...dataArchive);
            })
        
        DataFiles.set(i, dataTypeMap);
    }
    console.log("DATA FILE", DataFiles);
}
