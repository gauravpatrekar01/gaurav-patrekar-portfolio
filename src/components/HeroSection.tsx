import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <p className="animate-fade-up text-accent font-medium tracking-wide mb-4">
            Hello, I'm
          </p>

          {/* Name */}
          <h1 className="animate-fade-up-delay-1 text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="text-gradient">Gaurav</span>{' '}
            <span className="text-foreground">Patrekar</span>
          </h1>

          {/* Title */}
          <h2 className="animate-fade-up-delay-2 text-xl md:text-2xl text-muted-foreground font-medium mb-8">
            Computer Science Engineering Student{' '}
            <span className="text-accent">|</span>{' '}
            Aspiring Software Developer
          </h2>

          {/* Tagline */}
          <p className="animate-fade-up-delay-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Passionate about building elegant, user-centric solutions and transforming 
            complex problems into clean, efficient code.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#projects" className="btn-primary">
              View Projects
              <ArrowDown size={18} />
            </a>
            <a href="#" className="btn-secondary">
              <Download size={18} />
              Download Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="animate-fade-up-delay-3 flex items-center justify-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:gaurav@example.com"
              className="p-3 rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <a href="#about" className="flex flex-col items-center text-muted-foreground hover:text-accent transition-colors">
            <span className="text-sm font-medium mb-2">Scroll</span>
            <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
