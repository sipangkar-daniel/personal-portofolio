export interface Tool {
  name: string;
  category: "Backend" | "Frontend" | "Database" | "DevOps & Streaming" | "Reporting" | "Mobile";
  icon: string; // File path or URL to icon image
  fallbackIcon?: string; // Fallback CDN URL if primary file fails to load
}

export interface SocialLinks {
  linkedin: string;
  email: string;
  whatsapp: string;
}

export interface AboutData {
  name: string;
  titles: string[];
  flipWords: string[];
  description: string;
  socialLinks: SocialLinks;
  resumeUrl: string;
}

export interface Experience {
  id: string;
  duration: string; // e.g., "2024 - Present"
  company: string;
  role: string;
  shortDescription: string;
  longDescription: string;
  tools: string[];
  screenshots?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  tools: string[];
  isPrivate: boolean;
  repoUrl?: string;
  liveUrl?: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export const techStack: Tool[] = [
  { 
    name: "Java", 
    category: "Backend", 
    icon: "/icons/icons8-java-color-16.png",
    fallbackIcon: "https://img.icons8.com/color/96/java-coffee-cup-logo.png"
  },
  { 
    name: "Springboot", 
    category: "Backend", 
    icon: "/icons/icons8-spring boot-office80-96.png",
    fallbackIcon: "https://img.icons8.com/color/96/spring-logo.png"
  },
  { 
    name: "Javascript", 
    category: "Frontend", 
    icon: "/icons/icons8-javascript-color-16.png",
    fallbackIcon: "https://img.icons8.com/color/96/javascript--v1.png"
  },
  { 
    name: "React", 
    category: "Frontend", 
    icon: "/icons/icons8-react-external-tal-revivo-shadow-tal-revivo-16.png",
    fallbackIcon: "https://img.icons8.com/color/96/react-native.png"
  },
  { 
    name: "Angular", 
    category: "Frontend", 
    icon: "/icons/icons8-angularjs-color-16.png",
    fallbackIcon: "https://img.icons8.com/color/96/angularjs.png"
  },
  { 
    name: "Flutter", 
    category: "Mobile", 
    icon: "/icons/icons8-flutter-color-16.png",
    fallbackIcon: "https://img.icons8.com/color/96/flutter.png"
  },
  { 
    name: "OracleDb", 
    category: "Database", 
    icon: "/icons/icons8-oracle logo-color-16.png",
    fallbackIcon: "https://img.icons8.com/color/96/oracle-logo.png"
  },
  { 
    name: "Postgresql", 
    category: "Database", 
    icon: "/icons/icons8-postgresql-color-16.png",
    fallbackIcon: "https://img.icons8.com/color/96/postgreesql.png"
  },
  { 
    name: "Redis", 
    category: "Database", 
    icon: "/icons/icons8-redis-external-tal-revivo-color-tal-revivo-16.png",
    fallbackIcon: "https://img.icons8.com/color/96/redis.png"
  },
  { 
    name: "Kafka", 
    category: "DevOps & Streaming", 
    icon: "/icons/icons8-kafka-color-16.png",
    fallbackIcon: "https://img.icons8.com/nolan/64/apache-kafka.png"
  },
  { 
    name: "Jasper Reports", 
    category: "Reporting", 
    icon: "https://iconlogovector.com/uploads/images/2024/10/lg-6719fc5766272-Jaspersoft.webp" 
  },
  { 
    name: "Elastic", 
    category: "DevOps & Streaming", 
    icon: "/icons/icons8-elasticsearch-external-tal-revivo-shadow-tal-revivo-16.png",
    fallbackIcon: "https://img.icons8.com/color/96/elasticsearch.png"
  },
];

export const personalDescription: AboutData = {
  name: "Daniel Sipangkar",
  titles: ["Daniel Sipangkar", "Backend Developer", "Mobile Developer"],
  flipWords: ["Daniel Sipangkar", "Backend Developer", "Mobile Developer"],
  description: "Backend Developer with 3 years of experience in building and maintaining robust backend systems using Java Spring Boot.",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/daniel-sipangkar/",
    email: "daniel222mu@gmail.com",
    whatsapp: "https://wa.me/6282272253799",
  },
  resumeUrl: "#",
};

