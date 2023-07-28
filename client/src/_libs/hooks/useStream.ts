import { useEffect, useState, useRef } from 'react';
import { Publisher } from 'openvidu-browser';

export function useStream(publisher: Publisher | undefined) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [speaking, setSpeaking] = useState<boolean>(false);
  const [micStatus, setMicStatus] = useState<boolean>(false);
  const [videoStatus, setVideoStatus] = useState<boolean>(false);

  useEffect(() => {
    if (publisher) {
      const audioActive = publisher.stream.audioActive;
      const videoActive = publisher.stream.videoActive;
      setMicStatus(audioActive);
      setVideoStatus(videoActive);
    } else {
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
}
