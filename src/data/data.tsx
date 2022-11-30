import { GLOBAL } from "./types/GLOBAL";


export const Champions = new Map<string, string>([
    ["Aatrox", "Aatrox"],
    ["Ahri", "Ahri"],
    ["Akali", "Akali"],
    ["Akshan", "Akshan"],
    ["Alistar", "Alistar"],
    ["Amumu", "Amumu"],
    ["Anivia", "Anivia"],
    ["Annie", "Annie"],
    ["Aphelios", "Aphelios"],
    ["Ashe", "Ashe"],
    ["Aurelion Sol", "AurelionSol"],
    ["Azir", "Azir"],
    ["Bard", "Bard"],
    ["Bel'Veth", "Belveth"],
    ["Blitzcrank", "Blitzcrank"],
    ["Brand", "Brand"],
    ["Braum", "Braum"],
    ["Caitlyn", "Caitlyn"],
    ["Camille", "Camille"],
    ["Cassiopeia", "Cassiopeia"],
    ["Cho'Gath", "Chogath"],
    ["Corki", "Corki"],
    ["Darius", "Darius"],
    ["Diana", "Diana"],
    ["Dr. Mundo", "DrMundo"],
    ["Draven", "Draven"],
    ["Ekko", "Ekko"],
    ["Elise", "Elise"],
    ["Evelynn", "Evelynn"],
    ["Ezreal", "Ezreal"],
    ["Fiddlesticks", "Fiddlesticks"],
    ["Fiora", "Fiora"],
    ["Fizz", "Fizz"],
    ["Galio", "Galio"],
    ["Gangplank", "Gangplank"],
    ["Garen", "Garen"],
    ["Gnar", "Gnar"],
    ["Gragas", "Gragas"],
    ["Graves", "Graves"],
    ["Gwen", "Gwen"],
    ["Hecarim", "Hecarim"],
    ["Heimerdinger", "Heimerdinger"],
    ["Illaoi", "Illaoi"],
    ["Irelia", "Irelia"],
    ["Ivern", "Ivern"],
    ["Janna", "Janna"],
    ["Jarvan IV", "JarvanIV"],
    ["Jax", "Jax"],
    ["Jayce", "Jayce"],
    ["Jhin", "Jhin"],
    ["Jinx", "Jinx"],
    ["Kai'Sa", "Kaisa"],
    ["Kalista", "Kalista"],
    ["Karma", "Karma"],
    ["Karthus", "Karthus"],
    ["Kassadin", "Kassadin"],
    ["Katarina", "Katarina"],
    ["Kayle", "Kayle"],
    ["Kayn", "Kayn"],
    ["Kennen", "Kennen"],
    ["Kha'Zix", "Khazix"],
    ["Kindred", "Kindred"],
    ["Kled", "Kled"],
    ["Kog'Maw", "KogMaw"],
    ["LeBlanc", "Leblanc"],
    ["Lee Sin", "LeeSin"],
    ["Leona", "Leona"],
    ["Lillia", "Lillia"],
    ["Lissandra", "Lissandra"],
    ["Lucian", "Lucian"],
    ["Lulu", "Lulu"],
    ["Lux", "Lux"],
    ["Malphite", "Malphite"],
    ["Malzahar", "Malzahar"],
    ["Maokai", "Maokai"],
    ["Master Yi", "MasterYi"],
    ["Miss Fortune", "MissFortune"],
    ["Mordekaiser", "Mordekaiser"],
    ["Morgana", "Morgana"],
    ["Nami", "Nami"],
    ["Nasus", "Nasus"],
    ["Nautilus", "Nautilus"],
    ["Neeko", "Neeko"],
    ["Nidalee", "Nidalee"],
    ["Nilah", "Nilah"],
    ["Nocturne", "Nocturne"],
    ["Nunu", "Nunu"],
    ["Olaf", "Olaf"],
    ["Orianna", "Orianna"],
    ["Ornn", "Ornn"],
    ["Pantheon", "Pantheon"],
    ["Poppy", "Poppy"],
    ["Pyke", "Pyke"],
    ["Qiyana", "Qiyana"],
    ["Quinn", "Quinn"],
    ["Rakan", "Rakan"],
    ["Rammus", "Rammus"],
    ["Rek'Sai", "RekSai"],
    ["Rell", "Rell"],
    ["Renata Glasc", "Renata"],
    ["Renekton", "Renekton"],
    ["Rengar", "Rengar"],
    ["Riven", "Riven"],
    ["Rumble", "Rumble"],
    ["Ryze", "Ryze"],
    ["Samira", "Samira"],
    ["Sejuani", "Sejuani"],
    ["Senna", "Senna"],
    ["Seraphine", "Seraphine"],
    ["Sett", "Sett"],
    ["Shaco", "Shaco"],
    ["Shen", "Shen"],
    ["Shyvana", "Shyvana"],
    ["Singed", "Singed"],
    ["Sion", "Sion"],
    ["Sivir", "Sivir"],
    ["Skarner", "Skarner"],
    ["Sona", "Sona"],
    ["Soraka", "Soraka"],
    ["Swain", "Swain"],
    ["Sylas", "Sylas"],
    ["Syndra", "Syndra"],
    ["Tahm Kench", "TahmKench"],
    ["Taliyah", "Taliyah"],
    ["Talon", "Talon"],
    ["Taric", "Taric"],
    ["Teemo", "Teemo"],
    ["Thresh", "Thresh"],
    ["Tristana", "Tristana"],
    ["Trundle", "Trundle"],
    ["Tryndamere", "Tryndamere"],
    ["Twisted Fate", "TwistedFate"],
    ["Twitch", "Twitch"],
    ["Udyr", "Udyr"],
    ["Urgot", "Urgot"],
    ["Varus", "Varus"],
    ["Vayne", "Vayne"],
    ["Veigar", "Veigar"],
    ["Vel'Koz", "Velkoz"],
    ["Vex", "Vex"],
    ["Vi", "Vi"],
    ["Viego", "Viego"],
    ["Viktor", "Viktor"],
    ["Vladimir", "Vladimir"],
    ["Volibear", "Volibear"],
    ["Warwick", "Warwick"],
    ["Wukong", "MonkeyKing"],
    ["Xayah", "Xayah"],
    ["Xerath", "Xerath"],
    ["Xin Zhao", "XinZhao"],
    ["Yasuo", "Yasuo"],
    ["Yone", "Yone"],
    ["Yorick", "Yorick"],
    ["Yuumi", "Yuumi"],
    ["Zac", "Zac"],
    ["Zed", "Zed"],
    ["Zeri", "Zeri"],
    ["Ziggs", "Ziggs"],
    ["Zilean", "Zilean"],
    ["Zoe", "Zoe"],
    ["Zyra", "Zyra"],
]);

