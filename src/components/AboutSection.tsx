import { Code2, Database, GitBranch, Layers } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  },
};

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.p variants={itemVariants} className="text-accent font-medium tracking-wide mb-3">
              About Me
            </motion.p>
            <motion.h2 variants={itemVariants} className="section-title">
              Building the Future,{' '}
              <span className="text-gradient-gold">One Line at a Time</span>
            </motion.h2>
            
            <motion.div variants={containerVariants} className="space-y-5 text-muted-foreground leading-relaxed">
              <motion.p variants={itemVariants}>
                I'm a Computer Science Engineering student with a strong foundation in programming, 
                data structures, and problem-solving. I specialize in building efficient, scalable 
                applications with a focus on clean code practices and modern development workflows.
              </motion.p>
              <motion.p variants={itemVariants}>
                My experience spans web development, backend systems, and database management. I'm 
                proficient with Git and GitHub for version control and collaboration, and I prioritize 
                writing maintainable code that emphasizes performance and scalability.
              </motion.p>
              <motion.p variants={itemVariants}>
                Currently pursuing an Honours specialization in Blockchain Technology, I'm expanding 
                my expertise in decentralized systems and secure application design. I'm driven by 
                continuous learning and always eager to explore new technologies and challenges.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.03, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="card-base group cursor-pointer"
                custom={index}
              >
                <motion.div 
                  className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-6 h-6 text-accent" />
                </motion.div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
