'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useInteractionTracking } from '../../../hooks/useInteractionTracking';
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
  
  // Enhanced tracking with time spent tracking enabled
  const { 
    trackStart, 
    trackPause, 
    trackResume, 
    trackComplete, 
    trackError,
    startTimeTracking,
    stopTimeTracking
  } = useInteractionTracking({
    contentId: videoSrc || title,
    contentType: 'video',
    autoTrackView: true,
    trackTimeSpent: true
  });

  const playAudio = () => {
    // Stop current playback if any
    window.speechSynthesis?.cancel();

    if (isAudioPlaying) {
      setIsAudioPlaying(false);
      return;
    }

    let textToSpeak = speakText || description;

    // Use speech synthesis
    if (textToSpeak && typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        const utterance = new SpeechSynthesisUtterance(textToSpeak[0]);
        utterance.onstart = () => {
          setIsAudioPlaying(true);
          trackStart({ audioEnabled: true });
        };
        utterance.onend = () => {
          setIsAudioPlaying(false);
          trackComplete({ audioCompleted: true });
        };

        utterance.onerror = (e) => {
          console.error("SpeechSynthesis Error:", e);
          setIsAudioPlaying(false);
          trackError('audio_synthesis_error', { errorMessage: e.error });
        };
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.error("SpeechSynthesis failed:", e);
        setIsAudioPlaying(false);
        trackError('audio_synthesis_exception', { errorMessage: String(e) });
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

  // Import the interaction tracking hook
  const { trackInteraction } = useInteractionTracking({
    contentId: videoSrc,
    contentType: 'video',
    autoTrackView: true
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      trackStart({ currentTime: video.currentTime });
      startTimeTracking();
    };
    
    const handlePause = () => {
      setIsPlaying(false);
      trackPause({ currentTime: video.currentTime, duration: video.duration });
      stopTimeTracking();
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      trackComplete({ completed: true, duration: video.duration });
    };
    
    const handleError = () => {
      trackError('video_playback_error', { 
        videoSrc, 
        errorCode: video.error?.code,
        errorMessage: video.error?.message
      });
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      // Track final time spent when component unmounts
      stopTimeTracking();
    };
  }, [trackStart, trackPause, trackComplete, trackError, startTimeTracking, stopTimeTracking, videoSrc]);

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