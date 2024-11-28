import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ChatRoom from '@/components/ChatRoom';
import VideoConference from '@/components/VideoConference';

const Index = () => {
  const [roomName, setRoomName] = useState('');
  const [isInRoom, setIsInRoom] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleJoinRoom = () => {
    if (roomName.trim()) {
      setIsInRoom(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {!isInRoom ? (
          <Card className="glass-panel p-8 max-w-md mx-auto mt-20">
            <h1 className="text-3xl font-bold text-center mb-8">Welcome to ChatApp</h1>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full"
              />
              <Button 
                onClick={handleJoinRoom}
                className="w-full"
                disabled={!roomName.trim()}
              >
                Join Room
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Room: {roomName}</h2>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowVideo(!showVideo)}
                >
                  {showVideo ? 'Hide Video' : 'Show Video'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsInRoom(false)}
                >
                  Leave Room
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              <ChatRoom roomName={roomName} />
              {showVideo && <VideoConference roomName={roomName} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;