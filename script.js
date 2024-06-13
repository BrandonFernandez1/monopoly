const initializeGameButton = document.querySelector("#start-button");
const playerCountInput = document.querySelector("#player-count");
const startingBalance = document.querySelector("#starting-balance");
const startingElements = document.querySelector(".start");
const playerNameModal = document.querySelector("dialog");

let players = [];

initializeGameButton.addEventListener("click", () => {
    if (playerCountInput.value == '') { //How to make sure the user inputs only between 1 and 4. 
        console.log("Please input a number between 1-4.")
    } else if (startingBalance.value == '') {
        console.log("Please input a valid starting balance.")
    } else {
        showPlayerNameModal(playerCountInput.value);
        modalButtonEventListeners();
    }
})

function Player(name, balance, bankrupt) {
    this.name = name;
    this.balance = parseInt(balance); //Have to parseInt to ensure all updates don't concatenate
    this.bankrupt = bankrupt;
    this.passGo = function () {
        this.balance += 200;
    }
}

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

        inputs.forEach((input) => {
            const player = new Player(input.value, startingBalance.value, false);
            players.push(player);
        });
        
        const bank = new Player("Bank", 1000000, false);
        const freeParking = new Player("Free Parking", 0, false);
        players.push(bank, freeParking);

        playerNameModal.close();
        createGame(players);
        //Call functions that make website work here
        createTransactionModal();
        passGo();
    })
}

function createGame(playerArray) {
    if (playerNameModal) playerNameModal.remove();

    const length = playerArray.length - 2;
    const lastElement = playerArray.length - 1;

    const parentDiv = document.createElement("div");
    parentDiv.classList.add("parent");
    document.body.appendChild(parentDiv);
    
    for (let i = 0; i < length; i++) {
        const playerContainerDiv = document.createElement("div");
        playerContainerDiv.classList.add("player-container");
        playerContainerDiv.setAttribute("id", `player-${i + 1}-parent`);

        const playerImage = document.createElement("div");
        playerImage.classList.add("player-image");

        const playerName = document.createElement("div");
        playerName.textContent = `${playerArray[i].name}`;
        playerName.classList.add("player-text");

        const playerBalance = document.createElement("div");
        playerBalance.textContent = `Balance: ${playerArray[i].balance}`;
        playerBalance.classList.add("player-balance");

        const passGoContainer = document.createElement("div");
        passGoContainer.classList.add("pass-go-container");

        const passGoArrow = document.createElement("div");
        passGoArrow.textContent = "→";
        passGoArrow.classList.add("pass-go-arrow");
        passGoContainer.appendChild(passGoArrow);
        
        const passGoButton = document.createElement("button");
        passGoButton.classList.add("pass-go");
        passGoButton.setAttribute("id", `player-${i + 1}-go-button`);
        passGoButton.textContent = "GO";
        passGoContainer.appendChild(passGoButton);

        playerContainerDiv.appendChild(playerImage);
        playerContainerDiv.appendChild(playerName);
        playerContainerDiv.appendChild(playerBalance);
        playerContainerDiv.appendChild(passGoContainer);

        parentDiv.appendChild(playerContainerDiv);
    }

    const bankContainer = document.createElement("div")
    bankContainer.classList.add("player-container");
    
    const bankImage = document.createElement("div");
    bankImage.classList.add("bank-image");

    const bankName = document.createElement("div");
    bankName.classList.add("player-text");
    bankName.textContent = "Bank";

    const bankBalance = document.createElement("div");
    bankBalance.classList.add("bank-balance");
    bankBalance.textContent = `Balance: ∞`;

    bankContainer.appendChild(bankImage);
    bankContainer.appendChild(bankName);
    bankContainer.appendChild(bankBalance);
    document.body.appendChild(bankContainer);
    
    
    const freeParkingContainer = document.createElement("div");
    freeParkingContainer.classList.add("player-container");

    const freeParkingImage = document.createElement("div");
    freeParkingImage.classList.add("free-parking-image");

    const freeParkingName = document.createElement("div");
    freeParkingName.classList.add("player-text");
    freeParkingName.textContent = "Free Parking";

    const freeParkingBalance = document.createElement("div");
    freeParkingBalance.classList.add("player-balance");
    freeParkingBalance.textContent = `Balance: ${players[lastElement].balance}`;

    freeParkingContainer.appendChild(freeParkingImage);
    freeParkingContainer.appendChild(freeParkingName);
    freeParkingContainer.appendChild(freeParkingBalance);
    document.body.appendChild(freeParkingContainer);
}

