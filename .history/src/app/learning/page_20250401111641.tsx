'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faArrowRight, 
  faGear, 
  faHeadphones,
  faCode,
  faBrain,
  faShieldAlt,
  faCloud,
  faLaptopCode,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import styles from './learning.module.css';

export default function LearningPage() {
  // State management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(10);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hearts, setHearts] = useState(5);
  const router = useRouter();
  
  // Learning content
  const learningContent = [
    {
      title: "Introduction to Tech Skills",
      description: "Welcome to tech skills learning! Technology is constantly evolving, and mastering these skills can open doors to exciting career opportunities. We'll start by exploring fundamental concepts in several tech domains to help you build a strong foundation for more advanced topics.",
      image: "tech-intro.png",
      audioText: "Welcome to tech skills learning! Let's explore the fundamentals of modern technology fields to build your knowledge foundation."
    },
    {
      title: "AI Fundamentals",
      description: "Artificial Intelligence is transforming how we live and work. AI systems can analyze data, learn from it, and make decisions or predictions. Machine Learning is a subset of AI that focuses on algorithms that improve through experience. Deep Learning uses neural networks to process complex patterns. Understanding these concepts is essential for anyone looking to work in modern tech.",
      image: "ai-basics.png",
      audioText: "Let's explore the fundamentals of Artificial Intelligence and how machine learning systems process data to make decisions."
    },
    {
      title: "Cybersecurity Essentials",
      description: "Cybersecurity focuses on protecting computer systems and networks from information disclosure, theft, or damage. Key concepts include encryption, authentication, and threat modeling. Security professionals need to understand both defensive techniques and how attackers think. As our digital footprint expands, cybersecurity becomes increasingly critical to businesses and individuals.",
      image: "cyber-security.png",
      audioText: "Cybersecurity is about protecting digital systems from threats. Let's learn about the essential concepts that keep our data safe."
    },
    {
      title: "Cloud Computing",
      description: "Cloud computing delivers computing services over the internet, including storage, databases, networking, and software. This model offers flexibility, scalability, and cost efficiency. Services are typically categorized as Infrastructure as a Service (IaaS), Platform as a Service (PaaS), or Software as a Service (SaaS). Understanding cloud models is crucial for modern application development.",
      image: "cloud-computing.png",
      audioText: "Cloud computing provides on-demand resources that power modern applications. Let's explore how cloud services work and why they're important."
    },
    {
      title: "Let's Practice!",
      description: "Excellent progress! You've learned about fundamental concepts in AI, Cybersecurity, and Cloud Computing. Now it's time to test your understanding with some practice exercises. Remember that technology skills require both theoretical knowledge and practical application, so don't worry if some concepts feel challenging at first – regular practice is the key to mastery!",
      image: "practice.png",
      audioText: "Great job learning these important tech concepts! Now let's practice what you've learned with some exercises."
    }
  ];

  // Functions
  const totalSlides = learningContent.length;
  const currentContent = learningContent[currentSlide];
  
  const handleBackClick = () => {
    if (currentSlide > 0) {
      setShowExitConfirm(true);
    } else {
      router.push('/');
    }
  };

  const handleConfirmExit = () => {
    router.push('/');
  };

  const handleCancelExit = () => {
    setShowExitConfirm(false);
  };

  const handleContinue = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
      const newProgress = Math.min(progress + (100 / totalSlides), 100);
      setProgress(newProgress);
    } else {
      router.push('/quiz');
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      const newProgress = Math.max(progress - (100 / totalSlides), 10);
      setProgress(newProgress);
    }
  };

  // Speech function
  const speakExplanation = () => {
    if (typeof window !== 'undefined') {
      setIsPlaying(true);
      const speech = new SpeechSynthesisUtterance();
      speech.text = currentContent.audioText;
      speech.volume = 1;
      speech.rate = 0.9;
      speech.pitch = 1;
      speech.onend = () => {
        setIsPlaying(false);
      };
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Add this effect to handle slide transitions
  useEffect(() => {
    // Create animation for slide changes
    const mainElement = document.querySelector(`.${styles.learningMain}`);
    if (mainElement) {
      mainElement.classList.remove(styles.slideAnimation);
      void mainElement.offsetWidth; // Trigger reflow
      mainElement.classList.add(styles.slideAnimation);
    }
  }, [currentSlide]);

  // Render hearts based on count
  const renderHearts = () => {
    const heartsArray = [];
    for (let i = 0; i < 5; i++) {
      heartsArray.push(
        <FontAwesomeIcon 
          key={i} 
          icon={faHeart} 
          style={{ opacity: i < hearts ? 1 : 0.4 }}
        />
      );
    }
    return heartsArray;
  };

  const getIconForSlide = (title: string) => {
    switch(title) {
      case "Introduction to Tech Skills": return faCode;
      case "AI Fundamentals": return faBrain;
      case "Cybersecurity Essentials": return faShieldAlt;
      case "Cloud Computing": return faCloud;
      case "Let's Practice!": return faLaptopCode;
      default: return faCode;
    }
  };

  return (
    <div className={styles.learningContainer}>
      {/* Left panel */}
      <div className={styles.sidePanel + ' ' + styles.leftPanel}>
        <div className={styles.glassPanel}>
          <div className={styles.letterShowcase}>
            {["</>", "🤖", "🔒", "☁️", "📝"].map((symbol, index) => (
              <div 
                key={index}
                className={index === currentSlide ? styles.letterItemActive : styles.letterItem}
                onClick={() => index <= currentSlide && setCurrentSlide(index)}
              >
                {symbol}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.learningContent}>
        <header className={styles.learningHeader}>
          <div className={styles.headerNavigation}>
            <button className={styles.backButton} onClick={handleBackClick}>
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className={styles.backText}>Home</span>
            </button>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{width: `${progress}%`}}></div>
            </div>
            <div className={styles.headerActions}>
              <div className={styles.heartsContainer}>
                {renderHearts()}
              </div>
              <div className={styles.slideCounter}>
                <span>{currentSlide + 1}</span>/<span>{totalSlides}</span>
              </div>
              <button className={styles.settingsButton}>
                <FontAwesomeIcon icon={faGear} />
              </button>
            </div>
          </div>
        </header>

        <main className={styles.learningMain}>
          <h1 className={styles.lessonTitle}>{currentContent.title}</h1>

          <div className={styles.learningArea}>
            <div className={styles.contentColumns}>
              <div className={styles.leftColumn}>
                {currentContent.image ? (
                  <div className={styles.imageContainer}>
                    <img 
                      src={`/${currentContent.image}`} 
                      alt={currentContent.title} 
                      className={styles.lessonImage}
                    />
                  </div>
                ) : (
                  <div className={styles.techIcon}>
                    <FontAwesomeIcon icon={getIconForSlide(currentContent.title)} />
                  </div>
                )}
              </div>
              
              <div className={styles.rightColumn}>
                <div className={styles.explanationBox}>
                  <div className={styles.mascotContainer}>
                    <div className={`${styles.mascotSpeechBubble} ${styles.scrollable}`}>
                      <p>{currentContent.description}</p>
                    </div>
                    <div className={styles.mascot}>
                      <img src="/owl-bird.png" alt="Tech Learning Owl" className={styles.mascotImage} />
                    </div>
                  </div>

                  <button 
                    className={`${styles.audioExplanationButton} ${isPlaying ? styles.playing : ''}`}
                    onClick={speakExplanation}
                    disabled={isPlaying}
                  >
                    <FontAwesomeIcon icon={faHeadphones} />
                    Listen to Explanation
                  </button>
                </div>

                {currentContent.title === "AI Fundamentals" && (
                  <div className={styles.examplesBox}>
                    <h3>Example Applications</h3>
                    <div className={styles.exampleItem}>
                      <div className={styles.exampleWord}>Predictive Analytics</div>
                      <div className={styles.exampleTranslation}>Forecasting trends based on historical data</div>
                    </div>
                  </div>
                )}
                {currentContent.title === "Cybersecurity Essentials" && (
                  <div className={styles.examplesBox}>
                    <h3>Example Techniques</h3>
                    <div className={styles.exampleItem}>
                      <div className={styles.exampleWord}>Two-Factor Authentication</div>
                      <div className={styles.exampleTranslation}>Adding an extra security layer beyond passwords</div>
                    </div>
                  </div>
                )}
                {currentContent.title === "Cloud Computing" && (
                  <div className={styles.examplesBox}>
                    <h3>Example Services</h3>
                    <div className={styles.exampleItem}>
                      <div className={styles.exampleWord}>AWS Lambda</div>
                      <div className={styles.exampleTranslation}>Serverless computing service</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <footer className={styles.learningFooter}>
          <button 
            className={styles.previousButton} 
            onClick={handlePrevious}
            disabled={currentSlide === 0}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Previous
          </button>
          <button className={styles.continueButton} onClick={handleContinue}>
            {currentSlide < totalSlides - 1 ? 'Continue' : 'Start Practice'}
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </footer>
      </div>

      {/* Right panel */}
      <div className={styles.sidePanel + ' ' + styles.rightPanel}>
        <div className={styles.glassPanel}>
          <div className={styles.progressIndicator}>
            {learningContent.map((_, index) => (
              <div 
                key={index} 
                className={
                  index === currentSlide 
                    ? styles.progressPillActive 
                    : index < currentSlide 
                      ? styles.progressPillCompleted 
                      : styles.progressPill
                }
                onClick={() => index <= currentSlide && setCurrentSlide(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Exit Lesson?</h2>
            <p>Your progress in this lesson will be lost.</p>
            <div className={styles.modalButtons}>
              <button className={styles.modalCancel} onClick={handleCancelExit}>
                Cancel
              </button>
              <button className={styles.modalConfirm} onClick={handleConfirmExit}>
                Exit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}