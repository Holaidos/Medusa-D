(function() {
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
  document.body.prepend(canvas);
  document.body.style.background = 'transparent';

  var ctx = canvas.getContext('2d');
  var jellies = [];
  var w, h;

  function getBg() {
    var t = document.documentElement.getAttribute('data-theme');
    return t === 'light' ? '#f0f9ff' : '#0a0e27';
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  var colors = [
    { r: 0, g: 180, b: 255 },
    { r: 199, g: 125, b: 255 },
    { r: 0, g: 255, b: 209 },
    { r: 255, g: 107, b: 157 },
    { r: 100, g: 200, b: 255 }
  ];

  function createJelly() {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return {
      x: Math.random() * w,
      y: h + 50 + Math.random() * 100,
      size: 15 + Math.random() * 45,
      speed: 0.15 + Math.random() * 0.3,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.003 + Math.random() * 0.005,
      swayAmount: 15 + Math.random() * 30,
      phase: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: (isLight ? 0.08 : 0.12) + Math.random() * 0.06,
      pulse: Math.random() * Math.PI * 2
    };
  }

  for (var i = 0; i < 12; i++) {
    var j = createJelly();
    j.y = Math.random() * h;
    jellies.push(j);
  }

  function drawJelly(j) {
    var cx = j.x + Math.sin(j.sway) * j.swayAmount;
    var cy = j.y;
    var s = j.size;
    var pulse = 1 + Math.sin(j.pulse) * 0.05;

    ctx.save();
    ctx.globalAlpha = j.opacity;
    ctx.translate(cx, cy);

    // outer glow
    var grad = ctx.createRadialGradient(0, -s * 0.2 * pulse, 0, 0, -s * 0.2 * pulse, s * 1.5);
    grad.addColorStop(0, 'rgba(' + j.color.r + ',' + j.color.g + ',' + j.color.b + ',0.15)');
    grad.addColorStop(1, 'rgba(' + j.color.r + ',' + j.color.g + ',' + j.color.b + ',0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, -s * 0.2 * pulse, s * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // dome
    ctx.beginPath();
    ctx.moveTo(-s * pulse, -s * 0.1);
    ctx.quadraticCurveTo(-s * pulse, -s * 0.8 * pulse, 0, -s * pulse);
    ctx.quadraticCurveTo(s * pulse, -s * 0.8 * pulse, s * pulse, -s * 0.1);
    ctx.closePath();
    ctx.fillStyle = 'rgba(' + j.color.r + ',' + j.color.g + ',' + j.color.b + ',0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(' + j.color.r + ',' + j.color.g + ',' + j.color.b + ',0.25)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // inner dome highlight
    ctx.beginPath();
    ctx.moveTo(-s * 0.4 * pulse, -s * 0.3);
    ctx.quadraticCurveTo(0, -s * 0.85 * pulse, s * 0.4 * pulse, -s * 0.3);
    ctx.strokeStyle = 'rgba(' + j.color.r + ',' + j.color.g + ',' + j.color.b + ',0.2)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // tentacles
    var tentCount = 3 + Math.floor(s / 12);
    for (var t = 0; t < tentCount; t++) {
      var tx = (t / (tentCount - 1 || 1) - 0.5) * s * 1.4 * pulse;
      ctx.beginPath();
      ctx.moveTo(tx, -s * 0.1);
      var len = s * (0.6 + Math.random() * 0.5);
      ctx.strokeStyle = 'rgba(' + j.color.r + ',' + j.color.g + ',' + j.color.b + ',0.12)';
      ctx.lineWidth = 0.5 + Math.random() * 0.4;
      ctx.lineCap = 'round';

      var segments = 6;
      for (var k = 0; k <= segments; k++) {
        var py = -s * 0.1 + (k / segments) * len;
        var px = Math.sin(j.phase + k * 0.8 + j.pulse * 0.5) * (s * 0.12) * (k / segments);
        ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    ctx.restore();
  }

  function draw() {
    var bg = getBg();
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    for (var i = 0; i < jellies.length; i++) {
      var j = jellies[i];
      j.y -= j.speed;
      j.sway += j.swaySpeed;
      j.phase += 0.02;
      j.pulse += 0.01;
      drawJelly(j);
      if (j.y < -j.size * 3) {
        jellies[i] = createJelly();
      }
    }

    requestAnimationFrame(draw);
  }

  var observer = new MutationObserver(function() {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    var base = isLight ? 0.08 : 0.12;
    for (var i = 0; i < jellies.length; i++) {
      jellies[i].opacity = base + Math.random() * 0.06;
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  draw();
})();
