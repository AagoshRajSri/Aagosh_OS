export const ABOUT = {
  developerName: "Aagosh Raj Srivastava",
  avatarEmoji: "⚡",
  shortBio: "Hey, I'm Aagosh. I'm a full-stack engineer who loves tinkering with distributed systems and building things that run fast and rarely break. From crunching heavy data pipelines to crafting sleek UI visualizations, I focus on shipping software that actually makes an impact.",
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
    projects: "📁 6 active project files. Type 'decrypt' to access mission archives.",
    decrypt: "🔓 Authorization required. Please open Projects.sys for decryption.",
    music: "🎵 Playing: lo-fi beats to architect distributed systems to...",
    help: "📟 Commands: hello | hire | coffee | skills | projects | music | help",
    dream: "💜 AagoshRaj_OS: A portfolio built with precision and passion.",
    default: (input) => `> Processing: "${input}"... RESULT: ${["Understood.", "Command acknowledged.", "Logging action...", "System ready."][Math.floor(Math.random()*4)]}`
  }
};

export const PROJECTS = [
  {
    id: "sentinel-ai",
    filename: "SENTINEL-AI.clearance.json",
    name: "SENTINEL-AI",
    clearance: "5",
    status: "production",
    desc: "Offline-reproducible enterprise support triage and RAG drafting pipeline built with Python 3.10+, Pydantic v2, SentenceTransformers all-MiniLM-L6-v2, and an in-memory FAISS IndexFlatIP over 15,000 historical resolutions. Its calibrated two-pass safety gate reduced escalation false-negative rate to 34.9%, achieved sub-1ms vector retrieval, Macro-F1 of 0.583, and Cohen's Kappa of 0.558 across a 250-case benchmark.",
    tags: ["Python", "FAISS", "RAG", "Safety-Critical AI"],
    specs: {
      "Type": "Recall-biased AI triage and retrieval-augmented generation",
      "Status": "PRODUCTION",
      "Clearance": "LEVEL-5",
      "Key Metric": "<1ms FAISS retrieval; 34.9% escalation FNR"
    },
    demo: "https://huggingface.co/spaces/AagoshRaj/sentinel-ai",
    source: "https://github.com/AagoshRajSri/SENTINEL-AI"
  },
  {
    id: "latent-twin",
    filename: "LATENT-TWIN.clearance.json",
    name: "LatentTwin",
    clearance: "5",
    status: "in-progress",
    desc: "A multi-service architecture intelligence platform that converts repository trees into interactive 2D/3D dependency graphs using ReactFlow, Three.js, Fastify, TypeScript, Octokit, simple-git, and AST-oriented analysis. The analysis service exposes asynchronous job submission, Server-Sent Events progress streaming, Gemini/Anthropic diagnostics, bounded concurrency, 24-hour caching, 50MB repository limits, and a 5,000-file rejection ceiling.",
    tags: ["Architecture Intelligence", "Fastify", "Three.js", "AI Diagnostics"],
    specs: {
      "Type": "Repository analysis and digital-twin visualization platform",
      "Status": "WIP",
      "Clearance": "LEVEL-5",
      "Key Metric": "<200ms cache hits; MAX_CONCURRENT_JOBS=3"
    },
    demo: "https://latent-twin.vercel.app",
    source: "https://github.com/AagoshRajSri/LatentTwin"
  },
  {
    id: "orbit",
    filename: "ORBIT.clearance.json",
    name: "ORBIT",
    clearance: "5",
    status: "production",
    desc: "A real-time secure collaboration platform using Node.js, Express 5, Socket.IO 4.8, Redis via the Socket.IO Redis adapter, MongoDB/Mongoose, and MessagePack transport. The security boundary combines ML-KEM-768 through mlkem, Argon2id, WebAuthn, OTP authentication, JWT, Helmet, HPP, rate-limit-redis, and Dockerized deployment with a React 19, Three.js, Zustand, and virtualized frontend.",
    tags: ["Distributed Systems", "Post-Quantum Crypto", "Socket.IO", "Redis"],
    specs: {
      "Type": "Secure real-time messaging and collaboration backbone",
      "Status": "PRODUCTION",
      "Clearance": "LEVEL-5",
      "Key Metric": "Redis-adapter horizontal scaling with MessagePack transport"
    },
    demo: "https://orbitnexus.vercel.app",
    source: "https://github.com/AagoshRajSri/Orbit"
  },
  {
    id: "nextrole",
    filename: "NEXTROLE.clearance.json",
    name: "NextRole",
    clearance: "5",
    status: "active",
    desc: "A Manifest V3 WXT browser co-pilot connected to an Express API, PostgreSQL/Prisma data layer, Redis-backed BullMQ workers, Playwright ATS crawlers, Socket.IO alerts, and AWS Bedrock Claude/Titan workflows. The system reports 128 passing Vitest tests, 94.5% LinkedIn extraction success, 92% cross-platform duplicate suppression, 99.2% location matching accuracy, and AES-256-GCM session-cookie protection.",
    tags: ["Browser Automation", "BullMQ", "Playwright", "AWS Bedrock"],
    specs: {
      "Type": "Distributed career intelligence and browser automation platform",
      "Status": "ACTIVE",
      "Clearance": "LEVEL-5",
      "Key Metric": "128 tests; 94.5% LinkedIn extraction success"
    },
    demo: "#",
    source: "https://github.com/AagoshRajSri/NextRole"
  },
  {
    id: "forge-ai",
    filename: "FORGE-AI.clearance.json",
    name: "FORGE AI",
    clearance: "4",
    status: "production",
    desc: "A full-stack prompt-to-website generation system built with React 19, Vite 7, TypeScript 5.9, Tailwind CSS 4, GSAP, Node.js, Express 5, Neon Serverless PostgreSQL, Prisma 5.22, Better Auth, BullMQ, Redis, Stripe, and WebSockets. Its architecture routes Qwen2.5-Coder-32B for initial structural synthesis and 7B models for rapid refinement, then applies non-destructive Morphdom updates with version history and rollback support.",
    tags: ["Generative AI", "Qwen", "Prisma", "Serverless PostgreSQL"],
    specs: {
      "Type": "AI-assisted full-stack website generation platform",
      "Status": "PRODUCTION",
      "Clearance": "LEVEL-4",
      "Key Metric": "Dual-model 32B/7B generation and refinement pipeline"
    },
    demo: "https://forge-ai-gamma.vercel.app",
    source: "https://github.com/AagoshRajSri/Forge-AI"
  },
  {
    id: "sportzlive",
    filename: "SPORTZLIVE.clearance.json",
    name: "SportzLive",
    clearance: "4",
    status: "active",
    desc: "A real-time sports telemetry platform built with Node.js, Express 5, ws WebSockets, Neon PostgreSQL, Drizzle ORM, Zod, React 19, Vite 8, Tailwind CSS, and GSAP. It broadcasts score deltas and commentary over persistent WebSocket connections while using GPU-composited GSAP force3D animations, React error-boundary recovery, and type-safe Drizzle migrations for a data-dense dashboard tested at 60 FPS.",
    tags: ["Real-Time Systems", "WebSockets", "Drizzle ORM", "GPU UI"],
    specs: {
      "Type": "Live telemetry and high-performance visualization dashboard",
      "Status": "ACTIVE",
      "Clearance": "LEVEL-4",
      "Key Metric": "60 FPS animated panels with persistent WebSocket updates"
    },
    demo: "#",
    source: "https://github.com/AagoshRajSri/SportzLive"
  }
];

