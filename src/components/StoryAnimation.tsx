import React, { useState } from 'react';
import { Play, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface StoryAnimationProps {
  sceneType: 'inside_outside' | 'big_small' | 'top_bottom' | 'near_far' | 'rolling_sliding' | 'general';
  currentLanguage: string;
  nativeKeywords: Array<{
    native: string;
    transliteration: string;
    hindi: string;
    english: string;
  }>;
  chapterMeta?: { chapterNumber: number; classNumber: number; subjectId: string; bookName: string };
}

// -----------------------------------------------------------------------
// General scene variant selector
// -----------------------------------------------------------------------
type GeneralVariant = 'village' | 'sarhul' | 'forest' | 'river' | 'counting' | 'letters' | 'heroes' | 'school';

function getGeneralSceneVariant(
  chapter: { chapterNumber: number; classNumber: number; subjectId: string; bookName: string },
): GeneralVariant {
  const { chapterNumber, classNumber, subjectId } = chapter;
  if (subjectId === 'maths') {
    return chapterNumber % 2 === 0 ? 'counting' : 'river';
  }
  if (subjectId === 'evs') {
    const n = chapterNumber % 3;
    return n === 0 ? 'forest' : n === 1 ? 'river' : 'sarhul';
  }
  if (subjectId === 'hindi' || subjectId === 'english') {
    if (classNumber >= 4 && chapterNumber >= 8) return 'heroes';
    if (classNumber <= 2) return chapterNumber % 2 === 0 ? 'school' : 'letters';
    return chapterNumber % 3 === 0 ? 'sarhul' : chapterNumber % 3 === 1 ? 'village' : 'letters';
  }
  const variants: GeneralVariant[] = ['village', 'forest', 'river', 'school'];
  return variants[chapterNumber % 4];
}

// -----------------------------------------------------------------------
// VARIANT A – Jharkhand Village Morning
// -----------------------------------------------------------------------
const VillageScene: React.FC = () => {
  const [childDancing, setChildDancing] = useState(false);
  const [deerVisible, setDeerVisible] = useState(true);
  const [leavesVisible, setLeavesVisible] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-3 relative">
      {/* Sky + Sun rising */}
      <div className="relative w-full h-16 bg-gradient-to-b from-orange-200 to-yellow-100 rounded-xl overflow-hidden flex items-center justify-center">
        <div
          className="text-4xl"
          style={{ animation: 'sunRise 3s ease-out forwards' }}
        >
          🌅
        </div>
        <span className="absolute left-4 text-xs font-black text-amber-800">Jharkhand Village Morning</span>
      </div>

      <div className="flex items-end justify-around w-full gap-2">
        {/* Children walking to school */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            sound.playPop();
            setChildDancing(true);
            sound.speakText('Johar! Namaskar! Good Morning!', { lang: 'hi-IN', pitch: 1.3 });
            setTimeout(() => setChildDancing(false), 1500);
          }}
          title="Tap to make child dance"
        >
          <div
            className={`text-5xl transition-all duration-300 ${childDancing ? 'scale-125' : 'animate-bounce'}`}
            style={{ animation: childDancing ? undefined : 'bounce 1s infinite' }}
          >
            🧒
          </div>
          <div className="text-3xl">🏫</div>
          <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 rounded-full mt-1">
            {childDancing ? '🎉 Johar!' : 'Tap me!'}
          </span>
        </div>

        {/* Deer peeping */}
        <div className="flex flex-col items-center">
          <div
            className={`cursor-pointer text-5xl transition-all duration-700 ${deerVisible ? 'opacity-100 scale-100' : 'opacity-0 translate-x-20 scale-50'}`}
            style={{ animation: deerVisible ? 'gentleBounce 2s ease-in-out infinite' : undefined }}
            onClick={() => {
              sound.playPop();
              sound.speakText('The deer ran into the forest!', { lang: 'hi-IN' });
              setDeerVisible(false);
              setTimeout(() => setDeerVisible(true), 2500);
            }}
            title="Tap to scare deer"
          >
            🦌
          </div>
          <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 rounded-full mt-1">
            Tap → runs!
          </span>
        </div>

        {/* Tree with falling leaves */}
        <div className="flex flex-col items-center relative">
          <div
            className="text-5xl cursor-pointer"
            style={{ animation: 'gentleBounce 2.5s ease-in-out infinite', animationDelay: '0.5s' }}
            onClick={() => {
              sound.playPop();
              setLeavesVisible(true);
              setTimeout(() => setLeavesVisible(false), 2000);
            }}
            title="Tap for falling leaves"
          >
            🌳
          </div>
          {leavesVisible && (
            <div className="absolute top-0 flex gap-1 animate-bounce pointer-events-none">
              {['🍃', '🍃', '🍃'].map((l, i) => (
                <span
                  key={i}
                  className="text-xl"
                  style={{ animationDelay: `${i * 0.2}s`, animation: 'fall 1.5s ease-in forwards' }}
                >
                  {l}
                </span>
              ))}
            </div>
          )}
          <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 rounded-full mt-1">
            Tap → leaves!
          </span>
        </div>
      </div>

      <style>{`
        @keyframes sunRise { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes gentleBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fall { 0%{transform:translateY(0) rotate(0deg);opacity:1} 100%{transform:translateY(60px) rotate(180deg);opacity:0} }
      `}</style>
    </div>
  );
};

