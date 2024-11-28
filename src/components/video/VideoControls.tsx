import { Button } from "@/components/ui/button";
import { Video, VideoOff, Mic, MicOff } from 'lucide-react';

interface VideoControlsProps {
  isCameraOn: boolean;
  isMicOn: boolean;
  onToggleCamera: () => void;
  onToggleMic: () => void;
}

const VideoControls = ({ isCameraOn, isMicOn, onToggleCamera, onToggleMic }: VideoControlsProps) => {
  return (
    <div className="p-4 border-t flex justify-center space-x-4">
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleCamera}
        className={isCameraOn ? 'bg-primary text-primary-foreground' : ''}
      >
        {isCameraOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleMic}
        className={isMicOn ? 'bg-primary text-primary-foreground' : ''}
      >
        {isMicOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default VideoControls;