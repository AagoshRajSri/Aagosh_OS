export const ABOUT = {
  developerName: "Aagosh Raj Srivastava",
  avatarEmoji: "⚡",
  shortBio: "Hi! I'm Aagosh — a full-stack engineer and distributed systems enthusiast obsessed with building high-concurrency architectures, post-quantum cryptography, and real-time platforms. I bridge data pipeline efficiency with high-performance visualization to build software that scales securely.",
  gauges: [
    { label: "CREATIVITY_QUOTIENT", val: "98%", pct: 98, cls: "gauge-pink", valCls: "text-pink" },
    { label: "CAFFEINE_LEVEL", val: "ERR: OVERFLOW", pct: 100, cls: "gauge-teal overflow-pulse", valCls: "overflow-blink text-red-400" },
    { label: "LOGIC_CIRCUITRY", val: "ACTIVE", pct: 97, cls: "gauge-green", valCls: "text-green-400" },
    { label: "VIBE_CONSISTENCY", val: "95%", pct: 95, cls: "gauge-purple", valCls: "text-purple-400" }
  ],
  systemQuotes: [
    "\"Ship it. Then fix it. Then ship that.\"",
    "\"The best architecture is the one that survives production.\"",
    "\"Latency is a bug. Caffeine is the patch.\"",
    "\"Post-quantum today, quantum-proof tomorrow.\"",
    "\"sleep(0): Not a bug, a feature.\"",
    "\"Real-time or go home. Sub-100ms or we riot.\"",
    "\"Git push --force is a personality trait.\"",
    "\"The diff was one line. The fix took three days.\""
  ],
  terminalResponses: {
    coffee: "☕ Caffeine Level: CRITICAL. Brewing emergency reserves... [OK]",
    hire: "✅ Excellent judgment detected. Forwarding resume to your HR system...",
    hello: "👋 Hey! Nice to meet you. Type 'hire' for the best decision of your life.",
    skills: "🧬 Loading skill matrix... React, Node.js, Kotlin, Python, Docker, PostgreSQL, Three.js... [OVERFLOW]",
    projects: "📁 5 active project files. Type 'decrypt' to access mission archives.",
    decrypt: "🔓 Authorization required. Please open Projects.sys for decryption.",
    music: "🎵 Playing: lo-fi beats to architect distributed systems to...",
    help: "📟 Commands: hello | hire | coffee | skills | projects | music | help",
    dream: "💜 AagoshRaj_OS: A living portfolio built with caffeine and passion.",
    default: (input) => `> Processing: "${input}"... RESULT: ${["Fascinating.", "Intriguing input.", "404: Context not found.", "Logging to creativity matrix..."][Math.floor(Math.random()*4)]}`
  }
};

