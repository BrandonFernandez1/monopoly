const createGameButton = document.querySelector("#start-button");
const playerCountInput = document.querySelector("#player-count");
const startingBalance = document.querySelector("#starting-balance");

createGameButton.addEventListener("click", () => {
    if (playerCountInput.value == '') {
        console.log("Please input a number between 1-4.")
    } else if (startingBalance.value == '') {
        console.log("Please input a valid starting balance.")
    } else {
        const playerCount = parseInt(playerCountInput.value)
        const startingBalance = parseInt(startingBalance.value);

        const playerNames = getPlayerNames(sum);
        //createGame(playerCount, startingBalance);
    }
})

function createGame(playerCount, startingBalance) {
    const startingElements = document.querySelector(".start");
    if (startingElements) startingElements.remove();

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

function getPlayerNames(count) {
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("name-form");

    for (let i = 0; i < count; i++) {
        const formLabel = document.createElement("label");
        formLabel.setAttribute("for", `player-${i + 1}`);
    }
}