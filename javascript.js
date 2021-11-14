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

function playRound(playerSelection, computerSelection) {
    // Plays a round of rock-paper-scissors. 

    // Input: 
    // 	- a string signifying the player's selection
    // 	- a string signifying the computer's selection

    // output:
    // 	- a string telling the player either:
    // 		- 'You won! X beats Y!'
    // 		- 'You lost! X beats Y!'

    playerSelection = playerSelection.toLowerCase();

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

    // Return winner/draw

    if (winStatus === 'player') {
        return `You won! ${playerSelection} beats ${computerSelection}!`;
    } else if (winStatus === 'comp') {
        return `You lost! ${computerSelection} beats ${playerSelection}!`;
    } else {
        return 'Draw!';
    }
}

function game() {
    //Define score variables:
    let playerScore = 0;
    let compScore = 0;
    // Main game loop:
    for (let i = 1; i <= 5; i++) {
        // Get player and computer selection:
        let playerSelection = window.prompt('Enter rock, paper, or scissors:');
        let computerSelection = computerPlay();

        // PLay a round to determine winner:
        let result = playRound(playerSelection, computerSelection);

        // Display the result:
        console.log(result)

        //Counts score:
        if (result.slice(0, 4) === 'You w') {
            playerScore += 1
        } else if (result.slice(0, 4) === 'You l') {
            compScore += 1
        }
    }
    //Check who won/draw:
    if (compScore > playerScore) {
        console.log('Computer has won the game!')
    } else if (playerScore > compScore) {
        console.log('You have won the game!')
    } else {
        console.log('Game is a draw!')
    }

}