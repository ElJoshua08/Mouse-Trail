const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.onresize = (e) => {
  canvas.width = e.innerWidth;
  canvas.height = e.innerHeight;
};

// Variables
const maxParticlesAtOnce = 1;
const maxParticles = 200;
const mouse = {
  x: undefined,
  y: undefined,
};

const prevMouse = {
  x: mouse.x,
  y: mouse.y,
};

let particles = [];
let hue = 0;

const perfectFrameTime = 1000 / 60;
let deltaTime = 0;
let lastTimestamp = 0;

//Utils
const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randBool = () => {
  return Math.round(Math.random()) === 1 ? true : false;
}

const randFloat = (min, max) => {
  return Math.random() * (max - min) + min;
}

const radiansToDegrees = (radians) => {
  return radians * (180 / Math.PI);
};

const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

const angleFromTwoPoints = (x1, y1, x2, y2) => {
  let radian = Math.atan2(y2 - y1, x2 - x1);
  let degrees = radiansToDegrees(radian);

  return degrees;
};

// Update mouse position on mouse move
window.addEventListener("mousemove", (e) => {
  prevMouse.x = mouse.x;
  prevMouse.y = mouse.y;
  mouse.x = e.x;
  mouse.y = e.y;

  if (particles.length < maxParticles) {
    setTimeout(() => {
      createParticles();
    }, 50);
  }
});

function createParticles() {
  for (let i = 0; i < maxParticlesAtOnce; i++) {
    let angle = angleFromTwoPoints(prevMouse.x, prevMouse.y, mouse.x, mouse.y);

    // Opposite angle
    angle = (angle + 180) % 360;

    // Add some spray
    angle += randInt(-5, 5);

    // To radians again
    angle = degreesToRadians(angle);

    // Calculate vel
    let velX = Math.cos(angle) * randInt(1, 5);
    let velY = Math.sin(angle) * randInt(1, 5);

    particles.push(
      new Polygon(
        context,
        {
          x: mouse.x + randInt(-15, 15),
          y: mouse.y + randInt(-15, 15),
        },
        {
          x: velX,
          y: velY,
        },
        randInt(3, 6),
        randInt(15, 30),
        `hsl(${hue}, 100%, 50%)`,
        `hsl(${hue + 20}, 100%, 50%)`,
        randBool(),
        true,
        2
      )
    );
  }
}

function particleHandler(deltaTime) {
  for (let i = 0; i < particles.length; i++) {
    particles[i].rotate(hue);
    particles[i].update(deltaTime);
    particles[i].draw();

    if (particles[i].isOutsideWindow()) {
      particles.splice(i, 1);
      i -= 1;
    }
  }
}

function start() {
  requestAnimationFrame(animate);
}

function animate(timestamp) {
  context.fillStyle = `rgba(10, 0, 10, 0.15)`
  context.fillRect(0, 0, canvas.width, canvas.height)
  requestAnimationFrame(animate);
  deltaTime = (timestamp - lastTimestamp) / perfectFrameTime;
  lastTimestamp = timestamp;

  hue += 5;
  hue = hue > 360 ? 0 : hue;

  particleHandler(deltaTime);
}

start();
