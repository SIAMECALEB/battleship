// tests/controller.test.js
import createController from '../src/controller.js';

test('controller sets up boards and can play a turn', () => {
  const controller = createController();

  // Set up default ships for both player and computer
  controller.setupDefaultBoards();

  // Player attacks coordinate [0, 9]
  const result = controller.playTurn([0, 9]);

  // Check that the result object contains expected properties
  expect(result).toHaveProperty('playerAttack');
  expect(result).toHaveProperty('computerAttack');

  // Optionally, you can also check the attack results
  expect(result.playerAttack.coord).toEqual([0, 9]);
  expect(['hit', 'miss']).toContain(result.playerAttack.result);
});
