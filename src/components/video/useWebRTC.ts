import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER = 'http://localhost:3000';

export const useWebRTC = (roomName: string) => {
  const [peers, setPeers] = useState<{ [key: string]: RTCPeerConnection }>({});
  const streamRef = useRef<MediaStream | null>(null);
  const socketRef = useRef<any>(null);

  const createPeerConnection = (userId: string) => {
    console.log('Creando conexión peer para:', userId);
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
      ]
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Enviando candidato ICE para:', userId);
        socketRef.current.emit('ice-candidate', {
          target: userId,
          candidate: event.candidate
        });
      }
    };

    peerConnection.ontrack = (event) => {
      console.log('Track recibido de:', userId);
      const remoteVideo = document.createElement('video');
      remoteVideo.srcObject = event.streams[0];
      remoteVideo.autoplay = true;
      remoteVideo.playsInline = true;
      document.getElementById('remote-videos')?.appendChild(remoteVideo);
    };

    return peerConnection;
  };

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER, {
      transports: ['websocket'],
      upgrade: false
    });
    
    socketRef.current.emit('joinRoom', { room: roomName });

    socketRef.current.on('userJoined', async (userId: string) => {
      console.log('Usuario unido a la sala:', userId);
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

    socketRef.current.on('offer', async ({ source, offer }) => {
      console.log('Oferta recibida de:', source);
      const peerConnection = createPeerConnection(source);
      setPeers(prev => ({ ...prev, [source]: peerConnection }));
      
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      
      socketRef.current.emit('answer', { target: source, answer });
    });

    socketRef.current.on('answer', async ({ source, answer }) => {
      console.log('Respuesta recibida de:', source);
      if (peers[source]) {
        await peers[source].setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socketRef.current.on('ice-candidate', async ({ source, candidate }) => {
      console.log('Candidato ICE recibido de:', source);
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

  return { peers, streamRef };
};