// -----------------------------------------------------------------------
// VARIANT B – Sarhul Spring Festival
// -----------------------------------------------------------------------
const SarhulScene: React.FC = () => {
  const [flowersCount, setFlowersCount] = useState(2);
  const [confetti, setConfetti] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="flex items-end justify-around w-full gap-4">
        {/* Sal tree with blooming flowers */}
        <div className="flex flex-col items-center">
          <div className="relative flex flex-col items-center">
            <div
              className="text-5xl cursor-pointer"
              onClick={() => {
                sound.playCorrect();
                setFlowersCount(Math.min(flowersCount + 1, 7));
                sound.speakText('Sarhul! Sal flowers bloom in spring!', { lang: 'hi-IN' });
              }}
              title="Tap to bloom flowers"
            >
              🌳
            </div>
            <div className="flex gap-1 mt-1 flex-wrap justify-center max-w-[80px]">
              {Array.from({ length: flowersCount }).map((_, i) => (
                <span
                  key={i}
                  className="text-lg"
                  style={{
                    animation: 'pulse 1.5s ease-in-out infinite',
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  🌸
                </span>
              ))}
            </div>
          </div>
          <span className="text-[10px] font-black text-pink-800 bg-pink-100 px-2 rounded-full mt-1">
            Tap → bloom! ({flowersCount}/7)
          </span>
        </div>

        {/* Tribal dancer */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            sound.playCorrect();
            setConfetti(true);
            sound.speakText('Sarhul festival! Johar! Dance and celebrate!', { lang: 'hi-IN' });
            setTimeout(() => setConfetti(false), 2000);
          }}
          title="Tap for confetti"
        >
          <div
            className="text-6xl"
            style={{ animation: 'spin 2s linear infinite' }}
          >
            💃
          </div>
          {confetti && (
            <div className="flex gap-1 text-2xl animate-bounce pointer-events-none">
              🎉🎊✨🌸
            </div>
          )}
          <span className="text-[10px] font-black text-purple-800 bg-purple-100 px-2 rounded-full mt-1">
            Tap → confetti!
          </span>
        </div>

        {/* Mandar drum */}
        <div className="flex flex-col items-center">
          <div
            className="text-5xl cursor-pointer"
            style={{ animation: 'drumBounce 0.5s ease-in-out infinite' }}
            onClick={() => {
              sound.playPop();
              sound.speakText('Mandar! The tribal drum of Jharkhand beats for Sarhul!', { lang: 'hi-IN' });
            }}
            title="Tap the drum"
          >
            🥁
          </div>
          <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 rounded-full mt-1">
            Mandar Drum
          </span>
        </div>
      </div>

      <div className="text-xs font-black text-pink-900 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
        🌸 Sarhul Spring Festival — Sal Flowers Bloom 🌸
      </div>

      <style>{`
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes drumBounce { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(0.85)} }
      `}</style>
    </div>
  );
};

