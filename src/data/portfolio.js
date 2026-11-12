/**
 * CENTRAL PORTFOLIO DATA
 * Edit this one file to update the whole website.
 * Empty strings ("") mean "not added yet" and show a placeholder state on the site.
 */

export const profile = {
  name: "Tarun Sanghavi",
  shortName: "Tarun",
  role: "Full Stack Developer",
  availability: "Available for Part-Time Roles & Freelance Projects",
  headline: "Building Modern, Responsive & User-Focused Web Experiences.",
  intro: [
    "Hi, I'm Tarun Sanghavi, a Full Stack Developer passionate about building modern web applications with clean interfaces, reusable components and reliable functionality.",
    "I specialize in frontend development using React.js, Next.js and JavaScript, with experience in API integration, backend development and database technologies.",
  ],
  highlights: [
    { icon: "Briefcase", text: "Full Stack Developer at AzzipTech" },
    { icon: "Atom", text: "Experience in React.js and Next.js" },
    { icon: "MonitorSmartphone", text: "Focused on UI quality and responsive development" },
  ],
  tagline: "Building better digital experiences, one project at a time.",
  siteUrl: "https://your-domain.com", // TODO: replace with your deployed URL
  email: "tarunn.sanghavi@gmail.com", // TODO: add your professional email address
  resumeUrl: "/Tarun-Sanghavi-Resume.pdf", // TODO: put your resume PDF in /public with this name
};

export const socials = {
  github: "https://github.com/Tsanghavi18",
  linkedin: "https://www.linkedin.com/in/tarun-sanghavi/",
  instagram: "https://www.instagram.com/tarunn.sanghavi/"
};

export const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export const about = {
  title: "A Little About Me",
  paragraphs: [
    "I'm Tarun Sanghavi, a Full Stack Developer with professional experience building and improving web applications.",
    "I enjoy transforming ideas into responsive, accessible and user-friendly digital experiences. My primary strength is frontend development, where I work with React.js, Next.js, JavaScript and modern CSS frameworks to create structured and maintainable interfaces.",
    "I also have experience integrating REST APIs, working with Node.js and MySQL, troubleshooting application issues and performing manual functional testing to improve application quality.",
  ],
  quote:
    "Great development is not just about writing code. It's about understanding user needs, creating intuitive experiences and delivering reliable solutions.",
  focusTitle: "What I Focus On",
  focus: [
    { icon: "MonitorSmartphone", text: "Developing responsive and user-friendly interfaces." },
    { icon: "Blocks", text: "Building reusable and maintainable components." },
    { icon: "Plug", text: "Integrating REST APIs with frontend applications." },
    { icon: "Bug", text: "Identifying bugs and improving application functionality." },
    { icon: "Users", text: "Collaborating with teams to deliver quality software." },
  ],
};

/**
 * Skills shown in the slider. `icon` must exist in the iconMap at the top of Skills.js.
 * caption = short description, keywords = quick tags shown on the slide.
 */