export const SKILLS = [
  {
    name: "Distributed Real-Time Systems",
    cat: "BACK-END",
    level: 92,
    power: "Event-Driven Backbone",
    rarity: "epic",
    desc: "Production-oriented use of Socket.IO, ws, Redis adapters, BullMQ workers, WebSockets, SSE, idempotent processing, and asynchronous service boundaries.",
    learned: "2024",
    usedIn: ["ORBIT", "NextRole", "SportzLive"],
    quip: "The signal never drops."
  },
  {
    name: "AI/ML Orchestration",
    cat: "INTELLIGENCE",
    level: 91,
    power: "Inference Pipeline Design",
    rarity: "epic",
    desc: "Builds multi-stage AI systems combining model routing, deterministic evaluation, RAG, vector retrieval, safety gates, Gemini/Anthropic integrations, AWS Bedrock, and offline caches.",
    learned: "2024",
    usedIn: ["SENTINEL-AI", "FORGE AI", "LatentTwin"],
    quip: "Intelligence routed efficiently."
  },
  {
    name: "Applied Cryptography",
    cat: "SECURITY",
    level: 88,
    power: "Post-Quantum Security",
    rarity: "rare",
    desc: "Implements ML-KEM-768, Argon2id, WebAuthn, MFA, AES-256-GCM, HMAC-SHA256 verification, JWT controls, PII guardrails, and rate-limited security boundaries.",
    learned: "2024",
    usedIn: ["ORBIT", "NextRole"],
    quip: "Quantum adversaries mitigated."
  },
  {
    name: "High-Performance UI Engineering",
    cat: "FRONT-END",
    level: 87,
    power: "GPU-Accelerated Interfaces",
    rarity: "epic",
    desc: "Uses React 19, Three.js, React Three Fiber, ReactFlow, GSAP force3D, virtualization, WebGL, Vite, and compositing strategies for real-time and data-dense interfaces.",
    learned: "2024",
    usedIn: ["LatentTwin", "SportzLive", "AagoshRaj_OS"],
    quip: "Your GPU will feel things."
  },
  {
    name: "Data Platforms and ORMs",
    cat: "DATABASES",
    level: 84,
    power: "Typed Persistence",
    rarity: "rare",
    desc: "Works across PostgreSQL, Neon Serverless, Prisma, Drizzle ORM, MongoDB/Mongoose, Redis, pgvector, FAISS, migration workflows, caching, and connection-resilient serverless access.",
    learned: "2023",
    usedIn: ["FORGE AI", "NextRole", "SportzLive"],
    quip: "Structured and reliable."
  },
  {
    name: "Browser Automation",
    cat: "INTELLIGENCE",
    level: 86,
    power: "Autonomous Web Agents",
    rarity: "rare",
    desc: "Develops WXT Manifest V3 extensions, Playwright crawlers, ATS-specific extraction fallbacks, stealth workflows, cookie synchronization, deduplication, and multi-channel alerting.",
    learned: "2024",
    usedIn: ["NextRole"],
    quip: "Automating the web."
  },
  {
    name: "Deployment and Reliability",
    cat: "DEVOPS",
    level: 78,
    power: "Failure-Aware Delivery",
    rarity: "rare",
    desc: "Uses Docker, Docker Compose, Vercel, Render, Hugging Face Spaces, serverless database drivers, deterministic test harnesses, cache limits, retry backoff, and production migration checks.",
    learned: "2023",
    usedIn: ["ORBIT", "SENTINEL-AI"],
    quip: "Prepared for failure."
  },
  {
    name: "Architecture Visualization",
    cat: "INTELLIGENCE",
    level: 85,
    power: "Living System Maps",
    rarity: "rare",
    desc: "Transforms repositories and service graphs into interactive digital twins with AST parsing, dependency classification, SSE progress streams, 2D/3D graph rendering, and AI-assisted repair.",
    learned: "2024",
    usedIn: ["LatentTwin"],
    quip: "Visualizing complexity."
  }
];

