let renderDiv = document.getElementById('render');
let options = [];

function getCharacters() {
    fetch('https://ariel-a-c.github.io/my-page/JS+AI/characters.json')
    .then((response) => response.json())
    .then((characters) => {
        for (let i = 0; i < characters.length; i++) {
            console.log(characters[i]);
            
            const name = characters[i].name;
            const atk = characters[i].atk;
            const def = characters[i].def;
            const speed = characters[i].speed;
            const hp = characters[i].hp;
            const img = "https://ariel-a-c.github.io/my-page/JS+AI/img/" + characters[i].name + ".png";

            const temp = document.getElementById("template");
            const clonedTemplate = temp.content.cloneNode(true);
            let cardDiv = clonedTemplate.querySelector(".card");
            let nameDiv = clonedTemplate.querySelector(".name");
            let imageDiv = clonedTemplate.querySelector(".image");
            let atk_defDiv = clonedTemplate.querySelector(".atk_def");
            let speedDiv = clonedTemplate.querySelector(".speed");
            let hpDiv = clonedTemplate.querySelector(".hp");

            cardDiv.setAttribute("id", i);
            nameDiv.textContent = name;
            imageDiv.setAttribute("src", img);
            atk_defDiv.textContent = atk + "atk | "+ def + "def";
            speedDiv.textContent = speed + "speed";
            hpDiv.textContent = hp + "hp";
            const out = document.querySelector("#render");
            out.appendChild(clonedTemplate);
            
            options.push([name, atk, def, speed, hp, img]);
        }
        abc();
    });
}

getCharacters();

function abc() {
    usedIDs = []
    rID = Math.floor(Math.random() * 10);
    console.log(rID);
    if (!(rID in usedIDs)) {
        
    }
    
}