// -----------------------------------------------------------------------
// VARIANT C – Forest Animals
// -----------------------------------------------------------------------
const ForestScene: React.FC = () => {
  const animals = [
    { emoji: '🐯', name: 'Bagh / Tiger', sound: 'Bagh! Tiger of Jharkhand forest!' },
    { emoji: '🐘', name: 'Hati / Elephant', sound: 'Hati! Elephant is marang, big!' },
    { emoji: '🦚', name: 'Mor / Peacock', sound: 'Mor! Peacock dances in the rain!' },
    { emoji: '🦌', name: 'Harin / Deer', sound: 'Harin! Deer runs fast in the sal forest!' },
    { emoji: '🐍', name: 'Sap / Snake', sound: 'Sap! Snake moves silently on the ground!' },
    { emoji: '🦋', name: 'Titli / Butterfly', sound: 'Titli! Butterfly flies among flowers!' },
  ];
  const [jumping, setJumping] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="text-xs font-black text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
        🌳 Jharkhand Forest Animals — Tap to Meet Them! 🌳
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 w-full">
        {animals.map((animal, i) => (
          <div
            key={i}
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${jumping === i ? 'scale-125' : 'hover:scale-110'}`}
            style={{ animation: `gentleBounce2 ${2 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.25}s` }}
            onClick={() => {
              sound.playPop();
              setJumping(i);
              sound.speakText(animal.sound, { lang: 'hi-IN', pitch: 1.2 });
              setTimeout(() => setJumping(null), 500);
            }}
            title={`Tap to meet the ${animal.name}`}
          >
            <span className="text-4xl">{animal.emoji}</span>
            <span className="text-[9px] font-black text-emerald-900 bg-emerald-100 px-1.5 py-0.5 rounded-full text-center leading-tight mt-1">
              {animal.name}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes gentleBounce2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
      `}</style>
    </div>
  );
};

// -----------------------------------------------------------------------
// VARIANT D – River and Mountain
// -----------------------------------------------------------------------
const RiverScene: React.FC = () => {
  const [mountainGlow, setMountainGlow] = useState(false);
  const [riverRipple, setRiverRipple] = useState(false);

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Sky with flying birds */}
      <div className="relative h-12 bg-gradient-to-b from-sky-300 to-sky-100 rounded-xl overflow-hidden flex items-center">
        {['🦅', '🦜', '🦢'].map((bird, i) => (
          <span
            key={i}
            className="absolute text-2xl"
            style={{
              animation: 'flyAcross 6s linear infinite',
              animationDelay: `${i * 2}s`,
              top: `${10 + i * 8}px`,
            }}
          >
            {bird}
          </span>
        ))}
      </div>

      {/* Mountains */}
      <div
        className={`flex justify-center gap-3 cursor-pointer transition-all duration-500 ${mountainGlow ? 'brightness-150' : ''}`}
        onClick={() => {
          sound.playCorrect();
          setMountainGlow(true);
          sound.speakText('The mountains of Jharkhand glow amber at sunset! Pahar!', { lang: 'hi-IN' });
          setTimeout(() => setMountainGlow(false), 2000);
        }}
        title="Tap to make mountains glow"
      >
        <span className={`text-5xl transition-all duration-500 ${mountainGlow ? 'text-amber-400' : ''}`} style={{ animation: 'gentleBounce2 3s ease-in-out infinite' }}>🏔️</span>
        <span className={`text-4xl transition-all duration-500 ${mountainGlow ? 'text-amber-300' : ''}`} style={{ animation: 'gentleBounce2 3.5s ease-in-out infinite', animationDelay: '0.5s' }}>⛰️</span>
        <span className={`text-5xl transition-all duration-500 ${mountainGlow ? 'text-amber-400' : ''}`} style={{ animation: 'gentleBounce2 2.8s ease-in-out infinite', animationDelay: '1s' }}>🏔️</span>
      </div>

      {/* River with fish */}
      <div
        className={`relative w-full rounded-xl bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 p-3 flex items-center justify-around cursor-pointer transition-all duration-300 ${riverRipple ? 'scale-105' : ''}`}
        onClick={() => {
          sound.playPop();
          setRiverRipple(true);
          sound.speakText('Nadi! The river flows through Jharkhand! Ripple ripple!', { lang: 'hi-IN' });
          setTimeout(() => setRiverRipple(false), 800);
        }}
        title="Tap river for ripple"
        style={{ animation: 'waveBg 3s ease-in-out infinite' }}
      >
        <span className="text-3xl" style={{ animation: 'swimFish 4s linear infinite' }}>🐟</span>
        <span className="text-2xl font-black text-white drop-shadow">🌊 Nadi (River)</span>
        <span className="text-3xl" style={{ animation: 'swimFish 5s linear infinite reverse', animationDelay: '2s' }}>🐡</span>
      </div>

      <div className="text-[10px] font-black text-sky-900 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 text-center">
        Tap mountains 🏔️ to glow • Tap river 🌊 to ripple
      </div>

      <style>{`
        @keyframes flyAcross { from{transform:translateX(-60px)} to{transform:translateX(calc(100vw + 60px))} }
        @keyframes waveBg { 0%,100%{background-position:0%} 50%{background-position:100%} }
        @keyframes swimFish { 0%,100%{transform:translateX(0)} 50%{transform:translateX(10px)} }
        @keyframes gentleBounce2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
      `}</style>
    </div>
  );
};

