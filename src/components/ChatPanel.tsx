
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, Image, Paperclip, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatPanelProps {
  onSendQuery: (query: string) => void;
}

const ChatPanel = ({ onSendQuery }: ChatPanelProps) => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hi there! I'm your AI travel assistant for Diani Beach. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    onSendQuery(input); // Send to parent for listings
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        sender: "ai",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
    
    setInput("");
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    
    // Adding a setTimeout to allow the input to update before sending
    setTimeout(() => {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content: suggestion,
        sender: "user",
        timestamp: new Date(),
      };
      
      setMessages([...messages, userMessage]);
      onSendQuery(suggestion);
      
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate AI response
      setTimeout(() => {
        setIsTyping(false);
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: getAIResponse(suggestion),
          sender: "ai",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, aiResponse]);
      }, 1500);
    }, 10);
  };
  
  const handleMicClick = () => {
    toast({
      title: "Voice input",
      description: "Voice input feature coming soon!",
    });
  };
  
  const handleImageClick = () => {
    toast({
      title: "Image upload",
      description: "Image upload feature coming soon!",
    });
  };
  
  const handleAttachmentClick = () => {
    toast({
      title: "File attachment",
      description: "File attachment feature coming soon!",
    });
  };
  
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-xl p-3 ${
                message.sender === "user"
                  ? "bg-ocean text-white"
                  : "bg-gray-100 text-gray-800"
              } animate-in`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <div
                className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {formatMessageTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-xl p-3 bg-gray-100 text-gray-800">
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggestions */}
      <div className="p-3 border-t">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Button 
            variant="outline" 
            size="sm"
            className="whitespace-nowrap bg-secondary hover:bg-secondary/80"
            onClick={() => handleSuggestionClick("Show me best restaurants in Diani")}
          >
            Best restaurants
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="whitespace-nowrap bg-secondary hover:bg-secondary/80"
            onClick={() => handleSuggestionClick("What activities can I do today?")}
          >
            Activities today
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="whitespace-nowrap bg-secondary hover:bg-secondary/80"
            onClick={() => handleSuggestionClick("Luxury hotels with ocean view")}
          >
            Luxury hotels
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="whitespace-nowrap bg-secondary hover:bg-secondary/80"
            onClick={() => handleSuggestionClick("Hidden gems in Diani")}
          >
            Hidden gems
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="whitespace-nowrap bg-secondary hover:bg-secondary/80"
            onClick={() => handleSuggestionClick("Best beaches in Diani")}
          >
            Best beaches
          </Button>
        </div>
      </div>
      
      {/* Input Area */}
      <div className="p-4 border-t">
        <form 
          className="flex gap-2" 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <Button 
            type="button"
            variant="outline" 
            size="icon" 
            onClick={handleAttachmentClick}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button 
            type="button"
            variant="outline" 
            size="icon"
            onClick={handleImageClick}
          >
            <Image className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Ask me anything about Diani..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="button"
            variant="outline" 
            size="icon"
            onClick={handleMicClick}
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Button 
            type="submit"
            className="bg-ocean hover:bg-ocean-dark"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

// Simple function to generate mock AI responses
const getAIResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes("restaurant") || lowerInput.includes("food") || lowerInput.includes("eat")) {
    return "I've found some great restaurants in Diani Beach! Check out Ali Barbour's Cave Restaurant for a unique dining experience or Nomad Beach Bar for casual beachfront dining. Would you like more specific recommendations?";
  } else if (lowerInput.includes("hotel") || lowerInput.includes("resort") || lowerInput.includes("stay")) {
    return "Diani has some excellent accommodation options. Diani Reef Beach Resort & Spa offers luxury beachfront accommodations with great amenities. There are also boutique hotels and vacation rentals if you prefer something different. What's your budget?";
  } else if (lowerInput.includes("activity") || lowerInput.includes("do")) {
    return "There are plenty of activities in Diani! You can try kite surfing, visit the Colobus Conservation center, go on a snorkeling trip to see the coral reefs, or simply relax on the beautiful white sand beach. What interests you most?";
  } else if (lowerInput.includes("hidden") || lowerInput.includes("gem") || lowerInput.includes("secret")) {
    return "For a true hidden gem experience, I recommend visiting Kaya Kinondo Sacred Forest, exploring the quieter beaches south of the main strip, or checking out the local craft markets. Do any of these interest you?";
  } else if (lowerInput.includes("beach") || lowerInput.includes("beaches")) {
    return "Diani Beach is famous for its pristine white sands and crystal clear waters! The main beach stretches for about 10km and is perfect for swimming. For a more secluded experience, check out Galu Beach to the south or Tiwi Beach to the north. Would you like to know more about any specific beach?";
  }
  
  return "Thanks for your question about Diani Beach! I've found some relevant information that might help you. Would you like more specific details about any particular aspect of your trip?";
};

export default ChatPanel;
