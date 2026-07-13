(function() {
  'use strict';

  var SUPABASE_URL = 'https://ohwwehbadhtysmwjvfoy.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9od3dlaGJhZGh0eXNtd2p2Zm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MTg0MjMsImV4cCI6MjA5OTA5NDQyM30.DtlcpFcDbONfjjTiIcL4PlX0sscv7ccRkwYoX_WMCp0';
  var N8N_WEBHOOK_URL = ''; // configurar después con la URL de n8n

  // crear HTML del chatbot
  var html =
    '<div id="chat-toggle" aria-label="Abrir chat">💬</div>' +
    '<div id="chat-window">' +
      '<div id="chat-header">' +
        '<span>🪼 Chat Medusa</span>' +
        '<button id="chat-close" aria-label="Cerrar chat">✕</button>' +
      '</div>' +
      '<div id="chat-messages">' +
        '<div class="chat-msg bot">Hola! Pregúntame cualquier cosa sobre medusas 🪼</div>' +
      '</div>' +
      '<div id="chat-input-area">' +
        '<input id="chat-input" type="text" placeholder="Escribe tu pregunta..." autocomplete="off">' +
        '<button id="chat-send" aria-label="Enviar">➤</button>' +
      '</div>' +
    '</div>';

  var container = document.createElement('div');
  container.id = 'chat-container';
  container.innerHTML = html;
  document.body.appendChild(container);

  var toggle = document.getElementById('chat-toggle');
  var windowEl = document.getElementById('chat-window');
  var closeBtn = document.getElementById('chat-close');
  var messages = document.getElementById('chat-messages');
  var input = document.getElementById('chat-input');
  var sendBtn = document.getElementById('chat-send');

  // estilos
  var style = document.createElement('style');
  style.textContent =
    '#chat-container { position:fixed; bottom:24px; right:24px; z-index:9999; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif; }' +
    '#chat-toggle { width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,#00b4ff,#c77dff); color:#fff; display:flex; align-items:center; justify-content:center; font-size:24px; cursor:pointer; box-shadow:0 4px 20px rgba(0,180,255,0.4); transition:transform 0.2s; user-select:none; }' +
    '#chat-toggle:hover { transform:scale(1.1); }' +
    '#chat-window { position:fixed; bottom:90px; right:24px; width:380px; max-width:calc(100vw - 48px); height:520px; max-height:calc(100vh - 120px); background:var(--card,#0a0e27); backdrop-filter:blur(20px); border:1px solid var(--card-border,rgba(255,255,255,0.08)); border-radius:20px; display:none; flex-direction:column; box-shadow:0 8px 40px rgba(0,0,0,0.4); overflow:hidden; }' +
    '#chat-header { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid var(--card-border,rgba(255,255,255,0.08)); color:var(--primary,#00b4ff); font-weight:700; font-size:15px; }' +
    '#chat-close { background:none; border:none; color:var(--text-muted,#94a3b8); cursor:pointer; font-size:18px; padding:0 4px; }' +
    '#chat-close:hover { color:var(--text,#dbe5df); }' +
    '#chat-messages { flex:1; overflow-y:auto; padding:16px 20px; display:flex; flex-direction:column; gap:12px; scroll-behavior:smooth; }' +
    '#chat-messages::-webkit-scrollbar { width:4px; }' +
    '#chat-messages::-webkit-scrollbar-thumb { background:var(--primary,#00b4ff); border-radius:99px; }' +
    '.chat-msg { max-width:85%; padding:12px 16px; border-radius:16px; font-size:14px; line-height:1.5; word-wrap:break-word; animation:msgIn 0.25s ease; }' +
    '@keyframes msgIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }' +
    '.chat-msg.bot { align-self:flex-start; background:rgba(0,180,255,0.08); color:var(--text,#dbe5df); border-bottom-left-radius:4px; border:1px solid rgba(0,180,255,0.1); }' +
    '.chat-msg.user { align-self:flex-end; background:linear-gradient(135deg,rgba(0,180,255,0.2),rgba(199,125,255,0.2)); color:var(--text,#dbe5df); border-bottom-right-radius:4px; }' +
    '.chat-msg .label { font-size:10px; font-weight:700; text-transform:uppercase; color:var(--primary,#00b4ff); margin-bottom:4px; letter-spacing:0.05em; }' +
    '.chat-msg.bot a { color:var(--primary,#00b4ff); text-decoration:none; }' +
    '.chat-msg.bot a:hover { text-decoration:underline; }' +
    '.chat-msg .source { font-size:11px; color:var(--text-muted,#94a3b8); margin-top:6px; border-top:1px solid rgba(0,180,255,0.1); padding-top:6px; }' +
    '#chat-input-area { display:flex; align-items:center; gap:8px; padding:12px 16px; border-top:1px solid var(--card-border,rgba(255,255,255,0.08)); }' +
    '#chat-input { flex:1; background:rgba(255,255,255,0.05); border:1px solid var(--card-border,rgba(255,255,255,0.1)); border-radius:12px; padding:10px 14px; color:var(--text,#dbe5df); font-size:14px; outline:none; transition:border-color 0.2s; }' +
    '#chat-input:focus { border-color:var(--primary,#00b4ff); }' +
    '#chat-send { width:40px; height:40px; border-radius:50%; background:var(--primary,#00b4ff); color:#fff; border:none; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; transition:opacity 0.2s; }' +
    '#chat-send:hover { opacity:0.8; }' +
    '#chat-send:disabled { opacity:0.4; cursor:default; }' +
    '.chat-typing { display:flex; gap:4px; align-items:center; padding:12px 16px; }' +
    '.chat-typing span { width:8px; height:8px; border-radius:50%; background:var(--primary,#00b4ff); animation:typing 1.4s infinite; }' +
    '.chat-typing span:nth-child(2) { animation-delay:0.2s; }' +
    '.chat-typing span:nth-child(3) { animation-delay:0.4s; }' +
    '@keyframes typing { 0%,60%,100% { opacity:0.3; transform:translateY(0); } 30% { opacity:1; transform:translateY(-6px); } }' +
    '#chat-window.open { display:flex; }' +
    'html[data-theme="light"] #chat-window { background:rgba(255,255,255,0.95); backdrop-filter:blur(20px); }' +
    'html[data-theme="light"] .chat-msg.bot { background:rgba(0,180,255,0.06); }' +
    'html[data-theme="light"] .chat-msg.user { background:rgba(0,180,255,0.1); }' +
    'html[data-theme="light"] #chat-input { background:rgba(0,0,0,0.03); }' +
    '@media (max-width:480px) { #chat-window { right:12px; bottom:80px; width:calc(100vw - 24px); height:calc(100vh - 100px); border-radius:16px; } #chat-container { right:12px; bottom:12px; } }';

  document.head.appendChild(style);

  var typingMsg = null;

  function showTyping() {
    var div = document.createElement('div');
    div.className = 'chat-msg bot chat-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    div.id = 'chat-typing-indicator';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function hideTyping() {
    var el = document.getElementById('chat-typing-indicator');
    if (el) el.remove();
  }

  function addMessage(text, role, data) {
    var div = document.createElement('div');
    div.className = 'chat-msg ' + role;
      if (role === 'bot') {
        div.innerHTML = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      } else {
        div.textContent = text;
      }
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function normalize(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '').trim();
  }

  function extractKeywords(s) {
    var words = normalize(s).split(/\s+/);
    var stop = ['que','como','cual','donde','cuando','porque','para','con','sin','las','los','una','uno','del','el','la','en','es','se','su','un','de','y','a','e','i','o','u','le','les','por','al','mas','pero','esto','eso','aquello','muy','tiene','tienen','son','hay','fue','era','ser','hace','entre','todo','cada','asi','tambien','solo','sino'];
    return words.filter(function(w) { return w.length > 2 && stop.indexOf(w) === -1; });
  }

  function scoreMatch(keywords, text) {
    if (!text) return 0;
    var t = normalize(text);
    var score = 0;
    for (var i = 0; i < keywords.length; i++) {
      if (t.indexOf(keywords[i]) !== -1) {
        score += keywords[i].length;
      }
    }
    return score;
  }

  // preguntas rápidas por keywords fijas
  var quickAnswers = [
    { keywords: ['inmortal','turritopsis','dohrnii','eterna'], text: 'La **Turritopsis dohrnii** es conocida como la medusa inmortal. Mide solo 4.5 mm y puede revertir su ciclo de vida mediante transdiferenciación, volviendo al estado de pólipo cuando está estresada o envejece. ¡En teoría puede vivir para siempre!<div class="source">Fuente: biología marina, estudio de transdiferenciación</div>' },
    { keywords: ['venenosa','peligrosa','mortal','picadura','muerte'], text: 'La medusa más venenosa es la **Chironex fleckeri** (avispa de mar). Su veneno puede causar paro cardíaco en 3-20 minutos. Sin embargo, no todas las medusas son peligrosas — muchas tienen veneno demasiado débil para afectar humanos.<div class="source">Fuente: registro de especies marinas venenosas</div>' }
  ];

  function checkQuickAnswer(kw) {
    for (var i = 0; i < quickAnswers.length; i++) {
      var qa = quickAnswers[i];
      for (var j = 0; j < qa.keywords.length; j++) {
        for (var k = 0; k < kw.length; k++) {
          if (kw[k].indexOf(qa.keywords[j]) !== -1 || qa.keywords[j].indexOf(kw[k]) !== -1) {
            return qa.text;
          }
        }
      }
    }
    return null;
  }

  function searchSupabase(kw, callback) {
    var promises = [];
    var tables = [
      { name: 'species', url: '/rest/v1/species?select=nombre_comun,nombre_cientifico,descripcion,toxicidad,datos_curiosos&limit=10' },
      { name: 'articles', url: '/rest/v1/articles?select=titulo,contenido,topico&limit=10' },
      { name: 'content_cards', url: '/rest/v1/content_cards?select=title,content,subcategory&limit=20' }
    ];

    tables.forEach(function(t) {
      promises.push(
        fetch(SUPABASE_URL + t.url, {
          headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY }
        }).then(function(r) { return r.json(); }).then(function(data) {
          var best = { score: 0, text: '', source: '' };
          (data || []).forEach(function(row) {
            var searchText = JSON.stringify(row);
            var s = scoreMatch(kw, searchText);
            if (s > best.score) {
              best.score = s;
              if (t.name === 'species') {
                best.text = 'La **' + row.nombre_comun + '** (' + row.nombre_cientifico + '): ' + (row.descripcion || '') + (row.datos_curiosos ? ' ' + row.datos_curiosos : '');
                best.source = 'Especie: ' + row.nombre_comun;
              } else if (t.name === 'articles') {
                best.text = (row.contenido || '').substring(0, 300) + (row.contenido && row.contenido.length > 300 ? '...' : '');
                best.source = 'Artículo: ' + row.titulo;
              } else if (t.name === 'content_cards') {
                best.text = '**' + row.title + '**: ' + (row.content || '');
                best.source = 'Sección: ' + (row.subcategory || 'general');
              }
            }
          });
          return best;
        }).catch(function() { return { score: 0, text: '', source: '' }; })
      );
    });

    Promise.all(promises).then(function(results) {
      var sorted = results.filter(function(r) { return r.score > 0; }).sort(function(a, b) { return b.score - a.score; });
      if (sorted.length > 0) {
        var answer = sorted[0].text;
        if (sorted[0].source) {
          answer += '<div class="source">' + escapeHtml(sorted[0].source) + '</div>';
        }
        callback(answer);
      } else {
        callback(null);
      }
    });
  }

  function askN8n(question, callback) {
    if (!N8N_WEBHOOK_URL) {
      callback(null);
      return;
    }
    fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: question })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) { callback(data.answer || null); })
    .catch(function() { callback(null); });
  }

  function handleQuestion(question) {
    question = question.trim();
    if (!question) return;

    addMessage(question, 'user');
    input.value = '';
    showTyping();

    var kw = extractKeywords(question);

    function respond(answer) {
      hideTyping();
      if (answer) {
        addMessage(answer, 'bot');
      } else {
        addMessage('No encontré información específica sobre eso en la base de datos. ' +
          'Prueba preguntar sobre especies como la medusa luna, la avispa de mar, o la medusa inmortal. ' +
          'También sé sobre anatomía, picaduras, bioluminiscencia y más 🪼' +
          '<div class="source">Consejo: intenta con preguntas más cortas o palabras clave</div>', 'bot');
      }
    }

    // 1. intentar respuesta rápida por keywords
    var quick = checkQuickAnswer(kw);
    if (quick) {
      hideTyping();
      addMessage(quick, 'bot');
      return;
    }

    // 2. intentar n8n (si configurado)
    if (N8N_WEBHOOK_URL) {
      askN8n(question, function(answer) {
        if (answer) { hideTyping(); addMessage(answer, 'bot'); }
        else { searchSupabase(kw, respond); }
      });
    } else {
      // 3. buscar en Supabase
      searchSupabase(kw, respond);
    }
  }

  // eventos
  toggle.addEventListener('click', function() {
    windowEl.classList.toggle('open');
    if (windowEl.classList.contains('open')) {
      input.focus();
      messages.scrollTop = messages.scrollHeight;
    }
  });

  closeBtn.addEventListener('click', function() {
    windowEl.classList.remove('open');
  });

  sendBtn.addEventListener('click', function() {
    handleQuestion(input.value);
  });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') handleQuestion(input.value);
  });
})();
