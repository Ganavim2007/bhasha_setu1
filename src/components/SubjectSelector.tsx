import React from 'react';
import { ChevronRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { getSubjectsForClass } from '../data/curriculum';
import { LanguageId } from '../types';
import { sound } from '../utils/audio';
import { Mascot } from './Mascot';

interface SubjectSelectorProps {
  currentLanguage: LanguageId;
  selectedClass: number;
  selectedSubject: string;
  onSelectSubject: (subjectId: 'maths' | 'hindi' | 'evs' | 'english') => void;
}

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  currentLanguage,
  selectedClass,
  selectedSubject,
  onSelectSubject,
}) => {
  const subjects = getSubjectsForClass(selectedClass);

  const handleSubjectPick = (subjectId: 'maths' | 'hindi' | 'evs' | 'english', name: string) => {
    sound.playPop();
    sound.speakText(name, { lang: 'hi-IN', pitch: 1.15 });
    onSelectSubject(subjectId);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Mascot Header */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
        <Mascot
          speechText={`Class ${selectedClass} - ᱵᱤᱥᱚᱭ ᱵᱟᱪᱷᱟᱣ ᱢᱮ! (Pick your subject!)`}
          speechTransliteration="Choose your official JCERT Jharkhand textbook to start learning."
          size="md"
          audioSpeechText={`Class ${selectedClass}. Which official textbook do you want to learn?`}
        />
      </div>

      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-xs font-black text-emerald-900 mb-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Official Jharkhand JCERT Primary Textbooks</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-amber-950 tracking-tight">
          Choose Subject for Class {selectedClass}
        </h2>
        <p className="text-sm font-semibold text-amber-800">
          Source: Jharkhand Council of Educational Research & Training (JCERT)
        </p>
      </div>

      {/* Subject Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {subjects.map((sub) => {
          const isSelected = selectedSubject === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => handleSubjectPick(sub.id, sub.bookTitle)}
              className={`p-6 rounded-3xl border-4 transition-all duration-200 text-left flex items-center justify-between shadow-xl press-bounce cursor-pointer group ${
                isSelected
                  ? 'bg-amber-100 border-amber-600 ring-4 ring-amber-300 scale-102'
                  : 'bg-white hover:bg-amber-50 border-amber-300 hover:border-amber-500'
              }`}
              aria-label={`Select subject ${sub.bookTitle}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-200 border-2 border-amber-400 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform shadow-inner">
                  {sub.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-200 text-amber-950 border border-amber-300">
                      {sub.chapterCount} {sub.id === 'english' ? 'Units' : 'Chapters'}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      JCERT State
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-amber-950 mt-1">
                    {sub.bookTitle}
                  </h3>
                  <p className="text-sm font-bold text-amber-800">
                    {sub.name} • {sub.hindiName}
                  </p>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    {sub.description}
                  </p>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full bg-amber-200 group-hover:bg-amber-300 flex items-center justify-center text-amber-900 transition-colors">
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
