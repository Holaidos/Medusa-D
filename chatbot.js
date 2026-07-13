(function() {
  'use strict';

  var SUPABASE_URL = 'https://ohwwehbadhtysmwjvfoy.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9od3dlaGJhZGh0eXNtd2p2Zm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1MTg0MjMsImV4cCI6MjA5OTA5NDQyM30.DtlcpFcDbONfjjTiIcL4PlX0sscv7ccRkwYoX_WMCp0';
  var N8N_WEBHOOK_URL = '';

  var html =
    '<div id="chat-toggle" aria-label="Abrir chat">💬</div>' +
    '<div id="chat-window">' +
      '<div id="chat-header">' +
        '<span>🪼 Chat Medusa</span>' +
        '<button id="chat-close" aria-label="Cerrar chat">✕</button>' +
      '</div>' +
      '<div id="chat-messages">' +
        '<div class="chat-msg bot">¡Hola! Pregúntame cualquier cosa sobre medusas 🪼<br><span style="font-size:12px;color:var(--text-muted)">Busco en la página, Supabase, Wikipedia y la web</span></div>' +
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
    '.chat-msg { max-width:90%; padding:12px 16px; border-radius:16px; font-size:14px; line-height:1.5; word-wrap:break-word; animation:msgIn 0.25s ease; }' +
    '@keyframes msgIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }' +
    '.chat-msg.bot { align-self:flex-start; background:rgba(0,180,255,0.08); color:var(--text,#dbe5df); border-bottom-left-radius:4px; border:1px solid rgba(0,180,255,0.1); }' +
    '.chat-msg.user { align-self:flex-end; background:linear-gradient(135deg,rgba(0,180,255,0.2),rgba(199,125,255,0.2)); color:var(--text,#dbe5df); border-bottom-right-radius:4px; }' +
    '.chat-msg .src-badge { display:inline-block; font-size:10px; font-weight:700; text-transform:uppercase; padding:1px 6px; border-radius:4px; margin-bottom:6px; letter-spacing:0.04em; }' +
    '.chat-msg .src-pagina { background:rgba(0,180,255,0.15); color:var(--primary,#00b4ff); }' +
    '.chat-msg .src-supabase { background:rgba(199,125,255,0.15); color: #c77dff; }' +
    '.chat-msg .src-wikipedia { background:rgba(0,255,209,0.15); color: #00ffd1; }' +
    '.chat-msg .src-web { background:rgba(255,107,157,0.15); color: #ff6b9d; }' +
    '.chat-msg .src-n8n { background:rgba(255,200,0,0.15); color: #ffc800; }' +
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

  function showTyping() {
    var div = document.createElement('div');
    div.className = 'chat-msg bot chat-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    div.id = 'chat-typing-indicator';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    var el = document.getElementById('chat-typing-indicator');
    if (el) el.remove();
  }

  function addMessage(text, role) {
    var div = document.createElement('div');
    div.className = 'chat-msg ' + role;
    if (role === 'bot') {
      div.innerHTML = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    } else {
      div.textContent = text;
    }
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function badge(cssClass, label) {
    return '<span class="src-badge ' + cssClass + '">' + label + '</span>';
  }

  function normalize(s) {
    return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s]/g, '').trim();
  }

  function extractKeywords(s) {
    var words = normalize(s).split(/\s+/);
    var stop = ['que','como','cual','donde','cuando','porque','para','con','sin','las','los','una','uno','del','el','la','en','es','se','su','un','de','y','a','e','i','o','u','le','les','por','al','mas','pero','esto','eso','aquello','muy','tiene','tienen','son','hay','fue','era','ser','hace','entre','todo','cada','asi','tambien','solo','sino','este','esta','esta'];
    return words.filter(function(w) { return w.length > 2 && stop.indexOf(w) === -1; });
  }

  function scoreMatch(keywords, text) {
    if (!text) return 0;
    var t = normalize(typeof text === 'string' ? text : JSON.stringify(text));
    var score = 0;
    for (var i = 0; i < keywords.length; i++) {
      var kw = keywords[i];
      var idx = t.indexOf(kw);
      while (idx !== -1) {
        score += kw.length + (kw.length > 5 ? 5 : 0);
        idx = t.indexOf(kw, idx + 1);
      }
    }
    return score;
  }

  // ============ FUENTES DE BÚSQUEDA ============

  // 1) Buscar en el texto visible de la página actual
  function searchPage(kw) {
    var main = document.querySelector('main') || document.body;
    var text = main.textContent || '';
    var paragraphs = text.split(/\n+/);
    var best = { score: 0, text: '' };
    paragraphs.forEach(function(p) {
      var trimmed = p.trim();
      if (trimmed.length < 30) return;
      var s = scoreMatch(kw, trimmed);
      if (s > best.score) {
        best.score = s;
        best.text = trimmed.substring(0, 400);
      }
    });
    return best.score > 2 ? best : null;
  }

  // 2) Buscar en Supabase
  function searchSupabase(kw, callback) {
    var tables = [
      { name: 'species', fields: 'nombre_comun,nombre_cientifico,descripcion,toxicidad,datos_curiosos', label: 'Especie' },
      { name: 'articles', fields: 'titulo,contenido,topico', label: 'Artículo' },
      { name: 'content_cards', fields: 'title,content,subcategory', label: 'Sección' }
    ];
    var promises = tables.map(function(t) {
      var url = SUPABASE_URL + '/rest/v1/' + t.name + '?select=' + t.fields + '&limit=15';
      return fetch(url, {
        headers: { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY }
      })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var best = { score: 0, text: '', source: '' };
        (data || []).forEach(function(row) {
          var s = scoreMatch(kw, JSON.stringify(row));
          if (s > best.score) {
            best.score = s;
            if (t.name === 'species') {
              best.text = '**' + row.nombre_comun + '** (' + row.nombre_cientifico + '): ' + (row.descripcion || '') + (row.datos_curiosos ? ' ' + row.datos_curiosos : '');
            } else if (t.name === 'articles') {
              best.text = (row.contenido || '').substring(0, 350) + (row.contenido && row.contenido.length > 350 ? '...' : '');
            } else {
              best.text = '**' + row.title + '**: ' + (row.content || '');
            }
            best.source = t.label + ': ' + (row.nombre_comun || row.titulo || row.title || '');
          }
        });
        return best;
      })
      .catch(function() { return { score: 0, text: '', source: '' }; });
    });

    Promise.all(promises).then(function(results) {
      var sorted = results.filter(function(r) { return r.score > 2; }).sort(function(a, b) { return b.score - a.score; });
      callback(sorted.length > 0 ? sorted[0] : null);
    });
  }

  // 3) Wikipedia API (gratis, sin auth, CORS friendly)
  function searchWikipedia(kw, callback) {
    var query = encodeURIComponent(kw.slice(0, 4).join(' ') + ' medusa jellyfish');
    var url = 'https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + query + '&srlimit=3&format=json&origin=*';
    fetch(url)
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var pages = (data.query && data.query.search) || [];
        if (pages.length === 0) { callback(null); return; }
        var title = encodeURIComponent(pages[0].title);
        var extractUrl = 'https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&exlimit=1&titles=' + title + '&format=json&origin=*';
        return fetch(extractUrl).then(function(r) { return r.json(); });
      })
      .then(function(data) {
        if (!data) { callback(null); return; }
        var pages = data.query && data.query.pages;
        if (!pages) { callback(null); return; }
        var page = Object.values(pages)[0];
        if (!page || !page.extract) { callback(null); return; }
        callback({
          text: page.extract.substring(0, 500) + (page.extract.length > 500 ? '...' : ''),
          source: 'Wikipedia: ' + page.title,
          url: 'https://es.wikipedia.org/wiki/' + encodeURIComponent(page.title)
        });
      })
      .catch(function() { callback(null); });
  }

  // 4) DuckDuckGo Instant Answer (gratis, sin auth)
  function searchDDG(kw, callback) {
    var q = encodeURIComponent(kw.join(' ') + ' medusas');
    fetch('https://api.duckduckgo.com/?q=' + q + '&format=json&no_html=1&skip_disambig=1&origin=*')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var text = data.AbstractText || data.Answer || '';
        if (text) {
          callback({ text: text.substring(0, 500), source: 'DuckDuckGo' });
        } else {
          callback(null);
        }
      })
      .catch(function() { callback(null); });
  }

  // 5) n8n (si configurado)
  function askN8n(question, callback) {
    if (!N8N_WEBHOOK_URL) { callback(null); return; }
    fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: question })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) { callback(data.answer || null); })
    .catch(function() { callback(null); });
  }

  // ============ MANEJADOR PRINCIPAL ============

  var preguntasEjemplo = [
    '¿Qué comen las medusas?',
    '¿Cuál es la medusa más venenosa?',
    '¿Cómo se reproducen?',
    '¿Tienen cerebro?',
    '¿Qué es la medusa inmortal?',
    '¿Cómo tratar una picadura?'
  ];

  function handleQuestion(question) {
    question = question.trim();
    if (!question) return;

    addMessage(question, 'user');
    input.value = '';
    showTyping();

    var kw = extractKeywords(question);

    // 1) Intentar n8n primero
    function tryN8n() {
      if (N8N_WEBHOOK_URL) {
        askN8n(question, function(answer) {
          if (answer) {
            hideTyping();
            addMessage(badge('src-n8n', 'n8n IA') + answer, 'bot');
          } else {
            tryPage();
          }
        });
      } else {
        tryPage();
      }
    }

    // 2) Buscar en la página actual
    function tryPage() {
      var pageResult = searchPage(kw);
      if (pageResult && pageResult.score > 5) {
        hideTyping();
        addMessage(badge('src-pagina', 'Esta página') + pageResult.text.substring(0, 350) + '<div class="source">Encontrado en esta página</div>', 'bot');
        return;
      }
      trySupabase();
    }

    // 3) Buscar en Supabase
    function trySupabase() {
      searchSupabase(kw, function(result) {
        if (result && result.score > 3) {
          hideTyping();
          addMessage(badge('src-supabase', 'Base de datos') + result.text + '<div class="source">' + result.source + '</div>', 'bot');
          return;
        }
        tryWikipedia();
      });
    }

    // 4) Buscar en Wikipedia
    function tryWikipedia() {
      searchWikipedia(kw, function(result) {
        if (result) {
          hideTyping();
          var link = '<br><a href="' + result.url + '" target="_blank" rel="noopener">📖 Leer más en Wikipedia →</a>';
          addMessage(badge('src-wikipedia', 'Wikipedia') + result.text + link + '<div class="source">' + result.source + '</div>', 'bot');
          return;
        }
        tryWeb();
      });
    }

    // 5) Buscar en DuckDuckGo / web
    function tryWeb() {
      searchDDG(kw, function(result) {
        if (result) {
          hideTyping();
          addMessage(badge('src-web', 'Web') + result.text + '<div class="source">' + result.source + '</div>', 'bot');
          return;
        }
        fallback();
      });
    }

    // 6) Fallback con sugerencias
    function fallback() {
      hideTyping();
      var sugerencias = preguntasEjemplo.map(function(p) {
        return '<div style="cursor:pointer;color:var(--primary);padding:4px 0;" onclick="(function(q){var i=document.getElementById(\'chat-input\');i.value=q;document.getElementById(\'chat-send\').click()})(\'' + p.replace(/'/g, "\\'") + '\')">→ ' + p + '</div>';
      }).join('');
      addMessage(
        'No encontré información específica. Prueba con una de estas preguntas:' +
        '<div style="margin-top:8px">' + sugerencias + '</div>' +
        '<div class="source">Puedes preguntar en español o inglés</div>',
        'bot'
      );
    }

    tryN8n();
  }

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
