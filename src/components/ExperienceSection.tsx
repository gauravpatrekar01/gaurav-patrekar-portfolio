import { GraduationCap, Award } from 'lucide-react';

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

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-16 animate-fade-up">
          <p className="text-accent font-medium tracking-wide mb-3">Education & Journey</p>
          <h2 className="section-title">My Academic & Learning Journey</h2>
          <p className="section-subtitle mx-auto">
            A timeline of academic achievements, skill development, and continuous growth
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline Line with Gradient */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-primary to-accent/30 md:-translate-x-0.5 rounded-full" />

            {/* Timeline Items */}
            <div className="space-y-16">
              {timelineData.map((item, index) => {
                const Icon = getIcon(item.type);
                const isEven = index % 2 === 0;
                const animationDelay = index === 0 ? '' : index === 1 ? 'animate-fade-up-delay-1' : 'animate-fade-up-delay-2';

                return (
                  <div
                    key={index}
                    className={`relative flex items-start gap-8 ${
                      isEven ? 'md:flex-row-reverse' : ''
                    } ${isEven ? 'animate-slide-in-right' : 'animate-slide-in-left'}`}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {/* Content */}
                    <div className={`flex-1 pl-20 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div
                        className={`relative group bg-card rounded-xl p-6 transition-all duration-500 border-2 border-transparent hover:border-accent/30 hover:-translate-y-1 ${
                          isEven ? 'md:text-right' : ''
                        }`}
                        style={{ 
                          boxShadow: 'var(--shadow-card)',
                        }}
                      >
                        {/* Score Badge */}
                        <div className={`absolute -top-3 ${isEven ? 'md:left-4 right-4' : 'md:right-4 right-4'}`}>
                          <div className="relative px-4 py-1.5 rounded-full font-bold text-sm text-primary-foreground overflow-hidden group-hover:scale-110 transition-transform duration-300"
                            style={{ background: 'var(--gradient-gold)' }}
                          >
                            <span className="relative z-10">{item.score}</span>
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          </div>
                        </div>

                        {/* Date */}
                        <div className={`flex items-center gap-3 mb-4 mt-2 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                          <span className="text-sm font-semibold text-accent tracking-wide">{item.date}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>

                        {/* Decorative accent line */}
                        <div className={`absolute bottom-0 ${isEven ? 'md:right-0 left-0' : 'left-0'} h-1 w-0 bg-gradient-to-r from-accent to-primary group-hover:w-full transition-all duration-500 rounded-b-xl`} />
                      </div>
                    </div>

                    {/* Timeline Dot with Animation */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-card border-4 border-accent flex items-center justify-center shadow-lg group cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-accent/20">
                      <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping opacity-20" />
                      <Icon className="w-7 h-7 text-accent transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Status */}
          <div className="mt-20 text-center animate-fade-up-delay-3">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 rounded-full border border-accent/20 hover:border-accent/40 transition-all duration-300 hover:scale-105">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
              </span>
              <span className="text-sm font-semibold text-foreground">
                Currently: Pursuing B.Tech with Blockchain Honours
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
