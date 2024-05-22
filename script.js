const createGameButton = document.querySelector("#start-button");
const playerCountInput = document.querySelector("#player-count");
const startingBalance = document.querySelector("#starting-balance");

createGameButton.addEventListener("click", () => {
    if (playerCountInput.value == '') {
        // console.log("Please input a number between 1-4.")
    } else if (startingBalance.value == '') {
        // console.log("Please input a valid starting balance.")
    } else {
        createGame(4, 2000)
    }
})

function createGame(playerCount, startingBalance) {
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
        playerBalance.textContent = startingBalance;
        playerBalance.classList.add("player-text");
        playerBalance.setAttribute("id", "player-balance");

        playerContainerDiv.appendChild(playerImage);
        playerContainerDiv.appendChild(playerName);
        playerContainerDiv.appendChild(playerBalance);
       
        parentDiv.appendChild(playerContainerDiv);
    }
    console.log(parentDiv);
}