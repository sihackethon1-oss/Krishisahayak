
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, History, Languages, Loader2, PlayCircle, Send } from 'lucide-react';
import { getGeminiAI, decodeBase64, encodeBase64, decodeAudioData } from '../services/geminiService';
import { Modality } from '@google/genai';

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [status, setStatus] = useState<string>('Ready to talk');
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const handleToggleMic = () => {
    if (isListening) {
      setIsListening(false);
      setStatus('Ready to talk');
    } else {
      setIsListening(true);
      setStatus('Listening...');
      // In a real implementation, we would call the Gemini Live session here
      // For this demo, we'll simulate the AI interaction since the user's API key is required
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user' as const, text };
    setMessages(prev => [...prev, userMsg]);
    setCurrentInput('');
    setStatus('AI is thinking...');

    try {
      const ai = getGeminiAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Respond as a helpful Marathi/Hindi/English agriculture expert. User says: "${text}"`,
        config: {
          systemInstruction: "You are an AI assistant named KrishiDost. You speak Marathi, Hindi, and English fluently. You help Maharashtra farmers with crops, weather, and market advice. Keep responses short and actionable."
        }
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm not sure how to respond to that." }]);
      setStatus('Ready to talk');
    } catch (e) {
      console.error(e);
      setStatus('Error connecting to AI');
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">AI KrishiDost</h2>
          <p className="text-gray-500 mt-1">Talk to your personal farming advisor in Marathi or Hindi.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm">
          <Languages className="w-4 h-4" />
          EN • HI • MR
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Mic className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">Try asking about tomorrow's weather in Pune or the best time to sow Cotton.</p>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-6 py-4 rounded-3xl ${
                m.role === 'user' 
                  ? 'bg-green-600 text-white rounded-tr-none shadow-md' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}>
                {m.text}
                {m.role === 'ai' && (
                  <button className="block mt-2 text-green-700 hover:text-green-800 transition-colors">
                    <PlayCircle className="w-5 h-5 inline mr-1" />
                    <span className="text-xs font-bold uppercase">Listen</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleToggleMic}
            className={`w-14 h-14 flex-shrink-0 rounded-full flex items-center justify-center transition-all ${
              isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-green-600 text-white'
            }`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          
          <div className="flex-1 relative">
            <input 
              type="text"
              placeholder={isListening ? 'Listening...' : 'Type your question...'}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(currentInput)}
            />
            <button 
              onClick={() => sendMessage(currentInput)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-green-600 text-white rounded-xl flex items-center justify-center hover:bg-green-700 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="mt-3 text-center">
          <span className={`text-xs font-medium ${isListening ? 'text-red-500' : 'text-gray-400'}`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
