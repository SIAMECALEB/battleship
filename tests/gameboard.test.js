// tests/gameboard.test.js
import createGameboard from '../src/gameboard.js';

test('place ships and receive attacks', () => {
  const board = createGameboard(10);

  // Place a horizontal ship of length 2 at [0,0]
  const placed = board.placeShip(2, [0, 0], 'horizontal');
  expect(placed).toBe(true);

  // Attack ship coordinates
  const r1 = board.receiveAttack([0, 0]);
  expect(r1).toBe('hit');

  const r2 = board.receiveAttack([1, 0]);
  expect(r2).toBe('hit');

  // After hitting all ship cells, it should be sunk
  expect(board.allSunk()).toBe(true);
});

test('miss is recorded and out-of-bounds is invalid', () => {
  const board = createGameboard(10);

  // Place a vertical ship of length 3 at [2,2]
  board.placeShip(3, [2, 2], 'vertical');

  // Attack a cell with no ship
  const miss = board.receiveAttack([0, 0]);
  expect(miss).toBe('miss');
  expect(board.missedShots).toEqual(expect.arrayContaining([[0, 0]]));

  // Attack a coordinate outside the board
  const invalid = board.receiveAttack([100, 100]);
  expect(invalid).toBe('invalid');
});
