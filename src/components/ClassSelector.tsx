import React from 'react';
import { Volume2, Sparkles, ChevronRight } from 'lucide-react';
import { CLASSES } from '../data/curriculum';
import { LanguageId } from '../types';
import { LANGUAGES } from '../data/languages';
import { Mascot } from './Mascot';
import { sound } from '../utils/audio';

interface ClassSelectorProps {
  currentLanguage: LanguageId;
  onSelectClass: (classNum: number) => void;
  selectedClass: number;
}

export const ClassSelector: React.FC<ClassSelectorProps> = ({
  currentLanguage,
  onSelectClass,
  selectedClass,
}) => {
  const langConfig = LANGUAGES[currentLanguage];

  const handleClassPick = (classNum: number) => {
    sound.playPop();
    const classInfo = CLASSES.find((c) => c.classNumber === classNum);
    if (classInfo) {
      sound.speakText(`Class ${classNum}. ${classInfo.animal}`, {
        lang: 'hi-IN',
        pitch: 1.2,
      });
    }
    onSelectClass(classNum);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Mascot Header */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
        <Mascot
          speechText="ᱚᱠᱟ ᱪᱟᱱᱟᱪ ᱨᱮᱢ ᱯᱟᱲᱦᱟᱣ-ᱟ? (Which class are you in?)"
          speechTransliteration="Choose your Class (1 to 5) with animal friends!"
          size="md"
          audioSpeechText="Oka chanach rem parha-a? Choose your class!"
        />
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-amber-950 tracking-tight">
          Choose Your Class (ᱪᱟᱱᱟᱪ / कक्षा)
        </h2>
        <p className="text-sm font-semibold text-amber-800">
          Official JCERT Primary School Textbooks for Jharkhand
        </p>
      </div>

      {/* 5 Big Animal-Themed Class Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {CLASSES.map((cls) => {
          const isSelected = selectedClass === cls.classNumber;
          return (
            <button
              key={cls.classNumber}
              onClick={() => handleClassPick(cls.classNumber)}
              className={`relative rounded-3xl p-5 border-4 transition-all duration-200 text-left flex flex-col justify-between shadow-lg press-bounce cursor-pointer group ${
                isSelected
                  ? 'bg-amber-100 border-amber-600 ring-4 ring-amber-300 scale-102'
                  : 'bg-white hover:bg-amber-50 border-amber-300 hover:border-amber-500'
              }`}
              aria-label={`Select Class ${cls.classNumber}`}
            >
              {/* Animal & Class Number Header */}
              <div className="flex items-center justify-between">
                <span className="text-4xl sm:text-5xl group-hover:scale-125 transition-transform duration-200">
                  {cls.animalEmoji}
                </span>

                <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-amber-600 flex items-center justify-center text-amber-950 font-black text-2xl shadow-inner">
                  {cls.classNumber}
                </div>
              </div>

              {/* Class Titles */}
              <div className="my-3 space-y-1">
                <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 border border-amber-300">
                  Class {cls.classNumber}
                </span>

                <h3 className="text-lg sm:text-xl font-black text-amber-950">
                  {cls.label}
                </h3>

                <p className="text-xs text-slate-600 font-bold">
                  {cls.animal}
                </p>
              </div>

              {/* Action row */}
              <div className="flex items-center justify-between pt-2 border-t border-amber-200 text-xs font-black text-amber-900">
                <span>Open Books</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
