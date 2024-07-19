document.addEventListener("DOMContentLoaded", () => {
    const ROCK = 1;
    const PAPER = 2;
    const SCISSORS = 3;

    let gameMode, rounds, currentRound = 1;
    let player1Score = 0, player2Score = 0;
    let player1Choice, player2Choice;

    const gameModeDiv = document.getElementById("gameMode");
    const roundsDiv = document.getElementById("rounds");
    const gameDiv = document.getElementById("game");
    const finalScoreDiv = document.getElementById("finalScore");

    const pvcButton = document.getElementById("pvc");
    const pvpButton = document.getElementById("pvp");
    const startGameButton = document.getElementById("startGame");
    const nextRoundButton = document.getElementById("nextRound");
    const endGameButton = document.getElementById("endGame");
    const playAgainButton = document.getElementById("playAgain");

    const roundsInput = document.getElementById("roundsInput");
    const currentRoundSpan = document.getElementById("currentRound");
    const resultMessage = document.getElementById("resultMessage");
    const player1ScoreSpan = document.getElementById("player1Score");
    const player2ScoreSpan = document.getElementById("player2Score");

    pvcButton.addEventListener("click", () => {
        startGameSetup(1);
    });

    pvpButton.addEventListener("click", () => {
        startGameSetup(2);
    });

    startGameButton.addEventListener("click", () => {
        rounds = parseInt(roundsInput.value);
        roundsDiv.classList.add("hidden");
        gameDiv.classList.remove("hidden");
        setupNextRound();
    });

    function startGameSetup(mode) {
        gameMode = mode;
        gameModeDiv.classList.add("hidden");
        roundsDiv.classList.remove("hidden");
    }

    function setupNextRound() {
        currentRoundSpan.textContent = currentRound;
        toggleVisibility("player1", false);
        toggleVisibility("player2", true);
        toggleVisibility("results", true);
    }

    document.querySelectorAll("#player1 .choice").forEach(button => {
        button.addEventListener("click", (e) => {
            player1Choice = parseInt(e.target.parentElement.getAttribute("data-choice"));
            if (gameMode === 1) {
                player2Choice = getComputerChoice();
                showResults();
            } else {
                toggleVisibility("player1", true);
                toggleVisibility("player2", false);
            }
        });
    });

    document.querySelectorAll("#player2 .choice").forEach(button => {
        button.addEventListener("click", (e) => {
            player2Choice = parseInt(e.target.parentElement.getAttribute("data-choice"));
            showResults();
        });
    });

    nextRoundButton.addEventListener("click", () => {
        if (++currentRound <= rounds) {
            setupNextRound();
        } else {
            endGame();
        }
    });

    endGameButton.addEventListener("click", endGame);

    playAgainButton.addEventListener("click", resetGame);

    function getComputerChoice() {
        return Math.floor(Math.random() * 3) + 1;
    }

    function determineWinner(choice1, choice2) {
        if (choice1 === choice2) return 0;
        if ((choice1 === ROCK && choice2 === SCISSORS) ||
            (choice1 === PAPER && choice2 === ROCK) ||
            (choice1 === SCISSORS && choice2 === PAPER)) return 1;
        return 2;
    }

    function displayChoice(choice) {
        switch (choice) {
            case ROCK: return "Rock";
            case PAPER: return "Paper";
            case SCISSORS: return "Scissors";
        }
    }

    function showResults() {
        toggleVisibility("results", false);
        const winner = determineWinner(player1Choice, player2Choice);

        resultMessage.textContent = winner === 0 ? `It's a tie!` :
                                    winner === 1 ? `Player 1 wins!` :
                                                   `Player 2 wins!`;
        if (winner === 1) player1Score++;
        if (winner === 2) player2Score++;

        player1ScoreSpan.textContent = player1Score;
        player2ScoreSpan.textContent = player2Score;

        if (gameMode === 1) {
            resultMessage.textContent += ` Computer chose ${displayChoice(player2Choice)}.`;
        }
    }

    function endGame() {
        gameDiv.classList.add("hidden");
        finalScoreDiv.classList.remove("hidden");
    }

    function resetGame() {
        currentRound = 1;
        player1Score = 0;
        player2Score = 0;
        finalScoreDiv.classList.add("hidden");
        gameModeDiv.classList.remove("hidden");
    }

    function toggleVisibility(elementId, hidden) {
        document.getElementById(elementId).classList.toggle("hidden", hidden);
    }
});
