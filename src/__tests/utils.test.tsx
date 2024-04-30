import { describe, test, expect, beforeEach } from 'vitest';
import {
  drawArc,
  degreesToRadians,
  degreesToPoint,
  formatTime,
  parseTime,
  objToMs,
} from '../utils';
import { CANVAS_SIZE, DIAL_RADIUS } from '../constants';

describe('canvas', () => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
  });

  test('drawArc() draws an arc with the correct degrees', async () => {
    const degrees = 90;
    drawArc(ctx, degrees);

    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    expect(ctx.save).toHaveBeenCalled();
    expect(ctx.translate).toHaveBeenCalledWith(
      CANVAS_SIZE / 2,
      CANVAS_SIZE / 2
    );
    expect(ctx.rotate).toHaveBeenCalledWith(-Math.PI / 2);
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.arc).toHaveBeenCalledWith(0, 0, DIAL_RADIUS, 0, Math.PI / 2);
    expect(ctx.stroke).toHaveBeenCalled();
    expect(ctx.restore).toHaveBeenCalled();
  });
});

describe('degrees and coords', () => {
  test('degreesToRadians() converts degrees to radians correctly', () => {
    const degrees = 90;
    const radians = degreesToRadians(degrees);
    expect(radians).toBeCloseTo(Math.PI / 2);
  });

  test('degreesToPoint() returns the correct coordinates for 0 degrees', () => {
    const [x, y] = degreesToPoint(0);
    expect(x).toBeCloseTo(0);
    expect(y).toBeCloseTo(-DIAL_RADIUS);
  });

  test('degreesToPoint() returns the correct coordinates for 90 degrees', () => {
    const [x, y] = degreesToPoint(90);
    expect(x).toBeCloseTo(DIAL_RADIUS);
    expect(y).toBeCloseTo(0);
  });
});

describe('time formatting', () => {
  test('parses milliseconds into hours, minutes, and seconds', () => {
    expect(parseTime(3661000)).toEqual({ h: 1, m: 1, s: 1 });
    expect(parseTime(7200000)).toEqual({ h: 2, m: 0, s: 0 });
    expect(parseTime(90000)).toEqual({ h: 0, m: 1, s: 30 });
    expect(parseTime(0)).toEqual({ h: 0, m: 0, s: 0 });
  });

  test('converts hours, minutes, and seconds into milliseconds', () => {
    expect(objToMs({ h: 1, m: 1, s: 1 })).toBe(3661000);
    expect(objToMs({ h: 2, m: 0, s: 0 })).toBe(7200000);
    expect(objToMs({ h: 0, m: 1, s: 30 })).toBe(90000);
    expect(objToMs({ h: 0, m: 0, s: 0 })).toBe(0);
  });

  test('formatTime() formats time correctly for less than an hour', () => {
    const ms = 1234567;
    const formattedTime = formatTime(ms);
    expect(formattedTime).toStrictEqual({ h: '00', m: '20', s: '34' });
  });

  test('formatTime() formats time correctly for more than an hour', () => {
    const ms = 9876543;
    const formattedTime = formatTime(ms);
    expect(formattedTime).toStrictEqual({ h: '02', m: '44', s: '36' });
  });

  test('formatTime() formats time correctly for exactly one hour', () => {
    const ms = 3600000;
    const formattedTime = formatTime(ms);
    expect(formattedTime).toStrictEqual({ h: '01', m: '00', s: '00' });
  });
});
