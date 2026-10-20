/**
 * Pure business logic for games, progression, star scoring, curriculum filtering,
 * and dynamic chapter slide/game data generation.
 * Decoupled from React DOM for fast unit testing.
 */

import { Chapter, LanguageId, LessonSlide, ChapterGameData } from '../types/index.ts';

export interface DragItemRule {
  id: string;
  correctZone: string;
}

export function validateDragPlacement(
  itemId: string,
  targetZone: string,
  items: DragItemRule[]
): boolean {
  const item = items.find((i) => i.id === itemId);
  if (!item) return false;
  return item.correctZone === targetZone;
}

export function checkMatchingComplete(matchedPairIds: string[], totalPairsCount: number): boolean {
  if (totalPairsCount <= 0) return false;
  const uniqueMatches = new Set(matchedPairIds);
  return uniqueMatches.size === totalPairsCount;
}

export function calculateStarRewards(correctAnswers: number, totalItems: number): number {
  if (totalItems <= 0 || correctAnswers <= 0) return 0;
  const ratio = correctAnswers / totalItems;
  if (ratio >= 0.8) return 3; // 3 stars for 80%+
  if (ratio >= 0.5) return 2; // 2 stars for 50%+
  return 1; // 1 star for participation
}

export function checkStickerUnlocks(
  currentTotalStars: number,
  alreadyUnlockedIds: string[],
  allStickers: Array<{ id: string; unlockedAtStars: number }>
): string[] {
  const newlyUnlocked: string[] = [];
  for (const sticker of allStickers) {
    if (currentTotalStars >= sticker.unlockedAtStars && !alreadyUnlockedIds.includes(sticker.id)) {
      newlyUnlocked.push(sticker.id);
    }
  }
  return newlyUnlocked;
}

export function filterCurriculum(
  chapters: Array<{ classNumber: number; subjectId: string; id: string }>,
  classNumber: number,
  subjectId: string
): Array<{ classNumber: number; subjectId: string; id: string }> {
  return chapters.filter(
    (ch) => ch.classNumber === classNumber && ch.subjectId === subjectId
  );
}

export function formatScriptText(
  text: string,
  script: 'olchiki' | 'warangchiti' | 'devanagari' | 'roman' | 'mundaribani'
): { text: string; cssClass: string } {
  switch (script) {
    case 'olchiki':
      return { text, cssClass: 'font-olchiki' };
    case 'warangchiti':
      return { text, cssClass: 'font-warangchiti' };
    case 'devanagari':
    case 'mundaribani':
      return { text, cssClass: 'font-devanagari' };
    default:
      return { text, cssClass: 'font-cartoon' };
  }
}

/**
 * Returns effective lesson slides for any chapter.
 * If pre-curated slides exist, returns them.
 * Otherwise, generates structured, interactive slides using the chapter's native title,
 * script, transliterations, and bridge language context.
 */
