// src/ship.js
export default function createShip(length) {
  if (!Number.isInteger(length) || length <= 0) throw new Error('Invalid length');
  let hits = 0;
  return {
	length,
	get hits() { return hits; },
	hit() { if (hits < length) hits += 1; },
	isSunk() { return hits >= length; },
  };
}