export const skills = [
  {
    id: "frontend",
    category: "Frontend Development",
    caption: "Interfaces that are responsive, structured and easy to maintain.",
    items: [
      { name: "HTML5", icon: "Code", caption: "Semantic, accessible page structure.", keywords: ["Semantic", "Accessible", "Structure"] },
      { name: "CSS3", icon: "Palette", caption: "Layouts, styling and responsive design.", keywords: ["Flexbox", "Grid", "Responsive"] },
      { name: "JavaScript", icon: "Braces", caption: "The core language behind interactive web apps.", keywords: ["ES6+", "DOM", "Async"] },
      { name: "React.js", icon: "Atom", caption: "Reusable, component-based user interfaces.", keywords: ["Components", "Hooks", "State"] },
      { name: "Next.js", icon: "Layers", caption: "React framework for fast, well-structured web apps.", keywords: ["Routing", "SSR", "Performance"] },
      { name: "Tailwind CSS", icon: "Wind", caption: "Utility-first styling for consistent interfaces.", keywords: ["Utility-first", "Design tokens", "Rapid UI"] },
      { name: "Bootstrap", icon: "LayoutGrid", caption: "Ready-made components and responsive grid.", keywords: ["Grid", "Components", "Responsive"] },
    ],
  },
  {
    id: "backend",
    category: "Backend Development",
    caption: "Connecting interfaces to data and services.",
    items: [
      { name: "Node.js", icon: "Server", caption: "JavaScript runtime for server-side applications.", keywords: ["Runtime", "Server", "npm"] },
      { name: "REST API Integration", icon: "Plug", caption: "Connecting frontend screens to backend APIs.", keywords: ["Endpoints", "JSON", "Fetch"] },
      { name: "Nodemailer", icon: "Mail", caption: "Sending emails from Node.js applications.", keywords: ["Email", "SMTP", "Node.js"] },
    ],
  },
  {
    id: "database",
    category: "Database",
    caption: "Storing and querying application data.",
    items: [
      { name: "MySQL", icon: "Database", caption: "Relational database for structured data.", keywords: ["SQL", "Tables", "Queries"] },
      { name: "MongoDB", icon: "Leaf", caption: "Document database for flexible data.", keywords: ["NoSQL", "Documents", "Collections"] },
    ],
  },
  {
    id: "tools",
    category: "Tools & Technologies",
    caption: "Everyday tools for building, sharing and testing.",
    items: [
      { name: "Git", icon: "GitBranch", caption: "Version control for every change.", keywords: ["Commits", "Branches", "History"] },
      { name: "GitHub", icon: "Github", caption: "Hosting code and collaborating with teams.", keywords: ["Repositories", "Pull requests", "Collaboration"] },
      { name: "Postman", icon: "Send", caption: "Testing and validating API requests and responses.", keywords: ["Requests", "Responses", "Validation"] },
      { name: "Jira", icon: "Flag", caption: "Tracking tasks and reporting bugs.", keywords: ["Tickets", "Bugs", "Workflow"] },
      { name: "Antigravity", icon: "Sparkles", caption: "AI-assisted development tool.", keywords: ["AI", "Productivity", "Coding"] },
    ],
  },
  {
    id: "quality",
    category: "Quality & Testing",
    caption: "Making sure what ships actually works.",
    items: [
      { name: "Manual Functional Testing", icon: "ClipboardCheck", caption: "Verifying features behave as intended.", keywords: ["Test cases", "Verification", "Quality"] },
      { name: "Bug Identification", icon: "Search", caption: "Finding and isolating issues early.", keywords: ["Debugging", "Root cause", "Details"] },
      { name: "Bug Reporting", icon: "Bug", caption: "Clear, reproducible bug reports.", keywords: ["Steps", "Evidence", "Jira"] },
      { name: "UI Testing", icon: "MonitorSmartphone", caption: "Checking layouts across screens and devices.", keywords: ["Responsive", "Visual", "Devices"] },
      { name: "API Testing", icon: "Webhook", caption: "Validating API behavior and responses.", keywords: ["Postman", "Status codes", "Payloads"] },
    ],
  },
];

/**
 * Projects. Add `github`, `live` and `image` (a path like "/projects/snipurl.png")
 * after you verify each project. `preview` picks the illustrated placeholder
 * shown until you add a real screenshot.
 */
