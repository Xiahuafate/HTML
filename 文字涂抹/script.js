const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const text = document.querySelector('.text');
const container = document.querySelector('.container');

const fontSize = parseInt(getComputedStyle(text).fontSize);
const fontFamily = getComputedStyle(text).fontFamily;

canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

ctx.font = `${fontSize}px ${fontFamily}`;

const textMetrics = ctx.measureText(text.textContent);

ctx.fillStyle = 'black';
ctx.fillText(text.textContent, 0, fontSize);

let isMouseDown = false;

canvas.addEventListener('mousedown', () => {
  isMouseDown = true;
});

canvas.addEventListener('mouseup', () => {
  isMouseDown = false;
});

canvas.addEventListener('mousemove', e => {
  if (isMouseDown) {
    const x = e.offsetX;
    const y = e.offsetY;
    const imageData = ctx.getImageData(x, y, textMetrics.width, fontSize);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i + 3] = 0;
    }
    ctx.putImageData(imageData, x, y);
  }
});
