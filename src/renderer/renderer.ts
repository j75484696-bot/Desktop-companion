import { Logger } from '@/common/logger';
import { Spiderman } from '@/characters/spiderman';

const logger = new Logger('Renderer');

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
if (!ctx) {
  logger.error(new Error('Failed to get canvas context'));
  process.exit(1);
}

const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;

document.body.appendChild(canvas);

const spiderman = new Spiderman();
spiderman.setPosition({ x: width / 2, y: height / 2 });

let lastTime = Date.now();

function animate(): void {
  const currentTime = Date.now();
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  spiderman.update(deltaTime);

  ctx.clearRect(0, 0, width, height);

  const pos = spiderman.getPosition();
  const size = spiderman.getSize();
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(pos.x - size.width / 2, height - pos.y - size.height / 2, size.width, size.height);

  ctx.fillStyle = '#000000';
  ctx.font = '16px Arial';
  ctx.fillText('Spiderman Companion', 10, 30);

  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  logger.log('Clicked at', x, y);
  spiderman.celebrate();
});

logger.log('Renderer initialized');