// -----------------------------------------------------------------------
// VARIANT E – Counting with Fruits and Flowers
// -----------------------------------------------------------------------
const CountingScene: React.FC = () => {
  const items = ['🌺', '🍎', '🌾', '🌰', '🍯'];
  const numbersOlChiki = ['᱑', '᱒', '᱓', '᱔', '᱕'];
  const numbersDevanagari = ['१', '२', '३', '४', '५'];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const countWords = [
    'Mit — ᱑ — One!',
    'Bar — ᱒ — Two!',
    'Pon — ᱓ — Three!',
    'Pon-mit — ᱔ — Four!',
    'Mol — ᱕ — Five!',
  ];

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="text-xs font-black text-violet-900 bg-violet-50 px-3 py-1 rounded-full border border-violet-200">
        ✨ Count with Jharkhand Fruits! Tap to hear numbers ✨
      </div>
      <div className="flex justify-around w-full gap-2">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${activeIdx === i ? 'scale-130' : 'hover:scale-110'}`}
            style={{ animation: `countBounce ${1.5 + i * 0.2}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
            onClick={() => {
              sound.playCorrect();
              setActiveIdx(i);
              sound.speakText(countWords[i], { lang: 'hi-IN', pitch: 1.3 });
              setTimeout(() => setActiveIdx(null), 1000);
            }}
          >
            {/* Number labels */}
            <div className="flex gap-1 items-center">
              <span className="text-sm font-black text-violet-700">{numbersOlChiki[i]}</span>
              <span className="text-sm font-black text-amber-700">{numbersDevanagari[i]}</span>
            </div>
            <span className="text-4xl">{item}</span>
            <span className="text-xs font-black text-slate-600">{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="text-[10px] font-bold text-violet-700 text-center">
        Ol Chiki numbers: ᱑ ᱒ ᱓ ᱔ ᱕ • Devanagari: १ २ ३ ४ ५
      </div>
      <style>{`
        @keyframes countBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>
    </div>
  );
};

// -----------------------------------------------------------------------
// VARIANT F – Alphabet and Letters
// -----------------------------------------------------------------------
const LettersScene: React.FC = () => {
  const letterSets = {
    santali: ['ᱚ', 'ᱟ', 'ᱤ', 'ᱩ', 'ᱮ', 'ᱳ'],
    ho: ['𑢹', '𑢺', '𑢻', '𑢼'],
    hindi: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ'],
    english: ['A', 'E', 'I', 'O', 'U'],
    mundari: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ'],
  };
  const soundMap: Record<string, string> = {
    ᱚ: 'O as in Open', ᱟ: 'Ah', ᱤ: 'Ee', ᱩ: 'Oo', ᱮ: 'Eh', ᱳ: 'Oh',
    '𑢹': 'A in Ho script', '𑢺': 'Aa in Ho script', '𑢻': 'I in Ho script', '𑢼': 'E in Ho script',
    अ: 'Uh — A', आ: 'Aaa', इ: 'Ih', ई: 'Eeh', उ: 'Uh', ऊ: 'Ooh',
    A: 'A for Apple', E: 'E for Elephant', I: 'I for India', O: 'O for Orange', U: 'U for Umbrella',
  };
  const [glowing, setGlowing] = useState<number | null>(null);

  // Pick letter set — cycle through by rendering all sets interleaved
  const allLetters = ['ᱚ', 'अ', 'A', 'ᱟ', 'आ', 'E'].slice(0, 6);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="text-xs font-black text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
        🔤 Letters of Jharkhand — Tap to Hear! ✏️
      </div>

      {/* Dancing pencil */}
      <div className="text-4xl" style={{ animation: 'pencilDance 1s ease-in-out infinite' }}>✏️</div>

      <div className="flex justify-around w-full gap-2 flex-wrap">
        {allLetters.map((letter, i) => (
          <div
            key={i}
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${glowing === i ? 'scale-130' : 'hover:scale-110'}`}
            style={{
              animation: `letterFloat ${2 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
            onClick={() => {
              sound.playPop();
              setGlowing(i);
              sound.speakText(soundMap[letter] || letter, { lang: 'hi-IN', pitch: 1.2 });
              setTimeout(() => setGlowing(null), 800);
            }}
            title={`Tap to hear "${letter}"`}
          >
            <span
              className={`text-4xl sm:text-5xl font-black transition-all duration-300 ${
                glowing === i
                  ? 'text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.9)]'
                  : 'text-indigo-800'
              }`}
            >
              {letter}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes letterFloat { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-10px) rotate(3deg)} }
        @keyframes pencilDance { 0%,100%{transform:rotate(-10deg)} 50%{transform:rotate(10deg)} }
      `}</style>
    </div>
  );
};

// -----------------------------------------------------------------------
// VARIANT G – Birsa Munda and Tribal Heroes
// -----------------------------------------------------------------------
const HeroesScene: React.FC = () => {
  const [flagWaving, setFlagWaving] = useState(false);
  const [starsVisible, setStarsVisible] = useState(3);
  const [typingDone, setTypingDone] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* Starry sky */}
      <div className="relative w-full h-12 bg-gradient-to-b from-indigo-900 to-purple-800 rounded-xl overflow-hidden flex items-center justify-center gap-2">
        {Array.from({ length: starsVisible }).map((_, i) => (
          <span
            key={i}
            className="text-xl"
            style={{ animation: 'starTwinkle 1.5s ease-in-out infinite', animationDelay: `${i * 0.4}s` }}
          >
            ⭐
          </span>
        ))}
        <button
          className="absolute right-2 text-[9px] text-white bg-purple-900/60 px-1.5 py-0.5 rounded"
          onClick={() => {
            sound.playCorrect();
            setStarsVisible((v) => Math.min(v + 2, 9));
          }}
        >
          + Stars
        </button>
      </div>

      <div className="flex items-end justify-around w-full gap-3">
        {/* Hill with flag */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            sound.playPop();
            setFlagWaving(true);
            sound.speakText('Ulgulan! Revolt! Birsa Munda fought for tribal rights!', { lang: 'hi-IN' });
            setTimeout(() => setFlagWaving(false), 2000);
          }}
          title="Tap the flag"
        >
          <div className={`text-2xl transition-all duration-200 ${flagWaving ? 'animate-wiggle' : ''}`}>🚩</div>
          <div className="text-5xl">🏔️</div>
          <span className="text-[10px] font-black text-red-800 bg-red-100 px-2 rounded-full mt-1">
            {flagWaving ? '⚡ Ulgulan!' : 'Tap → flag waves!'}
          </span>
        </div>

        {/* Flute */}
        <div className="flex flex-col items-center">
          <div
            className="text-5xl cursor-pointer"
            style={{ animation: 'gentleBounce2 2s ease-in-out infinite' }}
            onClick={() => {
              sound.playPop();
              sound.speakText('Birsa Munda played the flute and inspired the tribal people of Jharkhand!', { lang: 'hi-IN' });
            }}
            title="Tap the flute"
          >
            🪈
          </div>
          <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 rounded-full mt-1">
            Birsa's Flute
          </span>
        </div>

        {/* Text tribute */}
        <div className="flex flex-col items-center text-center">
          <div
            className="text-xs font-black text-amber-900 bg-amber-50 border border-amber-300 px-2 py-1 rounded-xl cursor-pointer"
            style={{ animation: 'typeIn 3s steps(20) forwards' }}
            onClick={() => {
              sound.speakText('Dharti Aaba Birsa Munda! Father of the land!', { lang: 'hi-IN' });
              setTypingDone(true);
            }}
          >
            धरती आबा<br />बिरसा मुंडा
          </div>
          <span className="text-[9px] font-bold text-slate-500 mt-1">Tap to hear</span>
        </div>
      </div>

      <style>{`
        @keyframes starTwinkle { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
        @keyframes typeIn { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
        @keyframes gentleBounce2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
      `}</style>
    </div>
  );
};

