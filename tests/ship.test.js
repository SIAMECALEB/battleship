// tests/ship.test.js
import createShip from '../src/ship.js';

test('ship records hits and reports sunk correctly', () => {
  const ship = createShip(3);

  // Initial state
  expect(ship.length).toBe(3);
  expect(ship.hits).toBe(0);
  expect(ship.isSunk()).toBe(false);

  // Hit once
  ship.hit();
  expect(ship.hits).toBe(1);
  expect(ship.isSunk()).toBe(false);

  // Hit remaining parts
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(3);
  expect(ship.isSunk()).toBe(true);
});
