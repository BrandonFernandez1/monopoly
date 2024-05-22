const numberButton = document.querySelector("#storeValueButton");

numberButton.addEventListener("click", () => {
    const numberOfPlayers = document.querySelector("#numberPlayers").value;
    
    
})

function createGame(playerCount) {
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("player-cards");

    document.body.appendChild(containerDiv);
    
    for (let i = 0; i < playerCount; i++) {
        const player = document.createElement("div");

        const playerName = document.createElement("div");
        playerName.value = //...
        player.appendChild(playerName);
    }
}