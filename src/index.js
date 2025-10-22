// src/index.js
import createController from './controller.js';
import { createBoardGrid } from './ui.js';

// Initialize game controller and setup default boards
const controller = createController();
controller.setupDefaultBoards();

// Expose globally for debugging in the console
window.app = controller;

window.addEventListener('DOMContentLoaded', () => {
  const playerBoardContainer = document.getElementById('player-board');
  const enemyBoardContainer = document.getElementById('enemy-board');
  const status = document.getElementById('status');

  /**
   * Handles what happens when the player clicks a cell on the enemy board.
   */
  function onEnemyClick(coord) {
    const res = controller.playTurn(coord);

    status.textContent = `Player shot ${res.playerAttack.coord} → ${res.playerAttack.result}` +
      (res.winner ? ` | Winner: ${res.winner}` : '');

    render();
  }

  /**
   * Renders both boards (player and enemy) and attaches click handlers.
   */
  function render() {
    createBoardGrid(playerBoardContainer, controller.player.gameboard, true);
    createBoardGrid(enemyBoardContainer, controller.computer.gameboard, false, onEnemyClick);
  }

  render();
});
