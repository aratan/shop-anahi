import { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import VideoControls from './video/VideoControls';
import { useWebRTC } from './video/useWebRTC';

interface VideoConferenceProps {
  roomName: string;
}

const VideoConference = ({ roomName }: VideoConferenceProps) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { streamRef } = useWebRTC(roomName);

  const toggleCamera = async () => {
    try {
      if (!isCameraOn) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
        setIsCameraOn(true);
      } else {
        if (streamRef.current) {
          streamRef.current.getVideoTracks().forEach(track => track.stop());
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
        setIsCameraOn(false);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const toggleMic = async () => {
    try {
      if (!isMicOn) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        setIsMicOn(true);
      } else {
        if (streamRef.current) {
          streamRef.current.getAudioTracks().forEach(track => track.stop());
        }
        setIsMicOn(false);
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  return (
    <Card className="glass-panel h-[600px] flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Video Conference - {roomName}</h3>
      </div>

      <div className="flex-1 bg-black/10 relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        <div id="remote-videos" className="absolute inset-0 grid grid-cols-2 gap-2 p-2">
          {/* Los videos remotos se agregarán aquí dinámicamente */}
        </div>
        
        {!isCameraOn && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Cámara apagada
          </div>
        )}
      </div>

      <VideoControls
        isCameraOn={isCameraOn}
        isMicOn={isMicOn}
        onToggleCamera={toggleCamera}
        onToggleMic={toggleMic}
      />
    </Card>
  );
};

export default VideoConference;
