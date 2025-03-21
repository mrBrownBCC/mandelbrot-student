// mandelbrot.test.js
const { mandelbrotIterations } = require('./sketch.js');

describe('mandelbrotIterations', () => {
  const maxIterations = 100;

  test('Test 1: (0, 0) should return maxIterations (inside the set)', () => {
    expect(mandelbrotIterations(0, 0, maxIterations)).toBe(maxIterations);
  });

  test('Test 2: (2, 2) should return 0 (escapes immediately)', () => {
    expect(mandelbrotIterations(2, 2, maxIterations)).toBe(0);
  });

  test('Test 3: (0.5, 0.5) should return 4', () => {
    expect(mandelbrotIterations(0.5, 0.5, maxIterations)).toBe(4);
  });

  test('Test 4: (-2, 0) should return maxIterations (boundary case)', () => {
    expect(mandelbrotIterations(-2, 0, maxIterations)).toBe(maxIterations);
  });

  test('Test 5: (1, 1) should return 1 (escapes after one iteration)', () => {
    expect(mandelbrotIterations(1, 1, maxIterations)).toBe(1);
  });

  test('Test 6: (-1, 0) should return maxIterations (inside the set)', () => {
    expect(mandelbrotIterations(-1, 0, maxIterations)).toBe(maxIterations);
  });

  test('Test 7: (-0.75, 0.1) should return maxIterations (inside the set)', () => {
    expect(mandelbrotIterations(-0.75, 0.1, maxIterations)).toBe(32);
  });

  test('Test 8: (0.2, 1) should return 3', () => {
    expect(mandelbrotIterations(0.2, 1, maxIterations)).toBe(3);
  });

  test('Test 9: (0.3, 0.5) should return maxIterations (inside the set)', () => {
    expect(mandelbrotIterations(0.3, 0.5, maxIterations)).toBe(maxIterations);
  });

  test('Test 10: (-1.5, 0) should return maxIterations (inside the set)', () => {
    expect(mandelbrotIterations(-1.5, 0, maxIterations)).toBe(maxIterations);
  });
});