export const experiencesData: Experience[] = [
  {
    id: "exp-1",
    duration: "2024 - Present",
    company: "Fintech Solutions Asia",
    role: "Senior Backend Engineer",
    shortDescription: "Architected microservices banking APIs and notification engines using Spring Boot, Kafka, and Redis.",
    longDescription: "Led the migration of a legacy monolithic banking core into containerized Java Spring Boot microservices. Designed high-throughput REST APIs handling 5,000+ requests per second, integrated Kafka cluster event-driven processes to decouple transaction flows, and implemented custom Redis caching mechanisms to reduce SQL query latency by 75%. Assisted frontend teams in implementing responsive portals with Angular.",
    tools: ["Java", "Springboot", "Kafka", "Redis", "OracleDb", "Angular"],
    screenshots: ["/images/sc-banking-1.jpg", "/images/sc-banking-2.jpg"]
  },
  {
    id: "exp-2",
    duration: "2023 - 2024",
    company: "Enterprise Core Tech",
    role: "Full-Stack Developer",
    shortDescription: "Developed secure web applications and reporting modules using React, Spring Boot, and Jasper Reports.",
    longDescription: "Maintained multiple enterprise internal tools. Created visual data dashboards using React and Tailwind CSS, backed by Spring Boot microservices. Built scalable reporting infrastructure utilizing Jasper Reports to generate automated daily regulatory compliance files. Managed database query optimization for OracleDB and PostgreSQL.",
    tools: ["Java", "Springboot", "React", "Postgresql", "OracleDb", "Jasper Reports"],
    screenshots: ["/images/sc-reports.jpg"]
  },
  {
    id: "exp-3",
    duration: "2022 - 2023",
    company: "Pionir Software House",
    role: "Backend Engineer",
    shortDescription: "Built robust web service integrations, database engines, and search functions using Spring Boot and Elastic.",
    longDescription: "Designed RESTful API systems for dynamic clients. Constructed indexing pipelines using Elasticsearch (Elastic) to support fast full-text searching across millions of product records. Conducted unit testing (JUnit, Mockito) ensuring 85%+ code coverage.",
    tools: ["Java", "Springboot", "Elastic", "Postgresql", "Javascript"],
    screenshots: ["/images/sc-search.jpg"]
  }
];

export const projectsData: Project[] = [
  {
    id: "proj-1",
    title: "Microservices Banking API",
    description: "Secure core banking transaction processing REST APIs with OAuth2 authentication and Spring Cloud Gateway.",
    longDescription: "A robust and secure banking core engine designed under microservice architecture. It features resilient service discovery (Eureka), centralized gateway routing (Spring Cloud Gateway), distributed tracing (Zipkin), and rate limiting. Transactions are validated using Spring Security OAuth2 with JSON Web Tokens (JWT) for high security standards.",
    thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
    tools: ["Java", "Springboot", "OracleDb", "Docker"],
    isPrivate: true,
    category: "Backend"
  },
  {
    id: "proj-2",
    title: "Event-Driven Notification Engine",
    description: "Highly scalable email/SMS broadcasting service processing events from Apache Kafka message queue.",
    longDescription: "An event-driven notification engine that consumes application alerts, transactional receipts, and advertising broadcasts from Kafka topics. It matches events with templates dynamically using Thymeleaf, checks rate limiting, and dispatches requests through configured email / SMS APIs in parallel worker threads, securing 99.99% message delivery.",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    tools: ["Java", "Springboot", "Kafka", "Postgresql"],
    isPrivate: false,
    repoUrl: "https://github.com/daniel-sipangkar/notification-engine",
    liveUrl: "https://daniel-sipangkar.dev/demo/notification-engine",
    category: "Backend"
  },
  {
    id: "proj-3",
    title: "High-Throughput Redis Caching Layer",
    description: "A pluggable Redis cluster cacher custom integrated with Spring Boot JPA to accelerate heavy database operations.",
    longDescription: "Designed to minimize latency in heavy OracleDB environments, this cache layer provides custom cache-aside and write-through policies. Features include automated cache eviction patterns triggered by database events, serialized JSON payloads, and local memory failback controls. Solves performance bottlenecks during peak query times.",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    tools: ["Java", "Springboot", "Redis", "OracleDb"],
    isPrivate: true,
    category: "System"
  },
  {
    id: "proj-4",
    title: "Elasticsearch Product Indexer",
    description: "Elastic Logstash database synchronizer with autocomplete engine for multi-tenant e-commerce search.",
    longDescription: "This project sets up real-time PostgreSQL database replication into Elasticsearch indices using Logstash and JDBC triggers. It provides an optimized Java Spring Boot API wrapper featuring search-as-you-type autocomplete, fuzzy spelling correction, custom weighting filters, and category aggregations for rich shopping UI interactions.",
    thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800",
    tools: ["Java", "Elastic", "Postgresql", "Springboot"],
    isPrivate: false,
    repoUrl: "https://github.com/daniel-sipangkar/elastic-indexer",
    liveUrl: "https://daniel-sipangkar.dev/demo/elastic-indexer",
    category: "Backend"
  },
  {
    id: "proj-5",
    title: "Enterprise Regulatory Reporting Engine",
    description: "An automated compiler generating daily PDF and Excel audits utilizing Jasper Reports engine.",
    longDescription: "A reporting platform designed for financial compliance departments. It pulls transaction records at midnight, feeds structured tables into Jasper Reports compilation routines, outputs password-protected PDFs and XML worksheets, and automatically uploads files to SFTP locations. Highly optimized memory usage prevents heap overflows.",
    thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800",
    tools: ["Java", "Jasper Reports", "OracleDb", "Springboot"],
    isPrivate: true,
    category: "Reporting"
  },
  {
    id: "proj-6",
    title: "Interactive Full-Stack Portfolio App",
    description: "A showcase platform pairing this React-Tailwind client with a Java microservices administrative dashboard.",
    longDescription: "Built to demonstrate modern full-stack skills. The user interface features animated cards, custom hooks, and dynamic visuals. The backend dashboard (Spring Boot) provides administrative controls to update experience tracks, project metadata, and parse contacts. Deployed containerized on GCP Cloud Run.",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    tools: ["React", "Java", "Springboot", "Postgresql"],
    isPrivate: false,
    repoUrl: "https://github.com/daniel-sipangkar/portfolio-app",
    liveUrl: "https://daniel-sipangkar.dev",
    category: "Full-Stack"
  }
];

