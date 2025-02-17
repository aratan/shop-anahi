import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { io } from 'socket.io-client';
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

interface ChatRoomProps {
  roomName: string;
}

// Usando Socket.IO Cloud - nivel gratuito
const SOCKET_SERVER = 'https://lovable-chat.onrender.com';

const ChatRoom = ({ roomName }: ChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Inicializar socket
    socketRef.current = io(SOCKET_SERVER, {
      transports: ['websocket'],
      upgrade: false
    });
    
    // Unirse a la sala
    socketRef.current.emit('joinRoom', { room: roomName });
    
    // Escuchar mensajes nuevos
    socketRef.current.on('message', (message: Message) => {
      console.log('Mensaje recibido:', message);
      setMessages(prev => [...prev, message]);
    });
    
    // Escuchar usuarios conectados
    socketRef.current.on('userList', (users: string[]) => {
      console.log('Lista de usuarios actualizada:', users);
      setConnectedUsers(users);
      toast({
        title: "Usuarios actualizados",
        description: `${users.length} usuarios en la sala`,
      });
    });

    // Escuchar cuando un usuario se une
    socketRef.current.on('userJoined', (userId: string) => {
      console.log('Usuario unido:', userId);
      toast({
        title: "Usuario conectado",
        description: "Un nuevo usuario se ha unido a la sala",
      });
    });

    // Escuchar cuando un usuario se desconecta
    socketRef.current.on('userLeft', (userId: string) => {
      console.log('Usuario desconectado:', userId);
      toast({
        title: "Usuario desconectado",
        description: "Un usuario ha abandonado la sala",
      });
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.emit('leaveRoom', { room: roomName });
        socketRef.current.disconnect();
      }
    };
  }, [roomName, toast]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: socketRef.current.id,
        timestamp: Date.now()
      };
      
      console.log('Enviando mensaje:', message);
      socketRef.current.emit('sendMessage', {
        room: roomName,
        message
      });
      
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="glass-panel h-[600px] flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Chat - {roomName}</h3>
        <div className="text-sm text-muted-foreground">
          {connectedUsers.length} usuarios conectados
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-bubble ${
                message.sender === socketRef.current?.id ? 'message-bubble-sent' : 'message-bubble-received'
              }`}
            >
              {message.text}
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <span />
              <span />
              <span />
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe un mensaje..."
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!newMessage.trim()}>
            Enviar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatRoom;
