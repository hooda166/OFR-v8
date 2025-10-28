import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoBackgroundProps {
  videoSrc: string;
  posterSrc?: string;
  className?: string;
  enableControls?: boolean;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  posterSrc,
  className = '',
  enableControls = true
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [userPrefersReducedMotion, setUserPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setUserPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setUserPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      setHasError(false);
      if (!userPrefersReducedMotion) {
        video.play().catch(() => {
          console.error('Video autoplay failed');
          setHasError(true);
        });
      }
    };

    const handleCanPlay = () => {
      setIsLoaded(true);
      setHasError(false);
    };

    const handleLoadStart = () => {
      console.log('Video loading started');
    };
    const handleError = () => {
      console.error('Video loading error');
      setHasError(true);
      setIsLoaded(false);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [userPrefersReducedMotion]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {
        setHasError(true);
      });
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  if (hasError) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <img
          src="/Assets/hero-image.png"
          alt="Fiber optic technology background"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80';
          }}
        />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
        autoPlay={!userPrefersReducedMotion}
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        poster={posterSrc || "/Assets/hero-image.png"}
        aria-label="Background video showing fiber optic technology"
        style={{
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
        }}
        onError={() => {
          setHasError(true);
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading Overlay */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/Assets/hero-image.png"
            alt="Loading background"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80';
            }}
          />
          <div className="relative z-10 animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      {/* Accessibility Controls */}
      {enableControls && isLoaded && !hasError && (
        <div className="absolute bottom-4 right-4 z-20 flex space-x-2">
          <button
            onClick={togglePlayPause}
            className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            title={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </button>
          
          <button
            onClick={toggleMute}
            className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-200 backdrop-blur-sm"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            title={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
        </div>
      )}

      {/* Reduced Motion Message */}
      {userPrefersReducedMotion && (
        <div className="absolute top-4 left-4 z-20 bg-black/70 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm">
          Video paused due to motion preference
        </div>
      )}
    </div>
  );
};

export default VideoBackground;