class Polygon {
  constructor(
    context,
    pos = { x: 100, y: 100 },
    vel = { x: 2, y: 2 },
    sides = 3,
    radius = 100,
    fillColor = "white",
    strokeColor = "white",
    fill = true,
    stroke = false,
    strokeWidth = 1
  ) {
    this.context = context;
    this.sides = sides;
    this.sideAngle = (2 * Math.PI) / this.sides;
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.angle = 0;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.fill = fill;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
  }

  isOutsideWindow() {
    if (
      this.pos.x > canvas.width ||
      this.pos.x < 0 ||
      this.pos.y > canvas.height ||
      this.pos.y < 0
    ) {
      return true;
    } else return false;
  }

  update(deltaTime) {
    this.pos.x += this.vel.x * deltaTime;
    this.pos.y += this.vel.y * deltaTime;

    this.radius -= randFloat(0.1, 0.3);

    if (this.radius > 50) {
      this.radius -= 0.3;
    }
  }

  draw() {
    this.context.save();

    this.context.fillStyle = this.fillColor;
    this.context.strokeStyle = this.strokeColor;
    this.context.translate(this.pos.x, this.pos.y);
    // Rotate the this.context by the rotation angle
    this.context.rotate(this.angle);
    this.context.translate(-this.pos.x, -this.pos.y);

    this.context.beginPath();
    this.context.moveTo(
      this.pos.x + this.radius * Math.cos(0),
      this.pos.y + this.radius * Math.sin(0)
    );

    for (var i = 1; i <= this.sides; i++) {
      this.context.lineTo(
        this.pos.x + this.radius * Math.cos(this.sideAngle * i),
        this.pos.y + this.radius * Math.sin(this.sideAngle * i)
      );
    }

    if (this.stroke) {
      this.context.lineWidth = this.strokeWidth;
      this.context.stroke();
    }
    if (this.fill) {
      this.context.fill();
    }

    this.context.restore();
  }

  rotate(angle) {
    this.angle = angle * (Math.PI / 180);
  }
}
