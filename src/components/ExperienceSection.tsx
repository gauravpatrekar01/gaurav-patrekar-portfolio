import { GraduationCap, Award } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  type: 'academic' | 'certification';
  score: string;
}

const timelineData: TimelineItem[] = [
  {
    date: '2024 - Present',
    title: 'B.Tech in Computer Science & Business Systems',
    description: 'Currently pursuing degree at KIT College of Engineering with CGPA of 9.33 in first year. Focused on programming, backend logic, and web development with Python, Java, HTML, CSS, and JavaScript. Also pursuing Honours specialization in Blockchain Technology for secure and decentralized systems.',
    type: 'academic',
    score: '9.33 CGPA',
  },
  {
    date: '2024',
    title: 'Higher Secondary Certificate (HSC)',
    description: 'Completed Class 12 from Maharashtra State Board, strengthening analytical skills and engineering interest through advanced mathematics, physics, and computer science.',
    type: 'certification',
    score: '87%',
  },
  {
    date: '2022',
    title: 'Secondary School Certificate (SSC)',
    description: 'Completed Class 10 from Maharashtra State Board with distinction, building a strong foundation in mathematics, science, and logical reasoning.',
    type: 'certification',
    score: '94.60%',
  },
];

const getIcon = (type: TimelineItem['type']) => {
  switch (type) {
    case 'academic':
      return GraduationCap;
    case 'certification':
      return Award;
    default:
      return GraduationCap;
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const timelineVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7 }
  },
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-secondary/30 overflow-hidden">
      <div className="section-container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-medium tracking-wide mb-3">Education & Journey</p>
          <h2 className="section-title">My Academic & Learning Journey</h2>
          <p className="section-subtitle mx-auto">
            A timeline of academic achievements, skill development, and continuous growth
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline Line with Gradient */}
            <motion.div 
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-primary to-accent/30 md:-translate-x-0.5 rounded-full"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* Timeline Items */}
            <motion.div 
              className="space-y-16"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {timelineData.map((item, index) => {
                const Icon = getIcon(item.type);
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    variants={timelineVariants}
                    className={`relative flex items-start gap-8 ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 pl-20 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                      <motion.div
                        className={`relative group bg-card rounded-xl p-6 transition-all duration-500 border-2 border-transparent hover:border-accent/30 ${
                          isEven ? 'md:text-right' : ''
                        }`}
                        style={{ boxShadow: 'var(--shadow-card)' }}
                        whileHover={{ 
                          y: -5, 
                          boxShadow: 'var(--shadow-card-hover)',
                          transition: { duration: 0.3 }
                        }}
                      >
                        {/* Score Badge */}
                        <motion.div 
                          className={`absolute -top-3 ${isEven ? 'md:left-4 right-4' : 'md:right-4 right-4'}`}
                          initial={{ scale: 0, rotate: -10 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + index * 0.2, type: "spring", stiffness: 200 }}
                        >
                          <motion.div 
                            className="relative px-4 py-1.5 rounded-full font-bold text-sm text-primary-foreground overflow-hidden"
                            style={{ background: 'var(--gradient-gold)' }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="relative z-10">{item.score}</span>
                            {/* Shimmer effect */}
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: '100%' }}
                              transition={{ duration: 0.6 }}
                            />
                          </motion.div>
                        </motion.div>

                        {/* Date */}
                        <div className={`flex items-center gap-3 mb-4 mt-2 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                          <span className="text-sm font-semibold text-accent tracking-wide">{item.date}</span>
                        </div>

                        {/* Title */}
                        <motion.h3 
                          className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300"
                        >
                          {item.title}
                        </motion.h3>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>

                        {/* Decorative accent line */}
                        <motion.div 
                          className={`absolute bottom-0 ${isEven ? 'md:right-0 left-0' : 'left-0'} h-1 bg-gradient-to-r from-accent to-primary rounded-b-xl`}
                          initial={{ width: 0 }}
                          whileHover={{ width: '100%' }}
                          transition={{ duration: 0.4 }}
                        />
                      </motion.div>
                    </div>

                    {/* Timeline Dot with Animation */}
                    <motion.div 
                      className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-card border-4 border-accent flex items-center justify-center shadow-lg cursor-pointer"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.2, type: "spring", stiffness: 200 }}
                      whileHover={{ 
                        scale: 1.15, 
                        boxShadow: "0 0 30px hsl(var(--accent) / 0.4)",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.div 
                        className="absolute inset-0 rounded-full bg-accent/20"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <Icon className="w-7 h-7 text-accent relative z-10" />
                    </motion.div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Current Status */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-full border border-accent/20"
              whileHover={{ 
                scale: 1.05, 
                borderColor: "hsl(var(--accent) / 0.5)",
                transition: { duration: 0.3 }
              }}
            >
              <span className="relative flex h-3 w-3">
                <motion.span 
                  className="absolute inline-flex h-full w-full rounded-full bg-accent"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
              </span>
              <span className="text-sm font-semibold text-foreground">
                Currently: Pursuing B.Tech with Blockchain Honours
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
