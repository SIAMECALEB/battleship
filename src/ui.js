// src/ui.js

/**
 * Converts a cell ID string (e.g., "cell-x-y") to [x, y] coordinates.
 * @param {string} id - Cell ID in the format "cell-x-y"
 * @returns {[number, number]} - Coordinate array
 */
export function coordFromCellId(id) {
  const [, x, y] = id.split('-').map(Number);
  return [x, y];
}

/**
 * Creates a visual grid for a gameboard inside the container.
 * @param {HTMLElement} container - The container element
 * @param {Object} gameboard - The gameboard object
 * @param {boolean} reveal - Whether to show ships (for player's board)
 * @param {Function|null} onCellClick - Callback for when a cell is clicked
 */
export function createBoardGrid(container, gameboard, reveal = false, onCellClick = null) {
  container.innerHTML = '';

  const size = gameboard.size;

  // Set up CSS grid layout
  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${size}, 30px)`;
  container.style.gridTemplateRows = `repeat(${size}, 30px)`;
  container.style.gap = '2px';

  // Precompute ship coordinates for quick lookup
  const shipCoords = new Set();
  for (const s of gameboard.ships) {
    for (const c of s.coords) shipCoords.add(`${c[0]},${c[1]}`);
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cell = document.createElement('div');
      cell.id = `cell-${x}-${y}`;
      cell.style.width = '30px';
      cell.style.height = '30px';
      cell.style.border = '1px solid #ccc';
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.style.fontSize = '12px';

      const coordKey = `${x},${y}`;

      // Show missed shots
      const missed = gameboard.missedShots.some(c => c[0] === x && c[1] === y);
      if (missed) cell.textContent = '•';

      // Show ships if reveal is true
      if (reveal && shipCoords.has(coordKey)) {
        cell.style.background = '#999';
      }

      // Set up click handler
      if (onCellClick) {
        cell.style.cursor = 'pointer';
        cell.addEventListener('click', () => onCellClick([x, y]));
      }

      container.appendChild(cell);
    }
  }
}
