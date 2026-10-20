import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import {
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  User,
  Mic,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { LanguageId } from '../types';
import { LANGUAGES } from '../data/languages';
import { lookupTerm, SCHOOL_GLOSSARY } from '../data/glossary';
import { sound } from '../utils/audio';

interface ChatMessage {
  id: string;
  sender: 'chotu' | 'child';
  text: string;
  transliteration?: string;
  audioText?: string;
  timestamp: string;
}

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageId;
  currentClass: number;
  currentSubject: string;
  chapterTitle?: string;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  currentClass,
  currentSubject,
  chapterTitle = 'आकृतियाँ और स्थान (Shapes & Space)',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeakingMessageId, setIsSpeakingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const langConfig = LANGUAGES[currentLanguage];

  // Initialize friendly greeting
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting: ChatMessage = {
        id: 'msg-init',
        sender: 'chotu',
        text:
          currentLanguage === 'santali'
            ? 'ᱡᱚᱦᱟᱨ! ᱤᱧ ᱪᱷᱳᱴᱩ ᱠᱟᱹᱱᱟᱹᱧ! ᱪᱮᱫ ᱠᱩᱠᱞᱤ ᱢᱮᱱᱟᱜ ᱛᱟᱢᱟ?'
            : currentLanguage === 'ho'
            ? '𑢹𑣉𑣀 𑣎𑣋𑣜: ᱡᱚᱦᱟᱨ! ᱟᱭᱤᱝ ᱪᱷᱳᱴᱩ ᱛᱟᱱᱤᱝ! (Johar! Ask me about this chapter!)'
            : 'जोहार! ऐंग छोटू तैनिंग। नेया पाठ रेयाः चीना कुली सनाम?',
        transliteration:
          currentLanguage === 'santali'
            ? 'Johar! Ing Chhotu kanang! What question do you have?'
            : currentLanguage === 'ho'
            ? 'Johar! Aing Chotu taning! (I am Chotu. Ask me anything!)'
            : 'Johar! Aing Chotu tanning. Ask any doubt about this lesson!',
        audioText:
          currentLanguage === 'santali'
            ? 'Johar! Ing Chhotu kanang. Chet kukli menah tama?'
            : currentLanguage === 'ho'
            ? 'Johar! Aing Chotu taning. Ask me any question.'
            : 'Johar! Aing Chotu tanning. Ask me any question.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([initialGreeting]);
    }
  }, [currentLanguage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSpeakReply = (msg: ChatMessage) => {
    sound.playPop();
    setIsSpeakingMessageId(msg.id);
    sound.speakText(msg.audioText || msg.transliteration || msg.text, {
      lang: 'hi-IN',
      rate: 0.85,
      pitch: 1.2,
      onEnd: () => setIsSpeakingMessageId(null),
    });
  };

  // Rule-based and Glossary-backed local fallback answer generator
  const getOfflineChotuReply = (query: string): ChatMessage => {
    const qLower = query.toLowerCase();

    // Check shapes & vocabulary words
    if (qLower.includes('inside') || qLower.includes('अंदर') || qLower.includes('bhitri') || qLower.includes('bhitir')) {
      if (currentLanguage === 'santali') {
        return {
          id: String(Date.now()),
          sender: 'chotu',
          text: 'ᱵᱷᱤᱛᱨᱤ (Bhitri) ᱢᱮᱱᱞᱮᱠᱷᱟᱱ Inside ᱵᱟᱝᱢᱟ ᱛᱟᱹᱢᱵᱩ ᱵᱷᱤᱛᱨᱤ ᱨᱮ ᱛᱟᱦᱮᱸᱱ!',
          transliteration: 'Bhitri means Inside, like Arab sitting inside the tent!',
          audioText: 'Bhitri means inside. Arab do tambu bhitri re tahena.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } else if (currentLanguage === 'ho') {
        return {
          id: String(Date.now()),
          sender: 'chotu',
          text: '𑢹𑣗𑣕𑣜𑣂 (Bhitari / भितरी) माने अंदर, जेलेका तंबू भितरी!',
          transliteration: 'Bhitari means Inside (अंदर), like sitting inside the tent!',
          audioText: 'Bhitari means inside, like Arab in the tent.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } else {
        return {
          id: String(Date.now()),
          sender: 'chotu',
          text: 'भितिर (Bhitir) माने अंदर, जेलेका तंबू भितिर रे बोलयेना!',
          transliteration: 'Bhitir means Inside, like resting inside the tent!',
          audioText: 'Bhitir means inside, like Arab inside the tent.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }
    }

    if (qLower.includes('outside') || qLower.includes('बाहर') || qLower.includes('bahre') || qLower.includes('bara')) {
      return {
        id: String(Date.now()),
        sender: 'chotu',
        text: currentLanguage === 'santali' ? 'ᱵᱟᱦᱨᱮ (Bahre) ᱢᱮᱱᱞᱮᱠᱷᱟᱱ Outside! ᱩᱸᱴ ᱫᱚ ᱵᱟᱦᱨᱮ ᱨᱮ ᱛᱟᱦᱮᱸ ᱠᱟᱱᱟᱭ᱾' : 'बाहर / Bahre means outside! The camel was outside in the open air.',
        transliteration: 'Bahre means outside the tent.',
        audioText: 'Bahre means outside. Unt was outside.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    if (qLower.includes('big') || qLower.includes('बड़ा') || qLower.includes('marang') || qLower.includes('हाथी')) {
      return {
        id: String(Date.now()),
        sender: 'chotu',
        text: currentLanguage === 'santali' ? 'ᱢᱟᱨᱟᱝ (Marang) ᱢᱮᱱᱞᱮᱠᱷᱟᱱ Bigger! ᱦᱟᱹᱛᱤ ᱫᱚ ᱢᱟᱨᱟᱝ ᱜᱮᱭᱟᱭ!' : 'मरांग (Marang) means Bigger! The elephant (हाती) is big.',
        transliteration: 'Marang means Bigger! Elephant is big!',
        audioText: 'Marang means bigger! Elephant is big.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    if (qLower.includes('small') || qLower.includes('छोटा') || qLower.includes('katij') || qLower.includes('huding')) {
      return {
        id: String(Date.now()),
        sender: 'chotu',
        text: currentLanguage === 'santali' ? 'ᱠᱟᱹᱴᱤᱡ (Katij) ᱢᱮᱱᱞᱮᱠᱷᱟᱱ Smaller! ᱥᱮᱛᱟ ᱫᱚ ᱠᱟᱹᱴᱤᱡ ᱜᱮᱭᱟᱭ!' : 'हुडिंग (Huding) / Katij means Smaller! The puppy is small.',
        transliteration: 'Katij / Huding means Smaller!',
        audioText: 'Katij means small, like the puppy.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    if (qLower.includes('count') || qLower.includes('गिन') || qLower.includes('number') || qLower.includes('1') || qLower.includes('एक')) {
      return {
        id: String(Date.now()),
        sender: 'chotu',
        text:
          currentLanguage === 'santali'
            ? 'ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱞᱮᱠᱷᱟ: ᱢᱤᱫ (1), ᱵᱟᱨ (2), ᱯᱮ (3), ᱯᱳᱱ (4), ᱢᱚᱬᱮ (5)!'
            : currentLanguage === 'ho'
            ? 'हो जगर रे लेखा: 𑢭𑣂𑣁 (१), 𑢪𑣁𑣜𑣂𑣁 (२), 𑢠𑣂𑣁 (३), 𑢡𑣃𑣅𑣂𑣁 (४), 𑢭𑣉𑣎𑣂𑣁 (५)!'
            : 'मुण्डारी रे लेखा: मियाद (१), बारिया (२), अपिया (३), उपुनिया (४), मोड़ेया (५)!',
        transliteration: 'Numbers 1 to 5: Mit (1), Bar (2), Pe (3), Pon (4), More (5)',
        audioText: 'Counting 1 to 5: Mit, Bar, Pe, Pon, More!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    // Honest fallback if word not in digital corpus for Ho/Mundari
    return {
      id: String(Date.now()),
      sender: 'chotu',
      text: `ᱱᱚᱣᱟ ᱠᱟᱛᱷᱟ (I want to be honest: Ho and Mundari digital resources are still learning this word). In Hindi: यह ${chapterTitle} का विषय है। Ask me about Inside/Outside, Big/Small, or Numbers!`,
      transliteration: `I am confident about textbook words for ${chapterTitle}! Ask me about Bhitri, Bahre, Marang, or Katij.`,
      audioText: `I am your friend Chotu. You can ask me about inside, outside, big and small!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sound.playPop();
    const childMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'child',
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, childMsg]);
    const query = inputText.trim();
    setInputText('');
    setIsLoading(true);

    try {
      // Check if GEMINI_API_KEY is available in browser / env
      const apiKey = (window as unknown as { GEMINI_API_KEY?: string }).GEMINI_API_KEY || '';

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are "Chotu", a cute friendly deer mascot helping primary school children (Classes 1-5) in Jharkhand, India.
The child is currently studying:
- Class: ${currentClass}
- Subject: ${currentSubject}
- Chapter: ${chapterTitle}
- Mother Tongue: ${langConfig.name} (${langConfig.scriptName})

Rules:
1. Answer in very simple, kind, cheerful 1-2 sentences suitable for a 6-year-old child.
2. If possible, include the mother tongue word in native script: Santali (Ol Chiki), Ho (Warang Chiti / Devanagari), or Mundari (Devanagari).
3. If unsure of exact dialect words in Ho or Mundari, say so honestly and provide the Hindi or English translation. Never invent false words.
4. Refuse any unsafe or off-topic questions gently by guiding back to school lessons.
5. Provide a Roman transliteration or phonetic guide.

Child's message: "${query}"`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const replyText = response.text || '';
        const botMsg: ChatMessage = {
          id: String(Date.now() + 1),
          sender: 'chotu',
          text: replyText,
          transliteration: 'Spoken by Chotu AI',
          audioText: replyText.replace(/[\u1C50-\u1C7F\u118A0-\u118FF]/g, ''), // strip special scripts for phonetic audio speech
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
        handleSpeakReply(botMsg);
      } else {
        // Instant responsive offline glossary-backed answer
        setTimeout(() => {
          const offlineMsg = getOfflineChotuReply(query);
          setMessages((prev) => [...prev, offlineMsg]);
          handleSpeakReply(offlineMsg);
        }, 400);
      }
    } catch {
      const offlineMsg = getOfflineChotuReply(query);
      setMessages((prev) => [...prev, offlineMsg]);
      handleSpeakReply(offlineMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[85vh] flex flex-col border-4 border-amber-400 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 p-3 sm:p-4 border-b-2 border-amber-500 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm border border-amber-300">
              🦌
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-amber-950 flex items-center gap-1.5 leading-tight">
                <span>Ask Chotu (ᱪᱷᱳᱴᱩ)</span>
                <span className="text-[10px] bg-emerald-700 text-white font-bold px-1.5 py-0.5 rounded-full">
                  Child Safe
                </span>
              </h3>
              <p className="text-xs text-amber-900 font-bold">
                Class {currentClass} • {chapterTitle} • {langConfig.name}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              sound.stopSpeech();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-amber-950 font-black text-sm flex items-center justify-center shadow-xs"
            aria-label="Close Chat"
          >
            ✕
          </button>
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-amber-50/50">
          {messages.map((msg) => {
            const isChotu = msg.sender === 'chotu';
            const isSpeaking = isSpeakingMessageId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-2 items-start ${isChotu ? 'justify-start' : 'justify-end'}`}
              >
                {isChotu && (
                  <div className="w-8 h-8 rounded-full bg-amber-300 border border-amber-500 flex items-center justify-center text-sm shrink-0">
                    🦌
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-3xl p-3.5 shadow-sm text-sm space-y-1 ${
                    isChotu
                      ? 'bg-white border-2 border-amber-300 text-amber-950 rounded-tl-none'
                      : 'bg-amber-500 text-white font-bold rounded-tr-none'
                  }`}
                >
                  <p className="font-bold leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                  </p>

                  {msg.transliteration && (
                    <p className={`text-xs mt-1 ${isChotu ? 'text-amber-800' : 'text-amber-100'}`}>
                      {msg.transliteration}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <span className={`text-[10px] ${isChotu ? 'text-slate-400' : 'text-amber-200'}`}>
                      {msg.timestamp}
                    </span>

                    {isChotu && (
                      <button
                        onClick={() => handleSpeakReply(msg)}
                        className={`p-1 rounded-full ${
                          isSpeaking ? 'bg-amber-400 text-white animate-pulse' : 'hover:bg-amber-100 text-amber-800'
                        }`}
                        title="Read aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {!isChotu && (
                  <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                    👶
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 bg-white p-3 rounded-2xl border border-amber-200 w-fit animate-pulse">
              <span>🦌 Chotu is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Pills for Young Children */}
        <div className="p-2 bg-amber-100/90 border-t border-amber-200 flex items-center gap-1.5 overflow-x-auto text-xs whitespace-nowrap">
          <span className="font-black text-amber-900 text-[11px] px-1">Try:</span>
          <button
            onClick={() => {
              setInputText('अंदर को संताली में क्या कहते हैं?');
            }}
            className="px-2.5 py-1 rounded-xl bg-white hover:bg-amber-200 text-amber-950 font-bold border border-amber-300"
          >
            What is Inside in Santali?
          </button>
          <button
            onClick={() => {
              setInputText('बड़ा और छोटा को हो जगर में क्या कहते हैं?');
            }}
            className="px-2.5 py-1 rounded-xl bg-white hover:bg-amber-200 text-amber-950 font-bold border border-amber-300"
          >
            Big & Small in Ho?
          </button>
          <button
            onClick={() => {
              setInputText('गिनती कैसे बोलते हैं?');
            }}
            className="px-2.5 py-1 rounded-xl bg-white hover:bg-amber-200 text-amber-950 font-bold border border-amber-300"
          >
            How to count in Mundari?
          </button>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-white border-t-2 border-amber-300 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask Chotu in ${langConfig.name}, Hindi or English...`}
            className="flex-1 px-4 py-2.5 rounded-2xl border-2 border-amber-300 focus:border-amber-500 focus:outline-none text-sm font-bold text-amber-950 placeholder:text-slate-400"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold shadow-md press-bounce transition-all border border-amber-700"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
