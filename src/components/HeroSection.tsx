import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import gauravPhoto from '@/assets/gaurav-photo.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />

      <div className="section-container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
              {/* Greeting */}
              <p className="animate-fade-up text-accent font-medium tracking-wide mb-4">
                Hello, I'm
              </p>

              {/* Name */}
              <h1 className="animate-fade-up-delay-1 text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
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
              <p className="animate-fade-up-delay-3 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Passionate about building elegant, user-centric solutions and transforming 
                complex problems into clean, efficient code.
              </p>

              {/* CTAs */}
              <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
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
              <div className="animate-fade-up-delay-3 flex items-center justify-center lg:justify-start gap-6">
                <a
                  href="https://github.com/gauravpatrekar01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/gaurav-patrekar-20470333a"
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

            {/* Right - Photo */}
            <div className="flex-shrink-0 order-1 lg:order-2 animate-fade-up">
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-full blur-xl animate-pulse-soft" />
                
                {/* Outer decorative border */}
                <div className="absolute -inset-2 bg-gradient-to-br from-primary via-accent to-primary rounded-full opacity-30" />
                
                {/* Photo container */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background shadow-elegant">
                  <img
                    src={gauravPhoto}
                    alt="Gaurav Patrekar - Computer Science Engineering Student"
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Floating accent dots */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-float" />
                <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-primary rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 -right-6 w-3 h-3 bg-accent/60 rounded-full animate-float" style={{ animationDelay: '1s' }} />
              </div>
            </div>
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
