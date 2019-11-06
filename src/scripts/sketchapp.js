import * as Sketch from "../../lib/sketch.min.js";
import ready from "domready";

var run = function() {
  let sketch = Sketch.create({
    autopause: false,
    container: document.getElementById("canvasDiv")
  });

  let particles = [];

  let particleCount = 600;
  let particleMax = 600;

  let phueMin = 300;
  let phueMax = 360;

  let centerx = sketch.width / 2;

  let centery = sketch.height / 2;

  sketch.strokeStyle = "hsla(300, 50%, 50%, .4)";

  sketch.globalCompositeOperation = "lighter";

  let Particle = function() {
    this.x = random(sketch.width);
    this.y = random(sketch.height, sketch.height * 2);
    this.vx = 0;
    this.vy = -random(1, 10) / 5;
    this.radius = this.baseRadius = 1;
    this.maxRadius = 50;
    this.threshold = 150;
    return (this.hue = random(phueMin, phueMax));
  };

  Particle.prototype = {
    update: function() {
      this.luminosity = sin((sketch.millis / 5000) * PI) + 1 * 15 + 20;
      this.hue += sketch.hueShift;
      if (this.hue > 360) this.hue = 0 + (this.hue % 360);
      this.maxRadius = sketch.width / 8;
      this.threshold = sketch.width / 3;
      let dist, distx, disty;
      distx = this.x - centerx;
      disty = this.y - centery;
      dist = sqrt(distx * distx + disty * disty);
      if (dist < this.threshold) {
        this.radius = lerp(
          this.baseRadius,
          this.maxRadius,
          (this.threshold - dist) / this.threshold
        );
      } else {
        this.radius = this.baseRadius;
      }
      this.vx += (random(100) - 50) / sketch.width;
      this.vy -= random(1, 20) / sketch.height / 10;
      this.x += ((this.vx * sketch.dt) / 1000) * 60;
      this.y += ((this.vy * sketch.dt) / 1000) * 60;
      if (
        this.x < -this.maxRadius ||
        this.x > sketch.width + this.maxRadius ||
        this.y < -this.maxRadius
      ) {
        this.x = random(sketch.width);
        this.y = random(sketch.height + this.maxRadius, sketch.height * 2);
        this.vx = 0;
        return (this.vy = -random(1, 10) / 5);
      }
    },
    render: function() {
      sketch.beginPath();
      sketch.arc(this.x, this.y, this.radius, 0, TWO_PI);
      sketch.closePath();
      sketch.fillStyle =
        "hsla(" + this.hue + ", 60%," + this.luminosity + "%,.35)";
      sketch.fill();
      return sketch.stroke();
    }
  };

  let z = particleCount;

  while (z--) {
    particles.push(new Particle());
  }

  sketch.clear = function() {
    return sketch.clearRect(0, 0, sketch.width, sketch.height);
  };

  sketch.update = function() {
    sketch.hueShift = sketch.dt / 100;
    var i, results;
    i = particles.length;
    results = [];
    while (i--) {
      results.push(particles[i].update());
    }
    return results;
  };

  sketch.draw = function() {
    centerx = sketch.width / 2;
    centery = (sketch.height * 17) / 40;
    sketch.globalCompositeOperation = "lighter";
    sketch.strokeStyle = "hsla(300, 50%, 50%, .4)";
    var i, results;
    i = particles.length;
    results = [];
    while (i--) {
      results.push(particles[i].render());
    }
    return results;
  };
};

ready(() => {
  run();
});
