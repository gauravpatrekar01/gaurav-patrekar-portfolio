import { Calendar, Award, BookOpen, Code } from 'lucide-react';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  type: 'academic' | 'learning' | 'certification' | 'project';
}

const timelineData: TimelineItem[] = [
  {
    date: 'Aug 2024',
    title: 'Started B.Tech at KIT CoE',
    description: 'Began my journey in Computer Science and Business Systems with a focus on building a strong foundation in programming and core CS concepts.',
    type: 'academic',
  },
  {
    date: 'Sep 2024',
    title: 'First Programming Project',
    description: 'Developed a console-based application in C++ demonstrating understanding of data structures and algorithms.',
    type: 'project',
  },
  {
    date: 'Nov 2024',
    title: 'Web Development Fundamentals',
    description: 'Completed comprehensive self-learning in HTML, CSS, and JavaScript. Built multiple responsive web pages and interactive projects.',
    type: 'learning',
  },
  {
    date: 'Jan 2025',
    title: 'React & Modern Frontend',
    description: 'Mastered React.js fundamentals including hooks, state management, and component architecture. Started building full-stack applications.',
    type: 'learning',
  },
  {
    date: 'Feb 2025',
    title: 'Blockchain Specialization',
    description: 'Enrolled in Honours program for Blockchain Technology. Learning Solidity, smart contracts, and decentralized application development.',
    type: 'academic',
  },
  {
    date: 'Mar 2025',
    title: 'First Semester Excellence',
    description: 'Achieved CGPA of 9.33/10 in the first year, demonstrating strong academic performance alongside practical skill development.',
    type: 'certification',
  },
];

const getIcon = (type: TimelineItem['type']) => {
  switch (type) {
    case 'academic':
      return BookOpen;
    case 'learning':
      return Code;
    case 'certification':
      return Award;
    case 'project':
      return Code;
    default:
      return Calendar;
  }
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-wide mb-3">Experience</p>
          <h2 className="section-title">My Learning Journey</h2>
          <p className="section-subtitle mx-auto">
            A timeline of academic achievements, self-learning milestones, and project experiences
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineData.map((item, index) => {
                const Icon = getIcon(item.type);
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`relative flex items-start gap-8 ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 pl-20 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div
                        className={`card-base ${
                          isEven ? 'md:text-right' : ''
                        }`}
                      >
                        <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                          <span className="text-sm font-medium text-accent">{item.date}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-card border-4 border-background flex items-center justify-center shadow-soft">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Status */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent/10 rounded-full">
              <span className="w-3 h-3 bg-accent rounded-full animate-pulse-soft" />
              <span className="text-sm font-medium text-foreground">
                Currently: Building projects & expanding knowledge
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
