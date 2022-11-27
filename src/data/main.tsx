import { GLOBAL } from "./types/avg/GLOBAL";

//Name of the files
export const namesFiles = [
    'League of Legends Champion Stats 12.1',
    'League of Legends Champion Stats 12.2',
    'League of Legends Champion Stats 12.3',
    'League of Legends Champion Stats 12.4',
    'League of Legends Champion Stats 12.5',
    'League of Legends Champion Stats 12.6',
    'League of Legends Champion Stats 12.7',
    'League of Legends Champion Stats 12.8',
    'League of Legends Champion Stats 12.9',
    'League of Legends Champion Stats 12.10',
    'League of Legends Champion Stats 12.11',
    'League of Legends Champion Stats 12.12',
    'League of Legends Champion Stats 12.13',
    'League of Legends Champion Stats 12.14',
    'League of Legends Champion Stats 12.15',
    'League of Legends Champion Stats 12.16',
    'League of Legends Champion Stats 12.17',
    'League of Legends Champion Stats 12.18',
    'League of Legends Champion Stats 12.19',
    'League of Legends Champion Stats 12.20'
];

//File extention
const fileType = ".csv";

//Folder where the data is located
const dataPath = "./archive";

//Create an instance with the object MAP with the data types that were already defined
export const DataFiles = new Map<string, Array<GLOBAL>>();

//Functions in charge of load the data in one
export const loadData = async () => {
    for(const i of namesFiles){

        //Create an array to save the data for each archive
        const dataTypeMap = new Array<GLOBAL>();

        //Create the name of the archive as ./archive/League of Legends Champion Stats 12.1.csv that is for each file type
        const path = `${dataPath}/${i}${fileType}`;
        
        //Require the archive to read it
        const file = require("".concat(path));
        await fetch(file)
            .then(response => response.text())
            .then(text => {
                //Read the line
                const dataRows = text.split("\n");

                //Review which is the case of the archive that is going to read and build the data
                const dataArchive = new Array<GLOBAL>();
                for(const dataRow of dataRows){
                    
                    //return a new array when a space is found
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
    return DataFiles
}

export const orderData = async () => {
    const data = await loadData();
    const keysObject = Array.from(data.keys())
    const valuesObject = Array.from(data.values())
    const newArr = new Array;
    const dataFiltered = new Array;

    for (let index = 0; index < valuesObject.length; index++) {
        const element = valuesObject[index];
        newArr.push({"name_file": keysObject[index], "value_file": element})
    }

    for (let index = 0; index < newArr.length; index++) {
        const nameFile = newArr[index].name_file;
        const element = newArr[index].value_file;

        const champions:typeof element = {}
        const roles:typeof element = {}
        const item:typeof element = {}

        element.reduce((prev: any, curr: any) => {
            champions[curr.name] = element.filter((x: any) => x.name === curr.name)
        });

        element.reduce((prev: any, curr: any) => {
            roles[curr.role] = element.filter((x: any) => x.role === curr.role)
        });

        item[nameFile] = {"champions": champions, "roles": roles}

        dataFiltered.push(item);
    }
    //console.log(dataFiltered);
    return dataFiltered;
};
