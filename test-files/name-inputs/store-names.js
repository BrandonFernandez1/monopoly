const nameInputs = document.querySelectorAll("input");
const submitButton = document.querySelector("button");
const numberOfPlayers = 4;

let players = [
    {
        name: "bank",
        balance: 1000000,
        bankrupt: false
    },
    {
        name: "free-parking",
        balance: 0,
        bankrupt: false
    }
]

submitButton.addEventListener("click", () => {
    let playerNames = [];
    for (const nameInput of nameInputs) {
        playerNames.push(nameInput.value);
    }
    
    playerNames.forEach(playerName => {
        players.push({
            name: playerName,
            balance: 2000,
            bankrupt: false
        });
    });
    console.log(players);
})
