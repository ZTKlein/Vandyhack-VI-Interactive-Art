import * as Sketch from "../../lib/sketch.min.js";
import ready from "domready";

var run = function() {
  let sketch = Sketch.create({
    autopause: false,
    container: document.getElementById("canvasDiv")
  });

  let particles = [];

  let particleCount = 10;
  let particleMax = 600;

  let phueMin = 180;
  let phueMax = 240;

  sketch.mouse.x = sketch.width / 2;

  sketch.mouse.y = sketch.height / 2;

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
      let dist, distx, disty;
      distx = this.x - sketch.mouse.x;
      disty = this.y - sketch.mouse.y;
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
      this.vx += (random(100) - 50) / 1000;
      this.vy -= random(1, 20) / 10000;
      this.x += this.vx;
      this.y += this.vy;
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
      sketch.fillStyle = "hsla(" + this.hue + ", 60%, 40%, .35)";
      sketch.fill();
      return sketch.stroke();
    }
  };

  let z = particleCount;

  while (z--) {
    particles.push(new Particle());
  }

  let addParticles = () => {
    particleCount += Math.round(particleCount / 10);
    z = particleCount - particles.length;
    while (z--) particles.push(new Particle());
    if (phueMax < 360) {
      phueMin += 5;
      phueMax += 5;
    }
    if (particleCount < particleMax) setTimeout(addParticles, 3000);
  };
  setTimeout(addParticles, 2000);

  sketch.clear = function() {
    return sketch.clearRect(0, 0, sketch.width, sketch.height);
  };

  sketch.update = function() {
    var i, results;
    i = particles.length;
    results = [];
    while (i--) {
      results.push(particles[i].update());
    }
    return results;
  };

  sketch.draw = function() {
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
