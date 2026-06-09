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
  employmentType?: string;
  locationType?: string;
  projects?: string[];
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
  imageUrls?: string[];
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
  titles: ["Daniel Sipangkar", "Backend Developer", "Fullstack Vibe Coder"],
  flipWords: ["Daniel Sipangkar", "Backend Developer", "Fullstack Vibe Coder"],
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
    "id": "exp-1",
    "duration": "Sep 2023 - Present",
    "company": "PT Bank Mandiri (Persero) Tbk.",
    "role": "Back End Developer",
    "shortDescription": "Design and maintain robust backend services using Java Spring Boot, microservices, and Redis.",
    "longDescription": "Design, develop, and maintain robust backend services using Java Spring Boot. Write clean, efficient, and maintainable code with thorough unit testing. Collaborate closely with UI/UX designers, system analysts, frontend developers (Android & Web), and Product Owner to translate user needs into technical solutions. Troubleshoot, debug, and resolve application issues to ensure seamless user experience.",
    "tools": ["Java", "Spring Boot", "Microservices", "Redis", "JDBC"],
    "screenshots": [],
    "employmentType": "Contract",
    "locationType": "On-site",
    "projects": ["Smart Branch Mandiri", "Kopra by Mandiri"]
  },
  {
    "id": "exp-2",
    "duration": "Jun 2023 - Aug 2023",
    "company": "Enigma Camp",
    "role": "Bootcamp Fullstack Developer",
    "shortDescription": "Intensive bootcamp focused on Java Spring Boot and Angular TypeScript.",
    "longDescription": "Completed intensive fullstack development bootcamp with focus on Java Spring Boot for backend and Angular with TypeScript for frontend. Built end-to-end applications and gained hands-on experience with modern web development practices.",
    "tools": ["Java", "Spring Boot", "Angular", "TypeScript", "JDBC"],
    "screenshots": [],
    "employmentType": "Contract",
    "locationType": "Hybrid",
    "projects": ["Final Project : Loundry Management System"]
  },
  {
    "id": "exp-3",
    "duration": "Dec 2022 - Mar 2023",
    "company": "Sagara Technology",
    "role": "Frontend Engineer Specialist",
    "shortDescription": "Developed mobile app interfaces using Flutter for 'Mom and Kids' application.",
    "longDescription": "Developed mobile app interfaces using Flutter for the 'Mom and Kids' application, following provided designs and ensuring a responsive, user-friendly experience. Collaborated with design team to implement pixel-perfect UI components.",
    "tools": ["Flutter", "Dart"],
    "screenshots": [],
    "employmentType": "Internship",
    "locationType": "Remote",
    "projects": ["Mom and Kids Mobile App Interface"]
  },
  {
    "id": "exp-4",
    "duration": "Sep 2019 - Dec 2021",
    "company": "Institut Teknologi Sumatera",
    "role": "Laboratory Assistant",
    "shortDescription": "Assisted in web development and embedded systems laboratory courses.",
    "longDescription": "Served as laboratory assistant for Web Development and Embedded Systems courses. Guided students in practical sessions, graded assignments, and provided technical support for course projects.",
    "tools": ["Web Development", "HTML", "Embedded Systems"],
    "screenshots": [],
    "employmentType": "Part-time",
    "locationType": "On-site"
  }
];

export const projectsData: Project[] = [];

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
    modalTitle: "Project Details",
    modalStackTitle: "Technologies",
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
