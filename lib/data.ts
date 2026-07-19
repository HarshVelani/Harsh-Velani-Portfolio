import type {
  Contact,
  EducationItem,
  ExperienceRole,
  Project,
  SkillGroup,
} from "@/types";
import { siteConfig } from "@/lib/config";

/* ============================================================================
 * CONTACT
 * All values come from environment variables via lib/config.ts.
 * Do NOT edit these here: set them in .env.local (see .env.example).
 * ========================================================================== */
export const contact: Contact = {
  email: siteConfig.email,
  phone: siteConfig.phone,
  linkedin: siteConfig.linkedin,
  github: siteConfig.github,
  location: siteConfig.location,
  resume: siteConfig.resumeUrl,
};

export const identity = {
  name: "Harsh Velani",
  firstName: "Harsh",
  // Rotating headline phrases for the typing animation.
  roles: [
    "AI/ML Engineer",
    "Agentic AI Developer",
    "RAG & LLM Systems Builder",
    "Data Scientist",
  ],
  // 30-second elevator pitch (hero subhead).
  pitch:
    "I build production-grade agentic AI - multi-agent systems, retrieval pipelines, and fine-tuned LLMs that ship, from FastAPI backends to the interfaces on top of them.",
} as const;

/* ---------------------------------------------------------------------------
 * ABOUT  -  narrative, not a resume dump.
 * ------------------------------------------------------------------------- */
export const about = {
  brandStatement:
    "I turn open-ended AI problems into systems that run in production.",
  shortBio:
    "AI/ML Engineer and Data Scientist with 1.5+ years building generative and agentic AI. I specialize in multi-agent orchestration with LangGraph, retrieval-augmented generation, and memory-efficient LLM fine-tuning - and I take work all the way to a deployed, multi-tenant service.",
  longBio: [
    "My work sits where machine learning meets real software engineering. Over the last year and a half I've shipped document-intelligence platforms, conversational assistants, and an end-to-end AutoML system - each one an agentic pipeline rather than a single model call.",
    "I'm most at home designing the graph: how agents route decisions, when to retrieve, how tools compose, and where a fallback keeps the system reliable. That means hybrid search over vector databases, natural-language-to-query translation, VLM-based extraction, and QLoRA fine-tuning when a task needs a specialized model.",
    "I care about the parts recruiters rarely see on a demo reel - RBAC, rate limiting, audit logging, async job handling, tenant isolation - because that's the difference between a notebook and a service enterprises can actually use.",
  ],
  focus: [
    "Agentic AI & multi-agent orchestration",
    "Retrieval-Augmented Generation (RAG)",
    "LLM fine-tuning (QLoRA / PEFT)",
    "Document intelligence & Vision-Language Models",
    "Production AI backends (FastAPI, async)",
  ],
} as const;

/* ---------------------------------------------------------------------------
 * SKILLS  -  grouped for the skills grid.
 * ------------------------------------------------------------------------- */
export const skillGroups: SkillGroup[] = [
  {
    category: "Generative & Agentic AI",
    icon: "Bot",
    skills: [
      "LangGraph (Agents & Workflows)",
      "LangChain",
      "Multi-Agent Systems",
      "Triage & Tool Routing",
      "RAG (Hybrid BM25 + Dense)",
      "Vision-Language Models",
    ],
  },
  {
    category: "LLM Engineering",
    icon: "Cpu",
    skills: [
      "QLoRA / LoRA Fine-Tuning",
      "PEFT",
      "TRL (Supervised FT)",
      "HuggingFace Transformers",
      "Prompt Engineering",
      "Weights & Biases",
    ],
  },
  {
    category: "Backend & APIs",
    icon: "Server",
    skills: [
      "FastAPI",
      "Async Pipelines",
      "WebSocket",
      "RBAC & Auth",
      "Rate Limiting",
      "Multi-Tenancy",
    ],
  },
  {
    category: "Vector & Databases",
    icon: "Database",
    skills: [
      "Qdrant",
      "Pinecone",
      "FAISS",
      "ChromaDB",
      "Redis",
      "MongoDB / PostgreSQL / MySQL",
    ],
  },
  {
    category: "Deep Learning & CV",
    icon: "Brain",
    skills: [
      "PyTorch",
      "TensorFlow / Keras",
      "OpenCV",
      "Transfer Learning (VGG16)",
      "CNNs",
      "Transformers",
    ],
  },
  {
    category: "Voice AI",
    icon: "AudioLines",
    skills: [
      "LiveKit",
      "Deepgram (STT)",
      "Silero (VAD)",
      "Speech-to-Speech",
      "Real-Time Assistants",
    ],
  },
  {
    category: "Data Science",
    icon: "LineChart",
    skills: [
      "NumPy / Pandas",
      "Scikit-learn",
      "Matplotlib / Seaborn",
      "Streamlit",
      "EDA & Visualization",
    ],
  },
  {
    category: "Tooling & DevOps",
    icon: "Wrench",
    skills: [
      "Docker",
      "Playwright",
      "n8n Automation",
      "Git / GitHub / Bitbucket",
      "Google Colab",
    ],
  },
  {
    category: "Frontend",
    icon: "Layout",
    skills: ["React", "TypeScript", "Tailwind CSS", "HTML / CSS / JS"],
  },
];

