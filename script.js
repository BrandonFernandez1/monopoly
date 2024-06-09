const createNameFormButton = document.querySelector("#start-button");
const playerCountInput = document.querySelector("#player-count");
const startingBalance = document.querySelector("#starting-balance");
const startingElements = document.querySelector(".start");

const playerCount = parseInt(playerCountInput.value);
const balance = parseInt(startingBalance.value);

createNameFormButton.addEventListener("click", () => {
    if (playerCountInput.value == '') {
        console.log("Please input a number between 1-4.")
    } else if (startingBalance.value == '') {
        console.log("Please input a valid starting balance.")
    } else {
        createPlayerNameForm(playerCountInput.value);
        pressPlayerFormSubmitButton(playerCountInput.value, startingBalance.value);
    }
})

function playerFormSubmitButton(count, balance) {
    const nameSubmitButton = document.querySelector("#name-button");

    nameSubmitButton.addEventListener("click", () => {
        createGame(count, balance);
        console.log(`count: ${count}, balance: ${balance}`);
    });
}

function createPlayerNameForm(count) {
    if (startingElements) startingElements.remove();

    const nameContainerDiv = document.createElement("div");
    nameContainerDiv.classList.add("name-form");

    const formHeader = document.createElement("h1");
    formHeader.textContent = "Add Player Names";
    nameContainerDiv.appendChild(formHeader);

    for (let i = 0; i < count; i++) {
        const formDiv = document.createElement("div");
        formDiv.classList.add("player")
  
        const formLabel = document.createElement("label");
        formLabel.setAttribute("for", `player-${i + 1}`);
        formLabel.textContent = `Player ${i + 1}`;

        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("name", `player-${i + 1}`);

        nameContainerDiv.appendChild(formDiv);
        formDiv.appendChild(formLabel);
        formDiv.appendChild(nameInput);
    }
    const nameSubmitButton = document.createElement("button");
    nameSubmitButton.setAttribute("id", "name-button");
    nameSubmitButton.textContent = "Submit";
    nameContainerDiv.appendChild(nameSubmitButton);
    
    document.body.appendChild(nameContainerDiv);
    console.log(nameContainerDiv);
}

function createGame(playerCount, startingBalance) {
    const nameForm = document.querySelector(".name-form")
    if (nameForm) nameForm.remove();

    const parentDiv = document.createElement("div");
    parentDiv.classList.add("parent")
    document.body.appendChild(parentDiv);

    for (let i = 0; i < playerCount; i++) {
        const playerContainerDiv = document.createElement("div");
        playerContainerDiv.classList.add("player-container");

        const playerImage = document.createElement("div");
        playerImage.classList.add("player-image");

        const playerName = document.createElement("div");
        playerName.textContent = `Player ${i + 1}`;
        playerName.classList.add("player-text");
        playerName.setAttribute("id", "player-name");

        const playerBalance = document.createElement("div");
        playerBalance.textContent = `Balance: ${startingBalance}`;
        playerBalance.classList.add("player-text");
        playerBalance.setAttribute("id", "player-balance");

        playerContainerDiv.appendChild(playerImage);
        playerContainerDiv.appendChild(playerName);
        playerContainerDiv.appendChild(playerBalance);
       
        parentDiv.appendChild(playerContainerDiv);
    }
    console.log(parentDiv);
}

function showPlayerNameModal(playerCount) {
    const playerForm = document.querySelector("dialog");
    
    for (let i = 0; i < playerCount; i++) {
        const playerLabel = document.createElement("label");
        playerLabel.setAttribute("for", `player-${i + 1}`);
        playerForm.appendChild(playerLabel)

        const playerNameInput = document.createElement("input");
        playerNameInput.setAttribute("name", `player-${i + 1}`);
        playerNameInput.setAttribute("type", "number");
        playerForm.appendChild(playerNameInput);
    }

    const cancelButton = document.createElement("button");
    cancelButton.setAttribute("id", "cancel-button");
    cancelButton.addEventListener("click", () => {
        const inputs = document.querySelectorAll("input");
        inputs.value = '';
        playerForm.close();
    })
}