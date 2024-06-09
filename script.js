const initializeGameButton = document.querySelector("#start-button");
const playerCountInput = document.querySelector("#player-count");
const startingBalance = document.querySelector("#starting-balance");
const startingElements = document.querySelector(".start");
const playerNameModal = document.querySelector("dialog");

const playerCount = parseInt(playerCountInput.value);
const balance = parseInt(startingBalance.value);

initializeGameButton.addEventListener("click", () => {
    if (playerCountInput.value == '') {
        console.log("Please input a number between 1-4.")
    } else if (startingBalance.value == '') {
        console.log("Please input a valid starting balance.")
    } else {
        showPlayerNameModal(playerCountInput.value);
        modalButtonEventListeners();
    }
})

function showPlayerNameModal(count) {
    const inputForm = document.createElement("form");
    playerNameModal.appendChild(inputForm);
    
    for (let i = 0; i < count; i++) {
        const label = document.createElement("label");
        label.setAttribute("for", `player-${i + 1}`);
        label.textContent = `Player ${i + 1}`;
        inputForm.appendChild(label);

        const nameInput = document.createElement("input");
        nameInput.classList.add("player-name-input");
        nameInput.setAttribute("id", `player-${i + 1}`);
        nameInput.setAttribute("type", "text");
        inputForm.appendChild(nameInput);
    }
    
    const cancelModalButton = document.createElement("button");
    cancelModalButton.setAttribute("id", "cancel-button");
    cancelModalButton.classList.add("form-button");
    cancelModalButton.textContent = "Cancel"
    playerNameModal.appendChild(cancelModalButton);

    const confirmModalButton = document.createElement("button");
    confirmModalButton.setAttribute("id", "confirm-button");
    confirmModalButton.classList.add("form-button");
    confirmModalButton.textContent = "Confirm";
    playerNameModal.appendChild(confirmModalButton);

    playerNameModal.show();
}

function modalButtonEventListeners() {
    const cancelButton = document.querySelector("#cancel-button");
    const confirmButton = document.querySelector("#confirm-button");
    
    const formElement = document.querySelector("form");
    const modalButtons = document.querySelectorAll(".form-button");
    const inputs = document.querySelectorAll(".player-name-input");

    cancelButton.addEventListener("click", () => {
        inputs.value = '';

        if (formElement) formElement.remove();
        if (modalButtons) modalButtons.forEach((button) => {button.remove()});
        playerNameModal.close();
    })

    confirmButton.addEventListener("click", () => {
        if (startingElements) startingElements.remove();

        let players = [];

        const bank = new Player("Bank", 1000000, false);
        const freeParking = new Player("Free Parking", 0, false);
        players.push(bank, freeParking);

        inputs.forEach((input) => {
            const player = new Player(input.value, startingBalance.value, false);
            players.push(player);
        });
        
        playerNameModal.close();
        createGame(players);
    })
}

function createGame(playerArray) {
    const length = playerArray.length;
    console.log(playerArray);

    const parentDiv = document.createElement("div");
    parentDiv.classList.add("parent");
    document.body.appendChild(parentDiv);
    
    for (let i = 2; i < length; i++) {
        const playerContainerDiv = document.createElement("div");
        playerContainerDiv.classList.add("player-container");

        const playerImage = document.createElement("div");
        playerImage.classList.add("player-image");

        const playerName = document.createElement("div");
        playerName.textContent = `${playerArray[i].name}`;
        playerName.classList.add("player-text");

        const playerBalance = document.createElement("div");
        playerBalance.textContent = `Balance: ${playerArray[i].balance}`;
        playerBalance.classList.add("player-balance");

        playerContainerDiv.appendChild(playerImage);
        playerContainerDiv.appendChild(playerName);
        playerContainerDiv.appendChild(playerBalance);

        parentDiv.appendChild(playerContainerDiv);
    }
    console.log(parentDiv);
}

function Player(name, balance, bankrupt) {
    this.name = name;
    this.balance = balance;
    this.bankrupt = bankrupt;
}

// function createPlayerNameForm(count) {
//     if (startingElements) startingElements.remove();

//     const nameContainerDiv = document.createElement("div");
//     nameContainerDiv.classList.add("name-form");

//     const formHeader = document.createElement("h1");
//     formHeader.textContent = "Add Player Names";
//     nameContainerDiv.appendChild(formHeader);

//     for (let i = 0; i < count; i++) {
//         const formDiv = document.createElement("div");
//         formDiv.classList.add("player")
  
//         const formLabel = document.createElement("label");
//         formLabel.setAttribute("for", `player-${i + 1}`);
//         formLabel.textContent = `Player ${i + 1}`;

//         const nameInput = document.createElement("input");
//         nameInput.setAttribute("type", "text");
//         nameInput.setAttribute("name", `player-${i + 1}`);

//         nameContainerDiv.appendChild(formDiv);
//         formDiv.appendChild(formLabel);
//         formDiv.appendChild(nameInput);
//     }
//     const nameSubmitButton = document.createElement("button");
//     nameSubmitButton.setAttribute("id", "name-button");
//     nameSubmitButton.textContent = "Submit";
//     nameContainerDiv.appendChild(nameSubmitButton);
    
//     document.body.appendChild(nameContainerDiv);
//     console.log(nameContainerDiv);
// }

// function XcreateGame(playerCount, startingBalance) {
//     const nameForm = document.querySelector(".name-form")
//     if (nameForm) nameForm.remove();

//     const parentDiv = document.createElement("div");
//     parentDiv.classList.add("parent")
//     document.body.appendChild(parentDiv);

//     for (let i = 0; i < playerCount; i++) {
//         const playerContainerDiv = document.createElement("div");
//         playerContainerDiv.classList.add("player-container");

//         const playerImage = document.createElement("div");
//         playerImage.classList.add("player-image");

//         const playerName = document.createElement("div");
//         playerName.textContent = `Player ${i + 1}`;
//         playerName.classList.add("player-text");
//         playerName.setAttribute("id", "player-name");

//         const playerBalance = document.createElement("div");
//         playerBalance.textContent = `Balance: ${startingBalance}`;
//         playerBalance.classList.add("player-text");
//         playerBalance.setAttribute("id", "player-balance");

//         playerContainerDiv.appendChild(playerImage);
//         playerContainerDiv.appendChild(playerName);
//         playerContainerDiv.appendChild(playerBalance);
       
//         parentDiv.appendChild(playerContainerDiv);
//     }
//     console.log(parentDiv);
// }