export const PROJECTS = [
  {
    id: "raj-ai",
    filename: "RAJ_AI_CORE.bin",
    name: "RAJ-AI",
    clearance: "5",
    status: "in-progress",
    desc: "A hardware-independent, fully autonomous software platform designed to replace fragmented human-operated tools with a unified system capable of executing complex, multi-domain tasks end-to-end without manual intervention. Features a dedicated Kotlin API gateway layer, expanded microservice cluster, a Flutter multi-platform UI, and an elevated Python AI tier serving as the primary intelligence engine.",
    tags: ["Python", "Flutter", "Kotlin", "Microservices", "AI Orchestration"],
    specs: {
      "Type": "Autonomous Software Platform",
      "Status": "PROPOSED / ENHANCED",
      "Clearance": "LEVEL-5",
      "Intelligence Engine": "Python AI Tier"
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
    desc: "Scalable Post-Quantum Messaging Platform. Architected a high-concurrency engine utilizing Socket.IO and a Redis adapter for horizontal scaling (100+ concurrent broadcasts, sub-100ms latency). Features an offline-first queuing system and a post-quantum zero-trust defense layer integrating X3DH, Double Ratchet, Argon2id, and ML-KEM-768 resistance to mitigate OWASP threat vectors.",
    tags: ["Socket.IO", "Redis", "Node.js", "ML-KEM-768", "Argon2id", "Docker"],
    specs: {
      "Type": "Distributed Messaging Backbone",
      "Status": "PRODUCTION",
      "Clearance": "LEVEL-4",
      "Security": "Post-Quantum Zero-Trust"
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
    desc: "Enterprise Geospatial Intelligence Platform. Engineered an event-driven telemetry pipeline using Socket.io and a localized 'memoryEngine' cache layer to broadcast 2-second heatmap ticks, slashing alert latency from 15s to <2s. Deployed GPU-accelerated Three.js and WebGL rendering pipelines to visualize 100K+ live geospatial points at a stable 60 FPS.",
    tags: ["Three.js", "WebGL", "Socket.io", "JWT", "Proximity Search"],
    specs: {
      "Type": "Geospatial Intelligence Engine",
      "Status": "PRODUCTION",
      "Clearance": "LEVEL-4",
      "Performance": "60 FPS / 100K+ Live Points"
    },
    demo: "#",
    source: "https://github.com/AagoshRajSri/PRAHAR"
  },
  {
    id: "forge-ai",
    filename: "FORGE_AI.saas",
    name: "FORGE AI",
    clearance: "3",
    status: "active",
    desc: "Intelligent AI Code Generation Platform. Architected a dual-model pipeline routing between Qwen 32B/7B to optimize inference, cutting latency to sub-60s across 1,000+ daily requests with a 95% success rate and credit-safe refund logic. Paired with serverless PostgreSQL and Prisma backend to support 5K concurrent profiles.",
    tags: ["Qwen 32B/7B", "Prisma", "PostgreSQL", "React", "SaaS UI"],
    specs: {
      "Type": "AI Code Generation Platform",
      "Status": "LIVE",
      "Clearance": "LEVEL-3",
      "Concurrency": "5K Active Profiles"
    },
    demo: "#",
    source: "https://github.com/AagoshRajSri/Forge-AI"
  },
  {
    id: "nextrole",
    filename: "NEXTROLE.zip",
    name: "NextRole",
    clearance: "3",
    status: "active",
    desc: "A browser extension + backend system that autonomously monitors career pages, extracts job listings via Playwright, and delivers intelligent alerts. Built for job-seekers who refuse to miss an opportunity.",
    tags: ["Node.js", "PostgreSQL", "Playwright", "WXT", "Redis"],
    specs: {
      "Type": "Full-Stack Extension",
      "Status": "PRODUCTION",
      "Clearance": "LEVEL-3",
      "Performance": "15-min scan cycle"
    },
    demo: "https://github.com/AagoshRajSri/NextRole",
    source: "https://github.com/AagoshRajSri/NextRole"
  }
];

export const SKILLS = [
  {
    name: "Java & Spring Boot",
    cat: "BACK-END ALCHEMY",
    level: 95,
    power: "Enterprise Cloud Scale",
    rarity: "legendary",
    desc: "Spring Boot, Spring Cloud, microservice architecture, and robust distributed systems design.",
    learned: "2022",
    usedIn: ["ORBIT", "PRAHAR"],
    quip: "One annotation to rule them all."
  },
  {
    name: "Node.js & Express",
    cat: "BACK-END ALCHEMY",
    level: 96,
    power: "Async Event-Loop Mastery",
    rarity: "legendary",
    desc: "High-concurrency real-time architectures, Socket.IO, Fastify pipelines, and event streaming.",
    learned: "2022",
    usedIn: ["ORBIT", "NextRole", "PRAHAR"],
    quip: "Callback hell? Not in this timeline."
  },
  {
    name: "React 18+ & Three.js",
    cat: "FRONT-END SORCERY",
    level: 94,
    power: "GPU-Accelerated Interfaces",
    rarity: "legendary",
    desc: "WebGL rendering, Vite, Zustand state loops, frustum culling, and fluid GSAP animations.",
    learned: "2022",
    usedIn: ["FORGE AI", "PRAHAR", "AagoshRaj_OS"],
    quip: "Your GPU is now my canvas."
  },
  {
    name: "PostgreSQL & Redis",
    cat: "BACK-END ALCHEMY",
    level: 93,
    power: "High-Performance Persistence",
    rarity: "epic",
    desc: "Proximity search, compound index lookup tuning, lean data projections, and caching backbones.",
    learned: "2023",
    usedIn: ["ORBIT", "NextRole", "FORGE AI"],
    quip: "SELECT * FROM talent WHERE level > 90;"
  },
  {
    name: "Docker & Kubernetes",
    cat: "DEVOPS GUARD",
    level: 90,
    power: "Orchestrated Infrastructure",
    rarity: "epic",
    desc: "Container deployments, CI/CD with GitHub Actions, Prometheus metrics, and Grafana telemetry.",
    learned: "2023",
    usedIn: ["ORBIT", "PRAHAR"],
    quip: "kubectl apply -f genius.yaml"
  },
  {
    name: "Python & AI/ML",
    cat: "AI SORCERY",
    level: 88,
    power: "LLM Orchestration Engine",
    rarity: "rare",
    desc: "Qwen/LLaMA fine-tuning, LangChain pipelines, prompt engineering, and model serving with vLLM.",
    learned: "2023",
    usedIn: ["RAJ-AI", "FORGE AI"],
    quip: "pip install superintelligence"
  },
  {
    name: "Post-Quantum Crypto",
    cat: "SECURITY CORE",
    level: 85,
    power: "Quantum-Resistant Defense",
    rarity: "rare",
    desc: "ML-KEM-768, X3DH, Double Ratchet, Argon2id — building defenses against future quantum adversaries.",
    learned: "2024",
    usedIn: ["ORBIT"],
    quip: "Your RSA keys are already obsolete."
  },
  {
    name: "Kotlin & Flutter",
    cat: "MOBILE FORGE",
    level: 80,
    power: "Cross-Platform Efficiency",
    rarity: "common",
    desc: "Android-native Kotlin gateway layers, Dart Flutter multi-platform UI with Material Design 3.",
    learned: "2024",
    usedIn: ["RAJ-AI"],
    quip: "One codebase, every platform."
  }
];

export const EXPERIENCE = [
  {
    version: "v3.1.0 — CURRENT BUILD",
    title: "B.Tech Computer Science and Engineering (AI/ML)",
    company: "SRM University, Andhra Pradesh",
    period: "AUG 2023 — 2027",
    desc: "Specializing in AI/ML, Distributed Systems, Advanced DBMS, Operating Systems, Algorithms, Cryptography and Network Security.",
    rewards: ["AI/ML Core Intelligence", "Cryptographic Fundamentals", "Architectural Foundations"],
    status: "[ACTIVE QUEST]",
    completed: false,
    xp: "+2400 XP"
  },
  {
    version: "v2.1.0 — PATCH APPLIED",
    title: "Generative AI Project Trainee",
    company: "Finlatics",
    period: "JUN 2025 — AUG 2025",
    desc: "Optimized LLM response streaming UI components by tuning event-loop processing and token buffering, reducing perceived user latency by 250ms. Designed high-precision prompt-chaining interfaces increasing feedback efficiency by 40%.",
    rewards: ["LLM Streaming Optimization", "Prompt-Chaining Orchestration", "Latency -250ms"],
    status: "[QUEST COMPLETE]",
    completed: true,
    xp: "+1800 XP"
  },
  {
    version: "v1.8.0 — PATCH APPLIED",
    title: "Full Stack Developer Intern",
    company: "Future Interns",
    period: "JUN 2025 — JUL 2025",
    desc: "Accelerated Core Web Vitals (LCP) by 40% using code-splitting, lazy loading, and asset tuning, achieving a 100/100 Lighthouse score. Engineered high-conversion e-commerce interfaces with React and Stripe integrating idempotent payment processing.",
    rewards: ["LCP Acceleration +40%", "100/100 Lighthouse", "Idempotent Payments (99.9% consistency)"],
    status: "[QUEST COMPLETE]",
    completed: true,
    xp: "+1600 XP"
  }
];

export const DIAG_LINES = [
  "> Initializing personality matrix...",
  "> Scanning creative cortex... [98% capacity]",
  "> Checking empathy module... [NOMINAL]",
  "> Analyzing post-quantum engine... [SECURED]",
  "> Running caffeine dependency check... [ERR: OVERFLOW]",
  "> Mapping project history... [5 active operations]",
  "> Evaluating distributed consensus... [HIGH SYNC RATE]",
  "> Final assessment: ENTITY_TYPE = Distributed Systems Engineer",
  "> Recommendation: HIRE IMMEDIATELY",
  "> Diagnostic complete. ✓"
];

export const WARNINGS = [
  { msg: "POST_QUANTUM_ALERT", sub: "ML-KEM-768 layer operational.\nQuantum adversaries mitigated." },
  { msg: "ANOMALY_DETECTED", sub: "Autonomous architecture active:\n'RAJ-AI' executing tasks without human prompt." },
  { msg: "MEMORY_WARNING", sub: "Processing dense geospatial streams.\nThree.js GPU frustum culling engaged." }
];