export function getEffectiveChapterSlides(
  chapter: Chapter,
  lang: LanguageId
): LessonSlide[] {
  const langData = chapter.languages[lang] || chapter.languages['santali'];
  if (langData?.lessonSlides && langData.lessonSlides.length > 0) {
    return langData.lessonSlides;
  }

  const nativeTitle = langData?.scriptText || langData?.title || chapter.originalTitleHindi;
  const translit = langData?.transliteration || chapter.originalTitleEnglish;
  const hindiTitle = chapter.originalTitleHindi;
  const engTitle = chapter.originalTitleEnglish;
  const book = chapter.bookName;

  return [
    {
      id: `${chapter.id}-gen-s1`,
      conceptKey: 'chapter_intro',
      native: `${nativeTitle}`,
      transliteration: `${translit}`,
      alternateTransliteration: langData?.alternateTransliteration,
      hindi: `पाठ ${chapter.chapterNumber}: ${hindiTitle} • ${book}`,
      english: `Chapter ${chapter.chapterNumber}: ${engTitle} • ${book}`,
      audioPhonetic: `${translit}. ${hindiTitle}.`,
      sceneType: chapter.subjectId === 'maths' ? 'rolling_sliding' : 'general',
      visualHint: `Official JCERT Chapter ${chapter.chapterNumber} from ${book} with interactive cartoon scenes and tribal mother tongue learning visuals.`,
      keywords: [
        { native: nativeTitle, transliteration: translit, hindi: hindiTitle, english: engTitle },
        { native: 'ᱥᱮᱪᱮᱫ / ᱮᱱᱮᱡ', transliteration: 'Seched / Enej', hindi: 'सीखना और खेल', english: 'Learn & Play' },
        { native: 'ᱟᱹᱛᱩ ᱟᱥᱲᱟ', transliteration: 'Aatu Asra', hindi: 'गाँव का विद्यालय', english: 'Village School' },
      ],
    },
    {
      id: `${chapter.id}-gen-s2`,
      conceptKey: 'key_concepts',
      native: `ᱢᱩᱬᱩᱛ ᱠᱟᱛᱷᱟ : ${nativeTitle}`,
      transliteration: `Munrut Katha: ${translit}`,
      alternateTransliteration: langData?.alternateTransliteration,
      hindi: `इस अध्याय में हम ${hindiTitle} के मुख्य विचारों को मातृभाषा में चित्रों और कहानियों के साथ सीखते हैं।`,
      english: `In this chapter we explore key concepts of ${engTitle} in tribal mother tongue with bridge language support.`,
      audioPhonetic: `Abo do ${translit} baabotte bes lekate bon aayatt-a.`,
      sceneType: 'general',
      visualHint: `Chotu the deer mascot guides children through concepts of ${engTitle} with animations.`,
      keywords: [
        { native: 'ᱢᱩᱬᱩᱛ', transliteration: 'Munrut', hindi: 'मुख्य', english: 'Key / Main' },
        { native: 'ᱠᱟᱛᱷᱟ', transliteration: 'Katha', hindi: 'विचार', english: 'Concept' },
        { native: 'ᱥᱟᱨᱦᱟᱣ', transliteration: 'Sarhaw', hindi: 'धन्यवाद', english: 'Welcome' },
      ],
    },
  ];
}

/**
 * Returns effective interactive game data for any chapter.
 * Guarantees playable games across all 221 chapters.
 */
