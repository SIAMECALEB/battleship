// src/player.js
import createGameboard from './gameboard.js';

export default function createPlayer({ isComputer = false } = {}) {
  const gameboard = createGameboard();
  const tried = new Set(); // Tracks already attacked coordinates
  const targetQueue = []; // Queue for smarter AI targeting later

  /**
   * Player attacks the enemy's board.
   * @param {Object} enemyBoard - The opponent’s gameboard.
   * @param {Array} coord - [x, y] coordinate to attack.
   * @returns {'hit' | 'miss' | 'already' | 'invalid'}
   */
  function attack(enemyBoard, coord) {
    return enemyBoard.receiveAttack(coord);
  }

  /** Generates a random [x, y] coordinate within the board size. */
  function _randCoord(size) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    return [x, y];
  }

  /**
   * Computer makes an automated move on the player’s board.
   * Includes simple logic to target adjacent cells after a hit.
   * @param {Object} enemyBoard - The opponent’s gameboard.
   * @returns {{ coord: [number, number], result: string } | null}
   */
  function makeMove(enemyBoard) {
    if (!isComputer) return null;

    const size = enemyBoard.size;
    let coord;

    // Use queued target if available
    while (targetQueue.length) {
      const t = targetQueue.shift();
      const key = `${t[0]},${t[1]}`;
      if (
        !tried.has(key) &&
        t[0] >= 0 && t[1] >= 0 &&
        t[0] < size && t[1] < size
      ) {
        coord = t;
        break;
      }
    }

    // Otherwise, pick a random coordinate
    if (!coord) {
      do {
        coord = _randCoord(size);
      } while (tried.has(`${coord[0]},${coord[1]}`));
    }

    // Record attempt
    tried.add(`${coord[0]},${coord[1]}`);

    // Attack and analyze result
    const result = enemyBoard.receiveAttack(coord);

    // If hit, add neighboring cells to target queue
    if (result === 'hit') {
      const [x, y] = coord;
      targetQueue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    return { coord, result };
  }

  return { gameboard, attack, makeMove, isComputer };
}
