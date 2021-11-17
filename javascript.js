// Set internal variables
let playerScore = 0;
let computerScore = 0;
let roundsLeft = 5;
let ongoingGame = false;

// Set DOM elements
const infoCont = document.querySelector('.info-container');
const playerScoreElem = document.querySelector('.player-text');
const computerScoreElem = document.querySelector('.computer-text');
const roundsLeftElem = document.querySelector('.rounds-meter');


function computerPlay() {
    // Returns either Rock, Paper, or Scissors at random.
    // Input: nothing
    // Output: A string with as value 'Rock', 'Paper', or 'Scissors'

    // - Get a number between 0 and 3.
    let num = Math.random() * 3;
    // - Round it up.
    num = Math.ceil(num);

    if (num === 1) {
        return 'rock';
    } else if (num === 2) {
        return 'paper';
    } else if (num === 3) {
        return 'scissors';
    }
}

function addEventListeners() {
    //Adds event listeners to every button on page.
    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener("click", function(e) {
            if (ongoingGame === true) {
                let playerSelection = button.dataset.key;
                let computerSelection = computerPlay();
                highlightChoices(playerSelection, computerSelection);

                let roundResult = playRound(playerSelection, computerSelection);
                updateScore(roundResult, playerSelection, computerSelection)
            } else {
                playerScore = 0;
                computerScore = 0;
                roundsLeft = 5;
                ongoingGame = true;
                playerScoreElem.textContent = `You: ${playerScore}`;
                computerScoreElem.textContent = `Computer: ${computerScore}`;
                //Delete old round results
                removeElementsByClass('result-old');
                removeElementsByClass('result-new');
                button.click()
            }
        })
    })
}

function playRound(playerSelection, computerSelection) {
    // Plays a round of rock-paper-scissors. 

    // Input: 
    // 	- a string signifying the player's selection
    // 	- a string signifying the computer's selection

    // output:
    // 	- a string with as value either:
    // 		- 'player'
    // 		- 'comp'
    //      - 'draw'


    // Figure out which combination of elements has been played.

    comb = playerSelection + computerSelection;

    // Per combination, figure out who won / if drawn.

    // Rock + Scissors combination:
    if (comb === 'rockscissors' || comb === 'scissorsrock') {
        if (playerSelection === 'rock') {
            winStatus = 'player';
        } else {
            winStatus = 'comp';
        }
    }

    // Rock + Paper combination:
    else if (comb === 'paperrock' || comb === 'rockpaper') {
        if (playerSelection === 'paper') {
            winStatus = 'player';
        } else {
            winStatus = 'comp';
        }
    }

    // Scissors + Paper combination:
    else if (comb === 'scissorspaper' || comb === 'paperscissors') {
        if (playerSelection === 'scissors') {
            winStatus = 'player';
        } else {
            winStatus = 'comp';
        }
    }

    // Draw
    else {
        winStatus = 'draw';
    }

    return winStatus
}

function highlightChoices(playerSelection, computerSelection) {
    // Gives the divs assosiated with playerSelection and computerSelection the classes player-choice and computer-choice for a set time, then removes them.
    const playerDiv = document.getElementById(`player-${playerSelection}`);
    const computerDiv = document.getElementById(`computer-${computerSelection}`)

    playerDiv.classList.add('player-choice')
    computerDiv.classList.add('computer-choice')
    setTimeout(() => {
        playerDiv.classList.remove('player-choice');
        computerDiv.classList.remove('computer-choice');
    }, 550)
}

function updateScore(roundResult, playerSelection, computerSelection) {
    switch (roundResult) {
        case "player":
            playerScore += 1;
            roundsLeft -= 1;
            // Update player score element
            playerScoreElem.textContent = `You: ${playerScore}`;
            //add p element to info container
            fadeOldResults()
            RoundResultElem = document.createElement('p')
            RoundResultElem.classList.add('result-new')
            RoundResultElem.innerHTML = `You win! <span class="blue-text">${playerSelection}</span> beats <span class="red-text">${computerSelection}!`
            infoCont.appendChild(RoundResultElem)
            break;
        case "comp":
            computerScore += 1;
            roundsLeft -= 1;
            // Update computer score element
            computerScoreElem.textContent = `Computer: ${computerScore}`;
            //add p element to info container
            fadeOldResults()
            RoundResultElem = document.createElement('p')
            RoundResultElem.classList.add('result-new')
            RoundResultElem.innerHTML = `You lose! <span class="red-text">${computerSelection}</span> beats <span class="blue-text">${playerSelection}</span>!`
            infoCont.appendChild(RoundResultElem)
            break;
        case "draw":
            roundsLeft -= 1;
            //add p element to info container
            fadeOldResults()
            RoundResultElem = document.createElement('p')
            RoundResultElem.classList.add('result-new')
            RoundResultElem.innerHTML = `Draw!`
            infoCont.appendChild(RoundResultElem)
            break;

    }
    roundsLeftElem.textContent = `Rounds left: ${roundsLeft}`

    if (roundsLeft === 0) {
        displayWinner(computerScore, playerScore);
        ongoingGame = false;
    }

}

function fadeOldResults() {
    oldResultsElem = document.querySelectorAll('.result-new');
    oldResultsElem.forEach((resultElem) => {
        resultElem.classList.remove('result-new');
        resultElem.classList.add('result-old');
    })
}

function displayWinner(computerScore, playerScore) {

    //Display winner
    if (computerScore > playerScore) {
        roundsLeftElem.textContent = 'You Lose'
    } else if (playerScore > computerScore) {
        roundsLeftElem.textContent = 'You Win!'
    } else {
        roundsLeftElem.textContent = 'Draw'
    }
}

function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}



addEventListeners();