export function getEffectiveGameData(
  chapter: Chapter,
  lang: LanguageId
): ChapterGameData {
  const langData = chapter.languages[lang] || chapter.languages['santali'];
  if (langData?.gameData && Object.keys(langData.gameData).length > 0) {
    return langData.gameData;
  }

  const nativeTitle = langData?.scriptText || langData?.title || chapter.originalTitleHindi;
  const translit = langData?.transliteration || chapter.originalTitleEnglish;
  const hindiTitle = chapter.originalTitleHindi;
  const classNum = chapter.classNumber;

  // Subject-specific drag-drop zones and items
  const dragDropData = chapter.subjectId === 'maths'
    ? {
        instruction: {
          native: 'ᱢᱟᱨᱟᱝ ᱟᱨ ᱠᱟᱹᱴᱤᱡ ᱪᱤᱠᱟᱹᱱᱟᱜ ᱵᱟᱱᱟᱣ ᱢᱮ!',
          transliteration: 'Marang ar Katij chikanag banaw me!',
          hindi: 'बड़ी और छोटी वस्तुओं को सही जगह रखो!',
          english: 'Sort big and small objects into the correct group!',
        },
        zones: [
          { id: 'big', label: { native: 'ᱢᱟᱨᱟᱝ (Marang)', transliteration: 'Marang', hindi: 'बड़ा', english: 'Big' }, color: 'bg-emerald-500' },
          { id: 'small', label: { native: 'ᱠᱟᱹᱴᱤᱡ (Katij)', transliteration: 'Katij', hindi: 'छोटा', english: 'Small' }, color: 'bg-amber-500' },
        ],
        items: [
          { id: 'd1', name: { native: 'ᱦᱟᱹᱛᱤ', transliteration: 'Hati', hindi: 'हाथी', english: 'Elephant' }, emoji: '🐘', correctZone: 'big' as const },
          { id: 'd2', name: { native: 'ᱥᱮᱛᱟ', transliteration: 'Seta', hindi: 'कुत्ता', english: 'Dog' }, emoji: '🐶', correctZone: 'small' as const },
          { id: 'd3', name: { native: 'ᱠᱚᱞᱚ', transliteration: 'Kolo', hindi: 'बैल', english: 'Bull' }, emoji: '🐂', correctZone: 'big' as const },
          { id: 'd4', name: { native: 'ᱪᱤᱪᱤ', transliteration: 'Chichi', hindi: 'चूहा', english: 'Mouse' }, emoji: '🐭', correctZone: 'small' as const },
        ],
      }
    : chapter.subjectId === 'evs'
    ? {
        instruction: {
          native: 'ᱡᱤᱣᱤᱛ ᱟᱨ ᱩᱬᱩᱛ ᱪᱤᱠᱟᱹᱱᱟᱜ ᱵᱟᱱᱟᱣ ᱢᱮ!',
          transliteration: 'Jivit ar Unut chikanag banaw me!',
          hindi: 'सजीव और निर्जीव वस्तुओं को अलग करो!',
          english: 'Sort living and non-living things!',
        },
        zones: [
          { id: 'living', label: { native: 'ᱡᱤᱣᱤᱛ (Jivit)', transliteration: 'Jivit', hindi: 'सजीव', english: 'Living' }, color: 'bg-emerald-500' },
          { id: 'nonliving', label: { native: 'ᱩᱬᱩᱛ (Unut)', transliteration: 'Unut', hindi: 'निर्जीव', english: 'Non-Living' }, color: 'bg-slate-500' },
        ],
        items: [
          { id: 'd1', name: { native: 'ᱥᱟᱨᱡᱚᱢ', transliteration: 'Sarjom', hindi: 'साल का पेड़', english: 'Sal Tree' }, emoji: '🌳', correctZone: 'living' as const },
          { id: 'd2', name: { native: 'ᱯᱟᱹᱛᱷᱟᱨ', transliteration: 'Pathar', hindi: 'पत्थर', english: 'Stone' }, emoji: '🪨', correctZone: 'nonliving' as const },
          { id: 'd3', name: { native: 'ᱥᱤᱧ', transliteration: 'Sing', hindi: 'सूरज', english: 'Sun' }, emoji: '☀️', correctZone: 'nonliving' as const },
          { id: 'd4', name: { native: 'ᱵᱟᱜ', transliteration: 'Bag', hindi: 'बाघ', english: 'Tiger' }, emoji: '🐯', correctZone: 'living' as const },
        ],
      }
    : {
        instruction: {
          native: 'ᱡᱟᱦᱟᱸ ᱟᱸᱛᱨᱮ ᱟᱨ ᱥᱠᱩᱞ ᱨᱮ ᱜᱮ ᱡᱤᱱᱤᱥ ᱠᱚ ᱵᱟᱱᱟᱣ ᱢᱮ!',
          transliteration: 'Jahar antre ar school re ge jinis ko banaw me!',
          hindi: 'घर और स्कूल की चीज़ों को अलग करो!',
          english: 'Sort items belonging to home and school!',
        },
        zones: [
          { id: 'home', label: { native: 'ᱜᱷᱟᱸᱨ (Ghar)', transliteration: 'Ghar', hindi: 'घर', english: 'Home' }, color: 'bg-amber-500' },
          { id: 'school', label: { native: 'ᱟᱥᱲᱟ (Asra)', transliteration: 'Asra', hindi: 'स्कूल', english: 'School' }, color: 'bg-blue-500' },
        ],
        items: [
          { id: 'd1', name: { native: 'ᱠᱤᱛᱟᱹᱵ', transliteration: 'Kitab', hindi: 'किताब', english: 'Book' }, emoji: '📚', correctZone: 'school' as const },
          { id: 'd2', name: { native: 'ᱦᱟᱸᱰᱤ', transliteration: 'Handi', hindi: 'हाँडी', english: 'Pot' }, emoji: '🍯', correctZone: 'home' as const },
          { id: 'd3', name: { native: 'ᱠᱚᱞᱚᱢ', transliteration: 'Kolom', hindi: 'कलम', english: 'Pen' }, emoji: '✏️', correctZone: 'school' as const },
          { id: 'd4', name: { native: 'ᱵᱤᱥᱛᱟᱨ', transliteration: 'Bistar', hindi: 'बिस्तर', english: 'Bed' }, emoji: '🛏️', correctZone: 'home' as const },
        ],
      };

  // Subject-specific quiz with 4 options and plausible wrong answers
  const quizQuestions = chapter.subjectId === 'maths'
    ? [
        {
          id: 'q1',
          question: {
            native: `${classNum} ᱟᱨ ${classNum + 1} ᱨᱮᱱᱟᱜ ᱠᱚᱱ ᱢᱟᱨᱟᱝ ᱠᱟᱱᱟ?`,
            transliteration: `${classNum} ar ${classNum + 1} renag kon marang kana?`,
            hindi: `${classNum} और ${classNum + 1} में कौन बड़ा है?`,
            english: `Which is bigger: ${classNum} or ${classNum + 1}?`,
          },
          options: [
            { id: 'o1', text: `${classNum + 1}`, emoji: '🔢', isCorrect: true },
            { id: 'o2', text: `${classNum}`, emoji: '🔢', isCorrect: false },
            { id: 'o3', text: 'दोनों बराबर हैं / Equal', emoji: '⚖️', isCorrect: false },
            { id: 'o4', text: "पता नहीं / Don't Know", emoji: '🤷', isCorrect: false },
          ],
          explanation: `${classNum + 1} बड़ा है क्योंकि यह ${classNum} के बाद आता है। (${classNum + 1} comes after ${classNum}, so it is bigger.)`,
        },
        {
          id: 'q2',
          question: {
            native: '5 ᱡᱟᱢ ᱠᱟᱱᱟ। 2 ᱡᱟᱢ ᱠᱷᱟᱤᱞᱮᱫ ᱦᱚᱲ। ᱜᱮᱞ ᱠᱮᱫ?',
            transliteration: '5 jam kana. 2 jam khailed hora. Gel ked?',
            hindi: '5 सेब हैं। अगर 2 खा लिए, तो कितने बचे?',
            english: 'There are 5 apples. You eat 2. How many are left?',
          },
          options: [
            { id: 'o1', text: '3', emoji: '🍎🍎🍎', isCorrect: true },
            { id: 'o2', text: '2', emoji: '🍎🍎', isCorrect: false },
            { id: 'o3', text: '7', emoji: '🍎🍎🍎🍎🍎🍎🍎', isCorrect: false },
            { id: 'o4', text: '5', emoji: '🍎🍎🍎🍎🍎', isCorrect: false },
          ],
          explanation: '5 - 2 = 3 🍎🍎🍎 (पाँच में से दो घटाओ, तीन बचते हैं / Five minus two equals three!)',
        },
        {
          id: 'q3',
          question: {
            native: 'ᱦᱟᱹᱛᱤ ᱟᱨ ᱥᱮᱛᱟ ᱨᱮᱱᱟᱜ ᱠᱚᱱ ᱢᱟᱨᱟᱝ (Marang)?',
            transliteration: 'Hati ar Seta renag kon Marang?',
            hindi: 'हाथी और कुत्ते में कौन बड़ा (Marang) है?',
            english: 'Which is bigger (Marang): the elephant or the dog?',
          },
          options: [
            { id: 'o1', text: 'हाथी / Elephant', emoji: '🐘', isCorrect: true },
            { id: 'o2', text: 'कुत्ता / Dog', emoji: '🐶', isCorrect: false },
            { id: 'o3', text: 'दोनों बराबर', emoji: '⚖️', isCorrect: false },
            { id: 'o4', text: 'कुत्ता बड़ा है', emoji: '🐕', isCorrect: false },
          ],
          explanation: 'हाथी (ᱦᱟᱹᱛᱤ / Hati) बड़ा है! Elephant is much bigger than a dog. ᱢᱟᱨᱟᱝ!',
        },
      ]
    : chapter.subjectId === 'hindi' || chapter.subjectId === 'english'
    ? [
        {
          id: 'q1',
          question: {
            native: `ᱱᱚᱶᱟ ᱪᱮᱯᱴᱟᱨ ᱨᱮᱱᱟᱜ ᱧᱩᱛᱩᱢ ᱠᱚᱱ ᱠᱟᱱᱟ? (${nativeTitle})`,
            transliteration: 'Nowa chapter renag nyutum kon kana?',
            hindi: `इस अध्याय का नाम क्या है? "${hindiTitle}"`,
            english: `What is the name of this chapter? "${chapter.originalTitleEnglish}"`,
          },
          options: [
            { id: 'o1', text: hindiTitle, emoji: chapter.coverEmoji || '📖', isCorrect: true },
            { id: 'o2', text: 'रंग-बिरंगी दुनिया', emoji: '🌈', isCorrect: false },
            { id: 'o3', text: 'गिनती का खेल', emoji: '🔢', isCorrect: false },
            { id: 'o4', text: 'जंगल की कहानी', emoji: '🌳', isCorrect: false },
          ],
          explanation: `इस अध्याय का नाम "${hindiTitle}" है। (The chapter name is "${chapter.originalTitleEnglish}")`,
        },
        {
          id: 'q2',
          question: {
            native: 'ᱟᱹᱛᱩ ᱟᱥᱲᱟ ᱨᱮ ᱠᱩᱣᱟᱹ ᱠᱚ ᱥᱮᱪᱮᱫ ᱟᱠᱟᱫ ᱠᱟᱱᱟ?',
            transliteration: 'Aatu asra re kuwa ko seched akada kana?',
            hindi: 'स्कूल में हम क्या सीखते हैं?',
            english: 'What do we learn in school?',
          },
          options: [
            { id: 'o1', text: 'पढ़ना-लिखना / Reading & Writing', emoji: '📚', isCorrect: true },
            { id: 'o2', text: 'सोना / Sleeping', emoji: '😴', isCorrect: false },
            { id: 'o3', text: 'खाना बनाना / Cooking', emoji: '🍳', isCorrect: false },
            { id: 'o4', text: 'सिर्फ खेलना / Only Playing', emoji: '⚽', isCorrect: false },
          ],
          explanation: 'स्कूल में हम पढ़ना-लिखना, गिनना, और नई बातें सीखते हैं! (At school we learn reading, writing and counting!)',
        },
        {
          id: 'q3',
          question: {
            native: 'ᱥᱟᱨᱡᱚᱢ ᱫᱟᱨᱮ ᱠᱟᱱᱟ ᱠᱚᱱ?',
            transliteration: 'Sarjom dare kana kon?',
            hindi: 'सखुआ (साल) एक ___ है।',
            english: 'Sarjom (Sal) is a ___.',
          },
          options: [
            { id: 'o1', text: 'पेड़ / Tree', emoji: '🌳', isCorrect: true },
            { id: 'o2', text: 'जानवर / Animal', emoji: '🦁', isCorrect: false },
            { id: 'o3', text: 'नदी / River', emoji: '🌊', isCorrect: false },
            { id: 'o4', text: 'पहाड़ / Mountain', emoji: '⛰️', isCorrect: false },
          ],
          explanation: "सखुआ (Sarjom / ᱥᱟᱨᱡᱚᱢ) झारखंड का राजकीय वृक्ष है! Sal tree is Jharkhand's state tree!",
        },
      ]
    : [
        // EVS chapters
        {
          id: 'q1',
          question: {
            native: 'ᱵᱤᱨ ᱨᱮᱱᱟᱜ ᱵᱷᱩᱢᱤ ᱯᱤᱞᱪᱩ ᱧᱩᱥᱩᱡ ᱠᱚᱱ ᱠᱟᱱᱟ?',
            transliteration: 'Bir renag bhumi pilchu nyusuj kon kana?',
            hindi: 'झारखंड के जंगल में कौन सा पेड़ सबसे पवित्र माना जाता है?',
            english: 'Which tree is considered most sacred in Jharkhand forests?',
          },
          options: [
            { id: 'o1', text: 'साल / सखुआ (Sarjom)', emoji: '🌳', isCorrect: true },
            { id: 'o2', text: 'आम / Mango', emoji: '🥭', isCorrect: false },
            { id: 'o3', text: 'केला / Banana', emoji: '🍌', isCorrect: false },
            { id: 'o4', text: 'नारियल / Coconut', emoji: '🥥', isCorrect: false },
          ],
          explanation: 'साल (सखुआ / Sarjom / ᱥᱟᱨᱡᱚᱢ) झारखंड का राजकीय एवं पवित्र वृक्ष है! Sal is the sacred state tree of Jharkhand!',
        },
        {
          id: 'q2',
          question: {
            native: 'ᱫᱟᱜ ᱠᱟᱱᱟ ᱡᱤᱣᱟᱹ ᱞᱟᱹᱜᱤᱫ ᱠᱷᱤᱲᱟᱹ?',
            transliteration: 'Dak kana jiva lagid khira?',
            hindi: 'पानी (ᱫᱟᱜ) किसके लिए जरूरी है?',
            english: 'Water (Dak) is necessary for ___?',
          },
          options: [
            { id: 'o1', text: 'सभी जीव-जंतुओं के लिए / All Living Things', emoji: '🌱', isCorrect: true },
            { id: 'o2', text: 'केवल मछली के लिए / Only Fish', emoji: '🐟', isCorrect: false },
            { id: 'o3', text: 'केवल इंसान के लिए / Only Humans', emoji: '🧑', isCorrect: false },
            { id: 'o4', text: 'किसी के लिए नहीं / Nobody', emoji: '❌', isCorrect: false },
          ],
          explanation: 'पानी (Dak / ᱫᱟᱜ) सभी जीव-जंतुओं, पेड़-पौधों और इंसानों के लिए जरूरी है! Water is essential for all life!',
        },
        {
          id: 'q3',
          question: {
            native: 'ᱥᱟᱨᱦᱩᱞ ᱯᱩᱨᱵᱽ ᱢᱮᱱᱟᱭ ᱠᱮᱫ ᱠᱷᱱ ᱱᱚᱶᱟ?',
            transliteration: 'Sarhul Porob menay ked khon nowa?',
            hindi: 'सरहुल पर्व कब मनाया जाता है?',
            english: 'When is Sarhul festival celebrated?',
          },
          options: [
            { id: 'o1', text: 'चैत्र माह में (Vasant / Spring)', emoji: '🌸', isCorrect: true },
            { id: 'o2', text: 'दीपावली के साथ', emoji: '🪔', isCorrect: false },
            { id: 'o3', text: 'सर्दी में (Winter)', emoji: '❄️', isCorrect: false },
            { id: 'o4', text: 'बरसात में (Monsoon)', emoji: '🌧️', isCorrect: false },
          ],
          explanation: 'सरहुल चैत्र माह के शुक्ल पक्ष की तृतीया को मनाया जाता है जब साल के पेड़ में फूल खिलते हैं! Sarhul is in spring when Sal trees bloom!',
        },
      ];

  return {
    dragDrop: dragDropData,
    matching: {
      instruction: {
        native: 'ᱪᱤᱛᱟᱹᱨ ᱟᱨ ᱥᱟᱱᱛᱟᱲᱤ ᱟᱹᱲᱟᱹ ᱡᱚᱲᱟᱣ ᱢᱮ!',
        transliteration: 'Chitar ar ara joraw me!',
        hindi: 'चित्र को मातृभाषा शब्द से जोड़ें!',
        english: 'Match the picture with the tribal mother tongue word!',
      },
      pairs: [
        { id: 'm1', emoji: '🌳', nativeWord: lang === 'ho' ? '𑢾𑣁𑣜𑣁𑣃 (Sarjom)' : lang === 'mundari' ? 'सारजोम (Sarjom)' : 'ᱥᱟᱨᱡᱚᱢ (Sarjom)', transliteration: 'Sarjom', hindiWord: 'साल / सखुआ' },
        { id: 'm2', emoji: '🌊', nativeWord: lang === 'ho' ? '𑢥𑣁𑣁 (Daa)' : lang === 'mundari' ? 'दाः (Daa)' : 'ᱫᱟᱜ (Dak)', transliteration: 'Dak / Daa', hindiWord: 'पानी / जल' },
        { id: 'm3', emoji: '🏫', nativeWord: lang === 'ho' ? '𑢾𑣂𑣌𑣃𑣚 (Iskul)' : lang === 'mundari' ? 'आसड़ा (Asra)' : 'ᱟᱥᱲᱟ (Asra)', transliteration: 'Asra / Iskul', hindiWord: 'विद्यालय / स्कूल' },
        { id: 'm4', emoji: '🌙', nativeWord: lang === 'ho' ? '𑢌𑣂𑣑𑣂𑣤 (Singi)' : lang === 'mundari' ? 'चाँद (Chand)' : 'ᱪᱟᱸᱫᱳ (Chando)', transliteration: 'Chando / Chand', hindiWord: 'चाँद / चंद्रमा' },
      ],
    },
    counting: {
      instruction: {
        native: 'ᱵᱤᱨ ᱨᱮ ᱡᱤᱱᱤᱥ ᱠᱚ ᱞᱮᱠᱷᱟ ᱢᱮ (Count 1 to 5)!',
        transliteration: 'Bir re jinis ko lekha me!',
        hindi: 'झारखंड के जंगल में चीजों को गिनें (1 से 5 तक)!',
        english: 'Count the jungle items (1 to 5)!',
      },
      items: [
        { id: 'c1', emoji: '🦌', name: 'ᱢᱤᱫ ᱡᱤᱞ (Mit Jil - 1 Deer)', count: 1 },
        { id: 'c2', emoji: '🌺', name: 'ᱵᱟᱨ ᱵᱟᱦᱟ (Bar Baha - 2 Flowers)', count: 2 },
        { id: 'c3', emoji: '🌳', name: 'ᱯᱮ ᱫᱟᱨᱮ (Pe Dare - 3 Trees)', count: 3 },
        { id: 'c4', emoji: '🐦', name: 'ᱯᱩᱱ ᱪᱤᱲᱤ (Pun Chiri - 4 Birds)', count: 4 },
        { id: 'c5', emoji: '🍎', name: 'ᱢᱚᱬ ᱡᱟᱢ (Mon Jam - 5 Fruits)', count: 5 },
      ],
    },
    tracing: {
      letter: lang === 'santali' ? 'ᱚ' : lang === 'ho' ? '𑢹' : 'अ',
      letterName: lang === 'santali' ? 'Ol Chiki LA (ᱚ)' : lang === 'ho' ? 'Warang Chiti (𑢹)' : 'Devanagari (अ)',
      script: lang === 'santali' ? 'olchiki' : lang === 'ho' ? 'warangchiti' : 'devanagari',
      sound: 'A',
      strokeGuide: 'Trace gently along the dotted letter from top to bottom.',
    },
    quiz: quizQuestions,
  };
}
