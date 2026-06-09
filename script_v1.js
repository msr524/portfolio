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

  // --- AI RESUME BOT INTERFACE ---
  const chatOutput = document.getElementById('chat-output');
  const chatUserInput = document.getElementById('chat-user-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatPresets = document.querySelectorAll('.chat-preset-btn');

  const aiResponses = {
    skills: "Murali is highly proficient in Python (Pandas, NumPy, Scikit-learn), SQL (MySQL), Generative AI (RAG pipelines, LangChain, ChromaDB, Gemini API), and Data Analytics (EDA, Power BI dashboard development, Tableau, advanced MS Excel).",
    projects: "Murali's key projects include:\n1. AI Resume Analyser: An NLP-driven ATS scoring system using TF-IDF and Streamlit.\n2. Digital Clone AI: A context-aware RAG search pipeline using LangChain, ChromaDB, and Gemini API that indexes 50,000+ chunks.",
    experience: "He was a Data Analyst Intern at Tata Consultancy Services (TCS) from June to August 2024. He automated BI reports, reducing manual reporting by 40%, wrangled 10,000+ row datasets, and executed ETL pipelines.",
    education: "Murali holds a B.Tech in Computer Science & Engineering (spec. AI & ML) from Avanthi Institute of Engineering & Technology (JNTUGV) with a graduation grade of 8.0/10 CGPA.",
    location: "He is based in Hyderabad, India, and is open to relocation for Data Analytics, AI/ML Engineering, or Prompt Engineering roles.",
    contact: "You can email him at msrbattula@gmail.com, call at +91 7702272099, or connect on LinkedIn (linkedin.com/in/murali-battula) and GitHub (github.com/msr524)."
  };

  function appendChatMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    const prefix = sender === 'bot' ? '[AGENT]: ' : 'Guest: ';
    const prefixSpan = `<span style="color: ${sender === 'bot' ? 'var(--neon-blue)' : 'var(--neon-teal)'}; font-family: monospace;">${prefix}</span>`;
    msg.innerHTML = `${prefixSpan}${text.replace(/\n/g, '<br>')}`;
    chatOutput.appendChild(msg);
    chatOutput.scrollTop = chatOutput.scrollHeight;
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

    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-msg bot';
    typingIndicator.innerHTML = '<span style="color: var(--neon-blue); font-family: monospace;">[AGENT]:</span> <span class="blink">...</span>';
    chatOutput.appendChild(typingIndicator);
    chatOutput.scrollTop = chatOutput.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      appendChatMessage('bot', reply);
      if (audioEnabled) {
        playSynthSound(900, 'sine', 0.1, 0.03);
      }
    }, 800);
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

  // --- SONAR RADAR CANVAS ANIMATION ---
  function initSonarRadar() {
    const canvas = document.getElementById('sonar-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 280;
    let height = 280;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width || 280;
      height = rect.height || 280;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    // Set initial size
    resize();
    
    // Listen for window resize to adjust canvas buffer
    window.addEventListener('resize', resize);

    const center = { x: width / 2, y: height / 2 };
    const maxRadius = Math.min(width, height) / 2 - 10;
    let angle = 0;
    const speed = 0.015; // Sweep speed

    // Radar blips collection
    const blips = [];
    const maxBlips = 4;

    function createBlip() {
      const distance = 40 + Math.random() * (maxRadius - 60);
      const blipAngle = Math.random() * Math.PI * 2;
      return {
        x: center.x + Math.cos(blipAngle) * distance,
        y: center.y + Math.sin(blipAngle) * distance,
        angle: blipAngle,
        intensity: 0,
        detected: false,
        size: 2.5 + Math.random() * 2,
        id: `TGT-${Math.floor(Math.random() * 900 + 100)}`
      };
    }

    // Initialize random targets
    for (let i = 0; i < maxBlips; i++) {
      blips.push(createBlip());
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Dark background fill
      ctx.fillStyle = 'rgba(5, 11, 20, 0.4)';
      ctx.fillRect(0, 0, width, height);

      // Concentric circles grid lines
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.15)';
      ctx.lineWidth = 1;
      for (let r = maxRadius / 4; r <= maxRadius; r += maxRadius / 4) {
        ctx.beginPath();
        ctx.arc(center.x, center.y, r, 0, Math.PI * 2);
        ctx.stroke();

        // Level labels
        ctx.fillStyle = 'rgba(0, 210, 255, 0.35)';
        ctx.font = '8px monospace';
        ctx.fillText(`${Math.round((r / maxRadius) * 100)}%`, center.x + 4, center.y - r + 3);
      }

      // Vertical & horizontal axes crosshairs
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.1)';
      ctx.beginPath();
      ctx.moveTo(center.x - maxRadius, center.y);
      ctx.lineTo(center.x + maxRadius, center.y);
      ctx.moveTo(center.x, center.y - maxRadius);
      ctx.lineTo(center.x, center.y + maxRadius);
      ctx.stroke();

      // Outer glowing frame circle
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(center.x, center.y, maxRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw sweeping gradient trail
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(angle);

      // Gradient arc for sweep trail (pie slice of 60 degrees)
      for (let i = 0; i < 60; i++) {
        const alpha = (i / 60) * 0.25;
        ctx.fillStyle = `rgba(0, 210, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, maxRadius, -i * Math.PI / 180, -(i - 1) * Math.PI / 180);
        ctx.closePath();
        ctx.fill();
      }

      // Main rotating sweep vector line
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(maxRadius, 0);
      ctx.stroke();
      ctx.restore();

      // Update sweep rotation angle
      angle = (angle + speed) % (Math.PI * 2);

      // Draw blips
      blips.forEach((blip, idx) => {
        let diff = angle - blip.angle;
        // Normalize diff to [0, 2*PI]
        while (diff < 0) diff += Math.PI * 2;
        while (diff > Math.PI * 2) diff -= Math.PI * 2;

        // Trigger detection when sweep line intersects target coordinates
        if (diff < 0.15 && diff > 0) {
          if (!blip.detected) {
            blip.detected = true;
            blip.intensity = 1.0;
            // Intermittent silent sonar sweep blip sound
            if (audioEnabled && Math.random() > 0.6) {
              playSynthSound(1000 + Math.random() * 300, 'sine', 0.04, 0.003);
            }
          }
        } else {
          blip.detected = false;
        }

        // Intensity fade decay
        if (blip.intensity > 0) {
          blip.intensity -= 0.006;
        }

        if (blip.intensity <= 0) {
          blip.intensity = 0;
          // Recycle blip randomly
          if (Math.random() < 0.01) {
            blips[idx] = createBlip();
          }
        }

        // Draw active targets
        if (blip.intensity > 0) {
          ctx.save();
          // Radar target coordinate dot
          ctx.beginPath();
          ctx.arc(blip.x, blip.y, blip.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 210, 255, ${blip.intensity})`;
          ctx.fill();

          // Reticle boundary box
          ctx.strokeStyle = `rgba(0, 210, 255, ${blip.intensity * 0.4})`;
          ctx.lineWidth = 0.75;
          const boxSize = blip.size + 5;
          ctx.strokeRect(blip.x - boxSize / 2, blip.y - boxSize / 2, boxSize, boxSize);

          // Digital telemetry labels next to blip
          ctx.font = '7px monospace';
          ctx.fillStyle = `rgba(0, 210, 255, ${blip.intensity * 0.65})`;
          ctx.fillText(blip.id, blip.x + boxSize - 2, blip.y - 2);
          ctx.fillText(`R:${Math.round(blip.x)},A:${(blip.angle * 180 / Math.PI).toFixed(0)}°`, blip.x + boxSize - 2, blip.y + 5);
          ctx.restore();
        }
      });

      // Core anchor node at center
      ctx.beginPath();
      ctx.arc(center.x, center.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 210, 255, 0.9)';
      ctx.fill();

      requestAnimationFrame(draw);
    }

    draw();
  }

  // Safe activation of Sonar Radar Canvas
  try {
    initSonarRadar();
  } catch (err) {
    console.error("Sonar radar component initialization error:", err);
  }
});
