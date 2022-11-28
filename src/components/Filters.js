import { orderData } from "../data/main";

const generateChamps = async () => {
    
    const e = document.getElementById("selectPatch");
    if (e.value !== '') {

        const champs = await getChamps();
        const uniqueChamps = [...new Set(Object.keys(champs))];
    
        console.log(uniqueChamps.length);

        // Get selected champion
        const select = document.getElementById("selectChampion");
        // Create default option
        select.innerHTML = '';
        const el = document.createElement("option");
        el.textContent = 'Choose a champion';
        el.value = '';
        select.appendChild(el);
        // Create option tag for every champ in that patch
        for(let i = 0; i < uniqueChamps.length; i++) {
            const opt = uniqueChamps[i];
            const el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
    }
}

export const getChamps = async () => {
    
    // Get champion data
    const data = await orderData();
    // Get unique list of champions for the selected patch
    const e = document.getElementById("selectPatch");
    const patch = e.value;
    const patchName = "League of Legends Champion Stats".concat(" ", e.options[e.selectedIndex].text);
    // Get JSON of all champions data
    const champs = data[patch][patchName].champions;

    return champs
}

const Filters = () => {

    return (
        <div>
            
            <select id="selectPatch" onChange={() => generateChamps()}>
                <option>Choose a patch</option>
            </select>

            <select id="selectChampion">
                <option>Choose a champion</option>
            </select>

        </div>
    );
}

export default Filters;