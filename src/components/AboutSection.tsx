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
                I'm a Computer Science and Business Systems student at KIT's College of Engineering, 
                driven by a passion for creating impactful software solutions. With a strong foundation 
                in programming, data structures, and algorithms, I approach every project with a 
                problem-solving mindset.
              </p>
              <p>
                My experience spans web development, backend logic, and database management. I believe 
                in writing clean, performant, and scalable code that stands the test of time. Currently 
                pursuing an Honours specialization in Blockchain Technology, I'm fascinated by the 
                potential of decentralized systems.
              </p>
              <p>
                I embrace a growth-oriented mindset, continuously learning new technologies and best 
                practices. Whether it's collaborating on open-source projects or building personal 
                applications, I'm always eager to expand my skillset and contribute to meaningful work.
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
