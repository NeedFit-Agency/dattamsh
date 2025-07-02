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
  faPuzzlePiece,  faBook,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
import styles from './landing.module.css';

export default function LandingPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  return (
    <div className={styles.landingWrapper} ref={ref}>
      <header className={styles.landingHeader}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>Binary Brains</div>
          <nav className={styles.headerNav}>
            <Link href="#features" className={styles.headerLink}>Features</Link>
            <Link href="#testimonials" className={styles.headerLink}>Testimonials</Link>
            <Link href="#about" className={styles.headerLink}>About Us</Link>
            <Link href="/home" className={styles.ctaButton}>Get Started</Link>
          </nav>
        </div>
      </header>
      
      <section className={styles.hero}>
        <div className={styles.parallaxContainer}>
          <motion.div 
            className={styles.parallaxLayer}
            style={{ y: y1 }}
          >
            <div className={styles.parallaxShape1}></div>
          </motion.div>
          <motion.div 
            className={styles.parallaxLayer}
            style={{ y: y2 }}
          >
            <div className={styles.parallaxShape2}></div>
          </motion.div>
          <motion.div 
            className={styles.parallaxLayer}
            style={{ y: y3 }}
          >
            <div className={styles.parallaxShape3}></div>
          </motion.div>
        </div>
        
        <motion.div 
          className={`${styles.decorationIcon} ${styles.decorationIcon1}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <FontAwesomeIcon icon={faBrain} />
        </motion.div>
        <motion.div 
          className={`${styles.decorationIcon} ${styles.decorationIcon2}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <FontAwesomeIcon icon={faGraduationCap} />
        </motion.div>
        <motion.div 
          className={`${styles.decorationIcon} ${styles.decorationIcon3}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <FontAwesomeIcon icon={faAward} />
        </motion.div>
        <motion.div 
          className={`${styles.decorationIcon} ${styles.decorationIcon4}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <FontAwesomeIcon icon={faCode} />
        </motion.div>
        
        <div className={styles.heroInner}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className={styles.heroTitle}>Begin Your Digital Learning Adventure</h1>
            <p className={styles.heroSubtitle}>
              A fun, interactive platform that transforms standard computer education into an 
              engaging journey for students of all ages. Master essential digital skills with 
              our step-by-step approach.
            </p>
            <div className={styles.heroCta}>
              <Link href="/home" className={styles.ctaButton}>
                Start Learning Now
              </Link>
              <Link href="#features" className={styles.secondaryCta}>
                Learn More
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.heroImage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className={styles.splineFullHero}>
              <iframe 
                src="https://my.spline.design/genkubgreetingrobot-g9XhUJ4JKrYmgSia0lfFllkT/" 
                width="100%" 
                height="100%" 
                style={{ display: 'block', width: '100%', height: '100%', border: 'none', background: 'transparent' }}
                allowFullScreen
                title="robot"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
      
      <section id="features" className={styles.features}>
        <div className={styles.shapeWaveTop}></div>
        <div className={styles.featuresInner}>
          <motion.h2 
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
          
          <div className={styles.featureGrid}>
            {[
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
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className={styles.featureCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className={styles.featureIcon}>
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="testimonials" className={styles.testimonials}>
        <div className={styles.shapeWaveBottom}></div>
        <div className={styles.testimonialsInner}>
          <motion.h2 
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
          
          <div className={styles.testimonialCards}>
            {[
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
                quote: "As a parent, I appreciate how the platform makes technology education accessible and engaging. My child&apos;s confidence with computers has improved tremendously.",
                name: "Priya M.",
                role: "Parent"
              },
              {
                quote: "The curriculum aligns perfectly with our school standards. It&apos;s an excellent resource that supplements our classroom teaching.",
                name: "Robert J.",
                role: "Elementary School Teacher"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index} 
                className={styles.testimonialCard}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <p className={styles.testimonialQuote}>&quot;{testimonial.quote}&quot;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className={styles.testimonialInfo}>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className={styles.shapeWaveTop}></div>
      </section>
      
      <section id="cta" className={styles.callToAction}>
        <div className={styles.ctaInner}>
          <motion.h2 
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
            <Link href="/home" className={styles.ctaBigButton}>
              Begin Learning Now
            </Link>
          </motion.div>
        </div>
      </section>
      
      <footer className={styles.footer}>
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
              &copy; {new Date().getFullYear()} Binary Brains. All rights reserved.
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
            </div>            <div className={styles.footerSocial}>
              <Link href="#" className={styles.socialIcon}>
                <FontAwesomeIcon icon={faEnvelope} />
              </Link>
              <Link href="#" className={styles.socialIcon}>
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
              <Link href="#" className={styles.socialIcon}>
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
              <Link href="#" className={styles.socialIcon}>
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
              <Link href="#" className={styles.socialIcon}>
                <FontAwesomeIcon icon={faLinkedin} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
