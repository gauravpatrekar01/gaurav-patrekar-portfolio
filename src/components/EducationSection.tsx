import { ExternalLink, GraduationCap, Award, BookOpen } from 'lucide-react';

const coursework = [
  'Data Structures & Algorithms',
  'Object-Oriented Programming',
  'Database Management Systems',
  'Computer Networks',
  'Operating Systems',
  'Web Development',
  'Software Engineering',
  'Blockchain Fundamentals',
];

const EducationSection = () => {
  return (
    <section id="education" className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-accent font-medium tracking-wide mb-3">Education</p>
          <h2 className="section-title">Academic Journey</h2>
          <p className="section-subtitle mx-auto">
            Building a strong foundation in computer science and emerging technologies
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card-base overflow-hidden">
            {/* Header with gradient */}
            <div className="relative h-32 -mx-6 -mt-6 mb-6 overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
              <div className="absolute inset-0 bg-grid-pattern opacity-20" />
              <div className="absolute bottom-4 left-6">
                <GraduationCap className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Kolhapur Institute of Technology's College of Engineering
                  </h3>
                  <p className="text-lg text-muted-foreground mt-1">
                    Autonomous | Kolhapur, Maharashtra
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">B.Tech in Computer Science and Business Systems</p>
                      <p className="text-sm text-muted-foreground">2024 – 2028 (Expected)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Honours: Blockchain Technology</p>
                      <p className="text-sm text-muted-foreground">Specialization in decentralized systems and smart contracts</p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.kitcoek.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-primary font-medium transition-colors mt-4"
                >
                  Learn More About KIT
                  <ExternalLink size={16} />
                </a>
              </div>

              {/* CGPA Card */}
              <div className="flex flex-col items-center justify-center p-6 bg-secondary/50 rounded-xl">
                <p className="text-sm text-muted-foreground font-medium mb-2">First Year CGPA</p>
                <div className="text-5xl font-bold text-gradient-gold">9.33</div>
                <p className="text-sm text-muted-foreground mt-2">out of 10</p>
              </div>
            </div>

            {/* Coursework */}
            <div className="mt-8 pt-8 border-t border-border">
              <h4 className="font-semibold text-foreground mb-4">Relevant Coursework</h4>
              <div className="flex flex-wrap gap-2">
                {coursework.map((course) => (
                  <span key={course} className="skill-badge">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
