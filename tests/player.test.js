// tests/player.test.js
import createPlayer from '../src/player.js';

test('player has a gameboard and can attack', () => {
  const player = createPlayer();
  const opponent = createPlayer();

  // Place a ship on opponent's board
  opponent.gameboard.placeShip(2, [0, 0], 'horizontal');

  // Player attacks the ship
  const result = player.attack(opponent.gameboard, [0, 0]);
  expect(result).toBe('hit');
});

test('computer makeMove returns a legal attack and does not repeat moves', () => {
  const human = createPlayer();
  const ai = createPlayer({ isComputer: true });

  // Place a ship on human board
  human.gameboard.placeShip(2, [0, 0], 'horizontal');

  // First AI move
  const move1 = ai.makeMove(human.gameboard);
  expect(move1).toHaveProperty('coord');
  expect(move1).toHaveProperty('result');

  // Second AI move should not repeat the first move
  const key1 = `${move1.coord[0]},${move1.coord[1]}`;
  const move2 = ai.makeMove(human.gameboard);
  const key2 = `${move2.coord[0]},${move2.coord[1]}`;
  expect(key1).not.toBe(key2);
});
