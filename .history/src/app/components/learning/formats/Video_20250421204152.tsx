'use client';

import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones, faExpand, faPause, faPlay, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { VideoProps } from './types';
import styles from '../../../learning/learning.module.css';

export const Video: React.FC<VideoProps> = ({
  title,
  description,
  videoSrc,
  videoType,
  poster,
  audioSrc,
  speakText
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    let textToSpeak = speakText;
    if (!textToSpeak && description) {
      textToSpeak = Array.isArray(description) ? description.join(' ') : description;
    }

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

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
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

  // Render YouTube embed
  const renderYouTubeEmbed = () => {
    // Extract YouTube ID from URL if full URL is provided
    let youtubeId = videoSrc;
    if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
      const match = videoSrc.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      if (match && match[1]) {
        youtubeId = match[1];
      }
    }

    return (
      <div className={styles.videoWrapper}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        ></iframe>
      </div>
    );
  };

  // Render Vimeo embed
  const renderVimeoEmbed = () => {
    // Extract Vimeo ID from URL if full URL is provided
    let vimeoId = videoSrc;
    if (videoSrc.includes('vimeo.com')) {
      const match = videoSrc.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
      if (match && match[1]) {
        vimeoId = match[1];
      }
    }

    return (
      <div className={styles.videoWrapper}>
        <iframe
          width="100%"
          height="100%"
          src={`https://player.vimeo.com/video/${vimeoId}`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={title}
        ></iframe>
      </div>
    );
  };

  // Render local video file
  const renderLocalVideo = () => {
    return (
      <div className={styles.videoPlayerWrapper}>
        <video
          ref={videoRef}
          className={styles.videoPlayer}
          poster={poster}
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
        >
          <source src={videoSrc} type={`video/${videoSrc.split('.').pop()}`} />
          Your browser does not support the video tag.
        </video>
        
        <div className={styles.videoControls}>
          <button
            className={styles.videoControlButton}
            onClick={toggleVideoPlayback}
            aria-label={isVideoPlaying ? "Pause" : "Play"}
          >
            <FontAwesomeIcon icon={isVideoPlaying ? faPause : faPlay} />
          </button>
          
          <button
            className={styles.videoControlButton}
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
          </button>
          
          <button
            className={styles.videoControlButton}
            onClick={handleFullscreen}
            aria-label="Fullscreen"
          >
            <FontAwesomeIcon icon={faExpand} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.videoContainer}>
      {/* Description Section (if available) */}
      {description && (
        <div className={styles.videoDescription}>
          {Array.isArray(description) ? 
            description.map((p, i) => <p key={i}>{p}</p>) : 
            <p>{description}</p>
          }
          
          {(audioSrc || speakText) && (
            <button 
              className={`${styles.audioButton} ${isAudioPlaying ? styles.audioButtonPlaying : ''}`} 
              onClick={playAudio} 
              title={isAudioPlaying ? "Stop" : "Listen"}
            >
              <FontAwesomeIcon icon={faHeadphones} /> {isAudioPlaying ? "Listening..." : "Listen"}
            </button>
          )}
        </div>
      )}

      {/* Video Content */}
      <div className={styles.videoContent}>
        {videoType === 'youtube' && renderYouTubeEmbed()}
        {videoType === 'vimeo' && renderVimeoEmbed()}
        {videoType === 'file' && renderLocalVideo()}
      </div>
    </div>
  );
};

export default Video;