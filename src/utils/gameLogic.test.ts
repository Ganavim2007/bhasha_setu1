import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateDragPlacement,
  checkMatchingComplete,
  calculateStarRewards,
  checkStickerUnlocks,
  filterCurriculum,
  formatScriptText,
  getEffectiveChapterSlides,
  getEffectiveGameData,
} from './gameLogic.ts';
import { Chapter } from '../types';

test('validateDragPlacement correctly identifies valid and invalid targets', () => {
  const items = [
    { id: 'camel', correctZone: 'outside' },
    { id: 'tent_mat', correctZone: 'inside' },
  ];

  assert.equal(validateDragPlacement('camel', 'outside', items), true);
  assert.equal(validateDragPlacement('camel', 'inside', items), false);
  assert.equal(validateDragPlacement('tent_mat', 'inside', items), true);
  assert.equal(validateDragPlacement('unknown', 'inside', items), false);
});

test('checkMatchingComplete verifies full pair set', () => {
  assert.equal(checkMatchingComplete(['p1', 'p2', 'p3'], 3), true);
  assert.equal(checkMatchingComplete(['p1', 'p2'], 3), false);
  assert.equal(checkMatchingComplete(['p1', 'p1', 'p2'], 3), false); // duplicate
  assert.equal(checkMatchingComplete([], 0), false);
});

test('calculateStarRewards returns appropriate child-encouraging star ratings', () => {
  assert.equal(calculateStarRewards(4, 4), 3);
  assert.equal(calculateStarRewards(3, 4), 2);
  assert.equal(calculateStarRewards(1, 4), 1);
  assert.equal(calculateStarRewards(0, 4), 0);
});

test('checkStickerUnlocks identifies newly earned rewards without duplicates', () => {
  const stickers = [
    { id: 's1', unlockedAtStars: 1 },
    { id: 's2', unlockedAtStars: 3 },
    { id: 's3', unlockedAtStars: 5 },
  ];

  // Starting with 0 stars
  assert.deepEqual(checkStickerUnlocks(0, [], stickers), []);

  // Earned 3 stars with no stickers yet
  assert.deepEqual(checkStickerUnlocks(3, [], stickers), ['s1', 's2']);

  // Already have s1, now reach 3 stars
  assert.deepEqual(checkStickerUnlocks(3, ['s1'], stickers), ['s2']);

  // Reach 10 stars with all already unlocked
  assert.deepEqual(checkStickerUnlocks(10, ['s1', 's2', 's3'], stickers), []);
});

test('filterCurriculum filters by class and subject', () => {
  const chapters = [
    { id: 'ch1', classNumber: 1, subjectId: 'maths' },
    { id: 'ch2', classNumber: 1, subjectId: 'hindi' },
    { id: 'ch3', classNumber: 2, subjectId: 'maths' },
  ];

  const filtered = filterCurriculum(chapters, 1, 'maths');
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].id, 'ch1');
});

test('formatScriptText returns corresponding CSS classes', () => {
  assert.equal(formatScriptText('ᱚᱞ ᱪᱤᱠᱤ', 'olchiki').cssClass, 'font-olchiki');
  assert.equal(formatScriptText('𑢹𑣉𑣀', 'warangchiti').cssClass, 'font-warangchiti');
  assert.equal(formatScriptText('मुण्डारी', 'devanagari').cssClass, 'font-devanagari');
  assert.equal(formatScriptText('English', 'roman').cssClass, 'font-cartoon');
});

test('getEffectiveChapterSlides returns curated slides or generates fallback slides', () => {
  const dummyChapter: Chapter = {
    id: 'test-ch',
    chapterNumber: 2,
    classNumber: 2,
    subjectId: 'hindi',
    bookName: 'झिलमिल - 2 (JCERT Class 2)',
    originalTitleHindi: 'आई एक ख़बर',
    originalTitleEnglish: 'A News Arrived',
    coverEmoji: '📰',
    languages: {
      santali: {
        title: 'ᱦᱮᱡ ᱮᱱᱟ ᱢᱤᱫ ᱠᱷᱚᱵᱚᱨ',
        scriptText: 'ᱦᱮᱡ ᱮᱱᱟ ᱢᱤᱫ ᱠᱷᱚᱵᱚᱨ',
        transliteration: 'Hej ena mit Khobor',
        reviewStatus: 'approved',
        lessonSlides: [],
      },
      ho: {
        title: 'मियद खबर हिजुः एना',
        scriptText: 'मियद खबर',
        transliteration: 'Miyad khabar',
        reviewStatus: 'teacher-reviewed',
        lessonSlides: [],
      },
      mundari: {
        title: 'मियद खबर',
        scriptText: 'मियद खबर',
        transliteration: 'Miyad khabar',
        reviewStatus: 'teacher-reviewed',
        lessonSlides: [],
      },
    },
  };

  const slides = getEffectiveChapterSlides(dummyChapter, 'santali');
  assert.ok(slides.length > 0);
  assert.equal(slides[0].conceptKey, 'chapter_intro');
  assert.match(slides[0].native, /ᱦᱮᱡ ᱮᱱᱟ ᱢᱤᱫ ᱠᱷᱚᱵᱚᱨ/);

  const gameData = getEffectiveGameData(dummyChapter, 'santali');
  assert.ok(gameData.matching);
  assert.ok(gameData.matching.pairs.length > 0);
  assert.ok(gameData.counting);
  assert.ok(gameData.tracing);
  assert.ok(gameData.quiz);
});
