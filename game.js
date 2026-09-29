const choices = document.querySelectorAll(".choice");

const playerChoiceDisplay = document.querySelector("#player-choice");
const computerChoiceDisplay = document.querySelector("#computer-choice");
const resultDisplay = document.querySelector("#result");

const playerScoreDisplay = document.querySelector("#player-score");
const computerScoreDisplay = document.querySelector("#computer-score");
const resetButton = document.querySelector("#reset-button");

let playerScore = 0;
let computerScore = 0;

const handIcons = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
};

choices.forEach(function (button) {

    button.addEventListener("click", function () {

        const playerChoice = button.dataset.choice;

        playGame(playerChoice);

    });

});


async function playGame(playerChoice) {

    const formData = new FormData();

    formData.append("choice", playerChoice);

    const response = await fetch("game.php", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (!data.success) {
        resultDisplay.textContent = data.message;
        return;
    }

    playerChoiceDisplay.textContent = handIcons[data.playerChoice];

    computerChoiceDisplay.textContent = handIcons[data.computerChoice];

    if (data.result === "win") {
        resultDisplay.textContent = "You Win! 🎉";

        playerScore++;
        playerScoreDisplay.textContent = playerScore;

    } else if (data.result === "lose") {
        resultDisplay.textContent = "You Lose!";

        computerScore++;
        computerScoreDisplay.textContent = computerScore;

    } else {
        resultDisplay.textContent = "Draw!";
}
resetButton.addEventListener("click", function () {

    playerScore = 0;
    computerScore = 0;

    playerScoreDisplay.textContent = 0;
    computerScoreDisplay.textContent = 0;

    playerChoiceDisplay.textContent = "❔";
    computerChoiceDisplay.textContent = "❔";

    resultDisplay.textContent = "Choose your hand!";

});


}

