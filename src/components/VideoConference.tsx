import { useEffect, useRef, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, VideoOff, Mic, MicOff } from 'lucide-react';

interface VideoConferenceProps {
  roomName: string;
}

const VideoConference = ({ roomName }: VideoConferenceProps) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

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
        <h3 className="font-semibold">Video Conference</h3>
      </div>

      <div className="flex-1 bg-black/10 relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        {!isCameraOn && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Camera is off
          </div>
        )}
      </div>

      <div className="p-4 border-t flex justify-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleCamera}
          className={isCameraOn ? 'bg-primary text-primary-foreground' : ''}
        >
          {isCameraOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMic}
          className={isMicOn ? 'bg-primary text-primary-foreground' : ''}
        >
          {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
        </Button>
      </div>
    </Card>
  );
};

export default VideoConference;