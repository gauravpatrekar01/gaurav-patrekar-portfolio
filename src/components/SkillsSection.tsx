import { Code, Globe, Wrench, Cpu } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: Code,
    skills: ['C/C++', 'Python', 'Java', 'PostgreSQL'],
  },
  {
    title: 'Web Technologies',
    icon: Globe,
    skills: ['HTML5', 'CSS3', 'React'],
  },
  {
    title: 'Tools & Version Control',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'VS Code', 'Linux'],
  },
  {
    title: 'Core CS Concepts',
    icon: Cpu,
    skills: ['Data Structures', 'Algorithms', 'OOP', 'DBMS', 'OS', 'Computer Networks', 'Blockchain'],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
};

const skillBadgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3 }
  },
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-medium tracking-wide mb-3">Skills</p>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-subtitle mx-auto">
            A comprehensive toolkit built through continuous learning and hands-on projects
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="card-base group"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <category.icon className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">{category.title}</h3>
              </div>
              
              <motion.div 
                className="flex flex-wrap gap-2"
                variants={containerVariants}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.span 
                    key={skill} 
                    className="skill-badge cursor-default"
                    variants={skillBadgeVariants}
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: "hsl(var(--accent))",
                      color: "hsl(var(--accent-foreground))",
                      transition: { duration: 0.2 }
                    }}
                    custom={skillIndex}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Progress Visual */}
        <motion.div 
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            className="card-base"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">Proficiency Overview</h3>
            <div className="space-y-4">
              {[
                { name: 'Web Development', level: 70 },
                { name: 'Data Structures & Algorithms', level: 45 },
                { name: 'Backend Development', level: 65 },
                { name: 'Database Management', level: 50 },
                { name: 'Blockchain', level: 55 },
              ].map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <motion.span 
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'var(--gradient-gold)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
