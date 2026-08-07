import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Send, 
  Sparkles, 
  RefreshCw, 
  ChefHat, 
  Gift, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

interface AIChefAssistantModalProps {
  onClose: () => void;
}

export const AIChefAssistantModal: React.FC<AIChefAssistantModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: 'Namaste! I am your **Shiv Dairy Sommelier & Culinary AI Expert**. Ask me anything about sweet pairings, A2 milk benefits, Vedic Bilona Ghee, or custom festival gift hampers!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Quick chips
  const quickPrompts = [
    "What sweets pair best with wedding hampers?",
    "Explain the Vedic Bilona Ghee churning method",
    "How fresh is Shiv A2 Cow Milk?",
    "Suggest a pure sweet box under ₹1000"
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: data.reply || 'Shiv Milk & Sweets guarantees 100% pure organic dairy and handcrafted sweets.' }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Shiv Milk & Sweets has been serving pure dairy since 1999. Try our signature Silver Vark Kaju Katli and A2 Bilona Ghee!' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-amber-950 border border-amber-800/90 rounded-3xl max-w-2xl w-full h-[85vh] flex flex-col shadow-2xl relative text-amber-50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-amber-900 p-4 border-b border-amber-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-amber-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif font-bold text-base text-amber-100">
                  Shiv AI Sommelier
                </h3>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                  Gemini Powered
                </span>
              </div>
              <p className="text-[11px] text-amber-300/80">
                Purity & Sweet Advisor • Available 24/7
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-amber-900/60 hover:bg-amber-800 text-amber-200 rounded-full transition border border-amber-700/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-amber-800 border border-amber-700 flex items-center justify-center shrink-0 mt-1">
                  <ChefHat className="w-4 h-4 text-amber-300" />
                </div>
              )}

              <div
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-amber-950 font-medium rounded-tr-none'
                    : 'bg-amber-900/60 border border-amber-800 text-amber-100 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-900/40 p-3 rounded-2xl w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              <span>Consulting Shiv Culinary Knowledge Base...</span>
            </div>
          )}

        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 bg-amber-950 border-t border-amber-900 space-y-2">
          <div className="text-[10px] font-bold text-amber-400/80 uppercase tracking-wider">
            Quick Inquiries:
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap bg-amber-900/50 hover:bg-amber-800 text-amber-200 border border-amber-800 text-[11px] px-3 py-1 rounded-full transition"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-amber-900/40 border-t border-amber-800/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about sweet boxes, A2 milk benefits, or recipes..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-amber-950 border border-amber-800 rounded-full px-4 py-2.5 text-xs text-amber-100 placeholder-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-amber-950 font-bold p-2.5 rounded-full transition disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-amber-950" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