export const patchFiles = [
    'League of Legends Champion Stats 12.20',
    'League of Legends Champion Stats 12.19',
    'League of Legends Champion Stats 12.18',
    'League of Legends Champion Stats 12.17',
    'League of Legends Champion Stats 12.16',
    'League of Legends Champion Stats 12.15',
    'League of Legends Champion Stats 12.14',
    'League of Legends Champion Stats 12.13',
    'League of Legends Champion Stats 12.12',
    'League of Legends Champion Stats 12.11',
    'League of Legends Champion Stats 12.10',
    'League of Legends Champion Stats 12.9',
    'League of Legends Champion Stats 12.8',
    'League of Legends Champion Stats 12.7',
    'League of Legends Champion Stats 12.6',
    'League of Legends Champion Stats 12.5',
    'League of Legends Champion Stats 12.4',
    'League of Legends Champion Stats 12.3',
    'League of Legends Champion Stats 12.2',
    'League of Legends Champion Stats 12.1',
];

//File extention
const fileType = ".csv";

//Folder where the data is located
const dataPath = "./archive";

//Create an instance with the object MAP with the data types that were already defined
export const DataFiles = new Map<string, Map<string, GLOBAL[]>>();

//Functions in charge of load the data in one
export const loadData = async () => {
    for(const patchFile of patchFiles){

        //Create an array to save the data for each archive
        const championMap = new Map<string, GLOBAL[]>();

        //Create the name of the archive as ./archive/League of Legends Champion Stats 12.1.csv that is for each file type
        const path = `${dataPath}/${patchFile}${fileType}`;
        
        //Require the archive to read it
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
                        let dataElement: GLOBAL = {
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

// export const orderData = async () => {
//     const data = await loadData();
//     const keysObject = Array.from(data.keys())
//     const valuesObject = Array.from(data.values())
//     const newArr = new Array;
//     const dataFiltered = new Array;

//     for (let index = 0; index < valuesObject.length; index++) {
//         const element = valuesObject[index];
//         newArr.push({"name_file": keysObject[index], "value_file": element})
//     }

//     for (let index = 0; index < newArr.length; index++) {
//         const nameFile = newArr[index].name_file;
//         const element = newArr[index].value_file;

//         const champions:typeof element = {}
//         const roles:typeof element = {}
//         const item:typeof element = {}

//         element.reduce((prev: any, curr: any) => {
//             champions[curr.name] = element.filter((x: any) => x.name === curr.name)
//         });

//         element.reduce((prev: any, curr: any) => {
//             roles[curr.role] = element.filter((x: any) => x.role === curr.role)
//         });

//         item[nameFile] = {"champions": champions, "roles": roles}

//         dataFiltered.push(item);
//     }
    
//     return dataFiltered;
// };