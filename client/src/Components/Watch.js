import React, { useEffect, useRef } from 'react';

export default function Watch() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function startVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
      }
    }

    startVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let stream = videoRef.current.srcObject;
        let tracks = stream.getTracks();

        tracks.forEach(function(track) {
          track.stop();
        });

        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <video ref={videoRef} autoPlay playsInline style={{ width: '60%', height: '60%' }} />
    </div>
  );
}
