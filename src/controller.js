// src/controller.js
import createPlayer from './player.js';

export default function createController() {
  const player = createPlayer({ isComputer: false });
  const computer = createPlayer({ isComputer: true });
  let current = player; // Player starts first

  /**
   * Sets up the default boards for both player and computer.
   * Ship placements can be randomized later.
   */
  function setupDefaultBoards() {
    // Player ships
    player.gameboard.placeShip(5, [0, 0], 'horizontal');
    player.gameboard.placeShip(4, [2, 2], 'vertical');
    player.gameboard.placeShip(3, [5, 5], 'horizontal');
    player.gameboard.placeShip(3, [7, 1], 'vertical');
    player.gameboard.placeShip(2, [9, 7], 'horizontal');

    // Computer ships (hidden)
    computer.gameboard.placeShip(5, [0, 9], 'vertical');
    computer.gameboard.placeShip(4, [3, 3], 'horizontal');
    computer.gameboard.placeShip(3, [6, 6], 'vertical');
    computer.gameboard.placeShip(3, [1, 5], 'horizontal');
    computer.gameboard.placeShip(2, [8, 2], 'vertical');
  }

  /**
   * Handles a full turn — player attacks, then computer responds.
   * Returns an object summarizing both actions and possible winner.
   * @param {Array} coord - [row, col] coordinates of player's attack
   */
  function playTurn(coord) {
    const attackResult = player.attack(computer.gameboard, coord);
    const turnResults = {
      playerAttack: { coord, result: attackResult },
    };

    // Check if player won
    if (computer.gameboard.allSunk()) {
      turnResults.winner = 'player';
      return turnResults;
    }

    // Computer's move
    const aiMove = computer.makeMove(player.gameboard);
    turnResults.computerAttack = aiMove;

    // Check if computer won
    if (player.gameboard.allSunk()) {
      turnResults.winner = 'computer';
    }

    return turnResults;
  }

  return {
    player,
    computer,
    current,
    setupDefaultBoards,
    playTurn,
  };
}
