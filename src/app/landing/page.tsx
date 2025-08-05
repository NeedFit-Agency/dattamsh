'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLaptopCode, 
  faRobot, 
  faCode,
  faBrain,
  faGraduationCap,
  faAward,
  faChalkboardTeacher,
  faGamepad,
  faPuzzlePiece,  
  faBook,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './landing.module.css';

export default function LandingPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
  const features = [
    {
      icon: faLaptopCode,
      title: "Progressive Learning Path",
      description: "Step-by-step lessons organized by grade level, ensuring students build a solid foundation before advancing to more complex topics."
    },
    {
      icon: faGamepad,
      title: "Interactive Exercises",
      description: "Learn by doing with hands-on activities that reinforce concepts and make learning engaging and fun."
    },
    {
      icon: faPuzzlePiece,
      title: "Skill-Building Quizzes",
      description: "Test your knowledge with our adaptive quizzes that help identify areas for improvement."
    },
    {
      icon: faChalkboardTeacher,
      title: "Visual Learning",
      description: "Colorful illustrations and animations help visualize complex concepts for better understanding and retention."
    },
    {
      icon: faRobot,
      title: "Technology Fundamentals",
      description: "From basic computer operations to more advanced concepts, we cover all aspects of modern technology education."
    },
    {
      icon: faBook,
      title: "Curriculum Aligned",
      description: "Our content is carefully crafted to align with standard educational requirements and learning objectives."
    }
  ];

  const testimonials = [
    {
      quote: "Binary Brains made learning about computers fun! I used to find computer classes boring, but now I look forward to completing new lessons every day.",
      name: "Mia P.",
      role: "3rd Grade Student"
    },
    {
      quote: "The interactive lessons helped me understand complex concepts much better than my textbooks. The quizzes are challenging but rewarding!",
      name: "Samuel K.",
      role: "5th Grade Student"
    },
    {
      quote: "As a parent, I appreciate how the platform makes technology education accessible and engaging. My child's confidence with computers has improved tremendously.",
      name: "Priya M.",
      role: "Parent"
    },
    {
      quote: "The curriculum aligns perfectly with our school standards. It's an excellent resource that supplements our classroom teaching.",
      name: "Robert J.",
      role: "Elementary School Teacher"
    }
  ];
  
  return (
    <div className={styles.landingWrapper} ref={ref}>
      {/* Header */}
      <header className={styles.landingHeader} role="banner">
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo} aria-label="Binary Brains Home">
            Binary Brains
          </Link>
          <nav className={styles.headerNav} role="navigation" aria-label="Main navigation">
            <Link href="#features" className={styles.headerLink}>Features</Link>
            <Link href="#testimonials" className={styles.headerLink}>Testimonials</Link>
            <Link href="#about" className={styles.headerLink}>About Us</Link>
            <Link href="/home" className={styles.ctaButton} aria-label="Get started with learning">
              Get Started
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className={styles.hero} role="banner" aria-labelledby="hero-title">
        {/* Parallax Background */}
        <div className={styles.parallaxContainer} aria-hidden="true">
          <motion.div 
            className={styles.parallaxLayer}
            style={{ y: y1 }}
          >
            <div className={styles.parallaxShape1}></div>
          </motion.div>
        </div>
        
        <div className={styles.heroInner}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 id="hero-title" className={styles.heroTitle}>
              Begin Your Digital Learning Adventure
            </h1>
            <p className={styles.heroSubtitle}>
              A fun, interactive platform that transforms standard computer education into an 
              engaging journey for students of all ages. Master essential digital skills with 
              our step-by-step approach.
            </p>
            <div className={styles.heroCta}>
              <Link href="/home" className={styles.ctaButton} aria-label="Start learning now">
                Start Learning Now
              </Link>
              <Link href="#features" className={styles.secondaryCta} aria-label="Learn more about features">
                Learn More
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className={styles.heroImage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            aria-hidden="true"
          >
            <div className={styles.splineFullHero}>
              <DotLottieReact
                src="https://lottie.host/69da7b5e-d8bd-417f-a60a-62a7756c44b0/X3FZYhFXwX.lottie"
                loop
                autoplay
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className={styles.features} aria-labelledby="features-title">
        <div className={styles.shapeWaveTop} aria-hidden="true"></div>
        <div className={styles.featuresInner}>
          <motion.h2 
            id="features-title"
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Everything You Need to Learn
          </motion.h2>
          <motion.p 
            className={styles.sectionSubtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Our comprehensive platform provides a complete educational journey with features designed to engage and educate students of all levels.
          </motion.p>
          
          <div className={styles.featureGrid} role="list">
            {features.map((feature, index) => (
              <motion.article 
                key={index} 
                className={styles.featureCard}
                role="listitem"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className={styles.featureIcon} aria-hidden="true">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className={styles.testimonials} aria-labelledby="testimonials-title">
        <div className={styles.shapeWaveBottom} aria-hidden="true"></div>
        <div className={styles.testimonialsInner}>
          <motion.h2 
            id="testimonials-title"
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            What Our Students Say
          </motion.h2>
          <motion.p 
            className={styles.sectionSubtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Don&apos;t just take our word for it. Hear from students who have experienced the Binary Brains difference.
          </motion.p>
          
          <div className={styles.testimonialCards} role="list">
            {testimonials.map((testimonial, index) => (
              <motion.blockquote 
                key={index} 
                className={styles.testimonialCard}
                role="listitem"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <p className={styles.testimonialQuote}>&quot;{testimonial.quote}&quot;</p>
                <footer className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar} aria-hidden="true">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className={styles.testimonialInfo}>
                    <cite>{testimonial.name}</cite>
                    <p>{testimonial.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
        <div className={styles.shapeWaveTop} aria-hidden="true"></div>
      </section>
      
      {/* Call to Action Section */}
      <section id="cta" className={styles.callToAction} aria-labelledby="cta-title">
        <div className={styles.ctaInner}>
          <motion.h2 
            id="cta-title"
            className={styles.ctaTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Ready to Begin Your Journey?
          </motion.h2>
          <motion.p 
            className={styles.ctaDescription}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Join thousands of students who are building essential digital skills for the future. Start with our carefully crafted learning path today!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Link href="/home" className={styles.ctaBigButton} aria-label="Begin learning now">
              Begin Learning Now
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className={styles.footer} role="contentinfo">
        <div className={styles.footerInner}>
          <div className={styles.footerGrid}>
            <div className={styles.footerColumn}>
              <h4>Platform</h4>
              <ul className={styles.footerLinks}>
                <li><Link href="/home">Home</Link></li>
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#testimonials">Testimonials</Link></li>
                <li><Link href="#about">About Us</Link></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Resources</h4>
              <ul className={styles.footerLinks}>
                <li><Link href="#">Help Center</Link></li>
                <li><Link href="#">Tutorials</Link></li>
                <li><Link href="#">Parents Guide</Link></li>
                <li><Link href="#">Teacher Resources</Link></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Legal</h4>
              <ul className={styles.footerLinks}>
                <li><Link href="#">Privacy Policy</Link></li>
                <li><Link href="#">Terms of Service</Link></li>
                <li><Link href="#">Cookie Policy</Link></li>
              </ul>
            </div>
            <div className={styles.footerColumn}>
              <h4>Contact</h4>
              <ul className={styles.footerLinks}>
                <li><Link href="#">Contact Us</Link></li>
                <li><Link href="#">Support</Link></li>
                <li><Link href="#">Feedback</Link></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <div className={styles.footerLogo}>Binary Brains</div>
            <div className={styles.footerCopyright}>
              <p>&copy; {new Date().getFullYear()} Binary Brains. All rights reserved.</p>
              <div className={styles.poweredBy}>
                <span>Powered by</span>
                <div className={styles.footerLogoGroup}>
                  <Image 
                    src="/images/periwinkle-logo.png" 
                    alt="Periwinkle" 
                    width={90} 
                    height={36}
                    className={styles.footerCompanyLogo}
                  />
                  <Image 
                    src="/images/dattamsh-logo.png" 
                    alt="DATTAMSH" 
                    width={90} 
                    height={36}
                    className={styles.footerCompanyLogo}
                  />
                </div>
              </div>
              <div className={styles.madeBy}>
                <span>Made by</span>
                <Link 
                  href="https://needfit.agency" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.needfitLink}
                >
                  Needfit Agency
                </Link>
              </div>
            </div>
            <nav className={styles.footerSocial} aria-label="Social media links">
              <Link href="#" className={styles.socialIcon} aria-label="Email us">
                <FontAwesomeIcon icon={faEnvelope} />
              </Link>
              <Link href="#" className={styles.socialIcon} aria-label="Follow us on Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
              <Link href="#" className={styles.socialIcon} aria-label="Follow us on Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
              <Link href="#" className={styles.socialIcon} aria-label="Follow us on Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
              <Link href="#" className={styles.socialIcon} aria-label="Follow us on LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
