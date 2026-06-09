document.addEventListener('DOMContentLoaded', () => {
  
  // --- MOCK CYBERPUNK BOOT LOG ---
  console.log(`
███╗   ███╗██╗   ██╗██████╗  █████╗ ██╗     ██╗    ██████╗ ███████╗██╗   ██╗
████╗ ████║██║   ██║██╔══██╗██╔══██╗██║     ██║    ██╔══██╗██╔════╝██║   ██║
██╔████╔██║██║   ██║██████╔╝███████║██║     ██║    ██║  ██║█████╗  ██║   ██║
██║╚██╔╝██║██║   ██║██╔══██╗██╔══██║██║     ██║    ██║  ██║██╔══╝  ╚██╗ ██╔╝
██║ ╚═╝ ██║╚██████╔╝██║  ██║██║  ██║███████╗██║    ██████╔╝███████╗ ╚████╔╝ 
╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝    ╚═════╝ ╚══════╝  ╚═══╝  
                                                                            
> INITIALIZING SECURITY SHELL...
> SECURE CONNECTION ESTABLISHED.
> CREDENTIALS MATCHED: BATTULA MURALI SURYA RAMESH
> SYSTEM STATE: 100% OPERATIONAL
  `);

  // --- THREE.JS BACKGROUND CONSTALLATION (MULTI-COLOR PARTICLES) ---
  let scene, camera, renderer, starGeo, stars;
  let mouseX = 0, mouseY = 0;

  function initThree() {
    const canvas = document.getElementById('three-bg');
    if (!canvas) return;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    starGeo = new THREE.BufferGeometry();
    const starCount = 650;
    const posArray = new Float32Array(starCount * 3);
    const colorArray = new Float32Array(starCount * 3);

    // Color definitions for colorful stars
    const particleColors = [
      [0.05, 0.95, 0.79], // Cyan (#0df2c9)
      [0.0, 0.82, 1.0],   // Blue (#00d2ff)
      [0.74, 0.0, 1.0],   // Purple (#bd00ff)
      [1.0, 0.0, 0.5]     // Pink (#ff007f)
    ];

    for (let i = 0; i < starCount; i++) {
      // Coordinates
      posArray[i * 3] = (Math.random() - 0.5) * 600;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 600;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 600;

      // Colors
      const randomColor = particleColors[Math.floor(Math.random() * particleColors.length)];
      colorArray[i * 3] = randomColor[0];
      colorArray[i * 3 + 1] = randomColor[1];
      colorArray[i * 3 + 2] = randomColor[2];
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Points material utilizing vertex colors
    const starMaterial = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);

    animateThree();
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
  }

  function animateThree() {
    requestAnimationFrame(animateThree);

    // Rotate points
    stars.rotation.y += 0.0007;
    stars.rotation.x += 0.0002;

    // Mouse follow drift
    camera.position.x += (mouseX * 0.04 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.04 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  // Safe initiation of Three.js
  try {
    if (typeof THREE !== 'undefined') {
      initThree();
    }
  } catch (err) {
    console.error("Three.js particle system setup failed:", err);
  }

  // --- SYNTHESIZED WEB AUDIO SOUND SYSTEM ---
  let audioCtx = null;
  let audioEnabled = true; // Default to TRUE for sound effects

  const audioToggleBtn = document.getElementById('audio-toggle');
  const audioBtnText = document.getElementById('audio-btn-text');
  const audioIcon = document.getElementById('audio-icon');
  const heroVideo = document.getElementById('hero-video');
  const audioAlertMsg = document.getElementById('audio-alert-msg');

  function initAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSynthSound(freq, type, duration, vol = 0.04) {
    if (!audioEnabled || !audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    try {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Synth play block:", e);
    }
  }

  // Handle Global Audio Toggle Actions
  function updateAudioToggleUI() {
    if (audioEnabled) {
      audioToggleBtn.classList.add('active');
      audioBtnText.textContent = "Audio On";
      audioIcon.innerHTML = `
        <path d="M11 5L6 9H2v6h4l5 4V5z"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      `;
      if (heroVideo) {
        heroVideo.muted = false; // UNMUTE video when active
      }
    } else {
      audioToggleBtn.classList.remove('active');
      audioBtnText.textContent = "Audio Off";
      audioIcon.innerHTML = `
        <path d="M11 5L6 9H2v6h4l5 4V5z"/>
        <line x1="23" y1="9" x2="17" y2="15"/>
        <line x1="17" y1="9" x2="23" y2="15"/>
      `;
      if (heroVideo) {
        heroVideo.muted = true; // MUTE video
      }
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Stop window click triggers
      initAudioContext();
      audioEnabled = !audioEnabled;
      updateAudioToggleUI();
      if (audioEnabled) {
        playSynthSound(600, 'sine', 0.1, 0.05);
        setTimeout(() => playSynthSound(800, 'sine', 0.15, 0.05), 80);
      }
    });
  }

  // --- COMPLIANT UNMUTED AUTOPLAY LOGIC ---
  if (heroVideo) {
    // Attempt unmuted autoplay by default
    heroVideo.muted = false;
    
    const playPromise = heroVideo.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Autoplay unmuted succeeded!
        audioEnabled = true;
        initAudioContext();
        updateAudioToggleUI();
      }).catch(error => {
        // Autoplay unmuted blocked by browser policies
        console.log("Autoplay unmuted blocked. Falling back to muted autoplay.");
        heroVideo.muted = true;
        heroVideo.play(); // Play muted
        
        // Show user click alert overlay
        if (audioAlertMsg) {
          audioAlertMsg.style.display = 'block';
        }
        
        audioEnabled = false;
        updateAudioToggleUI();
      });
    }
  }

  // Universal click handler to unmute audio context and video once user interacts
  window.addEventListener('click', () => {
    initAudioContext();
    
    // If audio is locked and video is muted, enable it now
    if (heroVideo && heroVideo.muted && audioAlertMsg && audioAlertMsg.style.display === 'block') {
      heroVideo.muted = false;
      audioEnabled = true;
      audioAlertMsg.style.display = 'none';
      updateAudioToggleUI();
      
      // Play a diagnostic audio confirmation beep
      playSynthSound(700, 'sine', 0.12, 0.06);
      setTimeout(() => playSynthSound(900, 'sine', 0.15, 0.06), 70);
    }
  });

  // Sound effects hover listeners
  const hoverSoundSelectors = ['.btn', '.nav-link', '.skill-chip', '.cert-card', '.project-link', '.footer-social', '.chat-preset-btn'];
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    const matchesSelector = hoverSoundSelectors.some(selector => target.closest(selector));
    
    if (matchesSelector && audioEnabled) {
      playSynthSound(1100, 'sine', 0.04, 0.015);
    }
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    const matchesSelector = hoverSoundSelectors.some(selector => target.closest(selector));
    
    if (matchesSelector && audioEnabled && target.id !== 'audio-toggle' && target.id !== 'btn-enter-terminal') {
      playSynthSound(500, 'sine', 0.06, 0.02);
    }
  });


  // --- STICKY HEADER SCROLL TRANSITION ---
  const header = document.getElementById('header');
  header.style.transform = 'translateY(-100%)';
  header.style.opacity = '0';
  header.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease';

  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.8) {
      header.style.transform = 'translateY(0)';
      header.style.opacity = '1';
      header.classList.add('scrolled');
    } else {
      header.style.transform = 'translateY(-100%)';
      header.style.opacity = '0';
      header.classList.remove('scrolled');
    }
  });

  // --- MOBILE NAVIGATION BAR ---
  const mobileMenu = document.getElementById('mobile-menu');
  const navList = document.getElementById('nav-list');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    
    const spans = mobileMenu.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      mobileMenu.classList.remove('open');
      const spans = mobileMenu.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // --- TYPEWRITER ANIMATION FOR HERO ---
  const typewriterText = document.getElementById('typewriter-text');
  const words = ["AI & ML Engineer", "Data Analyst", "GenAI Developer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;
  let eraseDelay = 50;
  let newWordDelay = 2000;

  function type() {
    if (!typewriterText) return;
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typewriterText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = eraseDelay;
    } else {
      typewriterText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingDelay = newWordDelay;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingDelay = 500;
    }

    setTimeout(type, typingDelay);
  }

  if (typewriterText) {
    setTimeout(type, 1000);
  }

  // --- SCROLLSPY ---
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // --- INTERACTIVE CLI TERMINAL ENGINE ---
  const cliInput = document.getElementById('cli-input');
  const cliOutput = document.getElementById('cli-output');

  function printTerminalLine(text, isMarkup = false) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (isMarkup) {
      line.innerHTML = text;
    } else {
      line.textContent = text;
    }
    cliOutput.appendChild(line);
    cliOutput.scrollTop = cliOutput.scrollHeight;
  }

  if (cliInput) {
    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = cliInput.value.trim().toLowerCase();
        cliInput.value = '';

        printTerminalLine(`guest@bmr_terminal:~$ ${command}`, false);

        if (command === '') return;

        setTimeout(() => {
          switch (command) {
            case 'help':
              printTerminalLine(`Available Terminal Commands:`, false);
              printTerminalLine(`  about       - Display summary profile details`, false);
              printTerminalLine(`  skills      - Show core technical abilities`, false);
              printTerminalLine(`  experience  - Show timeline work history`, false);
              printTerminalLine(`  projects    - Output featured application codebases`, false);
              printTerminalLine(`  sysinfo     - Display local connection status parameters`, false);
              printTerminalLine(`  clear       - Wipe CLI screen history`, false);
              break;
            case 'about':
              printTerminalLine(`B.Tech CSE (AI & ML) Graduate. Proficient in Python, SQL, Machine Learning, NLP, Prompt Engineering, RAG pipelines, and BI reporting. micro1 certified AI Developer (June 2026). Published peer-reviewed research (Feb 2026). Grade: 8.0 CGPA. Hyderabad, India.`);
              break;
            case 'skills':
              printTerminalLine(`[ PROGRAMMING & DATABASES ]`, false);
              printTerminalLine(`  Python (Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn), SQL (MySQL), Git, GitHub`, false);
              printTerminalLine(`[ AI / ML & GENERATIVE AI ]`, false);
              printTerminalLine(`  Machine Learning, Deep Learning, NLP, RAG Systems, LangChain, ChromaDB, Gemini API`, false);
              printTerminalLine(`[ DATA ANALYTICS & TOOLS ]`, false);
              printTerminalLine(`  EDA, Hypothesis Testing, Power BI, Tableau, Excel, Claude Code, Streamlit`, false);
              break;
            case 'experience':
              printTerminalLine(`DATA ANALYST INTERN - Tata Consultancy Services (TCS) // Jun 2024 - Aug 2024`, false);
              printTerminalLine(`  * Conducted EDA & stats testing on 10,000+ rows enterprise datasets.`, false);
              printTerminalLine(`  * Built automated BI dashboards reducing manual reporting time by 40%.`, false);
              printTerminalLine(`  * Developed ETL wrangling structures to secure 100% data integrity.`, false);
              break;
            case 'projects':
              printTerminalLine(`1. AI RESUME ANALYSER (Streamlit, NLP, TF-IDF)`, false);
              printTerminalLine(`   Repo: <a href="https://github.com/msr524/-AI-resume-analyser" target="_blank" style="color:var(--neon-teal);">github.com/msr524/-AI-resume-analyser</a>`, true);
              printTerminalLine(`2. DIGITAL CLONE AI (LangChain, ChromaDB, RAG, Gemini)`, false);
              printTerminalLine(`   Repo: <a href="https://github.com/msr524/digital-clone" target="_blank" style="color:var(--neon-teal);">github.com/msr524/digital-clone</a>`, true);
              break;
            case 'sysinfo':
              printTerminalLine(`SYSTEM ENVIRONMENT TELEMETRY:`, false);
              printTerminalLine(`  Host: ${window.location.host}`, false);
              printTerminalLine(`  Platform: ${navigator.userAgent.slice(0, 40)}...`, false);
              printTerminalLine(`  Memory Status: STABLE`, false);
              printTerminalLine(`  Access Authorization: GRANTED (Level 07)`, false);
              break;
            case 'clear':
              cliOutput.innerHTML = '';
              break;
            default:
              printTerminalLine(`bash: command not found: ${command}. Type 'help' for instructions.`, false);
          }
        }, 80);
      }
    });
  }

  // --- TRANSFORMER INFERENCE EXPLORER ENGINE ---
  const chatOutput = document.getElementById('chat-output');
  const chatUserInput = document.getElementById('chat-user-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatPresets = document.querySelectorAll('.chat-preset-btn');
  const inferenceHudPanel = document.getElementById('inference-hud-panel');
  const tokenizerOutput = document.getElementById('tokenizer-output');
  const embeddingOutput = document.getElementById('embedding-output');
  const attentionCanvas = document.getElementById('attention-canvas');
  const attentionTooltip = document.getElementById('attention-tooltip');

  const aiResponses = {
    skills: "Murali is highly proficient in Python (Pandas, NumPy, Scikit-learn), SQL (MySQL), Generative AI (RAG pipelines, LangChain, ChromaDB, Gemini API), and Data Analytics (EDA, Power BI dashboard development, Tableau, advanced MS Excel).",
    projects: "Murali's key projects include:\n1. AI Resume Analyser: An NLP-driven ATS scoring system using TF-IDF and Streamlit.\n2. Digital Clone AI: A context-aware RAG search pipeline using LangChain, ChromaDB, and Gemini API that indexes 50,000+ chunks.",
    experience: "He was a Data Analyst Intern at Tata Consultancy Services (TCS) from June to August 2024. He automated BI reports, reducing manual reporting by 40%, wrangled 10,000+ row datasets, and executed ETL pipelines.",
    education: "Murali holds a B.Tech in Computer Science & Engineering (spec. AI & ML) from Avanthi Institute of Engineering & Technology (JNTUGV) with a graduation grade of 8.0/10 CGPA.",
    location: "He is based in Hyderabad, India, and is open to relocation for Data Analytics, AI/ML Engineering, or Prompt Engineering roles.",
    contact: "You can email him at msrbattula@gmail.com, call at +91 7702272099, or connect on LinkedIn (linkedin.com/in/murali-battula) and GitHub (github.com/msr524)."
  };

  let currentTokens = [];
  let currentAttentionMatrix = [];

  function appendChatMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    const prefix = sender === 'bot' ? '[AGENT]: ' : 'Guest: ';
    const prefixSpan = `<span style="color: ${sender === 'bot' ? 'var(--neon-blue)' : 'var(--neon-teal)'}; font-family: monospace;">${prefix}</span>`;
    msg.innerHTML = `${prefixSpan}${text.replace(/\n/g, '<br>')}`;
    chatOutput.appendChild(msg);
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }

  function tokenizeText(text) {
    const rawWords = text.match(/\b\w+\b|[^\s\w]/g) || [];
    const tokens = ["[BOS]"];
    rawWords.forEach(w => {
      if (w.length > 6) {
        tokens.push(w.substring(0, 4) + "@@");
        tokens.push(w.substring(4));
      } else {
        tokens.push(w);
      }
    });
    tokens.push("[EOS]");
    return tokens.map(tok => {
      let id = 0;
      for (let i = 0; i < tok.length; i++) {
        id = (id * 31 + tok.charCodeAt(i)) % 32768;
      }
      return { text: tok, id: id + 100 };
    });
  }

  function renderAttentionMatrix(tokens) {
    if (!attentionCanvas) return;
    const ctx = attentionCanvas.getContext('2d');
    const size = attentionCanvas.width;
    const n = tokens.length;
    const cellSize = size / n;

    const matrix = [];
    for (let r = 0; r < n; r++) {
      matrix[r] = [];
      let rowSum = 0;
      for (let c = 0; c < n; c++) {
        let weight = Math.random();
        if (tokens[r].text === "[BOS]" || tokens[c].text === "[EOS]") weight *= 0.2;
        if (r === c) weight *= 1.5;
        if (Math.abs(r - c) === 1) weight *= 1.2;
        matrix[r][c] = weight;
        rowSum += weight;
      }
      for (let c = 0; c < n; c++) {
        matrix[r][c] = matrix[r][c] / rowSum;
      }
    }

    currentTokens = tokens;
    currentAttentionMatrix = matrix;

    ctx.clearRect(0, 0, size, size);
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const weight = matrix[r][c];
        ctx.fillStyle = `rgba(189, 0, 255, ${weight * 0.95})`;
        ctx.fillRect(c * cellSize, r * cellSize, cellSize - 1, cellSize - 1);
        
        ctx.strokeStyle = "rgba(189, 0, 255, 0.1)";
        ctx.strokeRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  }

  if (attentionCanvas) {
    attentionCanvas.addEventListener('mousemove', (e) => {
      if (!currentTokens.length) return;
      const rect = attentionCanvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cellSize = rect.width / currentTokens.length;
      
      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);

      if (row >= 0 && row < currentTokens.length && col >= 0 && col < currentTokens.length) {
        const srcTok = currentTokens[row].text;
        const tgtTok = currentTokens[col].text;
        const weight = currentAttentionMatrix[row][col].toFixed(3);
        attentionTooltip.textContent = `Attn: "${srcTok}" ➔ "${tgtTok}" = ${weight}`;
      }
    });

    attentionCanvas.addEventListener('mouseleave', () => {
      attentionTooltip.textContent = "";
    });
  }

  function handleBotResponse(queryText) {
    const lowerQuery = queryText.toLowerCase();
    let reply = "I'm not fully sure how to answer that. I can provide details on Murali's 'skills', 'projects', 'experience', 'education', or 'contact'.";

    if (lowerQuery.includes('skill') || lowerQuery.includes('python') || lowerQuery.includes('languages') || lowerQuery.includes('technologies')) {
      reply = aiResponses.skills;
    } else if (lowerQuery.includes('project') || lowerQuery.includes('resume analyser') || lowerQuery.includes('clone')) {
      reply = aiResponses.projects;
    } else if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('tcs') || lowerQuery.includes('internship')) {
      reply = aiResponses.experience;
    } else if (lowerQuery.includes('education') || lowerQuery.includes('college') || lowerQuery.includes('cgpa') || lowerQuery.includes('gpa')) {
      reply = aiResponses.education;
    } else if (lowerQuery.includes('location') || lowerQuery.includes('relocation') || lowerQuery.includes('hyd')) {
      reply = aiResponses.location;
    } else if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('social')) {
      reply = aiResponses.contact;
    }

    if (inferenceHudPanel) inferenceHudPanel.style.display = 'flex';
    if (tokenizerOutput) tokenizerOutput.innerHTML = '';
    if (embeddingOutput) embeddingOutput.innerHTML = '';
    
    const tokens = tokenizeText(queryText);
    
    const colors = ["#0df2c9", "#00d2ff", "#bd00ff", "#ff007f", "#50fa7b", "#ff9900"];
    tokens.forEach((tok, idx) => {
      setTimeout(() => {
        const chip = document.createElement('span');
        chip.className = 'tokenizer-token';
        const col = colors[idx % colors.length];
        chip.style.border = `1px solid ${col}`;
        chip.style.color = col;
        chip.style.background = `rgba(${parseInt(col.substring(1,3),16)}, ${parseInt(col.substring(3,5),16)}, ${parseInt(col.substring(5,7),16)}, 0.08)`;
        chip.title = `Token ID: ${tok.id}`;
        chip.textContent = tok.text;
        if (tokenizerOutput) tokenizerOutput.appendChild(chip);
        if (audioEnabled) {
          playSynthSound(1000 + idx * 80, 'sine', 0.03, 0.008);
        }
      }, idx * 100);
    });

    setTimeout(() => {
      renderAttentionMatrix(tokens);
    }, tokens.length * 100);

    setTimeout(() => {
      let vecText = "";
      for (let i = 0; i < 40; i++) {
        setTimeout(() => {
          const val = (Math.random() * 2 - 1).toFixed(4);
          vecText += `${val}, `;
          if (i % 4 === 3) vecText += "\n";
          if (embeddingOutput) {
            embeddingOutput.textContent = vecText;
            embeddingOutput.scrollTop = embeddingOutput.scrollHeight;
          }
          if (audioEnabled) {
            playSynthSound(800 + (i%5) * 50, 'sine', 0.015, 0.005);
          }
        }, i * 30);
      }
    }, tokens.length * 100 + 100);

    const waitTime = tokens.length * 100 + 1200;
    setTimeout(() => {
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'chat-msg bot';
      typingIndicator.innerHTML = '<span style="color: var(--neon-blue); font-family: monospace;">[AGENT]:</span> <span class="blink">...</span>';
      chatOutput.appendChild(typingIndicator);
      chatOutput.scrollTop = chatOutput.scrollHeight;

      setTimeout(() => {
        typingIndicator.remove();
        
        const botWords = reply.split(" ");
        let botIndex = 0;
        let currentBotText = "";
        
        appendChatMessage('bot', "");
        const lastMsg = chatOutput.lastChild;
        const contentSpan = document.createElement('span');
        lastMsg.appendChild(contentSpan);

        function streamWord() {
          if (botIndex < botWords.length) {
            currentBotText += (botIndex === 0 ? "" : " ") + botWords[botIndex];
            contentSpan.innerHTML = currentBotText.replace(/\n/g, '<br>');
            chatOutput.scrollTop = chatOutput.scrollHeight;
            botIndex++;
            if (audioEnabled) {
              playSynthSound(900 + (botIndex % 4) * 60, 'sine', 0.03, 0.01);
            }
            setTimeout(streamWord, 50 + Math.random() * 80);
          }
        }
        streamWord();

      }, 600);
    }, waitTime);
  }

  function triggerUserChat() {
    const text = chatUserInput.value.trim();
    if (text === '') return;

    chatUserInput.value = '';
    appendChatMessage('user', text);
    handleBotResponse(text);
  }

  if (chatSendBtn) {
    chatSendBtn.addEventListener('click', triggerUserChat);
  }

  if (chatUserInput) {
    chatUserInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        triggerUserChat();
      }
    });
  }

  if (chatPresets) {
    chatPresets.forEach(btn => {
      btn.addEventListener('click', () => {
        const question = btn.getAttribute('data-question');
        appendChatMessage('user', question);
        handleBotResponse(question);
      });
    });
  }


  // --- INTERSECTION OBSERVER FOR SCROLL REVEALS ---
  const revealTargets = [
    ...document.querySelectorAll('.glass-panel'),
    ...document.querySelectorAll('.timeline-item'),
    document.querySelector('.about-text'),
    document.querySelector('.profile-visual')
  ];

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealStyle = document.createElement('style');
  revealStyle.innerHTML = `
    .reveal-element {
      opacity: 0;
      transform: translateY(25px);
      transition: opacity 0.8s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    .reveal-element.active {
      opacity: 1;
      transform: translateY(0);
    }
    .blink {
      animation: blink 0.8s infinite alternate;
    }
  `;
  document.head.appendChild(revealStyle);

  revealTargets.forEach(target => {
    if (target) {
      target.classList.add('reveal-element');
    }
  });

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealTargets.forEach(target => {
    if (target) {
      scrollObserver.observe(target);
    }
  });


  // --- MOCK CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('portfolio-contact-form');
  const formStatus = document.getElementById('form-status-msg');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) return;

      submitBtn.disabled = true;
      submitBtn.textContent = '>> TRANSMITTING MESSAGE...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        
        formStatus.textContent = `[ SYS.MSG: SUCCESS ] Transmission received from ${name}. Thank you.`;
        formStatus.classList.add('success');
        
        contactForm.reset();

        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.classList.remove('success');
        }, 5000);
      }, 1500);
    });
  }


  // --- NEURAL NETWORK CANVAS ANIMATION (MODEL_GRAPH) ---
  function initNeuralNetwork() {
    const canvas = document.getElementById('nn-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 280;
    let height = 280;
    let dpr = window.devicePixelRatio || 1;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 280;
      height = rect.height || 280;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }
    
    resize();
    window.addEventListener('resize', resize);

    const layerSizes = [4, 5, 5, 3];
    const layers = [];
    const colors = [
      '#00d2ff',
      '#bd00ff',
      '#ff007f',
      '#0df2c9'
    ];

    const layerSpacing = width / (layerSizes.length + 0.6);
    
    for (let l = 0; l < layerSizes.length; l++) {
      const layerNodes = [];
      const nodeCount = layerSizes[l];
      const x = layerSpacing * (l + 0.8);
      const verticalSpacing = (height - 40) / (nodeCount + 1);

      for (let n = 0; n < nodeCount; n++) {
        const y = verticalSpacing * (n + 1) + 20;
        layerNodes.push({
          x: x,
          y: y,
          radius: l === 0 || l === layerSizes.length - 1 ? 6.5 : 5,
          activation: Math.random(),
          bias: (Math.random() * 2 - 1).toFixed(2),
          label: l === layerSizes.length - 1 ? ['DA', 'AI', 'GE'][n] : `n_${l}_${n}`
        });
      }
      layers.push(layerNodes);
    }

    const signals = [];

    function spawnSignal() {
      const fromNode = Math.floor(Math.random() * layerSizes[0]);
      signals.push({
        layer: 0,
        fromIdx: fromNode,
        toIdx: Math.floor(Math.random() * layerSizes[1]),
        progress: 0,
        speed: 0.012 + Math.random() * 0.008
      });
    }

    let mouse = { x: -1000, y: -1000 };
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    let frame = 0;

    function draw() {
      frame++;
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(5, 11, 20, 0.35)';
      ctx.fillRect(0, 0, width, height);

      for (let l = 0; l < layers.length - 1; l++) {
        const currentLayer = layers[l];
        const nextLayer = layers[l + 1];

        for (let i = 0; i < currentLayer.length; i++) {
          const fromNode = currentLayer[i];
          for (let j = 0; j < nextLayer.length; j++) {
            const toNode = nextLayer[j];

            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);

            const pulse = 0.15 + Math.sin(frame * 0.05 + i * j) * 0.05;
            
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;
            const dx = mouse.x - midX;
            const dy = mouse.y - midY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 40) {
              ctx.strokeStyle = `rgba(0, 210, 255, ${0.45 + (1 - dist / 40) * 0.35})`;
              ctx.lineWidth = 1.2;
            } else {
              ctx.strokeStyle = l === 0 ? `rgba(189, 0, 255, ${pulse})` : `rgba(0, 210, 255, ${pulse})`;
              ctx.lineWidth = 0.65;
            }
            ctx.stroke();
          }
        }
      }

      if (frame % 35 === 0 && signals.length < 15) {
        spawnSignal();
      }

      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        const currentL = layers[sig.layer];
        const nextL = layers[sig.layer + 1];
        
        const fromNode = currentL[sig.fromIdx];
        const toNode = nextL[sig.toIdx];

        const x = fromNode.x + (toNode.x - fromNode.x) * sig.progress;
        const y = fromNode.y + (toNode.y - fromNode.y) * sig.progress;

        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = colors[sig.layer + 1];
        ctx.shadowColor = colors[sig.layer + 1];
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;

        sig.progress += sig.speed;

        if (sig.progress >= 1) {
          if (sig.layer < layerSizes.length - 2) {
            sig.layer++;
            sig.fromIdx = sig.toIdx;
            sig.toIdx = Math.floor(Math.random() * layerSizes[sig.layer + 1]);
            sig.progress = 0;
            sig.speed = 0.012 + Math.random() * 0.008;
          } else {
            const outNode = layers[layerSizes.length - 1][sig.toIdx];
            outNode.activation = 1.0;
            if (audioEnabled && Math.random() > 0.85) {
              playSynthSound(1200 + sig.toIdx * 150, 'sine', 0.02, 0.002);
            }
            signals.splice(s, 1);
          }
        }
      }

      let hoveredNode = null;

      for (let l = 0; l < layers.length; l++) {
        const nodes = layers[l];
        for (let n = 0; n < nodes.length; n++) {
          const node = nodes[n];

          if (node.activation > 0.25) {
            node.activation -= 0.015;
          } else {
            node.activation = 0.15 + Math.sin(frame * 0.03 + n) * 0.05;
          }

          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const isHovered = dist < node.radius + 3;

          if (isHovered) hoveredNode = { node, layer: l };

          ctx.beginPath();
          const rad = isHovered ? node.radius + 2 : node.radius;
          ctx.arc(node.x, node.y, rad, 0, Math.PI * 2);
          
          ctx.fillStyle = colors[l];
          ctx.shadowColor = colors[l];
          ctx.shadowBlur = isHovered ? 12 : node.activation * 10;
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, rad / 2, 0, Math.PI * 2);
          ctx.stroke();

          if (l === layerSizes.length - 1) {
            ctx.fillStyle = colors[l];
            ctx.font = 'bold 9px monospace';
            ctx.fillText(node.label, node.x + 10, node.y + 3);
          }
        }
      }

      if (hoveredNode) {
        const { node, layer } = hoveredNode;
        ctx.fillStyle = 'rgba(5, 11, 20, 0.9)';
        ctx.strokeStyle = colors[layer];
        ctx.lineWidth = 0.8;
        
        const rectX = node.x - 55;
        const rectY = node.y - 42;
        ctx.fillRect(rectX, rectY, 110, 32);
        ctx.strokeRect(rectX, rectY, 110, 32);

        ctx.fillStyle = '#fff';
        ctx.font = '7px monospace';
        ctx.fillText(`LAYER: ${['INPUT', 'HIDDEN_1', 'HIDDEN_2', 'OUTPUT'][layer]}`, rectX + 6, rectY + 10);
        ctx.fillText(`BIAS: ${node.bias}`, rectX + 6, rectY + 18);
        ctx.fillText(`ACTV: ${node.activation.toFixed(3)}`, rectX + 6, rectY + 26);
      }

      requestAnimationFrame(draw);
    }

    draw();
  }


  // Safe activation of canvases
  try {
    initNeuralNetwork();
  } catch (err) {
    console.error("Neural Network component initialization error:", err);
  }


});
