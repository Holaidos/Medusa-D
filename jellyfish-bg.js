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

  function makeTentacles(s) {
    var n = 7 + Math.floor(s / 7);
    var arr = [];
    for (var i = 0; i < n; i++) {
      var segs = [];
      var slen = s * (0.8 + Math.random() * 1.2);
      var w = 1.2 + Math.random() * 1;
      for (var k = 0; k <= 8; k++) {
        segs.push({
          frac: k / 8,
          xOff: (Math.random() - 0.5) * s * 0.06
        });
      }
      arr.push({
        len: slen,
        lw: w,
        segments: segs,
        phaseOff: Math.random() * Math.PI * 2,
        swayAmp: s * (0.15 + Math.random() * 0.15)
      });
    }
    return arr;
  }

  function createJelly() {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    var s = 15 + Math.random() * 45;
    return {
      x: Math.random() * w,
      y: h + 50 + Math.random() * 100,
      size: s,
      speed: 0.15 + Math.random() * 0.3,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.003 + Math.random() * 0.005,
      swayAmount: 15 + Math.random() * 30,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: (isLight ? 0.18 : 0.28) + Math.random() * 0.08,
      pulse: Math.random() * Math.PI * 2,
      phase: Math.random() * Math.PI * 2,
      tentacles: makeTentacles(s)
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
    grad.addColorStop(0, 'rgba(' + j.color.r + ',' + j.color.g + ',' + j.color.b + ',0.3)');
    grad.addColorStop(1, 'rgba(' + j.color.r + ',' + j.color.g + ',' + j.color.b + ',0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, -s * 0.2 * pulse, s * 2, 0, Math.PI * 2);
    ctx.fill();

    // dome
    ctx.beginPath();
    ctx.moveTo(-s * pulse, -s * 0.1);
    ctx.quadraticCurveTo(-s * pulse, -s * 0.8 * pulse, 0, -s * pulse);
    ctx.quadraticCurveTo(s * pulse, -s * 0.8 * pulse, s * pulse, -s * 0.1);
    ctx.closePath();
    ctx.fillStyle = 'rgba(' + j.color.r + ',' + j.color.g + ',' + j.color.b + ',0.35)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(' + j.color.r + ',' + j.color.g + ',' + j.color.b + ',0.55)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // inner dome highlight
    ctx.beginPath();
    ctx.moveTo(-s * 0.4 * pulse, -s * 0.3);
    ctx.quadraticCurveTo(0, -s * 0.85 * pulse, s * 0.4 * pulse, -s * 0.3);
    ctx.strokeStyle = 'rgba(' + j.color.r + ',' + j.color.g + ',' + j.color.b + ',0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // tentacles
    var tentData = j.tentacles;
    for (var t = 0; t < tentData.length; t++) {
      var td = tentData[t];
      var tfrac = t / (tentData.length - 1 || 1);
      var baseX = (tfrac - 0.5) * s * 2 * pulse;
      var baseY = -s * 0.1 - Math.abs(tfrac - 0.5) * s * 0.15;
      var drift = (tfrac - 0.5) * s * 0.3;
      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      ctx.strokeStyle = 'rgba(' + j.color.r + ',' + j.color.g + ',' + j.color.b + ',0.55)';
      ctx.lineWidth = td.lw;
      ctx.lineCap = 'round';

      for (var k = 0; k < td.segments.length; k++) {
        var seg = td.segments[k];
        var phase = j.phase * 0.5 + td.phaseOff + seg.frac * 1.5;
        var wx = Math.sin(phase) * td.swayAmp * seg.frac * seg.frac;
        var px = baseX + drift * seg.frac * seg.frac + wx + seg.xOff;
        var py = baseY + seg.frac * td.len;
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
      j.pulse += 0.003;
      j.phase += 0.012;
      drawJelly(j);
      if (j.y < -j.size * 3) {
        jellies[i] = createJelly();
      }
    }

    requestAnimationFrame(draw);
  }

  var observer = new MutationObserver(function() {
    var isLight = document.documentElement.getAttribute('data-theme') === 'light';
    var base = isLight ? 0.18 : 0.28;
    for (var i = 0; i < jellies.length; i++) {
      jellies[i].opacity = base + Math.random() * 0.08;
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  draw();
})();