export const testimonialsData: Testimonial[] = []; // Empty fallback ready for future testimonials

export const portfolioText = {
  navbar: {
    brandName: "Daniel Sipangkar",
    navLinks: [
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Project", href: "#projects" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact Me", href: "#contact" },
    ],
    ctaText: "Let's Talk",
    drawerTitle: "Navigation",
    linkedinBtn: "LinkedIn Contact",
  },
  about: {
    welcomeTag: "Welcome to My Portfolio",
    greetingPrefix: "Hi, I'm",
    descriptionSuffix: "Specialized in creating microservices pipelines, secure database querying, and data sync engines, whilst implementing responsive user-facing panels to deliver a complete, highly optimized stack.",
    resumeBtn: "My Resume",
    onTouchBtn: "On Touch",
    profileTitle: "Full Stack / Backend Systems",
    techStackTitle: "Core Technical Stack & Tools",
    resumeFilename: "Daniel_Sipangkar_Resume.txt",
    resumeHeaderText: "DANIEL SIPANGKAR - RESUME",
    resumeHeaderLine: "========================================",
    resumeRoleLabel: "Role: Backend & Frontend Developer (Full-Stack)",
    resumeEmailLabel: "Email:",
    resumeLinkedInLabel: "LinkedIn:",
    resumeWhatsAppLabel: "WhatsApp:",
    resumeSkillsLabel: "TECHNICAL SKILLS:",
    resumeSkillsList: [
      "- Languages: Java, JavaScript, TypeScript",
      "- Frameworks: Spring Boot, React, Angular, Express",
      "- Databases: PostgreSQL, OracleDB, Redis",
      "- Streaming & Search: Apache Kafka, Elasticsearch (Elastic)",
      "- Reporting: Jasper Reports"
    ],
    resumeSummaryLabel: "EXPERIENCE SUMMARY:",
    resumeSummaryText: "3+ years of experience engineering high-performance API structures, microservices architectures, data caching strategies, and robust client portals.",
  },
  experience: {
    journeyTag: "Career Journey",
    title: "Professional Experience",
    description: "A track record of engineering scalable backend microservices, streamlining streaming event networks, and optimizing SQL and Redis database caches.",
    moreBadge: "more",
    viewDetailsBtn: "View Details",
    modalScopeTitle: "Detailed Scope & Contributions",
    modalTechTitle: "Technologies Implemented",
    modalScreenshotsTitle: "System Architecture / Screenshot Placeholders",
    placeholder1Title: "Microservice Pipeline Mesh",
    placeholder1Subtitle: "Docker Compose Stack Setup",
    placeholder2Title: "Database Index Query Optimizer",
    placeholder2Subtitle: "OracleDB Explain Plan Mockup",
  },
  projects: {
    title: "Featured Projects",
    description: "Explore a curated collection of high-performance microservices, API engines, caching layers, and responsive full-stack solutions built using Java Spring Boot and React.",
    modalTitle: "Project Architecture & Purpose",
    modalStackTitle: "Core Stack Integration",
    modalPrivateRepo: "Private Repository",
    modalLivePreview: "Live Preview",
    modalSourceCode: "Source Code",
    modalSourceGated: "Source Gated",
    modalPrivateWarning: "⚠️ This system processes proprietary financial transaction payloads and compliance metrics. Live hosting and public sources are restricted.",
  },
  testimonials: {
    feedbackTag: "Client Feedback",
    title: "Recommendations & Testimonials",
    description: "Read recommendations and feedback from peers, tech leads, and product owners who partnered on backend microservices migrations.",
  },
  contact: {
    connectTag: "Let's Connect",
    title: "Get In Touch",
    description: "Interested in adding a high-throughput Java Spring Boot backend, a robust microservice architecture, or building full-stack dashboards? Let's align! Fill in the console stream or reach out via direct link.",
    emailDispatchLabel: "Email Dispatch",
    telephonyLabel: "Instant Telephony",
    telephonyValue: "+62 822 7225 3799",
    formTitle: "API Messaging Form",
    nameLabel: "Your Name",
    namePlaceholder: "John Doe",
    emailLabel: "Email Address",
    emailPlaceholder: "john@example.com",
    messageLabel: "Payload Message",
    messagePlaceholder: "Describe your project, system architecture requirements, or role openings...",
    errorEmptyInputs: "Please fill in all inputs before transmission.",
    successMsg: "Success: Message logged. Synchronization completes shortly. Thank you!",
    transmittingText: "Transmitting Data...",
    sendBtn: "Send Message",
  },
  footer: {
    systemCore: "SYSTEM CORE: ACTIVE | RESPONDING 200 OK",
    craftedWith: "Crafted with",
    usingText: "using React & Spring Boot.",
  }
};
