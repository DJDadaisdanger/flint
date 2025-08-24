import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User, Loader2, X } from 'lucide-react';
import { useNavigation } from './NavigationContext';
import { huggingFaceService, type ChatMessage } from '../services/huggingface';
import DockSidebar from './DockSidebar';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatInterface() {
  const { goBack } = useNavigation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. I can help you organize your thoughts, manage tasks, and improve your productivity. What would you like to work on today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Validate message content
    const validation = huggingFaceService.validateMessage(inputValue);
    if (!validation.isValid) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: validation.error || 'Invalid message',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Convert message history for AI service
      const chatHistory: ChatMessage[] = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      // Add the new user message
      chatHistory.push({
        role: 'user',
        content: userMessage.content
      });

      const aiResponse = await huggingFaceService.sendMessage(chatHistory);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : "I'm sorry, something went wrong. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Chat dock actions
  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm your AI assistant. I can help you organize your thoughts, manage tasks, and improve your productivity. What would you like to work on today?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  };

  const handleExportChat = () => {
    const chatContent = messages.map(msg => 
      `[${msg.timestamp.toLocaleTimeString()}] ${msg.sender.toUpperCase()}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-export-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRefreshChat = () => {
    // Restart conversation
    handleClearChat();
  };

  return (
    <>
      {/* Backdrop with blur */}
      <div className="fixed inset-0 bg-background-dark/80 backdrop-blur-md z-[60]" />
      
      {/* Centered Chat Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-[70]">
        <div className="w-full max-w-4xl h-[80vh] bg-background-medium border border-primary-accent/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-primary-accent/10 shadow-primary-accent/5">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-background-dark bg-background-dark/50">
            <div className="flex items-center gap-4">
              <button
                onClick={goBack}
                className="p-2 rounded-lg bg-background-medium hover:bg-primary-accent/20 text-white hover:text-primary-accent transition-all duration-200 hover:scale-110 flex items-center justify-center"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-accent/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary-accent" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-xl text-white" style={{ fontWeight: 400 }}>AI Assistant</h1>
                  <p className="text-sm text-muted-foreground">AI Assistant Demo</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={goBack}
              className="p-2 rounded-lg bg-background-medium hover:bg-background-dark text-white hover:text-muted-foreground transition-all duration-200 hover:scale-110 flex items-center justify-center"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background-dark">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-background-medium' 
                    : 'bg-primary-accent/20'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" strokeWidth={2} />
                  ) : (
                    <Bot className="w-4 h-4 text-primary-accent" strokeWidth={2} />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[75%] ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  <div className={`inline-block p-4 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-primary-accent text-background-dark rounded-br-md'
                      : 'bg-background-medium text-white rounded-bl-md border border-background-medium'
                  }`}>
                    <p style={{ fontWeight: 400 }} className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                  <div className={`text-xs text-muted-foreground mt-2 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-accent/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-accent" strokeWidth={2} />
                </div>
                <div className="bg-background-medium text-white p-4 rounded-2xl rounded-bl-md border border-background-medium">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-4 h-4 animate-spin text-primary-accent" />
                    <span style={{ fontWeight: 400 }}>Generating response...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-background-dark bg-background-medium p-4">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  aria-label="Type your message"
                  className="w-full bg-background-dark text-white placeholder:text-muted-foreground border border-background-dark rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent transition-all duration-200 min-h-[60px] max-h-40"
                  style={{ fontWeight: 400 }}
                  rows={1}
                />
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                  className="p-4 rounded-xl bg-primary-accent hover:bg-bright-accent disabled:bg-background-dark disabled:text-muted-foreground text-background-dark transition-all duration-200 hover:scale-105 disabled:hover:scale-100 flex items-center justify-center flex-shrink-0 disabled:cursor-not-allowed h-[60px] w-[60px]"
                >
                  <Send className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </>
  );
}