export const projects = [
  {
    name: "SnipURL",
    category: "URL Shortener",
    description: "A web application project focused on simplifying long URLs into shorter, shareable links.",
    highlights: ["URL shortening functionality.", "Simple and user-friendly interface.", "Practical web application development."],
    github: "",
    live: "",
    image: "",
    preview: "snipurl",
  },
  {
    name: "LinkTree Clone",
    category: "Web Application",
    description: "A Linktree-inspired project designed to organize multiple social and professional links in one accessible place.",
    highlights: ["Organized link presentation.", "Responsive interface.", "Clean and simple user experience."],
    github: "",
    live: "",
    image: "",
    preview: "linktree",
  },
  {
    name: "Expense Tracker",
    category: "Finance Management Application",
    description: "An expense tracking project designed to help users organize and monitor their expenses.",
    highlights: ["Expense management interface.", "Structured presentation of financial records.", "Focus on usability and data organization."],
    github: "",
    live: "",
    image: "",
    preview: "expense",
  },
  {
    name: "Next.js Projects",
    category: "Frontend Development",
    description: "A collection of projects and experiments exploring Next.js and modern frontend development practices.",
    highlights: ["Next.js development.", "Component-based architecture.", "Hands-on learning and implementation."],
    github: "",
    live: "",
    image: "",
    preview: "nextjs",
  },
];

export const experience = [
  {
    position: "Full Stack Developer",
    company: "AzzipTech",
    period: "October 2025 - Present",
    current: true,
    summary:
      "Working on web application development with a focus on frontend implementation, API integration and application quality.",
    responsibilities: [
      "Develop and improve responsive web interfaces.",
      "Build reusable UI components using modern frontend technologies.",
      "Integrate REST APIs into frontend applications.",
      "Work with JavaScript, React.js and Next.js.",
      "Identify, troubleshoot and report application issues.",
      "Perform manual functional testing to verify application behavior.",
      "Collaborate with team members to improve functionality and user experience.",
    ],
    keywords: ["JavaScript", "React.js", "Next.js", "REST APIs", "Manual Testing"],
  },
  {
    position: "Full Stack Developer Intern",
    company: "AzzipTech",
    period: "January 2025 - September 2025",
    current: false,
    summary:
      "Started my professional development journey by contributing to web application development and learning practical software development workflows.",
    responsibilities: [
      "Assisted in developing responsive web interfaces.",
      "Worked with HTML, CSS, JavaScript and React.js.",
      "Learned frontend and backend integration.",
      "Worked with APIs and database-related functionality.",
      "Identified UI issues and supported debugging activities.",
      "Gained experience with Git, GitHub and development workflows.",
    ],
    keywords: ["HTML", "CSS", "JavaScript", "React.js", "Git & GitHub", "APIs"],
  },
];

// No education / certification details were provided yet: these are placeholders.
export const education = [
  {
    institution: "Gujarat Technological University (GTU)",
    degree: "Bachelor of Engineering (BE)",
    field: "Information Technology",
    duration: "Aug 2021 - Jul 2025",
    details: "",
  },
];

export const certifications = [
  {
    name: "MongoDB Node.js Developer Path",
    issuer: "MongoDB",
    date: "Issued Jul 2025",
    credentialId: "MDBzgxul8oi7a",
    skills: ["MongoDB", "Node.js"],
    url: "https://www.linkedin.com/safety/go/?url=https%3A%2F%2Flearn.mongodb.com%2Fc%2FtXD7XFk0RFurYnXDLVHprg&urlhash=qAIK&mt=QMy_dptlDtu_vOsjYjRaCwuUn-sZexwfb32JBE3Zpp1tKt92lkEvo7dbtDdW6S4ERQVLZBzMa8a5TroWI_suYPPwSZpH3YnaDGS7govaIeZg1q0N6B2ziGx9uwtdvy9lU_eSImrR66_FsJaFBvz8nwV3ykgPAxlh4L_cIn8EbTDvKmHjKehPbCeBRFXrDU9KuHdM7_sOsB5F_NUR6beSIQM&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BtMg8ZeE3TeSca6l4SS6FOw%3D%3D", // paste your "Show credential" link here
  },
];

export const contact = {
  title: "Have a Project in Mind? Let's Connect.",
  text: [
    "I'm always interested in connecting with developers, exploring opportunities and discussing ideas around web development.",
    "Feel free to reach out through any of the platforms below.",
  ],
  button: "Let's Talk",
};

export const footer = {
  credit: "Designed & Developed by Tarun Sanghavi.",
  rights: "All Rights Reserved.",
};