function checkStartingInput(input) {
    const number = Number(input);
    if (Number.isInteger(number) && input > 0 && input < 4) return true;
    else return false;
}

function passGo() {
    const passGoButton = document.querySelectorAll(".pass-go");
    const playerBalanceElements = document.querySelectorAll(".player-balance");

    passGoButton.forEach((button) => {
        button.addEventListener("click", () => {
            for (let i = 0; i < playerCountInput.value; i++) {
                if (button.id.includes(i + 1)) {
                    players[i].passGo();
                    playerBalanceElements[i].textContent = `Balance: ${players[i].balance}`;
                    break;
                }
            }
        })
    })
}

function createTransactionModal() {
    //Create a modal for transactions. Gonna try with checkboxes first
    //3 lines of code are the same when populating payers and receivers. Make a function for this in the future??

    const modalContentDiv = document.createElement("div");
    modalContentDiv.classList.add("transaction-main");

    const transactionModal = document.createElement("dialog");
    transactionModal.classList.add("transaction-modal");
    
    const payerContainer = document.createElement("div");
    payerContainer.classList.add("transactor");
    const payerHeader = document.createElement("h1");
    payerHeader.textContent = "Select payer(s)";
    const payingPlayers = populateTransactionModal(playerCountInput.value, players);
    payerContainer.appendChild(payerHeader);
    payerContainer.appendChild(payingPlayers);

    const amountDiv = document.createElement("div");
    amountDiv.classList.add("amount");
    const amountHeader = document.createElement("p");
    amountHeader.classList.add("amount-header");
    amountHeader.textContent = "Amount";
    const amountInput = document.createElement("input");
    amountInput.setAttribute("type", "number");
    amountDiv.appendChild(amountHeader);
    amountDiv.appendChild(amountInput);

    const receiverContainer = document.createElement("div");
    receiverContainer.classList.add("transactor");
    const receiverHeader = document.createElement("h1");
    receiverHeader.textContent = "Select receiver(s)";
    const receivingPlayers = populateTransactionModal(playerCountInput.value, players);
    receiverContainer.appendChild(receiverHeader);
    receiverContainer.appendChild(receivingPlayers);

    modalContentDiv.appendChild(payerContainer);
    modalContentDiv.appendChild(amountDiv);
    modalContentDiv.appendChild(receiverContainer);
    transactionModal.appendChild(modalContentDiv);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("transaction-buttons");

    for (let i = 0; i < 2; i++){ 
        const button = document.createElement("button");
        
        if (i == 0) {
            button.textContent = "Cancel";
            button.setAttribute("id", "payment-cancel-button");
            //paymentButtonEventListener(button);
        } else {
            button.textContent = "Confirm";
            button.setAttribute("id", "payment-confirm-button");
            //paymentButtonEventListener(button);
        }
        buttonsDiv.appendChild(button);
    }
    transactionModal.appendChild(buttonsDiv);

    document.body.appendChild(transactionModal);
    transactionModal.show(); //Remove once modal has been completed!!!
}

function populateTransactionModal (playerCount, array) {
    const container = document.createElement("div");
    container.classList.add("checkboxes");

    for (let i = 0; i < playerCount; i++) {
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");

        const checkboxLabel = document.createElement("label");
        checkboxLabel.textContent = array[i].name;

        container.appendChild(checkBox);
        container.appendChild(checkboxLabel);
        container.appendChild(document.createElement("br"));
    }

    const bankTransactor = document.createElement("input");
    bankTransactor.setAttribute("type", "checkbox");
    const bankTransactorLabel = document.createElement("label");
    bankTransactorLabel.textContent = "Bank";

    const freeParkingTransactor = document.createElement("input");
    freeParkingTransactor.setAttribute("type", "checkbox");
    const freeParkingTransactorLabel = document.createElement("label");
    freeParkingTransactorLabel.textContent = "Free Parking";

    container.appendChild(bankTransactor);
    container.appendChild(bankTransactorLabel);
    container.appendChild(document.createElement("br"));
    container.appendChild(freeParkingTransactor);
    container.appendChild(freeParkingTransactorLabel);
    
    return container;
}

function paymentButtonEventListener(button) {
    if (button.textContent == "Confirm") {
        button.addEventListener("click", () => {
            
        })
    }
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