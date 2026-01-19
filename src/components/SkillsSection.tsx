import { Code, Globe, Wrench, Cpu } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: Code,
    skills: ['C/C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    title: 'Web Technologies',
    icon: Globe,
    skills: ['HTML5', 'CSS3', 'React', 'Node.js', 'Express.js', 'Tailwind CSS', 'REST APIs'],
  },
  {
    title: 'Tools & Version Control',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'VS Code', 'Linux', 'Docker', 'Postman', 'npm'],
  },
  {
    title: 'Core CS Concepts',
    icon: Cpu,
    skills: ['Data Structures', 'Algorithms', 'OOP', 'DBMS', 'OS', 'Computer Networks', 'Blockchain'],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-wide mb-3">Skills</p>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle mx-auto">
            A comprehensive toolkit built through continuous learning and hands-on projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="card-base"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Progress Visual */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="card-base">
            <h3 className="text-lg font-semibold text-foreground mb-6">Proficiency Overview</h3>
            <div className="space-y-4">
              {[
                { name: 'Web Development', level: 85 },
                { name: 'Data Structures & Algorithms', level: 80 },
                { name: 'Backend Development', level: 75 },
                { name: 'Database Management', level: 70 },
                { name: 'Blockchain', level: 60 },
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        background: 'var(--gradient-gold)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
