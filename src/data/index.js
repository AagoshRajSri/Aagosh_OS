export const ABOUT = {
  developerName: "Aagosh Raj Srivastava",
  avatarEmoji: "⚡",
  shortBio: "Hi! I'm Aagosh — a full-stack engineer and distributed systems enthusiast focused on building scalable, performant architectures and secure applications. I enjoy bridging data pipeline efficiency with high-performance visualization to deliver impactful software.",
  gauges: [
    { label: "PROBLEM_SOLVING", val: "95%", pct: 95, cls: "gauge-pink", valCls: "text-pink" },
    { label: "COFFEE_INTAKE", val: "NOMINAL", pct: 85, cls: "gauge-teal", valCls: "text-teal-400" },
    { label: "LOGIC_CIRCUITRY", val: "ACTIVE", pct: 90, cls: "gauge-green", valCls: "text-green-400" },
    { label: "CODE_QUALITY", val: "STRICT", pct: 92, cls: "gauge-purple", valCls: "text-purple-400" }
  ],
  systemQuotes: [
    "\"The best architecture is the one that survives production.\"",
    "\"Optimize for readability, then for performance.\"",
    "\"Building robust systems is a continuous process.\"",
    "\"Data pipelines should be as transparent as possible.\""
  ],
  terminalResponses: {
    coffee: "☕ Coffee break engaged. System operating at optimal efficiency.",
    hire: "✅ Thank you for your interest! Forwarding contact details...",
    hello: "👋 Hey! Nice to meet you. Type 'projects' to see my work.",
    skills: "🧬 Loading skill matrix... React, Node.js, Python, PostgreSQL, Docker... [OK]",
    projects: "📁 5 active project files. Type 'decrypt' to access mission archives.",
    decrypt: "🔓 Authorization required. Please open Projects.sys for decryption.",
    music: "🎵 Playing: lo-fi beats to architect distributed systems to...",
    help: "📟 Commands: hello | hire | coffee | skills | projects | music | help",
    dream: "💜 AagoshRaj_OS: A portfolio built with precision and passion.",
    default: (input) => `> Processing: "${input}"... RESULT: ${["Understood.", "Command acknowledged.", "Logging action...", "System ready."][Math.floor(Math.random()*4)]}`
  }
};

export const PROJECTS = [
  {
    id: "raj-ai",
    filename: "RAJ_AI_CORE.bin",
    name: "RAJ-AI",
    clearance: "5",
    status: "in-progress",
    desc: "A unified software platform integrating a Kotlin API gateway, microservices, and a Python-based intelligence engine. Designed to consolidate complex tasks into a seamless, automated workflow.",
    tags: ["Python", "Flutter", "Kotlin", "Microservices", "AI Orchestration"],
    specs: {
      "Type": "Automated Software Platform",
      "Status": "UNDER CONSTRUCTION",
      "Clearance": "LEVEL-5",
      "Core Language": "Python / Kotlin"
    },
    demo: "#",
    source: "#"
  },
  {
    id: "orbit",
    filename: "ORBIT_PQC.sys",
    name: "ORBIT",
    clearance: "4",
    status: "active",
    desc: "A scalable messaging platform utilizing Socket.IO and a Redis adapter for efficient horizontal scaling. Features an offline-first queuing system and end-to-end encryption to secure communications.",
    tags: ["Socket.IO", "Redis", "Node.js", "Encryption", "Docker"],
    specs: {
      "Type": "Messaging Application",
      "Status": "PRODUCTION",
      "Clearance": "LEVEL-4",
      "Security": "End-to-End Encrypted"
    },
    demo: "https://orbitnexus.vercel.app",
    source: "https://github.com/AagoshRajSri/Orbit"
  },
  {
    id: "prahar",
    filename: "PRAHAR_GEO.intel",
    name: "PRAHAR",
    clearance: "4",
    status: "active",
    desc: "Geospatial Intelligence Platform featuring an event-driven telemetry pipeline using Socket.io and localized caching. Utilizes Three.js and WebGL to visualize large-scale geospatial data efficiently.",
    tags: ["Three.js", "WebGL", "Socket.io", "JWT", "Geospatial"],
    specs: {
      "Type": "Data Visualization",
      "Status": "PRODUCTION",
      "Clearance": "LEVEL-4",
      "Performance": "Optimized Rendering"
    },
    demo: "https://github.com/AagoshRajSri/PRAHAR",
    source: "https://github.com/AagoshRajSri/PRAHAR"
  },
  {
    id: "forge-ai",
    filename: "FORGE_AI.saas",
    name: "FORGE AI",
    clearance: "3",
    status: "active",
    desc: "An AI Code Generation Platform built with a React frontend, PostgreSQL, and Prisma backend. Integrates LLM models for efficient code snippet generation with robust user session management.",
    tags: ["React", "Prisma", "PostgreSQL", "LLM Integration", "SaaS"],
    specs: {
      "Type": "Code Generation Tool",
      "Status": "LIVE",
      "Clearance": "LEVEL-3",
      "Database": "PostgreSQL"
    },
    demo: "https://github.com/AagoshRajSri/Forge-AI",
    source: "https://github.com/AagoshRajSri/Forge-AI"
  },
  {
    id: "nextrole",
    filename: "NEXTROLE.zip",
    name: "NextRole",
    clearance: "3",
    status: "active",
    desc: "A browser extension and backend system that monitors career pages and job boards, extracting listings via Playwright to deliver timely alerts to users.",
    tags: ["Node.js", "PostgreSQL", "Playwright", "WXT", "Redis"],
    specs: {
      "Type": "Browser Extension",
      "Status": "PRODUCTION",
      "Clearance": "LEVEL-3",
      "Scraping": "Playwright Engine"
    },
    demo: "https://github.com/AagoshRajSri/NextRole",
    source: "https://github.com/AagoshRajSri/NextRole"
  }
];

