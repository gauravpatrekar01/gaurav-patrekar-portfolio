import { ExternalLink, Github, Folder } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import salonScreenshot from "@/assets/salon-screenshot.png";
import trackifyScreenshot from "@/assets/trackify-screenshot.png";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  liveDemo?: string;
  featured?: boolean;
  image?: string;
}

const projects: Project[] = [
  {
    title: "Salon Management System",
    description:
      "A comprehensive salon management system developed using Python. The application helps salon owners manage appointments, customers, services, and basic records efficiently. Emphasis on clean logic and maintainable code.",
    techStack: ["Python", "File Handling", "OOP Concepts"],
    github: "https://github.com/gauravpatrekar01/Salon_Management_System",
    featured: true,
    image: salonScreenshot,
  },
  {
    title: "Smart Budget Management App (Trackify)",
    description:
      "A Java-based budget management application that allows users to track expenses, manage budgets, and analyze spending habits. Designed with modular backend logic and persistent local storage.",
    techStack: ["Java", "SQLite", "OOP"],
    github: "https://github.com/gauravpatrekar01/trackify-expense-tracker",
    featured: true,
    image: trackifyScreenshot,
  },
  {
    title: "Personal Portfolio Website",
    description:
      "A responsive personal portfolio website built to showcase my skills, education, and projects. Designed with a focus on layout structure, UI consistency, and smooth navigation.",
    techStack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/gauravpatrekar01/Gaurav-Dev-Portfolio",
    liveDemo: "https://gauravpatrekar01.github.io/Gaurav-Dev-Portfolio",
  },
  {
    title: "Automated Trading Bot (Paper Trading)",
    description:
      "A Python-based system that simulates trading using virtual money. It fetches real-time market data, applies technical indicators, and triggers buy/sell signals to test trading strategies safely. Ideal for learning algorithmic trading and experimenting without financial risk.",
    techStack: ["Python", "APIs", "Data Analysis"],
    github: "https://github.com/gauravpatrekar01/Automated_Trading_Bot",
  },
  {
    title: "JanSamadhan – Smart Public Grievance and Resolution System",
    description:
      "A web-based public grievance redressal platform that enables citizens to register complaints online, track grievance status in real time, and receive transparent updates. The system provides an admin dashboard for authorities to categorize, assign, prioritize, and resolve complaints efficiently, improving accountability and service delivery.",
    techStack: [
      "React.js",
      "JavaScript",
      "supabase",
      "fast APIs",
      "Authentication",
      "HTML/CSS",
    ],
    github: "https://github.com/gauravpatrekar01/JanSamadhan",
    liveDemo:
      "Deployed via GitHub / Localhost (Update if hosted link is available)",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const projectVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const ProjectsSection = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-medium tracking-wide mb-3">Projects</p>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle mx-auto">
            A selection of projects that showcase my skills and passion for
            building
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          className="space-y-20 mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={projectVariants}
              className={`grid lg:grid-cols-12 gap-8 items-center ${
                index % 2 === 1 ? "lg:text-right" : ""
              }`}
            >
              {/* Project Image */}
              <motion.div
                className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative group overflow-hidden rounded-xl">
                  <motion.div
                    className="aspect-video rounded-xl overflow-hidden bg-primary/5 border border-border"
                    whileHover={{ borderColor: "hsl(var(--accent) / 0.5)" }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.image ? (
                      <motion.img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover object-top"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-grid-pattern opacity-30">
                        <Folder className="w-20 h-20 text-muted-foreground/50" />
                      </div>
                    )}
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>

              {/* Project Info */}
              <motion.div
                className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}
                initial={{ opacity: 0, x: index % 2 === 1 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.p
                  className="text-accent text-sm font-medium mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  Featured Project
                </motion.p>
                <motion.h3
                  className="text-2xl font-bold text-foreground mb-4"
                  whileHover={{ color: "hsl(var(--accent))" }}
                  transition={{ duration: 0.3 }}
                >
                  {project.title}
                </motion.h3>
                <motion.div
                  className="card-base mb-4"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "var(--shadow-card-hover)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-muted-foreground">{project.description}</p>
                </motion.div>
                <div
                  className={`flex flex-wrap gap-3 mb-6 ${index % 2 === 1 ? "lg:justify-end" : ""}`}
                >
                  {project.techStack.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      className="text-sm font-mono text-muted-foreground px-3 py-1 rounded-full bg-secondary/80"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + techIndex * 0.1 }}
                      whileHover={{
                        backgroundColor: "hsl(var(--accent) / 0.2)",
                        color: "hsl(var(--accent))",
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <div
                  className={`flex gap-4 ${index % 2 === 1 ? "lg:justify-end" : ""}`}
                >
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="View GitHub repository"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={22} />
                    </motion.a>
                  )}
                  {project.liveDemo && (
                    <motion.a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="View live demo"
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={22} />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects Grid */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-foreground text-center mb-8">
              Other Noteworthy Projects
            </h3>
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  className="card-base group cursor-pointer"
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Folder className="w-10 h-10 text-accent" />
                    </motion.div>
                    <div className="flex gap-3">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="View GitHub repository"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github size={20} />
                        </motion.a>
                      )}
                      {project.liveDemo && (
                        <motion.a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="View live demo"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
