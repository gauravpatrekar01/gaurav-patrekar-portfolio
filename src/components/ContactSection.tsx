import { useState } from 'react';
import { Mail, Github, Linkedin, Send, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Message Sent!',
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactLinks = [
    {
      href: "mailto:gauravpatrekar01@gmail.com",
      icon: Mail,
      label: "Email",
      value: "gauravpatrekar01@gmail.com",
      external: false,
    },
    {
      href: "https://github.com/gauravpatrekar01",
      icon: Github,
      label: "GitHub",
      value: "github.com/gauravpatrekar01",
      external: true,
    },
    {
      href: "https://www.linkedin.com/in/gaurav-patrekar-20470333a",
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/gaurav-patrekar",
      external: true,
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="section-container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent font-medium tracking-wide mb-3">Contact</p>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-semibold text-foreground mb-4">Let's Connect</h3>
              <p className="text-muted-foreground">
                I'm always open to discussing new projects, creative ideas, or opportunities 
                to be part of your vision. Feel free to reach out through any of the channels below.
              </p>
            </motion.div>

            <motion.div className="space-y-4" variants={containerVariants}>
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 8,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center group-hover:bg-accent transition-colors"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <link.icon className="w-5 h-5 text-primary-foreground" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground">{link.label}</p>
                    <p className="font-medium text-foreground">{link.value}</p>
                  </div>
                </motion.a>
              ))}

              <motion.div 
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50"
                variants={itemVariants}
              >
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium text-foreground">Kolhapur, Maharashtra, India</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="card-base"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ boxShadow: "var(--shadow-card-hover)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="John Doe"
                  whileFocus={{ scale: 1.01 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="john@example.com"
                  whileFocus={{ scale: 1.01 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
                  placeholder="Tell me about your project or idea..."
                  whileFocus={{ scale: 1.01 }}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-accent w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px hsl(var(--accent) / 0.4)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                {isSubmitting ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Sending...
                  </motion.span>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
