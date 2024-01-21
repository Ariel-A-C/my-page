let renderDiv = document.getElementById('render');
let combatDiv = document.getElementById('combat');
let introductionDiv = document.getElementById('introduction');
let options = [];
let usedIDsPlayer1 = [];
let usedIDsPlayer2 = [];
let selectedCharacterPlayer1 = null;
let selectedCharacterPlayer2 = null;
let uniqueCounterPlayer1 = 0;
let uniqueCounterPlayer2 = 0;
let currentPlayer = 'player1';

function getCharacters() {
    fetch('https://ariel-a-c.github.io/my-page/JS+AI/characters.json')
        .then((response) => response.json())
        .then((characters) => {
            for (let i = 0; i < characters.length; i++) {
                const id = characters[i].id;
                const name = characters[i].name;
                const atk = characters[i].atk;
                const def = characters[i].def;
                const speed = characters[i].speed;
                const hp = characters[i].hp;
                const img = "https://ariel-a-c.github.io/my-page/JS+AI/img/" + characters[i].name + ".png";

                options.push([id, name, atk, def, speed, hp, img]);
            }
            start();
        });
}

getCharacters();

function start() {
    renderPlayer1();
}

function renderPlayer1() {
    renderDiv.innerHTML = ""; // Clear the renderDiv

    // Render Player 1 buttons
    while (uniqueCounterPlayer1 < 5) {
        renderCharacterButton('player1');
        uniqueCounterPlayer1 += 1;
    }

    // Display turn information
    introductionDiv.innerHTML = "Player 1, it's your turn to select a character";
}

function renderPlayer2() {
    renderDiv.innerHTML = ""; // Clear the renderDiv

    // Render Player 2 buttons with characters not shown to Player 1
    while (uniqueCounterPlayer2 < 5) {
        renderCharacterButton('player2');
        uniqueCounterPlayer2 += 1;
    }

    // Display turn information
    introductionDiv.innerHTML = "Player 2, it's your turn to select a character";
}

function renderCharacterButton(player) {
    const character = getRandomUnusedCharacter(player);
    const temp = document.getElementById("template");
    const clonedTemplate = temp.content.cloneNode(true);

    let cardDiv = clonedTemplate.querySelector(".card");
    let nameDiv = clonedTemplate.querySelector(".name");
    let imageDiv = clonedTemplate.querySelector(".image");
    let atk_defDiv = clonedTemplate.querySelector(".atk_def");
    let speedDiv = clonedTemplate.querySelector(".speed");
    let hpDiv = clonedTemplate.querySelector(".hp");

    cardDiv.setAttribute("cardid", character[0]);
    cardDiv.setAttribute("onclick", `select${player === 'player1' ? 'Player1' : 'Player2'}(this)`);

    nameDiv.textContent = character[1];
    imageDiv.setAttribute("src", character[6]);
    atk_defDiv.textContent = character[2] + " atk | " + character[3] + " def";
    speedDiv.textContent = character[4] + " speed";
    hpDiv.textContent = character[5] + " hp";

    renderDiv.appendChild(clonedTemplate);
}

function getRandomUnusedCharacter(player) {
    let rID;
    let usedIDs;
    let availableOptions;

    if (player === 'player1') {
        usedIDs = usedIDsPlayer1;
        availableOptions = options;
    } else {
        usedIDs = usedIDsPlayer2.concat(usedIDsPlayer1);
        availableOptions = options.filter(([id]) => !usedIDs.includes(id.toString()) && !usedIDsPlayer1.includes(id.toString()));
    }

    do {
        rID = Math.floor(Math.random() * availableOptions.length);
    } while (usedIDs.includes(availableOptions[rID][0].toString()));

    usedIDs.push(availableOptions[rID][0].toString());

    if (player === 'player1') {
        selectedCharacterPlayer1 = availableOptions[rID];
        usedIDsPlayer1.push(availableOptions[rID][0].toString());
    } else {
        selectedCharacterPlayer2 = availableOptions[rID];
        usedIDsPlayer2.push(availableOptions[rID][0].toString());
    }

    return availableOptions[rID];
}

