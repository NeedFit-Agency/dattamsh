'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeadphones, 
  faArrowLeft, 
  faArrowRight, 
  faShield, 
  faGem, 
  faHeart, 
  faCog,
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faExpand
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './video.module.css';

export interface KeyPoint {
  text: string;
}

export interface VideoProps {
  title: string;
  videoSrc?: string;
  videoType?: 'youtube' | 'vimeo' | 'mp4' | 'placeholder';
  youtubeId?: string;
  vimeoId?: string;
  mascotImage?: string | React.ReactNode;
  mascotTitle?: string;
  keyPoints?: KeyPoint[];
  audioContent?: string;
  progress?: number;
  hearts?: number;
  gems?: number;
  shields?: number;
  onComplete?: () => void;
  onBack?: () => void;
}

const Video: React.FC<VideoProps> = ({
  title,
  videoSrc,
  videoType = 'placeholder',
  youtubeId,
  vimeoId,
  mascotImage = '🤖',
  mascotTitle = 'Watch Out For:',
  keyPoints = [],
  audioContent,
  progress = 55,
  hearts = 3,
  gems = 234,
  shields = 1,
  onComplete,
  onBack
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * duration;
    }
  };

  const handlePrevious = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    // Create text to speak from key points
    const textToSpeak = audioContent || 
      (keyPoints && keyPoints.length > 0 ? 
        `${mascotTitle} ${keyPoints.map(point => point.text).join('. ')}` : 
        title);

    // Use speech synthesis
    if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.onstart = () => setIsAudioPlaying(true);
        utterance.onend = () => setIsAudioPlaying(false);

        utterance.onerror = (e) => {
          console.error("SpeechSynthesis Error:", e);
          setIsAudioPlaying(false);
        };
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.error("SpeechSynthesis failed:", e);
        setIsAudioPlaying(false);
      }
    } else {
      setIsAudioPlaying(false);
    }
  };

  const renderVideoPlayer = () => {
    switch (videoType) {
      case 'youtube':
        return youtubeId ? (
          <iframe 
            src={`https://www.youtube.com/embed/${youtubeId}`} 
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className={styles.videoPlaceholderText}>YouTube Video Unavailable</div>
        );
        
      case 'vimeo':
        return vimeoId ? (
          <iframe 
            src={`https://player.vimeo.com/video/${vimeoId}`} 
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className={styles.videoPlaceholderText}>Vimeo Video Unavailable</div>
        );
        
      case 'mp4':
        return videoSrc ? (
          <>
            <video
              ref={videoRef}
              src={videoSrc}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
            <div className={styles.videoControls}>
              <div className={styles.controlsLeft}>
                <button className={styles.controlButton} onClick={handlePlayPause}>
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <button className={styles.controlButton} onClick={handleMute}>
                  <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
                </button>
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
              <div className={styles.progressTrack} onClick={handleProgressClick}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className={styles.controlsRight}>
                <button className={styles.controlButton} onClick={handleFullscreen}>
                  <FontAwesomeIcon icon={faExpand} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.videoPlaceholderText}>Video Unavailable</div>
        );
        
      case 'placeholder':
      default:
        return (
          <div className={styles.videoPlaceholderText}>▶️ <br/> Video Plays Here</div>
        );
    }
  };

  return (
    <div className={styles.mainContainer}>

      {/* Content */}
      <div className={styles.contentWrapper}>
        <div className={styles.navigationHeader}>
          <a className={styles.backArrow} onClick={handlePrevious}>←</a>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <motion.h1 
          className={styles.contentTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>

        <motion.div 
          className={styles.videoSplitLayout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className={styles.videoArea}>
            <div className={styles.videoPlayerContainer}>
              {renderVideoPlayer()}
            </div>
          </div>

          <div className={styles.infoArea}>
            <div className={styles.mascotInteraction}>
              <div className={styles.mascotImage}>
                {typeof mascotImage === 'string' ? mascotImage : mascotImage}
              </div>
              <div className={styles.mascotSpeech}>
                <div className={styles.speechTitle}>{mascotTitle}</div>
                {keyPoints && keyPoints.length > 0 && (
                  <div className={styles.speechPoints}>
                    <ul>
                      {keyPoints.map((point, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (index * 0.1), duration: 0.3 }}
                        >
                          {point.text}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
                <button 
                  className={`${styles.listenButton} ${isAudioPlaying ? styles.listenButtonPlaying : ''}`} 
                  onClick={playAudio}
                >
                  <FontAwesomeIcon icon={faHeadphones} /> {isAudioPlaying ? 'Listening...' : 'Listen'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Video;