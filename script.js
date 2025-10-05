const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let stars = [];
let mouse = { x: undefined, y: undefined };
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  });
}

canvas.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

canvas.addEventListener('touchmove', e => {
  const touch = e.touches[0];
  mouse.x = touch.clientX;
  mouse.y = touch.clientY;
});

canvas.addEventListener('mouseleave', () => {
  mouse.x = undefined;
  mouse.y = undefined;
});

function animate() {
  ctx.clearRect(0, 0, width, height);

  for (let s of stars) {
    s.x += s.vx;
    s.y += s.vy;

    if (s.x < 0 || s.x > width) s.vx *= -1;
    if (s.y < 0 || s.y > height) s.vy *= -1;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    // خطوط بين النجوم القريبة
    for (let other of stars) {
      let dx = s.x - other.x;
      let dy = s.y - other.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.strokeStyle = "rgba(255,255,255," + (1 - dist / 100) + ")";
        ctx.lineWidth = 0.3;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }

    // تفاعل النجوم مع الماوس
    if (mouse.x && Math.hypot(mouse.x - s.x, mouse.y - s.y) < 150) {
      s.vx += (s.x - mouse.x) * 0.0005;
      s.vy += (s.y - mouse.y) * 0.0005;
    }
  }

  requestAnimationFrame(animate);
}

animate();