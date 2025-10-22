// src/gameboard.js
import createShip from './ship.js';

export default function createGameboard(size = 10) {
  const ships = []; // { ship, coords: [[x, y], ...], hitsAt: Set('x,y') }
  const missedShots = new Set();

  /** Converts coordinate array [x, y] to a string key */
  function _coordKey([x, y]) {
    return `${x},${y}`;
  }

  /** Checks if coordinates are within board boundaries */
  function _isInBounds([x, y]) {
    return x >= 0 && x < size && y >= 0 && y < size;
  }

  /** Checks if new ship coordinates overlap with existing ships */
  function _overlaps(coords) {
    for (const c of coords) {
      for (const s of ships) {
        if (s.coords.some(sc => sc[0] === c[0] && sc[1] === c[1])) return true;
      }
    }
    return false;
  }

  /**
   * Places a new ship on the board
   * @param {number} length - Length of the ship
   * @param {Array} startCoord - Starting [x, y] coordinate
   * @param {'horizontal' | 'vertical'} orientation - Ship orientation
   * @returns {boolean} - True if placed successfully, false if invalid
   */
  function placeShip(length, startCoord, orientation = 'horizontal') {
    const [x, y] = startCoord;
    const coords = [];

    for (let i = 0; i < length; i += 1) {
      const coord = orientation === 'horizontal' ? [x + i, y] : [x, y + i];
      if (!_isInBounds(coord)) return false;
      coords.push(coord);
    }

    if (_overlaps(coords)) return false;

    const ship = createShip(length);
    ships.push({ ship, coords, hitsAt: new Set() });
    return true;
  }

  /** Finds which ship (if any) occupies the given coordinate */
  function _findShipByCoord(coord) {
    for (const entry of ships) {
      if (entry.coords.some(c => c[0] === coord[0] && c[1] === coord[1])) {
        return entry;
      }
    }
    return null;
  }

  /**
   * Handles an attack at the given coordinate
   * @param {Array} coord - [x, y] coordinate of the attack
   * @returns {'hit' | 'miss' | 'already' | 'invalid'}
   */
  function receiveAttack(coord) {
    if (!_isInBounds(coord)) return 'invalid';

    const key = _coordKey(coord);

    // Already missed here
    if (missedShots.has(key)) return 'already';

    const entry = _findShipByCoord(coord);
    if (entry) {
      // Already hit this ship cell
      if (entry.hitsAt.has(key)) return 'already';

      entry.ship.hit();
      entry.hitsAt.add(key);
      return 'hit';
    }

    missedShots.add(key);
    return 'miss';
  }

  /** Checks if all ships on the board have been sunk */
  function allSunk() {
    if (ships.length === 0) return false;
    return ships.every(entry => entry.ship.isSunk());
  }

  return {
    placeShip,
    receiveAttack,
    allSunk,
    get missedShots() {
      return Array.from(missedShots).map(k =>
        k.split(',').map(Number)
      );
    },
    get ships() {
      return ships.map(s => ({
        coords: s.coords,
        length: s.ship.length,
        hits: s.ship.hits,
      }));
    },
    size,
  };
}