function selectPlayer1(button) {
    const cardID = button.getAttribute("cardid");
    const selectedCharacter = options[cardID];
    console.log("Player 1 selected:", selectedCharacter);
    selectedCharacterPlayer1 = selectedCharacter;

    // Disable remaining buttons for Player 1
    disableRemainingButtons('player1');

    // Switch to Player 2's turn
    setTimeout(() => {
        currentPlayer = 'player2';
        renderPlayer2();
    }, 1000); // Add a delay for better visibility (1 second in this example)
}

function selectPlayer2(button) {
    const cardID = button.getAttribute("cardid");
    const selectedCharacter = options[cardID];
    console.log("Player 2 selected:", selectedCharacter);
    selectedCharacterPlayer2 = selectedCharacter;

    // Disable remaining buttons for Player 2
    disableRemainingButtons('player2');

    // Call the displaySelectedCharacters function after a delay (for visibility)
    setTimeout(displaySelectedCharacters, 1000); // 2 seconds delay
    setTimeout(combat, 1000); // 3 seconds delay (you can adjust this as needed)
}


function disableRemainingButtons(player) {
    const buttons = document.querySelectorAll('.card');
    buttons.forEach((button) => {
        button.disabled = true;
    });
}

function displaySelectedCharacters() {
    renderDiv.innerHTML = ""; // Clear the renderDiv

    // Render the selected characters
    renderSelectedCharacter(selectedCharacterPlayer1, 'Player 1');
    renderSelectedCharacter(selectedCharacterPlayer2, 'Player 2');
}

function renderSelectedCharacter(character, player) {
    const temp = document.getElementById("template");
    const clonedTemplate = temp.content.cloneNode(true);

    let cardDiv = clonedTemplate.querySelector(".card");
    let nameDiv = clonedTemplate.querySelector(".name");
    let imageDiv = clonedTemplate.querySelector(".image");
    let atk_defDiv = clonedTemplate.querySelector(".atk_def");
    let speedDiv = clonedTemplate.querySelector(".speed");
    let hpDiv = clonedTemplate.querySelector(".hp");

    cardDiv.removeAttribute("onclick"); // Remove the click event

    nameDiv.textContent = character[1];
    imageDiv.setAttribute("src", character[6]);
    atk_defDiv.textContent = character[2] + " atk | " + character[3] + " def";
    speedDiv.textContent = character[4] + " speed";
    hpDiv.textContent = character[5] + " hp";

    renderDiv.appendChild(clonedTemplate);

    introductionDiv.innerHTML = "";
}

function combat() {
    const player1Character = selectedCharacterPlayer1;
    const player2Character = selectedCharacterPlayer2;

    let attacker = player1Character[4] > player2Character[4] ? player1Character : player2Character;
    let defender = attacker === player1Character ? player2Character : player1Character;

    // Create a new div for combat log
    const combatLogDiv = document.createElement("div");
    combatLogDiv.classList.add("combat-log");
    combatDiv.appendChild(combatLogDiv);

    // Display combat starts message
    addCombatLogMessage(combatLogDiv, "Combat starts between " + player1Character[1] + " and " + player2Character[1]);

    while (player1Character[5] > 0 && player2Character[5] > 0) {
        // Attacker attacks defender
        let damage;
        if (attacker[2] > defender[3]) {
            // If attacker's attack is greater than defender's defense
            damage = attacker[2] - defender[3];
        } else {
            // If attacker's attack is equal or less than defender's defense
            damage = 10;
        }

        // Update defender's health
        defender[5] = Math.max(0, defender[5] - damage);

        // Add combat log message for the attacker's turn
        addCombatLogMessage(combatLogDiv, attacker[1] + " attacked and did " + damage + " damage.");
        addCombatLogMessage(combatLogDiv, player1Character[1] + "'s hp = " + player1Character[5] +
                            " | " + player2Character[1] + "'s hp = " + player2Character[5]);

        // Check if the defender is defeated mid-round
        if (defender[5] === 0) {
            break; // Exit the loop if the defender is defeated
        }

        // Swap roles for the next turn
        [attacker, defender] = [defender, attacker];
    }

    // Determine the winner
    const winner = player1Character[5] > 0 ? "Player 1" : "Player 2";
    // Add combat log message for the winner
    addCombatLogMessage(combatLogDiv, "Combat ends. Winner: " + winner);

    // Remove the click event from combatDiv
    combatDiv.removeAttribute("onclick");
}

function addCombatLogMessage(parent, message) {
    const pElement = document.createElement("p");
    pElement.textContent = message;
    parent.appendChild(pElement);
}