export const SKILLS = [
  {
    name: "Java & Spring Boot",
    cat: "BACK-END",
    level: 90,
    power: "Enterprise Architectures",
    rarity: "epic",
    desc: "Developing scalable REST APIs and microservices using Spring Boot, Spring Cloud, and related ecosystem tools.",
    learned: "2023",
    usedIn: ["ORBIT", "PRAHAR"],
    quip: "Object-oriented and reliable."
  },
  {
    name: "Node.js & Express",
    cat: "BACK-END",
    level: 92,
    power: "Asynchronous Pipelines",
    rarity: "epic",
    desc: "Building high-concurrency applications, real-time WebSockets with Socket.IO, and efficient REST services.",
    learned: "2024",
    usedIn: ["ORBIT", "NextRole", "PRAHAR"],
    quip: "Event-driven architecture."
  },
  {
    name: "React & UI Engineering",
    cat: "FRONT-END",
    level: 88,
    power: "Interactive Interfaces",
    rarity: "epic",
    desc: "Creating responsive, accessible web applications with React, Vite, Tailwind CSS, and state management tools.",
    learned: "2024",
    usedIn: ["FORGE AI", "PRAHAR", "AagoshRaj_OS"],
    quip: "Component-driven design."
  },
  {
    name: "PostgreSQL & Redis",
    cat: "DATABASES",
    level: 85,
    power: "Data Management",
    rarity: "rare",
    desc: "Designing normalized schemas, optimizing queries, and implementing caching layers for performance.",
    learned: "2023",
    usedIn: ["ORBIT", "NextRole", "FORGE AI"],
    quip: "Structured and accessible."
  },
  {
    name: "Docker & CI/CD",
    cat: "DEVOPS",
    level: 80,
    power: "Containerization",
    rarity: "rare",
    desc: "Containerizing applications, creating deployment pipelines with GitHub Actions, and managing cloud deployments.",
    learned: "2023",
    usedIn: ["ORBIT", "PRAHAR"],
    quip: "Consistent environments."
  },
  {
    name: "Python & AI Tools",
    cat: "INTELLIGENCE",
    level: 85,
    power: "Data Processing",
    rarity: "rare",
    desc: "Scripting, data analysis, and integrating machine learning models into full-stack applications.",
    learned: "2023",
    usedIn: ["RAJ-AI", "FORGE AI"],
    quip: "Readable and versatile."
  },
  {
    name: "Security Fundamentals",
    cat: "SECURITY",
    level: 80,
    power: "Application Defense",
    rarity: "rare",
    desc: "Implementing authentication, authorization, and secure communication protocols to protect user data.",
    learned: "2024",
    usedIn: ["ORBIT"],
    quip: "Security by design."
  },
  {
    name: "Kotlin & Mobile",
    cat: "MOBILE",
    level: 75,
    power: "Cross-Platform",
    rarity: "common",
    desc: "Developing native Android components and cross-platform interfaces using Flutter.",
    learned: "2024",
    usedIn: ["RAJ-AI"],
    quip: "Mobile-first approach."
  }
];

export const EXPERIENCE = [
  {
    version: "v3.1.0 — CURRENT",
    title: "B.Tech Computer Science and Engineering",
    company: "SRM University, Andhra Pradesh",
    period: "AUG 2023 — 2027",
    desc: "Focusing on AI/ML, Distributed Systems, Database Management, and Core Computer Science Fundamentals.",
    rewards: ["Algorithms", "System Architecture", "Software Engineering"],
    status: "[IN PROGRESS]",
    completed: false,
    xp: "Current Academic Focus"
  },
  {
    version: "v2.1.0 — COMPLETED",
    title: "Generative AI Project Trainee",
    company: "Finlatics",
    period: "JUN 2025 — AUG 2025",
    desc: "Optimized UI components for LLM response streaming, improving perceived performance. Developed interfaces for prompt-chaining to enhance user feedback efficiency.",
    rewards: ["UI Optimization", "Prompt Engineering", "Performance Tuning"],
    status: "[COMPLETED]",
    completed: true,
    xp: "Valuable Industry Experience"
  },
  {
    version: "v1.8.0 — COMPLETED",
    title: "Full Stack Developer Intern",
    company: "Future Interns",
    period: "JUN 2025 — JUL 2025",
    desc: "Improved frontend performance metrics (Core Web Vitals) using code-splitting and asset optimization. Contributed to building secure e-commerce interfaces with payment integration.",
    rewards: ["Performance Optimization", "E-commerce Integration", "Frontend Development"],
    status: "[COMPLETED]",
    completed: true,
    xp: "Valuable Industry Experience"
  }
];

export const DIAG_LINES = [
  "> Initializing system...",
  "> Scanning dependencies... [OK]",
  "> Checking network connections... [STABLE]",
  "> Loading application modules... [SECURED]",
  "> Verifying project integrity... [5 items validated]",
  "> Evaluating system performance... [OPTIMAL]",
  "> Final assessment: ENTITY_TYPE = Software Engineer",
  "> Recommendation: REVIEW PORTFOLIO",
  "> Diagnostic complete. ✓"
];

export const WARNINGS = [
  { msg: "SECURITY_UPDATE", sub: "All communication channels are encrypted.\nData integrity verified." },
  { msg: "SYSTEM_NOMINAL", sub: "Automated monitoring active.\nResource usage is within optimal parameters." },
  { msg: "PERFORMANCE_LOG", sub: "Render pipeline optimized.\nUI performance maintaining stable framerate." }
];
