import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import gauravPhoto from '@/assets/gaurav-photo.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      
      {/* Animated Gradient Orbs */}
      <motion.div 
        className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Additional floating particles */}
      <motion.div 
        className="absolute top-1/3 right-1/4 w-4 h-4 bg-accent/40 rounded-full blur-sm"
        animate={{ y: [0, -30, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/4 w-6 h-6 bg-primary/30 rounded-full blur-sm"
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="section-container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
              {/* Greeting */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-accent font-medium tracking-wide mb-4"
              >
                Hello, I'm
              </motion.p>

              {/* Name */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              >
                <span className="text-gradient">Gaurav</span>{' '}
                <span className="text-foreground">Patrekar</span>
              </motion.h1>

              {/* Title */}
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground font-medium mb-8"
              >
                Computer Science Engineering Student{' '}
                <span className="text-accent">|</span>{' '}
                Aspiring Software Developer
              </motion.h2>

              {/* Tagline */}
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              >
                Passionate about building elegant, user-centric solutions and transforming 
                complex problems into clean, efficient code.
              </motion.p>

              {/* CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
              >
                <motion.a 
                  href="#projects" 
                  className="btn-primary"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px hsl(var(--accent) / 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Projects
                  <ArrowDown size={18} />
                </motion.a>
                <motion.a 
                  href="/GauravPatrekarResume.pdf" 
                  download 
                  className="btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download size={18} />
                  Download Resume
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-center justify-center lg:justify-start gap-6"
              >
                {[
                  { href: "https://github.com/gauravpatrekar01", icon: Github, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/gaurav-patrekar-20470333a", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:gauravpatrekar01@gmail.com", icon: Mail, label: "Email" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto') ? undefined : "_blank"}
                    rel={social.href.startsWith('mailto') ? undefined : "noopener noreferrer"}
                    className="p-3 rounded-full bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    aria-label={social.label}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Right - Photo */}
            <motion.div 
              className="flex-shrink-0 order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
            >
              <div className="relative">
                {/* Decorative ring */}
                <motion.div 
                  className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Outer decorative border */}
                <motion.div 
                  className="absolute -inset-2 bg-gradient-to-br from-primary via-accent to-primary rounded-full opacity-30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Photo container */}
                <motion.div 
                  className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background shadow-elegant"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={gauravPhoto}
                    alt="Gaurav Patrekar - Computer Science Engineering Student"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>

                {/* Floating accent dots */}
                <motion.div 
                  className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full"
                  animate={{ 
                    y: [0, -15, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-4 h-4 bg-primary rounded-full"
                  animate={{ 
                    y: [0, 10, 0],
                    x: [0, 5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div 
                  className="absolute top-1/2 -right-6 w-3 h-3 bg-accent/60 rounded-full"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.a 
            href="#about" 
            className="flex flex-col items-center text-muted-foreground hover:text-accent transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm font-medium mb-2">Scroll</span>
            <ArrowDown size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