/* ---------------------------------------------------------------------------
 * PROJECTS  -  9 projects, split into Featured (case-study cards) and
 * AI/ML (model-centric cards). Impact is described in terms of delivered
 * capability; no invented KPIs.
 * ------------------------------------------------------------------------- */
export const projects: Project[] = [
  {
    slug: "doclens-ai",
    title: "DocLens AI",
    company: "NowOnline Tech India",
    category: "featured",
    tagline: "Document Processing API-as-a-Service",
    problem:
      "Enterprises drown in unstructured documents - passports, certificates, insurance policies, financials - that need extraction, validation, and fraud checks at scale, per-tenant.",
    solution:
      "A multi-tenant Document Processing API that uses Vision-Language Models to extract and validate structured data, wrapped in an asynchronous two-stage pipeline.",
    impact:
      "Turns manual document review into an automated service with classification, fraud detection, duplicate checks, quality scoring, and external verification - consumable by any tenant via API.",
    challenges:
      "Isolating tenants safely while keeping throughput high, and making a two-stage VLM pipeline reliable enough for financial and identity documents.",
    architecture: [
      "Upload & document classification",
      "Stage 1: VLM extraction",
      "Stage 2: validation, fraud & duplicate checks",
      "Quality scoring & external verification",
      "RBAC-gated API response + audit log",
    ],
    tech: [
      "Python",
      "FastAPI",
      "MongoDB",
      "Redis",
      "VLMs",
      "Playwright",
      "React",
      "Tailwind",
      "TypeScript",
    ],
    metrics: [
      { label: "Architecture", value: "Multi-tenant" },
      { label: "Pipeline", value: "Async 2-stage" },
      { label: "Access", value: "RBAC + API keys" },
    ],
    links: {},
  },
  {
    slug: "autods",
    title: "AutoDS",
    company: "NowOnline Tech India",
    category: "featured",
    tagline: "Agentic End-to-End AutoML Platform",
    problem:
      "Building an ML model end-to-end - from raw dataset to trained model, metrics, and a written report - is slow and demands ML expertise most teams don't have on hand.",
    solution:
      "An agentic AutoML platform that automates the full workflow using LangGraph orchestration and Groq LLMs for pipeline planning, code generation, and model evaluation.",
    impact:
      "A no-code web interface where a dataset upload comes back as exportable Python code, a trained model, performance metrics, and AI-generated expert insights.",
    challenges:
      "Getting an LLM to generate correct, runnable ML code and orchestrating long-running training jobs asynchronously without blocking the API.",
    architecture: [
      "Dataset upload",
      "LangGraph pipeline planning",
      "LLM code generation",
      "Async model training",
      "Evaluation + AI-generated report",
    ],
    tech: [
      "Python",
      "LangChain",
      "LangGraph",
      "Pydantic",
      "Pandas",
      "Scikit-learn",
      "Groq LLMs",
      "FastAPI",
    ],
    metrics: [
      { label: "Workflow", value: "Fully automated" },
      { label: "Output", value: "Code + model + report" },
      { label: "Jobs", value: "Async handling" },
    ],
    links: {},
  },
  {
    slug: "rag-chat-assistant",
    title: "RAG Chat Assistant",
    company: "NowOnline Tech India",
    category: "featured",
    tagline: "LangGraph Agents · Hybrid Search · MongoDB",
    problem:
      "Users need one assistant that answers both from a knowledge base and from live application data, reliably, without hallucinating over gaps in either source.",
    solution:
      "A LangGraph-orchestrated assistant with a hybrid-search RAG tool (BM25 + dense embeddings) and a MongoDB tool that translates natural language into Mongosh queries.",
    impact:
      "One conversational surface for general and database-specific questions, with a fallback mechanism between vector stores for reliability and persisted chat history.",
    challenges:
      "Combining sparse and dense retrieval across Pinecone and Qdrant with a graceful fallback, and safely generating executable database queries from free text.",
    architecture: [
      "Query intake (LangGraph)",
      "Route: RAG tool vs MongoDB tool",
      "Hybrid retrieval (BM25 + dense) w/ fallback",
      "NL → Mongosh query generation",
      "Response + Redis-backed history & rate limits",
    ],
    tech: [
      "Python",
      "LangChain",
      "LangGraph",
      "Pinecone",
      "Qdrant",
      "Redis",
      "MongoDB",
      "FastAPI",
    ],
    metrics: [
      { label: "Retrieval", value: "Hybrid + fallback" },
      { label: "Stores", value: "Pinecone · Qdrant" },
      { label: "State", value: "Redis cache" },
    ],
    links: {},
  },
  {
    slug: "agentic-support-assistant",
    title: "Agentic Support Assistant",
    company: "ViitorCloud Technologies",
    category: "featured",
    tagline: "Triage Agent · RAG + MySQL Routing",
    problem:
      "Support queries span static FAQ knowledge and live relational data; a single retrieval approach can't route between them intelligently.",
    solution:
      "A LangGraph support assistant with a triage agent that routes each query to a RAG (FAQ) tool or a MySQL tool for dynamic, context-aware answers.",
    impact:
      "Smooth multi-turn conversations with accurate resolution, backed by efficient tool orchestration and containerized vector search.",
    challenges:
      "Designing triage logic that reliably picks the right tool per turn and maintains context across a multi-turn conversation.",
    architecture: [
      "User query",
      "Triage agent classification",
      "Route → RAG (FAQ) or MySQL tool",
      "Context-aware answer",
      "Multi-turn state carry-over",
    ],
    tech: [
      "Python",
      "LangGraph",
      "LangChain",
      "Pandas",
      "MySQL",
      "Qdrant",
      "Docker",
      "FastAPI",
    ],
    links: {},
  },
  {
    slug: "genai-data-analysis",
    title: "GenAI Data Analysis & Charts",
    company: "ViitorCloud Technologies",
    category: "featured",
    tagline: "Natural-Language Analytics & Visualization",
    problem:
      "Non-technical users want to ask questions of a database in plain English and get both the answer and a chart - without writing SQL or plotting code.",
    solution:
      "A GenAI app built on LangGraph and MySQL that interprets natural-language questions, runs the analysis, and returns dynamic visualizations plus textual summaries.",
    impact:
      "Users generate bar, line, and pie charts with narrative insights from their own data, driven entirely by conversational queries.",
    challenges:
      "Mapping ambiguous natural-language questions to correct queries and choosing an appropriate chart type per question context.",
    architecture: [
      "NL question intake",
      "LangGraph query planning",
      "MySQL execution",
      "Chart selection (bar/line/pie)",
      "Matplotlib render + text summary",
    ],
    tech: [
      "Python",
      "LangGraph",
      "LangChain",
      "MySQL",
      "Groq API",
      "Matplotlib",
      "FastAPI",
    ],
    links: {},
  },
  {
    slug: "qwen-qlora",
    title: "Qwen LLM Fine-Tuning",
    company: "NowOnline Tech India",
    category: "aiml",
    tagline: "Memory-Efficient QLoRA Instruction Tuning",
    problem:
      "Adapting a capable open LLM to a custom instruction dataset without the GPU budget for full fine-tuning.",
    solution:
      "An end-to-end supervised fine-tuning pipeline on Colab using QLoRA and LoRA-based PEFT for memory-optimized training, tracked with Weights & Biases.",
    impact:
      "A specialized Qwen model trained efficiently on custom instructions, with fully tracked experiments for reproducibility.",
    challenges:
      "Fitting training within Colab memory limits while keeping the fine-tune stable and measurable.",
    architecture: [
      "Custom instruction dataset prep",
      "QLoRA / LoRA (PEFT) setup",
      "Supervised FT via HuggingFace TRL",
      "W&B experiment tracking",
      "Adapter export",
    ],
    model: "Qwen (open-source LLM)",
    dataset: "Custom instruction dataset",
    evaluation: "Tracked via Weights & Biases (loss & training curves)",
    tech: [
      "Python",
      "HuggingFace Hub",
      "Transformers",
      "PyTorch",
      "PEFT",
      "TRL",
      "Wandb",
      "Google Colab",
    ],
    links: {},
  },
  {
    slug: "voice-ai-sts",
    title: "Voice AI Assistant (STS)",
    company: "ViitorCloud Technologies",
    category: "aiml",
    tagline: "Real-Time Speech-to-Speech Vehicle Assistant",
    problem:
      "Drivers need hands-free answers about a vehicle by VIN, in real time, with natural speech in and speech out.",
    solution:
      "A real-time speech-to-speech assistant on LiveKit using Deepgram STT, a Groq LLM with TTS, and Silero for voice-activity detection - with VIN validation and NHTSA decoding.",
    impact:
      "Conversational, VIN-based vehicle Q&A: structured validation plus external decoding delivers contextual spoken answers.",
    challenges:
      "Low-latency turn-taking across STT, LLM, and TTS, plus robust VIN validation before hitting the external decode API.",
    architecture: [
      "Mic input (LiveKit)",
      "Silero VAD → Deepgram STT",
      "VIN validation & NHTSA decode",
      "Groq LLM reasoning",
      "TTS → spoken response",
    ],
    model: "Groq LLM (+ TTS), Deepgram STT, Silero VAD",
    dataset: "Live audio + NHTSA vehicle API",
    evaluation: "Real-time latency & VIN decode accuracy",
    tech: ["Python", "LiveKit", "Groq API", "Silero", "Deepgram"],
    links: {},
  },
  {
    slug: "n8n-automation",
    title: "n8n Workflow Automation",
    company: "ViitorCloud Technologies",
    category: "aiml",
    tagline: "Embeddings-Driven Automation Pipeline",
    problem:
      "Repetitive data-collection and ingestion tasks needed to run automatically and feed a vector store without manual glue code.",
    solution:
      "An n8n automation pipeline combining HuggingFace embeddings, a Qdrant Cloud vector DB, Groq, Firecrawl scraping, and Tally form intake.",
    impact:
      "Automated ingestion into vector search from web and form sources, orchestrated visually in n8n.",
    challenges:
      "Wiring heterogeneous services into one reliable, low-maintenance workflow.",
    architecture: [
      "Tally form / Firecrawl intake",
      "HuggingFace embeddings",
      "Qdrant Cloud upsert",
      "Groq processing",
      "Automated n8n orchestration",
    ],
    model: "HuggingFace embeddings + Groq",
    dataset: "Web (Firecrawl) + form (Tally) sources",
    evaluation: "Pipeline reliability",
    tech: [
      "Python",
      "HuggingFace",
      "Qdrant Cloud",
      "Groq API",
      "Firecrawl",
      "Tally",
    ],
    links: {},
  },
  {
    slug: "groundnut-disease-cnn",
    title: "Groundnut Disease Detection",
    company: "Geo Spatial One",
    category: "aiml",
    tagline: "Leaf-Based CNN with Transfer Learning",
    problem:
      "Early groundnut leaf disease detection from images to support agricultural decision-making.",
    solution:
      "A CNN trained on ~7.9K images using multiple architectures including VGG16 transfer learning.",
    impact:
      "Reliable leaf-image disease classification demonstrating strong generalization on held-out data.",
    challenges:
      "Achieving high validation accuracy on a moderate dataset while avoiding overfitting.",
    architecture: [
      "Image dataset (7,910 train / 2,451 test)",
      "Augmentation & preprocessing",
      "CNN + VGG16 transfer learning",
      "Training & validation",
      "Disease classification",
    ],
    model: "CNN + VGG16 (transfer learning)",
    dataset: "7,910 training / 2,451 testing leaf images",
    evaluation: "96% training accuracy · 92% validation accuracy",
    metrics: [
      { label: "Train acc.", value: "96%" },
      { label: "Val acc.", value: "92%" },
      { label: "Images", value: "10.3K" },
    ],
    tech: ["Python", "TensorFlow", "Keras", "Transfer Learning"],
    links: {},
  },
];

