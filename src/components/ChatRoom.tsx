import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

interface ChatRoomProps {
  roomName: string;
}

const ChatRoom = ({ roomName }: ChatRoomProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate receiving messages
  useEffect(() => {
    const timer = setInterval(() => {
      const randomMessages = [
        "Hey, how's it going?",
        "Did you see the latest update?",
        "That's interesting!",
        "I agree with you",
        "Let's discuss this later"
      ];
      
      if (Math.random() > 0.7) {
        const newMsg: Message = {
          id: Date.now().toString(),
          text: randomMessages[Math.floor(Math.random() * randomMessages.length)],
          sender: 'other',
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, newMsg]);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Auto scroll to bottom on new messages
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
        sender: 'me',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, message]);
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
        <h3 className="font-semibold">Chat</h3>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-bubble ${
                message.sender === 'me' ? 'message-bubble-sent' : 'message-bubble-received'
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
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!newMessage.trim()}>
            Send
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatRoom;