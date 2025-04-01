import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/learning_style.css';

function LearningPage() {
  // State management remains the same
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(10);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hearts, setHearts] = useState(5);
  const navigate = useNavigate();
  
  // Learning content updated for tech skills
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

  // Functions remain the same
  const totalSlides = learningContent.length;
  const currentContent = learningContent[currentSlide];
  
  const handleBackClick = () => {
    if (currentSlide > 0) {
      setShowExitConfirm(true);
    } else {
      navigate('/');
    }
  };

  const handleConfirmExit = () => {
    navigate('/');
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
      navigate('/exercise');
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      const newProgress = Math.max(progress - (100 / totalSlides), 10);
      setProgress(newProgress);
    }
  };

  // Speech function remains the same
  const speakExplanation = () => {
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
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Render hearts based on count
  const renderHearts = () => {
    const heartsArray = [];
    for (let i = 0; i < 5; i++) {
      heartsArray.push(
        <i 
          key={i} 
          className={`fa-${i < hearts ? 'solid' : 'regular'} fa-heart`}
        ></i>
      );
    }
    return heartsArray;
  };

  return (
    <div className="learning-container">
      {/* Modernized left panel */}
      <div className="side-panel left-panel">
        <div className="glass-panel">
          <div className="letter-showcase">
            {["</>", "🤖", "🔒", "☁️", "📝"].map((symbol, index) => (
              <div 
                key={index}
                className={`letter-item ${index === currentSlide ? 'active' : ''}`}
              >
                {symbol}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="learning-content">
        <header className="learning-header">
          <div className="header-navigation">
            <button className="back-button" onClick={handleBackClick}>
              <i className="fa-solid fa-arrow-left"></i>
              <span className="back-text">Home</span>
            </button>
            <div className="progress-bar">
              <div className="progress-fill" style={{width: `${progress}%`}}></div>
            </div>
            <div className="header-actions">
              {/* Simple hearts display that will definitely show up */}
              <div className="hearts-display">
                <span style={{ color: '#ff4b4b', marginRight: '5px' }}>❤️</span>
                <span style={{ fontWeight: 'bold', color: '#333' }}>{hearts}</span>
              </div>
              <div className="slide-counter">
                <span>{currentSlide + 1}</span>/<span>{totalSlides}</span>
              </div>
              <button className="settings-button">
                <i className="fa-solid fa-gear"></i>
              </button>
            </div>
          </div>
        </header>

        <main className="learning-main">
          <h1 className="lesson-title">{currentContent.title}</h1>

          <div className="learning-area">
            <div className="content-columns">
              <div className="left-column">
                {currentContent.image ? (
                  <div className="image-container">
                    <img src={`/${currentContent.image}`} alt={currentContent.title} className="lesson-image" />
                  </div>
                ) : (
                  <div className="tech-icon-container">
                    {currentContent.title === "Introduction to Tech Skills" && <div className="tech-icon"><i className="fa-solid fa-code"></i></div>}
                    {currentContent.title === "AI Fundamentals" && <div className="tech-icon"><i className="fa-solid fa-brain"></i></div>}
                    {currentContent.title === "Cybersecurity Essentials" && <div className="tech-icon"><i className="fa-solid fa-shield-alt"></i></div>}
                    {currentContent.title === "Cloud Computing" && <div className="tech-icon"><i className="fa-solid fa-cloud"></i></div>}
                    {currentContent.title === "Let's Practice!" && <div className="tech-icon"><i className="fa-solid fa-laptop-code"></i></div>}
                  </div>
                )}
              </div>
              
              <div className="right-column">
                <div className="explanation-box">
                  <div className="mascot-container">
                    <div className="mascot-speech-bubble scrollable">
                      <p>{currentContent.description}</p>
                    </div>
                    <div className="mascot">
                      <img src="./public/owl-bird.png" alt="Tech Learning Owl" className="mascot-image" />
                    </div>
                  </div>

                  <button 
                    className={`audio-explanation-button ${isPlaying ? 'playing' : ''}`}
                    onClick={speakExplanation}
                    disabled={isPlaying}
                  >
                    <i className="fa-solid fa-headphones"></i>
                    Listen to Explanation
                  </button>
                </div>

                {currentContent.title === "AI Fundamentals" && (
                  <div className="examples-box">
                    <h3>Example Applications</h3>
                    <div className="example-item">
                      <div className="example-word">Predictive Analytics</div>
                      <div className="example-translation">Forecasting trends based on historical data</div>
                    </div>
                  </div>
                )}
                {currentContent.title === "Cybersecurity Essentials" && (
                  <div className="examples-box">
                    <h3>Example Techniques</h3>
                    <div className="example-item">
                      <div className="example-word">Two-Factor Authentication</div>
                      <div className="example-translation">Adding an extra security layer beyond passwords</div>
                    </div>
                  </div>
                )}
                {currentContent.title === "Cloud Computing" && (
                  <div className="examples-box">
                    <h3>Example Services</h3>
                    <div className="example-item">
                      <div className="example-word">AWS Lambda</div>
                      <div className="example-translation">Serverless computing service</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <footer className="learning-footer">
          <button 
            className="previous-button" 
            onClick={handlePrevious}
            disabled={currentSlide === 0}
          >
            <i className="fa-solid fa-arrow-left"></i>
            Previous
          </button>
          <button className="continue-button" onClick={handleContinue}>
            {currentSlide < totalSlides - 1 ? 'Continue' : 'Start Practice'}
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </footer>
      </div>

      {/* Modernized right panel */}
      <div className="side-panel right-panel">
        <div className="glass-panel">
          <div className="progress-indicator">
            {learningContent.map((_, index) => (
              <div 
                key={index} 
                className={`progress-pill ${index === currentSlide ? 'active' : ''} ${index < currentSlide ? 'completed' : ''}`}
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
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Exit Lesson?</h2>
            <p>Your progress in this lesson will be lost.</p>
            <div className="modal-buttons">
              <button className="modal-cancel" onClick={handleCancelExit}>
                Cancel
              </button>
              <button className="modal-confirm" onClick={handleConfirmExit}>
                Exit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LearningPage;