export const EXPERIENCE = [
  {
    version: "v3.1.0 - CURRENT",
    title: "B.Tech Computer Science and Engineering",
    company: "SRM University, Andhra Pradesh",
    period: "AUG 2023 - 2027",
    desc: "Focusing on AI/ML, Distributed Systems, Database Management, and Core Computer Science Fundamentals.",
    rewards: ["Algorithms", "System Architecture", "Software Engineering"],
    status: "[IN PROGRESS]",
    completed: false,
    xp: "Current Academic Focus"
  },
  {
    version: "v2.1.0 - COMPLETED",
    title: "Generative AI Project Trainee",
    company: "Finlatics",
    period: "JUN 2025 - AUG 2025",
    desc: "Optimized UI components for LLM response streaming, improving perceived performance. Developed interfaces for prompt-chaining to enhance user feedback efficiency.",
    rewards: ["UI Optimization", "Prompt Engineering", "Performance Tuning"],
    status: "[COMPLETED]",
    completed: true,
    xp: "Valuable Industry Experience"
  },
  {
    version: "v1.8.0 - COMPLETED",
    title: "Full Stack Developer Intern",
    company: "Future Interns",
    period: "JUN 2025 - JUL 2025",
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
  "> Verifying project integrity... [6 items validated]",
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
