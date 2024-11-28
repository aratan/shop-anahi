import { useEffect, useRef, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, VideoOff, Mic, MicOff } from 'lucide-react';
import { io } from 'socket.io-client';

interface VideoConferenceProps {
  roomName: string;
}

const SOCKET_SERVER = 'http://localhost:3000';

const VideoConference = ({ roomName }: VideoConferenceProps) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [peers, setPeers] = useState<{ [key: string]: RTCPeerConnection }>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER);
    
    socketRef.current.emit('joinRoom', roomName);

    // Manejar nuevos usuarios
    socketRef.current.on('userJoined', async (userId: string) => {
      const peerConnection = createPeerConnection(userId);
      setPeers(prev => ({ ...prev, [userId]: peerConnection }));

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          peerConnection.addTrack(track, streamRef.current!);
        });
      }

      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socketRef.current.emit('offer', { target: userId, offer });
    });

    // Manejar ofertas recibidas
    socketRef.current.on('offer', async ({ source, offer }) => {
      const peerConnection = createPeerConnection(source);
      setPeers(prev => ({ ...prev, [source]: peerConnection }));
      
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      
      socketRef.current.emit('answer', { target: source, answer });
    });

    // Manejar respuestas recibidas
    socketRef.current.on('answer', async ({ source, answer }) => {
      await peers[source].setRemoteDescription(new RTCSessionDescription(answer));
    });

    // Manejar candidatos ICE
    socketRef.current.on('ice-candidate', async ({ source, candidate }) => {
      if (peers[source]) {
        await peers[source].addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    return () => {
      Object.values(peers).forEach(peer => peer.close());
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      socketRef.current.disconnect();
    };
  }, [roomName]);

  const createPeerConnection = (userId: string) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit('ice-candidate', {
          target: userId,
          candidate: event.candidate
        });
      }
    };

    peerConnection.ontrack = (event) => {
      const remoteVideo = document.createElement('video');
      remoteVideo.srcObject = event.streams[0];
      remoteVideo.autoplay = true;
      remoteVideo.playsInline = true;
      document.getElementById('remote-videos')?.appendChild(remoteVideo);
    };

    return peerConnection;
  };

  const toggleCamera = async () => {
    try {
      if (!isCameraOn) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
        
        // Agregar tracks a todas las conexiones existentes
        Object.values(peers).forEach(peer => {
          stream.getTracks().forEach(track => {
            peer.addTrack(track, stream);
          });
        });
        
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
        
        // Agregar tracks a todas las conexiones existentes
        Object.values(peers).forEach(peer => {
          stream.getTracks().forEach(track => {
            peer.addTrack(track, stream);
          });
        });
        
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