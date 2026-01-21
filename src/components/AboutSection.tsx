import { Code2, Database, GitBranch, Layers } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, efficient, and well-documented code',
  },
  {
    icon: Database,
    title: 'Full Stack',
    description: 'Frontend to backend, databases to deployment',
  },
  {
    icon: GitBranch,
    title: 'Version Control',
    description: 'Proficient with Git workflows and collaboration',
  },
  {
    icon: Layers,
    title: 'Blockchain',
    description: 'Honours specialization in Blockchain Technology',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <p className="text-accent font-medium tracking-wide mb-3">About Me</p>
            <h2 className="section-title">
              Building the Future,{' '}
              <span className="text-gradient-gold">One Line at a Time</span>
            </h2>
            
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I'm a Computer Science Engineering student with a strong foundation in programming, 
                data structures, and problem-solving. I specialize in building efficient, scalable 
                applications with a focus on clean code practices and modern development workflows.
              </p>
              <p>
                My experience spans web development, backend systems, and database management. I'm 
                proficient with Git and GitHub for version control and collaboration, and I prioritize 
                writing maintainable code that emphasizes performance and scalability.
              </p>
              <p>
                Currently pursuing an Honours specialization in Blockchain Technology, I'm expanding 
                my expertise in decentralized systems and secure application design. I'm driven by 
                continuous learning and always eager to explore new technologies and challenges.
              </p>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="card-base group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
