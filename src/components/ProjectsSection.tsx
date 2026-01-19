import { ExternalLink, Github, Folder } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  github?: string;
  liveDemo?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with user authentication, product catalog, shopping cart, and payment integration. Built with modern web technologies and best practices.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
    featured: true,
  },
  {
    title: 'Blockchain Voting System',
    description: 'A decentralized voting application ensuring transparency and immutability of votes using Ethereum smart contracts and Web3.js integration.',
    techStack: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'Hardhat'],
    github: 'https://github.com',
    featured: true,
  },
  {
    title: 'Task Management Dashboard',
    description: 'A collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
    techStack: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
  },
  {
    title: 'Weather Forecast App',
    description: 'A responsive weather application providing real-time weather data, forecasts, and location-based services using external APIs.',
    techStack: ['JavaScript', 'HTML/CSS', 'OpenWeather API', 'Geolocation'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
  },
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio showcasing projects and skills with a clean, modern design and smooth animations.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com',
    liveDemo: 'https://example.com',
  },
  {
    title: 'Algorithm Visualizer',
    description: 'An interactive tool for visualizing sorting and pathfinding algorithms, helping users understand complex algorithms through animation.',
    techStack: ['React', 'JavaScript', 'CSS Animations'],
    github: 'https://github.com',
  },
];

const ProjectsSection = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-wide mb-3">Projects</p>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle mx-auto">
            A selection of projects that showcase my skills and passion for building
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-12 mb-20">
          {featuredProjects.map((project, index) => (
            <div
              key={project.title}
              className={`grid lg:grid-cols-12 gap-8 items-center ${
                index % 2 === 1 ? 'lg:text-right' : ''
              }`}
            >
              {/* Project Image Placeholder */}
              <div
                className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className="relative group">
                  <div className="aspect-video rounded-xl overflow-hidden bg-primary/5 border border-border">
                    <div className="absolute inset-0 flex items-center justify-center bg-grid-pattern opacity-30">
                      <Folder className="w-20 h-20 text-muted-foreground/50" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Project Info */}
              <div
                className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <p className="text-accent text-sm font-medium mb-2">Featured Project</p>
                <h3 className="text-2xl font-bold text-foreground mb-4">{project.title}</h3>
                <div className="card-base mb-4">
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                <div className={`flex flex-wrap gap-2 mb-6 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-sm font-mono text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={`flex gap-4 ${index % 2 === 1 ? 'lg:justify-end' : ''}`}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="View GitHub repository"
                    >
                      <Github size={22} />
                    </a>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={22} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div>
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">Other Noteworthy Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <div key={project.title} className="card-base group">
                <div className="flex items-center justify-between mb-4">
                  <Folder className="w-10 h-10 text-accent" />
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="View GitHub repository"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="View live demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-xs font-mono text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