/* ---------------------------------------------------------------------------
 * EXPERIENCE  -  timeline.
 * ------------------------------------------------------------------------- */
export const experience: ExperienceRole[] = [
  {
    company: "NowOnline Tech India Pvt. Ltd.",
    role: "Data Scientist",
    location: "Gandhinagar, India",
    period: "Jul 2025 - Present",
    summary:
      "Building production AI platforms: document intelligence, agentic assistants, and AutoML - end to end.",
    highlights: [
      "Shipped DocLens AI, a multi-tenant VLM document-processing API with fraud detection and RBAC.",
      "Built a LangGraph RAG assistant with hybrid search across Pinecone & Qdrant and NL-to-Mongosh querying.",
      "Created AutoDS, an agentic AutoML platform automating dataset-to-report ML workflows.",
      "Fine-tuned Qwen with QLoRA/PEFT via HuggingFace TRL, tracked in Weights & Biases.",
    ],
    tools: ["LangGraph", "FastAPI", "VLMs", "MongoDB", "Redis", "Pinecone", "Qdrant"],
  },
  {
    company: "ViitorCloud Technologies Pvt. Ltd.",
    role: "AI/ML Engineer Intern",
    location: "Ahmedabad, India",
    period: "Feb 2025 - Jul 2025",
    summary:
      "Delivered agentic assistants, GenAI analytics, and real-time voice AI across client projects.",
    highlights: [
      "Built a triage-agent support assistant routing between RAG (FAQ) and MySQL tools.",
      "Developed a natural-language data-analysis app generating charts and summaries via LangGraph.",
      "Engineered a real-time speech-to-speech vehicle assistant on LiveKit with VIN decoding.",
      "Automated ingestion pipelines in n8n with HuggingFace embeddings and Qdrant Cloud.",
    ],
    tools: ["LangGraph", "MySQL", "LiveKit", "Deepgram", "Qdrant", "Groq", "n8n"],
  },
  {
    company: "Geo Spatial One Pvt. Ltd.",
    role: "Data Science Intern",
    location: "Rajasthan, India",
    period: "May 2024 - Jul 2024",
    summary:
      "Applied deep learning and computer vision to agricultural disease detection.",
    highlights: [
      "Built a leaf-disease CNN on 10.3K images using VGG16 transfer learning.",
      "Reached 96% training and 92% validation accuracy across multiple CNN techniques.",
    ],
    tools: ["TensorFlow", "Keras", "OpenCV", "Transfer Learning"],
  },
];

