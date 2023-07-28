import { useEffect, useState, useRef } from 'react';
import { Publisher } from 'openvidu-browser';

export const useStream = (publisher: Publisher | undefined) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize status states
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [micStatus, setMicStatus] = useState<boolean>(false);
  const [videoStatus, setVideoStatus] = useState<boolean>(false);

  useEffect(() => {
    if (publisher) {
      // Access the stream properties
      const audioActive = publisher.stream.audioActive;
      const videoActive = publisher.stream.videoActive;

      // Update the status states
      setMicStatus(audioActive);
      setVideoStatus(videoActive);
    } else {
      // If publisher is undefined, reset the status states
      setSpeaking(false);
      setMicStatus(false);
      setVideoStatus(false);
    }
  }, [publisher]);

  return {
    speaking,
    micStatus,
    videoStatus,
    videoRef,
  };
};
