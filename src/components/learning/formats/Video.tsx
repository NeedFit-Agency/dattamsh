'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faPlay, faPause, faExpand } from '@fortawesome/free-solid-svg-icons';
import { VideoProps } from './types';
import styles from '../../../learning/learning.module.css';

export const Video: React.FC<VideoProps> = ({
  title,
  description,
  videoSrc,
  videoType = 'video/mp4',
  poster,
  transcript,
  audioSrc,
  speakText
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    const textToSpeak = speakText || description;

    // Use speech synthesis
    if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const utterance = new SpeechSynthesisUtterance(textToSpeak[0]);
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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const toggleTranscript = () => {
    setShowTranscript(!showTranscript);
  };

  // Listen for video play/pause events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnd = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnd);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnd);
    };
  }, []);

  // Handle YouTube embed URLs
  const isYouTubeVideo = videoSrc && videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be');
  
  // Convert YouTube URL to embed format
  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';
    
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URL(url).searchParams;
      videoId = urlParams.get('v') || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    } else if (url.includes('youtube.com/embed/')) {
      return url; // Already in embed format
    }
    
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className={styles.videoContainer}>
      {/* Title (if provided) */}
      {title && <h3 className={styles.videoTitle}>{title}</h3>}
      
      {/* Description */}
      {description && (
        <div className={styles.videoDescription}>
          <p>{description}</p>
          
          {(audioSrc || speakText) && (
            <button 
              className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`} 
              onClick={playAudio}
            >
              <FontAwesomeIcon icon={faHeadphones} />
              {isAudioPlaying ? "Listening..." : "Listen"}
            </button>
          )}
        </div>
      )}
      
      {/* Video Player */}
      <div className={styles.videoPlayerContainer}>
        {isYouTubeVideo ? (
          <iframe
            className={styles.youtubePlayer}
            src={getYouTubeEmbedUrl(videoSrc)}
            title={title || "Video content"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className={styles.videoWrapper}>
            <video
              ref={videoRef}
              className={styles.videoPlayer}
              poster={poster}
              controls={false}
            >
              <source src={videoSrc} type={videoType} />
              Your browser does not support the video tag.
            </video>
            
            <div className={styles.videoControls}>
              <button className={styles.playPauseButton} onClick={togglePlay}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
              </button>
              
              <button className={styles.fullScreenButton} onClick={toggleFullScreen}>
                <FontAwesomeIcon icon={faExpand} />
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Transcript toggle button */}
      {transcript && (
        <div className={styles.transcriptContainer}>
          <button 
            className={styles.transcriptToggle} 
            onClick={toggleTranscript}
          >
            {showTranscript ? "Hide Transcript" : "Show Transcript"}
          </button>
          
          {showTranscript && (
            <div className={styles.transcript}>
              {Array.isArray(transcript) ? (
                transcript.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>{transcript}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Video;