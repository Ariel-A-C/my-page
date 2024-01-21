name = characters[i].name;
atk = characters[i].atk;
def = characters[i].def;
speed = characters[i].speed;
hp = characters[i].hp;
img = "https://ariel-a-c.github.io/my-page/JS+AI/" + characters[i].img;

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