// -----------------------------------------------------------------------
// VARIANT H – School Life in Jharkhand
// -----------------------------------------------------------------------
const SchoolScene: React.FC = () => {
  const [teacherGreeting, setTeacherGreeting] = useState(false);
  const [butterflyOut, setButterflyOut] = useState(false);
  const [clockTick, setClockTick] = useState(0);

  // Clock ticking effect
  React.useEffect(() => {
    const interval = setInterval(() => setClockTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const clockEmoji = clockTick % 2 === 0 ? '🕐' : '🕑';

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="flex items-end justify-around w-full gap-3">
        {/* Teacher at blackboard */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            sound.playCorrect();
            setTeacherGreeting(true);
            sound.speakText('Good Morning! Johar! Welcome to class!', { lang: 'hi-IN', pitch: 1.2 });
            setTimeout(() => setTeacherGreeting(false), 2000);
          }}
          title="Tap the teacher"
        >
          <div className={`text-5xl transition-all duration-300 ${teacherGreeting ? 'scale-125' : ''}`}
            style={{ animation: 'teacherBob 2s ease-in-out infinite' }}>
            👩‍🏫
          </div>
          <div className="flex gap-1 text-2xl">📋🖊️</div>
          <span className="text-[10px] font-black text-blue-800 bg-blue-100 px-2 rounded-full mt-1">
            {teacherGreeting ? '🎉 Johar!' : 'Tap Teacher!'}
          </span>
        </div>

        {/* Children with books */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-1">
            {['🧒', '👦'].map((child, i) => (
              <span
                key={i}
                className="text-4xl"
                style={{ animation: 'childSit 3s ease-in-out infinite', animationDelay: `${i * 0.5}s` }}
              >
                {child}
              </span>
            ))}
          </div>
          {/* Book */}
          <div
            className="text-4xl cursor-pointer transition-all duration-300 relative"
            onClick={() => {
              sound.playPop();
              setButterflyOut(true);
              sound.speakText('A butterfly flew out of the book! Books open new worlds!', { lang: 'hi-IN' });
              setTimeout(() => setButterflyOut(false), 2500);
            }}
            title="Tap the book"
          >
            📚
            {butterflyOut && (
              <span
                className="absolute -top-8 left-4 text-3xl pointer-events-none"
                style={{ animation: 'butterflyFly 2.5s ease-out forwards' }}
              >
                🦋
              </span>
            )}
          </div>
          <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 rounded-full">
            Tap book → 🦋!
          </span>
        </div>

        {/* Apple + Clock */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl" style={{ animation: 'gentleBounce2 2.5s ease-in-out infinite' }}>🍎</div>
          <div className="text-4xl" style={{ animation: clockTick % 2 === 0 ? undefined : 'tickTock 0.1s ease-in-out' }}>
            {clockEmoji}
          </div>
          <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 rounded-full">
            School time!
          </span>
        </div>
      </div>

      <style>{`
        @keyframes teacherBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes childSit { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-3deg)} 75%{transform:rotate(3deg)} }
        @keyframes butterflyFly { 0%{transform:translate(0,0) scale(1);opacity:1} 100%{transform:translate(40px,-60px) scale(1.5);opacity:0} }
        @keyframes gentleBounce2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes tickTock { 0%{transform:rotate(-5deg)} 100%{transform:rotate(5deg)} }
      `}</style>
    </div>
  );
};

// -----------------------------------------------------------------------
// Near / Far scene component (inline for completeness)
// -----------------------------------------------------------------------

export const StoryAnimation: React.FC<StoryAnimationProps> = ({
  sceneType,
  currentLanguage,
  nativeKeywords,
  chapterMeta,
}) => {
  const [camelPosition, setCamelPosition] = useState<'outside' | 'inside'>('outside');
  const [isRolling, setIsRolling] = useState(false);
  const [birdPosition, setBirdPosition] = useState<'top' | 'bottom'>('top');
  const [animalBounce, setAnimalBounce] = useState<'elephant' | 'puppy' | null>(null);

  const toggleCamel = () => {
    sound.playPop();
    setCamelPosition((prev) => (prev === 'outside' ? 'inside' : 'outside'));
    if (camelPosition === 'outside') {
      sound.speakText('Camel is going Inside the tent. Bhitri!', { lang: 'hi-IN' });
    } else {
      sound.speakText('Camel is going Outside the tent. Bahre!', { lang: 'hi-IN' });
    }
  };

  const triggerRoll = () => {
    sound.playPop();
    setIsRolling(true);
    sound.speakText('Rolling and sliding down the hill!', { lang: 'hi-IN' });
    setTimeout(() => setIsRolling(false), 2400);
  };

  const toggleBird = () => {
    sound.playPop();
    setBirdPosition((prev) => (prev === 'top' ? 'bottom' : 'top'));
  };

  // Determine general scene variant
  const generalVariant: GeneralVariant = chapterMeta
    ? getGeneralSceneVariant(chapterMeta)
    : 'village';

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-4 border-amber-300 bg-gradient-to-b from-sky-200 via-amber-100 to-emerald-100 shadow-xl p-4 sm:p-6 min-h-[340px] flex flex-col justify-between select-none">
      {/* Cartoon Background Elements (Clouds & Sun) */}
      <div className="absolute top-3 left-6 text-2xl animate-float-slow opacity-80 pointer-events-none">
        ☁️
      </div>
      <div className="absolute top-6 right-12 text-3xl animate-pulse-soft pointer-events-none">
        ☀️
      </div>
      <div className="absolute top-4 right-1/3 text-xl animate-float-slow opacity-70 pointer-events-none" style={{ animationDelay: '3s' }}>
        ☁️
      </div>

      {/* Header bar with Interactive Hint */}
      <div className="relative z-10 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-2xl border border-amber-300 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '4s' }} />
          <span className="text-xs font-black text-amber-950">
            Interactive Cartoon World • Tap to Play!
          </span>
        </div>

        {/* Action button for active scene */}
        {sceneType === 'inside_outside' && (
          <button
            onClick={toggleCamel}
            className="px-3 py-1.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-md press-bounce flex items-center gap-1.5 border border-amber-700"
          >
            <span>Move Camel: {camelPosition === 'outside' ? '👉 Go Inside (Bhitri)' : '👈 Go Outside (Bahre)'}</span>
          </button>
        )}

        {sceneType === 'rolling_sliding' && (
          <button
            onClick={triggerRoll}
            className="px-3 py-1.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md press-bounce flex items-center gap-1.5 border border-emerald-800"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Roll Ball & Slide Block!</span>
          </button>
        )}

        {sceneType === 'top_bottom' && (
          <button
            onClick={toggleBird}
            className="px-3 py-1.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs shadow-md press-bounce flex items-center gap-1.5 border border-sky-800"
          >
            <span>Bird Position: {birdPosition === 'top' ? 'Top (Chetan)' : 'Bottom (Latar)'}</span>
          </button>
        )}
      </div>

      {/* Main Interactive Scene Canvas */}
      <div className="relative my-4 flex-1 flex items-center justify-center min-h-[200px]">
        {/* =======================================================
            SCENE 1: INSIDE / OUTSIDE (THE ARAB & CAMEL IN TENT)
            ======================================================= */}
        {sceneType === 'inside_outside' && (
          <div className="w-full flex items-center justify-around gap-2 relative">
            {/* Outside Zone (Desert/Forest) */}
            <div className="flex-1 text-center flex flex-col items-center">
              <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-emerald-600 text-white mb-2 shadow-xs">
                Outside / ᱵᱟᱦᱨᱮ (Bahre)
              </span>

              {/* Camel Character */}
              <div
                onClick={() => {
                  sound.playPop();
                  sound.speakText('Camel is outside in the cool air! Bahre!', { lang: 'hi-IN' });
                }}
                className={`transition-all duration-700 cursor-pointer transform ${
                  camelPosition === 'outside'
                    ? 'scale-100 opacity-100 translate-x-0'
                    : 'scale-75 opacity-20 -translate-x-12'
                }`}
                title="Camel outside"
              >
                <div className="text-6xl sm:text-7xl animate-gentle-bounce">
                  🐪
                </div>
                <span className="text-xs font-black text-amber-950 bg-white/80 px-2 py-0.5 rounded-md border border-amber-300">
                  Unt (ᱩᱸᱴ / ऊँट)
                </span>
              </div>
            </div>

            {/* Tent Structure */}
            <div className="relative w-44 sm:w-56 h-48 bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-full border-4 border-amber-900 shadow-2xl flex flex-col items-center justify-end pb-3 text-center overflow-hidden">
              {/* Tent Stripes pattern */}
              <div className="absolute inset-0 opacity-15 flex justify-between">
                <div className="w-4 bg-white h-full"></div>
                <div className="w-4 bg-white h-full"></div>
                <div className="w-4 bg-white h-full"></div>
                <div className="w-4 bg-white h-full"></div>
              </div>

              <span className="absolute top-2 text-[11px] font-black uppercase text-amber-100 bg-amber-900/60 px-2 py-0.5 rounded-md">
                Tent / ᱛᱟᱹᱢᱵᱩ
              </span>

              {/* Inside Zone Characters */}
              <div className="relative z-10 flex items-center justify-center gap-1.5 bg-amber-900/40 p-2 rounded-2xl border border-amber-500/50">
                {/* Arab Character */}
                <div className="text-center">
                  <div className="text-4xl animate-bounce">
                    👳
                  </div>
                  <span className="text-[10px] font-bold text-amber-100">Arab</span>
                </div>

                {/* Camel Head peek when inside */}
                {camelPosition === 'inside' && (
                  <div className="text-center animate-fade-in">
                    <div className="text-4xl animate-wiggle">
                      🐪
                    </div>
                    <span className="text-[10px] font-bold text-amber-200">Unt</span>
                  </div>
                )}
              </div>

              <span className="mt-2 text-xs font-black px-2.5 py-1 rounded-xl bg-blue-600 text-white shadow-xs">
                Inside / ᱵᱷᱤᱛᱨᱤ (Bhitri)
              </span>
            </div>
          </div>
        )}

        {/* =======================================================
            SCENE 2: BIGGER & SMALLER (ELEPHANT VS PUPPY)
            ======================================================= */}
        {sceneType === 'big_small' && (
          <div className="w-full flex items-end justify-around gap-4">
            {/* Big Elephant */}
            <div
              onClick={() => {
                sound.playCorrect();
                setAnimalBounce('elephant');
                sound.speakText('Marang! Elephant is big! ᱢᱟᱨᱟᱝ / मरांग!', { lang: 'hi-IN' });
                setTimeout(() => setAnimalBounce(null), 800);
              }}
              className={`text-center cursor-pointer transition-transform ${
                animalBounce === 'elephant' ? 'scale-115' : 'hover:scale-105'
              }`}
            >
              <div className="text-7xl sm:text-8xl animate-gentle-bounce">
                🐘
              </div>
              <div className="mt-2 space-y-0.5">
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-sm inline-block">
                  BIGGER / ᱢᱟᱨᱟᱝ (Marang)
                </span>
                <p className="text-xs font-bold text-amber-950">Elephant (ᱦᱟᱹᱛᱤ / हाती)</p>
              </div>
            </div>

            {/* Small Puppy */}
            <div
              onClick={() => {
                sound.playPop();
                setAnimalBounce('puppy');
                sound.speakText('Katij! Puppy is small! ᱠᱟᱹᱴᱤᱡ / हुडिंग!', { lang: 'hi-IN' });
                setTimeout(() => setAnimalBounce(null), 800);
              }}
              className={`text-center cursor-pointer transition-transform ${
                animalBounce === 'puppy' ? 'scale-120' : 'hover:scale-105'
              }`}
            >
              <div className="text-4xl sm:text-5xl animate-bounce">
                🐶
              </div>
              <div className="mt-2 space-y-0.5">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-amber-950 font-black text-xs sm:text-sm shadow-sm inline-block">
                  SMALLER / ᱠᱟᱹᱴᱤᱡ (Katij)
                </span>
                <p className="text-xs font-bold text-amber-950">Puppy (ᱥᱮᱛᱟ / सेता)</p>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            SCENE 3: TOP & BOTTOM (BIRD ON SAL TREE VS MONKEY)
            ======================================================= */}
        {sceneType === 'top_bottom' && (
          <div className="w-full flex items-center justify-center gap-6">
            <div className="relative w-48 sm:w-64 h-56 flex flex-col items-center justify-between">
              {/* Tree Canopy (Top) */}
              <div className="relative w-36 h-24 bg-emerald-600 rounded-full border-4 border-emerald-800 shadow-md flex items-center justify-center">
                <span className="text-xs font-black text-white bg-emerald-900/70 px-2 py-0.5 rounded-md absolute top-1">
                  TOP / ᱪᱮᱛᱟᱱ (Chetan)
                </span>
                {birdPosition === 'top' && (
                  <div
                    onClick={() => {
                      sound.playCorrect();
                      sound.speakText('Bird is at the top of the Sal tree! Chetan!', { lang: 'hi-IN' });
                    }}
                    className="text-4xl animate-bounce cursor-pointer"
                    title="Parrot at top"
                  >
                    🦜
                  </div>
                )}
              </div>

              {/* Tree Trunk */}
              <div className="w-8 h-20 bg-amber-800 border-x-2 border-amber-950"></div>

              {/* Ground Roots (Bottom) */}
              <div className="relative w-48 h-12 bg-amber-700/80 rounded-full border-2 border-amber-900 flex items-center justify-center gap-3">
                <span className="text-xs font-black text-amber-100 bg-amber-950/70 px-2 py-0.5 rounded-md absolute -bottom-2">
                  BOTTOM / ᱞᱟᱛᱟᱨ (Latar)
                </span>
                <div
                  onClick={() => {
                    sound.playPop();
                    sound.speakText('Monkey is at the bottom! Latar!', { lang: 'hi-IN' });
                  }}
                  className="text-3xl animate-wiggle cursor-pointer"
                  title="Monkey at bottom"
                >
                  🐒
                </div>
                {birdPosition === 'bottom' && (
                  <div className="text-3xl animate-bounce">
                    🦜
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            SCENE 4: ROLLING & SLIDING
            ======================================================= */}
        {sceneType === 'rolling_sliding' && (
          <div className="w-full flex flex-col items-center">
            {/* Green Hill Ramp */}
            <div className="relative w-full max-w-md h-36 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-3xl border-3 border-emerald-700 shadow-inner overflow-hidden p-3 flex flex-col justify-between">
              {/* Slope lines */}
              <div className="absolute inset-0 bg-white/10 -skew-y-6"></div>

              {/* Rolling Football */}
              <div className="flex items-center justify-between z-10">
                <div
                  className={`flex items-center gap-2 transition-all duration-2000 ${
                    isRolling ? 'translate-x-64' : 'translate-x-0'
                  }`}
                >
                  <div className={`text-4xl ${isRolling ? 'animate-spin' : ''}`}>
                    ⚽
                  </div>
                  <span className="text-xs font-black px-2 py-0.5 rounded-md bg-blue-600 text-white">
                    ROLLING / ᱜᱩᱰᱨᱟᱹᱣ (Gudrau)
                  </span>
                </div>
              </div>

              {/* Sliding Slate Box */}
              <div className="flex items-center justify-between z-10">
                <div
                  className={`flex items-center gap-2 transition-all duration-2000 ${
                    isRolling ? 'translate-x-64' : 'translate-x-0'
                  }`}
                >
                  <div className="text-4xl">
                    📦
                  </div>
                  <span className="text-xs font-black px-2 py-0.5 rounded-md bg-orange-600 text-white">
                    SLIDING / ᱥᱤᱫᱩᱲ (Sidur)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            SCENE 5: NEAR / FAR
            ======================================================= */}
        {sceneType === 'near_far' && (
          <div className="w-full flex items-center justify-between gap-4 px-4">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                sound.playPop();
                sound.speakText('Near! Lagit! This house is very near!', { lang: 'hi-IN' });
              }}
            >
              <div className="text-7xl animate-gentle-bounce">🏠</div>
              <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-emerald-600 text-white mt-2 shadow-xs">
                NEAR / ᱞᱟᱜᱤᱛ (Lagit)
              </span>
            </div>
            <div className="text-4xl font-black text-amber-500">↔️</div>
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => {
                sound.playPop();
                sound.speakText('Far! Dure! That mountain is very far away!', { lang: 'hi-IN' });
              }}
            >
              <div className="text-4xl animate-bounce opacity-60">🏔️</div>
              <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-sky-600 text-white mt-2 shadow-xs">
                FAR / ᱫᱩᱨᱮ (Dure)
              </span>
            </div>
          </div>
        )}

        {/* =======================================================
            GENERAL SCENE — 8 Rich Animated Variants
            ======================================================= */}
        {sceneType === 'general' && (
          <div className="w-full">
            {generalVariant === 'village' && <VillageScene />}
            {generalVariant === 'sarhul' && <SarhulScene />}
            {generalVariant === 'forest' && <ForestScene />}
            {generalVariant === 'river' && <RiverScene />}
            {generalVariant === 'counting' && <CountingScene />}
            {generalVariant === 'letters' && <LettersScene />}
            {generalVariant === 'heroes' && <HeroesScene />}
            {generalVariant === 'school' && <SchoolScene />}
          </div>
        )}
      </div>

      {/* Vocabulary Keyword Pills Row */}
      {nativeKeywords && nativeKeywords.length > 0 && (
        <div className="relative z-10 flex items-center justify-center flex-wrap gap-2 pt-2 border-t border-amber-300/80">
          {nativeKeywords.map((kw, i) => (
            <button
              key={i}
              onClick={() => {
                sound.playPop();
                sound.speakText(`${kw.transliteration}. Hindi me: ${kw.hindi}. English: ${kw.english}.`, {
                  lang: 'hi-IN',
                  pitch: 1.2,
                });
              }}
              className="bg-white/95 hover:bg-amber-100 text-amber-950 px-3 py-1 rounded-xl text-xs font-black border border-amber-300 shadow-xs flex items-center gap-1.5 transition-colors press-bounce"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              <span>{kw.native}</span>
              <span className="text-amber-700 opacity-90">({kw.transliteration} = {kw.hindi})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
