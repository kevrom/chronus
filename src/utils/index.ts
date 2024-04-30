import {
  DIAL_RADIUS,
  CANVAS_SIZE,
  CANVAS_MARGIN,
  LINE_WIDTH,
} from '../constants';

export const parseTime = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds - h * 3600) / 60);
  const s = seconds - h * 3600 - m * 60;
  return { h, m, s };
};

export const objToMs = (obj: ReturnType<typeof parseTime>) =>
  (obj.h * 3600 + obj.m * 60 + obj.s) * 1000;

export const formatTime = (ms: number) => {
  const { h, m, s } = parseTime(ms);
  const hFormatted = h.toString().padStart(2, '0');
  const mFormatted = m.toString().padStart(2, '0');
  const sFormatted = s.toString().padStart(2, '0');
  return { h: hFormatted, m: mFormatted, s: sFormatted };
};

export const degreesToRadians = (degrees: number) => (Math.PI / 180) * degrees;

export const degreesToPoint = (degrees: number): [number, number] => {
  const angle = degreesToRadians(degrees - 90);
  const x = DIAL_RADIUS * Math.cos(angle);
  const y = DIAL_RADIUS * Math.sin(angle);
  return [x, y];
};

export const drawArc = (ctx: CanvasRenderingContext2D, degrees: number) => {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.save();
  ctx.translate(DIAL_RADIUS + CANVAS_MARGIN, DIAL_RADIUS + CANVAS_MARGIN);
  ctx.rotate(degreesToRadians(-90));
  ctx.beginPath();
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#cffafe';
  ctx.lineWidth = LINE_WIDTH;
  ctx.arc(0, 0, DIAL_RADIUS, 0, degreesToRadians(degrees));
  ctx.stroke();
  ctx.restore();
};