/* ---------------------------------------------------------------------------
 * EDUCATION
 * ------------------------------------------------------------------------- */
export const education: EducationItem[] = [
  {
    institution: "Dhirubhai Ambani University (DAIICT)",
    degree: "Master in Data Analytics",
    detail: "CGPA: 8.83 / 10",
    period: "Jul 2023 - Jul 2025",
    location: "Gandhinagar, Gujarat",
  },
];

/* ---------------------------------------------------------------------------
 * CERTIFICATIONS  &  ACHIEVEMENTS
 * ------------------------------------------------------------------------- */
export const certifications: string[] = [
  "Building, Deploying & Optimizing Generative AI with LangChain & HuggingFace",
  "Complete Data Analyst Bootcamp - Basics to Advanced",
  "DBMS and MySQL",
  "Advanced Excel, Power BI & Tableau",
  "Excel Skills for Business - Job Simulation",
];

export const achievements: { title: string; detail: string; icon: string }[] = [
  {
    title: "Gold Badge in SQL",
    detail: "HackerRank - top proficiency tier",
    icon: "Award",
  },
  {
    title: "CGPA 8.83",
    detail: "M.S. Data Analytics, DAIICT",
    icon: "GraduationCap",
  },
  {
    title: "9 Production AI Projects",
    detail: "Across GenAI, agentic AI, CV & voice",
    icon: "Rocket",
  },
  {
    title: "92% Val. Accuracy",
    detail: "Groundnut disease CNN (VGG16)",
    icon: "Target",
  },
];

/* ---------------------------------------------------------------------------
 * TECH STACK  -  flat marquee list for the tech-stack strip.
 * ------------------------------------------------------------------------- */
export const techStack: string[] = [
  "Python",
  "SQL",
  "LangGraph",
  "LangChain",
  "FastAPI",
  "PyTorch",
  "TensorFlow",
  "HuggingFace",
  "Transformers",
  "OpenCV",
  "Qdrant",
  "Pinecone",
  "FAISS",
  "ChromaDB",
  "Redis",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "Playwright",
  "LiveKit",
  "Deepgram",
  "Streamlit",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "n8n",
  "Weights & Biases",
];

/* Navigation anchors (kept in one place so nav + sections stay in sync). */
export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#ai-projects", label: "AI/ML" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
] as const;
