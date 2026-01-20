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
            <p className="text-accent font-medium tracking-wide mb-3">My Journey</p>
            <h2 className="section-title">
              Building the Future,{' '}
              <span className="text-gradient-gold">One Line at a Time</span>
            </h2>
            
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                My journey into technology began with a strong curiosity about how software systems work 
                behind the scenes and how logical thinking can be used to solve real-world problems. As a 
                Computer Science Engineering student, I started by building a solid foundation in programming, 
                data structures, and problem-solving, which helped me understand not just how to write code, 
                but how to think like a developer.
              </p>
              <p>
                In the early phase of my learning, I focused on understanding core programming concepts using 
                languages like Python and Java. Instead of limiting myself to theory, I actively applied what 
                I learned by building small programs and gradually moving toward complete applications. This 
                hands-on approach strengthened my confidence and improved my ability to design structured, 
                maintainable logic.
              </p>
              <p>
                As my interest grew, I explored web development, where I learned how front-end and back-end 
                components come together to form complete user-facing applications. Building my personal 
                portfolio website was a major milestone, allowing me to apply HTML, CSS, and JavaScript while 
                learning about UI design, responsiveness, and user experience.
              </p>
              <p>
                Alongside web development, I worked on projects such as the Salon Management System, focusing 
                on backend logic, data handling, and clean code practices. I later developed a Smart Budget 
                Management App using Java and SQLite, deepening my understanding of object-oriented programming 
                and database integration.
              </p>
              <p>
                Currently, I am pursuing an Honours specialization in Blockchain Technology, learning about 
                decentralized systems, cryptography, smart contracts, and secure application design. My goal 
                is to grow into a well-rounded software engineer who can contribute meaningfully to real-world 
                solutions and continuously evolve with the technology landscape.
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
