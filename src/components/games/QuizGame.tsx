import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

interface QuizQuestion {
  id: string;
  question: {
    native: string;
    transliteration: string;
    hindi: string;
    english: string;
  };
  options: Array<{
    id: string;
    text: string;
    emoji?: string;
    isCorrect: boolean;
  }>;
  explanation: string;
}

interface QuizGameProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ questions, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const currentQ = questions[currentIdx];

  const handlePickOption = (option: { id: string; text: string; isCorrect: boolean }) => {
    if (selectedOptionId !== null) return; // already picked
    setSelectedOptionId(option.id);

    if (option.isCorrect) {
      sound.playCorrect();
      setScore((s) => s + 1);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    } else {
      sound.playBoing();
    }

    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx((idx) => idx + 1);
        setSelectedOptionId(null);
      } else {
        setIsDone(true);
        sound.playCelebration();
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
        onComplete(score + (option.isCorrect ? 1 : 0));
      }
    }, 2200);
  };

  const handleReset = () => {
    sound.playPop();
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setScore(0);
    setIsDone(false);
  };

  if (!currentQ && !isDone) return null;

  return (
    <div className="space-y-6">
      {!isDone && currentQ && (
        <div className="bg-white/95 rounded-3xl p-6 border-3 border-amber-300 shadow-md space-y-4">
          <div className="flex items-center justify-between text-xs font-black text-amber-900 border-b pb-2 border-amber-200">
            <span>Question {currentIdx + 1} of {questions.length}</span>
            <span>⭐ Score: {score}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentIdx) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="space-y-1 text-center">
            <h4 className="text-lg sm:text-xl font-black text-amber-950">
              {currentQ.question.native}
            </h4>
            <p className="text-xs sm:text-sm font-bold text-amber-800">
              {currentQ.question.transliteration} • {currentQ.question.hindi}
            </p>
          </div>

          {/* Listen button */}
          <div className="text-center">
            <button
              onClick={() => {
                sound.playPop();
                sound.speakText(currentQ.question.hindi, { lang: 'hi-IN', pitch: 1.15 });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold border border-amber-300"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>सुनें / Listen</span>
            </button>
          </div>

          {/* Option Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const answered = selectedOptionId !== null;

              // Colour logic — FIXED:
              // - If user picked this AND it is correct → green ✅
              // - If user picked this AND it is wrong → red ❌
              // - If answered AND this is the correct one AND user didn't pick it → amber hint (show correct after wrong pick)
              // - Otherwise → default amber
              let tileClass = 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-950';
              if (isSelected && opt.isCorrect) {
                tileClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300 scale-105';
              } else if (isSelected && !opt.isCorrect) {
                tileClass = 'bg-red-100 border-red-500 text-red-950 ring-2 ring-red-300';
              } else if (answered && opt.isCorrect) {
                // Show where correct answer was (only after wrong pick)
                tileClass = 'bg-amber-200 border-amber-500 text-amber-950 ring-2 ring-amber-400';
              }

              return (
                <button
                  key={opt.id}
                  disabled={answered}
                  onClick={() => handlePickOption(opt)}
                  className={`p-4 rounded-2xl border-3 flex flex-col items-center justify-center text-center shadow-md press-bounce transition-all duration-200 ${tileClass}`}
                  aria-label={`Option: ${opt.text}`}
                >
                  {opt.emoji && <span className="text-4xl mb-1">{opt.emoji}</span>}
                  <span className="text-sm font-black">{opt.text}</span>

                  {isSelected && opt.isCorrect && (
                    <div className="flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="text-xs font-black text-emerald-700">सही! Correct!</span>
                    </div>
                  )}
                  {isSelected && !opt.isCorrect && (
                    <div className="flex items-center gap-1 mt-1">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="text-xs font-black text-red-700">गलत! Wrong!</span>
                    </div>
                  )}
                  {answered && opt.isCorrect && !isSelected && (
                    <div className="flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-amber-700" />
                      <span className="text-[11px] font-bold text-amber-800">सही उत्तर / Right Answer</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {selectedOptionId !== null && (
            <div className={`p-3 rounded-2xl text-center text-sm font-bold animate-fade-in border-2 ${
              currentQ.options.find(o => o.id === selectedOptionId)?.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-red-50 border-red-300 text-red-950'
            }`}>
              {currentQ.options.find(o => o.id === selectedOptionId)?.isCorrect
                ? '🌟 शाबाश! '
                : '💡 '}
              {currentQ.explanation}
            </div>
          )}
        </div>
      )}

      {isDone && (
        <div className="bg-emerald-100 border-4 border-emerald-400 rounded-3xl p-8 text-center space-y-4">
          <div className="text-6xl">🏆 🌟 🎊</div>
          <h3 className="text-2xl font-black text-emerald-950">
            ᱠᱩᱭᱤᱡᱽ ᱢᱩᱪᱟᱹᱫ! Quiz Finished!
          </h3>
          <p className="text-xl font-black text-emerald-900">
            {score} / {questions.length} Correct!
          </p>
          <div className="w-full bg-emerald-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-1000"
              style={{ width: `${(score / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-sm font-bold text-emerald-800">
            {score === questions.length
              ? '🎯 Perfect score! You are a champion!'
              : score >= questions.length / 2
              ? '👍 Good effort! Try again to get a perfect score!'
              : '💪 Keep practising! You will get better!'}
          </p>
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg press-bounce inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
};
