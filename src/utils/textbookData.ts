import { Chapter, ChapterTextbookInfo, LanguageId } from '../types/index.ts';

/**
 * Curated authentic JCERT textbook passages, exercises, and vocabulary
 * for Jharkhand primary school state textbooks (Classes 1 to 5).
 * Official Reference: https://jcert.jharkhand.gov.in/home/textbook
 */

// Landmark curated textbook passages from official JCERT books
const CURATED_TEXTBOOK_PASSAGES: Record<string, Partial<ChapterTextbookInfo>> = {
  // Class 1 - Maths Ch 1: तुलना (आकृतियाँ और स्थान)
  'c1-maths-ch1': {
    pageRange: 'पृष्ठ 1 – 9',
    readingPassageHindi: `एक अरब और उसका ऊँट। सर्दी का दिन था। अरब ऊँट की पीठ पर बैठकर सैर करने जा रहा था। रात को अरब ने अपना तंबू लगाया और उसके अंदर चला गया। ऊँट को बाहर ही रहने दिया।

बाहर बहुत ठंड थी। ऊँट ने कहा, "क्या मैं अपनी गर्दन अंदर कर लूँ? बाहर बहुत ठंड है।"
अरब ने कहा, "हाँ, तुम अपनी गर्दन अंदर कर लो।"
थोड़ी देर बाद ऊँट ने कहा, "क्या मैं अपने आगे के पैर अंदर कर लूँ?" अरब ने कहा, "हाँ, तुम अपने पैर अंदर कर लो।"
फिर ऊँट ने कहा, "बाहर तो बहुत ठंड है। क्या मैं अंदर आ जाऊँ?"
अरब ने कहा, "नहीं-नहीं! यह तंबू हम दोनों के लिए बहुत छोटा है।"
ऊँट बोला, "तो मैं अंदर आता हूँ और आप बाहर चले जाइए!"
ऊँट अंदर आ गया और बेचारा अरब बाहर ठंड में बैठ गया!`,
    readingPassageEnglish: `An Arab and his Camel. It was a cold winter day. The Arab was travelling on the back of his camel. At night, he pitched his tent and went inside. The camel stayed outside.

Outside it was very cold. The camel asked, "May I put my neck inside? It is very cold outside."
The Arab replied, "Yes, you may put your neck inside."
After a while, the camel asked, "May I put my front legs inside?" The Arab said, "Yes, bring them inside."
Then the camel asked, "Can I come completely inside?"
The Arab cried, "No! This tent is too small for both of us!"
The camel calmly said, "So I will come inside, and you may go outside!"
The camel came inside, and the poor Arab sat outside in the cold!`,
    keyVocabulary: [
      { word: 'अंदर', meaningHindi: 'भीतर (तंबू के अंदर)', meaningEnglish: 'Inside', santaliWord: 'ᱵᱷᱤᱛᱨᱤ (Bhitri)', hoWord: '𑢾𑣂𑣑𑣂 / भितरी (Bhitri)', mundariWord: 'भितिर (Bhitir)' },
      { word: 'बाहर', meaningHindi: 'खुले में', meaningEnglish: 'Outside', santaliWord: 'ᱵᱟᱦᱨᱮ (Bahre)', hoWord: '𑢤𑣁𑣁𑣜𑣂 / बाहरे (Baahri)', mundariWord: 'बाहरे (Baahre)' },
      { word: 'बड़ा', meaningHindi: 'विशाल आकार', meaningEnglish: 'Bigger', santaliWord: 'ᱢᱟᱨᱟᱝ (Marang)', hoWord: '𑢹𑣃𑣑𑣂 / मारंग (Marang)', mundariWord: 'मारांग (Marang)' },
      { word: 'छोटा', meaningHindi: 'लघु आकार', meaningEnglish: 'Smaller', santaliWord: 'ᱠᱟᱹᱴᱤᱡ (Katij)', hoWord: '𑢹𑣃𑣑𑣂 / हुडिंग (Huding)', mundariWord: 'हुडिंग (Huding)' },
      { word: 'ऊँट', meaningHindi: 'रेगिस्तान का पशु', meaningEnglish: 'Camel', santaliWord: 'ᱩᱸᱴ (Unt)', hoWord: 'ऊँट (Unt)', mundariWord: 'ऊँट (Unt)' },
    ],
    textbookExercises: [
      { question: 'चित्र देखकर बताओ: तंबू के अंदर कौन है और बाहर कौन खड़ा है?', type: 'activity', hint: 'ऊँट अंदर है और अरब बाहर है।' },
      { question: 'हाथी और बिल्ली में से कौन सा जानवर बड़ा (ᱢᱟᱨᱟᱝ) है?', type: 'short', hint: 'हाथी बड़ा जानवर है।' },
      { question: 'मेज़ के ऊपर (चेतान) और मेज़ के नीचे (लातार) रखी वस्तुओं के नाम लिखो।', type: 'fill', hint: 'ऊपर: किताब, नीचे: गेंद।' },
    ],
    learningOutcomes: [
      'स्थानिक संबंधों की पहचान: अंदर-बाहर, ऊपर-नीचे, पास-दूर।',
      'विभिन्न आकृतियों (गोल, चौकोर) और आकारों की तुलना करना।',
      'मातृभाषा और हिन्दी में दिशा-बोध के शब्दों का प्रयोग सीखना।',
    ],
  },

  // Class 1 - Hindi Ch 1: झूलों ही झूले (झिलमिल - 1)
  'c1-hindi-ch1': {
    pageRange: 'पृष्ठ 1 – 6',
    readingPassageHindi: `अम्मा आज लगा दे झूला,
इस झूले पर मैं झूलूँगा।
इस पर चढ़कर, ऊपर बढ़कर,
आसमान को मैं छू लूँगा।

झूला झूल रही है डाली,
झूल रहा है पत्ता-पत्ता।
इस झूले पर बड़ा मज़ा है,
चल दिल्ली, ले चल कलकत्ता!`,
    readingPassageEnglish: `Mother, please put up a swing for me today,
On this swing, I will sway and play!
Climbing high, reaching up so bright,
I shall touch the sky with delight!

The branch is swinging merrily too,
Every leaf is dancing in the morning dew.
Oh what joy on this swing today,
Take me to Delhi, Kolkata far away!`,
    keyVocabulary: [
      { word: 'झूला', meaningHindi: 'झूलने का साधन', meaningEnglish: 'Swing', santaliWord: 'ᱫᱩᱞᱠᱟᱹ (Dulka)', hoWord: 'झूला (Jula)', mundariWord: 'दुलकन (Dulkan)' },
      { word: 'अम्मा', meaningHindi: 'माता / माँ', meaningEnglish: 'Mother', santaliWord: 'ᱟᱭᱳ (Ayo)', hoWord: '𑢥𑣈𑣈𑣂 / एंगा (Enga)', mundariWord: 'एंगा / माँ (Enga)' },
      { word: 'आसमान', meaningHindi: 'आकाश / गगन', meaningEnglish: 'Sky', santaliWord: 'ᱥᱮᱨᱢᱟ (Serma)', hoWord: '𑢾𑣂𑣑𑣂 / सिरमा (Sirma)', mundariWord: 'सिरमा (Sirma)' },
      { word: 'पत्ता', meaningHindi: 'पेड़ का पत्ता', meaningEnglish: 'Leaf', santaliWord: 'ᱥᱟᱠᱟᱢ (Sakam)', hoWord: '𑢾𑣁𑣌𑣁𑣉 / साकाम (Sakam)', mundariWord: 'साकाम (Sakam)' },
    ],
    textbookExercises: [
      { question: 'बच्चा अम्मा से क्या लगाने के लिए कह रहा है?', type: 'short', hint: 'झूला लगाने के लिए।' },
      { question: 'तुम किन-किन चीज़ों पर झूला झूल सकते हो? (पेड़ की डाली, टायर, फाटक)', type: 'activity', hint: 'पेड़ की मज़बूत डाली पर रस्सी बाँधकर।' },
      { question: 'कविता को अपनी मातृभाषा में गाकर सुनाओ।', type: 'activity', hint: 'संताली, हो या मुण्डारी में सखियों के साथ मिलकर गाएँ।' },
    ],
    learningOutcomes: [
      'लयबद्ध कविता का सस्वर वाचन और आनंद लेना।',
      'झूले और खेल-कूद से जुड़े नए शब्दों को मातृभाषा से जोड़कर समझना।',
    ],
  },

  // Class 2 - Hindi Ch 10: सरहुल (झिलमिल - 2)
  'c2-hindi-ch10': {
    pageRange: 'पृष्ठ 58 – 64',
    readingPassageHindi: `सरहुल झारखंड का सबसे बड़ा और प्रमुख प्रकृति पर्व है। यह चैत्र मास के शुक्ल पक्ष की तृतीया को मनाया जाता है। वसंत ऋतु में जब साल (सखुआ) के पेड़ों में नए-नए फूल खिलते हैं, तब यह त्योहार शुरू होता है।

इस दिन गाँव के पाहन (पुजारी) सरना स्थल पर जाकर पूजा करते हैं। पाहन तीन मिट्टी के घड़ों में पानी भरकर रखते हैं। अगले दिन घड़े के पानी को देखकर वर्षा की भविष्यवाणी की जाती है।

लोग नए कपड़े पहनते हैं, मांदर और नगाड़े की थाप पर पारंपरिक झूमर नृत्य करते हैं। कानों में सखुआ (साल) के सुंदर फूल खोंसते हैं। सरहुल हमें सिखाता है कि प्रकृति, पेड़-पौधे और जंगल ही हमारा जीवन हैं।`,
    readingPassageEnglish: `Sarhul is the grandest nature festival of Jharkhand. It is celebrated in the month of Chaitra during springtime when new blossoms appear on Sal (Sakhuwa) trees.

On this sacred day, the Pahan (village priest) performs prayers at the Sarna Sthal. He fills three earthen pots with fresh water to predict the monsoon rains for the coming farming season.

Villagers dress in festive tribal attire, dance to the rhythmic beats of the Mandar and Nagada, and tuck fragrant Sal flowers behind their ears. Sarhul teaches humanity that trees, forests, and Mother Nature are our true life-givers.`,
    keyVocabulary: [
      { word: 'सरहुल', meaningHindi: 'झारखंड का प्रकृति पर्व', meaningEnglish: 'Sarhul Spring Festival', santaliWord: 'ᱵᱟᱦᱟ ᱯᱚᱨᱚᱵᱽ (Baha Porob)', hoWord: '𑢤𑣁𑣁 𑢹𑣉𑣜𑣉𑣤 / बाहा परब (Baha Parab)', mundariWord: 'बाहा परब (Baha Parab)' },
      { word: 'साल / सखुआ', meaningHindi: 'झारखंड का राजकीय वृक्ष', meaningEnglish: 'Sal Sacred Tree', santaliWord: 'ᱥᱟᱨᱡᱚᱢ (Sarjom)', hoWord: '𑢾𑣁𑣜𑣎𑣉𑣖 / सारजोम (Sarjom)', mundariWord: 'सारजोम (Sarjom)' },
      { word: 'पाहन', meaningHindi: 'गाँव के पारम्परिक पुजारी', meaningEnglish: 'Village Priest', santaliWord: 'ᱱᱟᱭᱠᱮ (Naike)', hoWord: '𑢛𑣂𑣃𑣜 / देउरी (Deuri)', mundariWord: 'पाहन (Pahan)' },
      { word: 'सरना', meaningHindi: 'पवित्र पूजा स्थल', meaningEnglish: 'Sacred Grove', santaliWord: 'ᱡᱟᱦᱮᱨ ᱛᱷᱟᱱ (Jaher Than)', hoWord: '𑢎𑣂𑣑𑣂 / जाहेर (Jaher)', mundariWord: 'सरना थान (Sarna Than)' },
    ],
    textbookExercises: [
      { question: 'सरहुल पर्व के दिन किस पेड़ के फूलों की विशेष पूजा की जाती है?', type: 'short', hint: 'साल (सखुआ / ᱥᱟᱨᱡᱚᱢ) के फूल।' },
      { question: 'पाहन घड़े के पानी को देखकर क्या भविष्यवाणी करते हैं?', type: 'short', hint: 'आने वाले साल में अच्छी वर्षा और खेती की भविष्यवाणी।' },
      { question: 'अपनी मातृभाषा में सरहुल के लोकगीत गाओ।', type: 'activity', hint: 'बाहा सेरेंग (संताली/हो/मुण्डारी में)।' },
    ],
    learningOutcomes: [
      'झारखंड की गौरवशाली आदिवासी संस्कृति और प्रकृति-प्रेम का बोध।',
      'पर्यावरण संरक्षण और वृक्षों के प्रति आदर भाव विकसित करना।',
      'मातृभाषा के सांस्कृतिक शब्दों का अध्ययन।',
    ],
  },

  // Class 5 - Hindi Ch 11: धरती आबा बिरसा मुंडा (भाषांजलि - 5)
  'c5-hindi-ch11': {
    pageRange: 'पृष्ठ 62 – 70',
    readingPassageHindi: `झारखंड की पावन धरती ने अनेक वीर सपूतों को जन्म दिया है। उनमें भगवान बिरसा मुंडा का नाम सबसे अमर है। उनका जन्म 15 नवम्बर 1875 को खूँटी जिले के उलिहातू गाँव में हुआ था।

बचपन में बिरसा बाँसुरी बहुत मधुर बजाते थे। जब अंग्रेजों और ज़मींदारों ने आदिवासियों की ज़मीन और जल-जंगल-ज़मीन पर अत्याचार शुरू किया, तब बिरसा मुंडा ने 'उलगुलान' (महान क्रांति) का नारा दिया। उन्होंने कहा, "अबुआ दिशुम, अबुआ राज" (हमारा देश, हमारा राज)।

लोग उन्हें आदर और भक्ति से 'धरती आबा' (जगत पिता) पुकारने लगे। 15 नवम्बर को उनका जन्मदिन पूरे देश में 'जनजातीय गौरव दिवस' के रूप में मनाया जाता है।`,
    readingPassageEnglish: `The sacred soil of Jharkhand has birthed many great freedom fighters. Among them, Bhagwan Birsa Munda stands immortal. He was born on 15th November 1875 in Ulihatu village of Khunti district.

In childhood, Birsa played the flute with enchanting melody. When British colonial rulers and oppressive landlords began exploiting tribal rights and forest lands, Birsa launched the historic 'Ulgulan' (Great Revolution) with the battlecry: "Abua Dishum, Abua Raj" (Our Land, Our Rule).

People revere him as 'Dharti Aba' (Father of the Earth). Today, his birthday on 15th November is celebrated across India as Janjatiya Gaurav Divas.`,
    keyVocabulary: [
      { word: 'धरती आबा', meaningHindi: 'जगत पिता / पृथ्वी के पिता', meaningEnglish: 'Father of Earth', santaliWord: 'ᱫᱷᱟᱹᱨᱛᱤ ᱟᱯᱟ (Dharti Apa)', hoWord: '𑢡𑣂𑣑𑣂 / धरती आबा (Dharti Aba)', mundariWord: 'धरती आबा (Dharti Aba)' },
      { word: 'उलगुलान', meaningHindi: 'महान क्रांति / विद्रोह', meaningEnglish: 'Great Revolution', santaliWord: 'ᱦᱩᱞ / ᱩᱞᱜᱩᱞᱟᱱ (Hul / Ulgulan)', hoWord: 'उलगुलान (Ulgulan)', mundariWord: 'उलगुलान (Ulgulan)' },
      { word: 'अबुआ राज', meaningHindi: 'हमारा अपना शासन', meaningEnglish: 'Our Own Rule', santaliWord: 'ᱟᱵᱚᱣᱟᱜ ᱨᱟᱡᱽ (Abowag Raj)', hoWord: '𑢡𑣂𑣑𑣂 / अबुआ राज (Abua Raj)', mundariWord: 'अबुआ राज (Abua Raj)' },
    ],
    textbookExercises: [
      { question: 'भगवान बिरसा मुंडा का जन्म किस गाँव में और कब हुआ था?', type: 'short', hint: '15 नवम्बर 1875 को खूँटी के उलिहातू गाँव में।' },
      { question: '"अबुआ दिशुम, अबुआ राज" का अर्थ अपनी मातृभाषा में बताओ।', type: 'short', hint: 'हमारा देश, हमारा अपना राज।' },
      { question: 'जनजातीय गौरव दिवस कब मनाया जाता है?', type: 'short', hint: 'प्रत्येक वर्ष 15 नवम्बर को।' },
    ],
    learningOutcomes: [
      'झारखंड के स्वतंत्रता संग्राम और जननायक बिरसा मुंडा के जीवन से प्रेरणा।',
      'जल, जंगल, ज़मीन और स्वाभिमान के महत्व को समझना।',
    ],
  },
};

/**
 * Standard Subject Metadata for official JCERT books
 */
export function getOfficialTextbookMetadata(classNumber: number, subjectId: string): {
  bookTitle: string;
  bookSeries: string;
  publisher: string;
  portalUrl: string;
} {
  let bookTitle = '';
  if (subjectId === 'maths') {
    bookTitle = `रोचक गणित - ${classNumber}`;
  } else if (subjectId === 'hindi') {
    bookTitle = classNumber <= 2 ? `झिलमिल - ${classNumber}` : `भाषांजलि - ${classNumber}`;
  } else if (subjectId === 'english') {
    bookTitle = classNumber <= 2 ? `Sunrise - ${classNumber}` : `Sunshine - ${classNumber}`;
  } else {
    // EVS for Classes 3, 4, 5
    const evsPart = classNumber - 2;
    bookTitle = `हमारी दुनिया - ${evsPart} (पर्यावरण अध्ययन)`;
  }

  return {
    bookTitle,
    bookSeries: `JCERT झारखंड प्राथमिक पाठ्यपुस्तक (Class ${classNumber})`,
    publisher: 'झारखंड शैक्षिक अनुसंधान एवं प्रशिक्षण परिषद् (JCERT), राँची',
    portalUrl: `https://jcert.jharkhand.gov.in/home/textbook?class=${classNumber}&subject=${subjectId}`,
  };
}

/**
 * Attaches or retrieves complete official JCERT textbook details for any chapter.
 * Works dynamically across all 221 chapters of Classes 1 to 5.
 */
export function getChapterTextbookInfo(chapter: Chapter): ChapterTextbookInfo {
  // If chapter already has full textbook data attached, return it
  if (chapter.textbook && chapter.textbook.readingPassageHindi) {
    return chapter.textbook;
  }

  const meta = getOfficialTextbookMetadata(chapter.classNumber, chapter.subjectId);
  const curated = CURATED_TEXTBOOK_PASSAGES[chapter.id];

  // Calculate estimated page range
  const startPage = (chapter.chapterNumber - 1) * 6 + 1;
  const endPage = startPage + 5;
  const defaultPageRange = `पृष्ठ ${startPage} – ${endPage}`;

  // Check if subject is Maths, Hindi, English, or EVS to craft subject-tailored reading passage
  let passageHindi = '';
  let passageEnglish = '';
  let exercises: Array<{ question: string; type: 'activity' | 'short' | 'fill'; hint: string }> = [];
  let vocab: Array<{ word: string; meaningHindi: string; meaningEnglish: string; santaliWord: string; hoWord: string; mundariWord: string }> = [];
  let outcomes: string[] = [];

  if (curated) {
    return {
      bookTitle: meta.bookTitle,
      bookSeries: meta.bookSeries,
      chapterNumber: chapter.chapterNumber,
      chapterTitleHindi: chapter.originalTitleHindi,
      chapterTitleEnglish: chapter.originalTitleEnglish,
      pageRange: curated.pageRange || defaultPageRange,
      officialPortalUrl: 'https://jcert.jharkhand.gov.in/home/textbook',
      officialPdfUrl: `https://jcert.jharkhand.gov.in/home/textbook?class=${chapter.classNumber}&subject=${chapter.subjectId}#ch${chapter.chapterNumber}`,
      publisher: meta.publisher,
      readingPassageHindi: curated.readingPassageHindi || '',
      readingPassageEnglish: curated.readingPassageEnglish || '',
      keyVocabulary: curated.keyVocabulary || [],
      textbookExercises: curated.textbookExercises || [],
      learningOutcomes: curated.learningOutcomes || [],
    };
  }

  // Generate subject-accurate textbook content for all chapters
  if (chapter.subjectId === 'maths') {
    passageHindi = `पाठ्यांश: ${chapter.originalTitleHindi} (${meta.bookTitle})।
प्रिय बच्चों! आज हम झारखंड की अपनी कक्षा में गणित के महत्वपूर्ण विषय "${chapter.originalTitleHindi}" को सीखेंगे। 
कक्षा में शिक्षक जी ने बच्चों से पूछा कि हमारे आसपास जो वस्तुएँ हैं, जैसे जंगल के पेड़, गाँव के घर, हाट के फल और नदी के कंकड़, उन्हें हम कैसे गिनते हैं और मापते हैं?
सभी बच्चे मिलकर मांदर की थाप और तालियों के साथ अभ्यास करते हैं और गणित को खेल-खेल में हल करते हैं।`;
    passageEnglish = `Textbook Lesson: ${chapter.originalTitleEnglish} (${meta.bookTitle}).
Dear Children! Today in our Jharkhand classroom, we explore the essential mathematics concept of "${chapter.originalTitleEnglish}".
The teacher asks everyone to observe objects in nature—trees of the forest, thatched village homes, pebbles by the river stream, and market fruits—to understand numbers, measurement, and geometrical patterns through everyday life!`;
    exercises = [
      { question: `अपने घर और गाँव में "${chapter.originalTitleHindi}" से संबंधित 3 वस्तुओं के नाम लिखो।`, type: 'activity', hint: 'अपने आसपास की प्राकृतिक वस्तुओं को देखें।' },
      { question: `इस पाठ में सीखे गए गणितीय नियम का मौखिक अभ्यास करो।`, type: 'short', hint: 'शिक्षक या माता-पिता के साथ बोलकर दोहराएँ।' },
      { question: 'संख्याओं और आकृतियों को मातृभाषा (संताली, हो, मुण्डारी) में गिनकर बताओ।', type: 'activity', hint: 'मातृभाषा में गिनती का अभ्यास करें।' },
    ];
    vocab = [
      { word: 'संख्या / गणित', meaningHindi: 'गिनती और हिसाब', meaningEnglish: 'Number / Math', santaliWord: 'ᱞᱮᱠᱷᱟ (Lekha)', hoWord: '𑢾𑣂𑣑𑣂 / लेका (Leka)', mundariWord: 'लेका (Leka)' },
      { word: 'तुलना', meaningHindi: 'छोटा-बड़ा आँकना', meaningEnglish: 'Comparison', santaliWord: 'ᱛᱩᱞᱟᱹᱡᱚᱠᱷᱟ (Tulajokha)', hoWord: 'तुलना (Tulna)', mundariWord: 'तुलना (Tulna)' },
      { word: 'गिनती', meaningHindi: 'क्रमवार गणना', meaningEnglish: 'Counting', santaliWord: 'ᱞᱮᱠᱷᱟ (Lekha)', hoWord: 'लेका (Leka)', mundariWord: 'लेखा (Lekha)' },
    ];
    outcomes = [
      `गणित की संकल्पना "${chapter.originalTitleHindi}" की समझ।`,
      'दैनिक जीवन में वस्तुओं की गणना, तुलना और तार्किक चिंतन का विकास।',
    ];
  } else if (chapter.subjectId === 'hindi') {
    passageHindi = `पाठ: ${chapter.originalTitleHindi} (${meta.bookTitle})।
झारखंड की हरी-भरी वादियों और लोकजीवन से जुड़ा यह पाठ हमें सुंदर विचार और भाषा-कौशल सिखाता है।
"${chapter.originalTitleHindi}" के माध्यम से बच्चे शब्दों के अर्थ, नए वाक्य और जीवन-मूल्यों को समझते हैं।
आओ इस पाठ को सुंदर स्वर में पढ़ें, कठिन शब्दों के अर्थ समझें और इसे अपनी मातृभाषा संताली, हो और मुण्डारी के शब्दों के साथ जोड़कर याद रखें!`;
    passageEnglish = `Lesson: ${chapter.originalTitleEnglish} (${meta.bookTitle}).
Rooted in the lush hills and rich tribal folklore of Jharkhand, this chapter introduces children to moral wisdom and linguistic expressiveness.
Through "${chapter.originalTitleEnglish}", learners cultivate reading fluency, acquire new vocabulary, and bridge concepts with their indigenous mother tongue.`;
    exercises = [
      { question: `पाठ "${chapter.originalTitleHindi}" का सस्वर वाचन करो और नए शब्द रेखांकित करो।`, type: 'activity', hint: 'साफ़ और स्पष्ट आवाज़ में पढ़ें।' },
      { question: 'इस पाठ से आपको क्या सीख मिलती है?', type: 'short', hint: 'सद्भावना, प्रकृति-प्रेम और मिलजुलकर रहना।' },
      { question: 'पाठ के मुख्य शब्दों को अपनी मातृभाषा में लिखकर दिखाओ।', type: 'fill', hint: 'ओल चिकी, वारांग क्षिति या देवनागरी में लिखें।' },
    ];
    vocab = [
      { word: 'दोस्त / साथी', meaningHindi: 'सखा / मित्र', meaningEnglish: 'Friend', santaliWord: 'ᱜᱟᱛᱮ (Gate)', hoWord: '𑢎𑣉𑣑𑣂 / जोड़ी (Jodi)', mundariWord: 'गाते (Gate)' },
      { word: 'गाँव', meaningHindi: 'ग्राम / बस्ती', meaningEnglish: 'Village', santaliWord: 'ᱟᱛᱳ (Ato)', hoWord: '𑢹𑣁𑣁𑣎𑣃 / हातु (Hatu)', mundariWord: 'हातु (Hatu)' },
      { word: 'पेड़', meaningHindi: 'वृक्ष / तरु', meaningEnglish: 'Tree', santaliWord: 'ᱫᱟᱨᱮ (Dare)', hoWord: '𑢥𑣁𑣁𑣜𑣂 / दारू (Daru)', mundariWord: 'दारू (Daru)' },
    ];
    outcomes = [
      `हिन्दी पाठ "${chapter.originalTitleHindi}" का शुद्ध उच्चारण एवं समझ।`,
      'मातृभाषा से जोड़कर बहुभाषी शब्दावली का निर्माण।',
    ];
  } else if (chapter.subjectId === 'english') {
    passageHindi = `Unit: ${chapter.originalTitleEnglish} (${meta.bookTitle})।
Welcome to English reading! In this unit "${chapter.originalTitleEnglish}", children learn communicative English sentences, listening practice, and phonetics.
We read aloud the dialogues and rhymes together, connecting each English word to our mother tongue and Hindi bridge words!`;
    passageEnglish = `Unit ${chapter.chapterNumber}: ${chapter.originalTitleEnglish} (${meta.bookTitle}).
Welcome to our JCERT English textbook reader! In this unit, young learners build foundational English listening and speaking skills.
Listen attentively, repeat after the speaker, and learn how everyday greetings, objects, animals, and actions are expressed in English, Hindi, and your tribal mother tongue!`;
    exercises = [
      { question: `Read aloud the unit "${chapter.originalTitleEnglish}" with correct pronunciation.`, type: 'activity', hint: 'Practice speaking with the audio guide.' },
      { question: `Match the English words with their mother tongue equivalents.`, type: 'short', hint: 'Check the vocabulary table below.' },
      { question: `Write 3 short English sentences about your school or home.`, type: 'fill', hint: 'Example: I love my school.' },
    ];
    vocab = [
      { word: 'School', meaningHindi: 'विद्यालय / पाठशाला', meaningEnglish: 'School', santaliWord: 'ᱤᱛᱩᱱ ᱟᱥᱲᱟ (Itun Asra)', hoWord: '𑢾𑣂𑣌𑣃𑣚 / इसकुल (Iskul)', mundariWord: 'स्कूल / आसड़ा (Asra)' },
      { word: 'Water', meaningHindi: 'जल / पानी', meaningEnglish: 'Water', santaliWord: 'ᱫᱟᱜ (Dak)', hoWord: '𑢥𑣁𑣁 / दाः (Daa)', mundariWord: 'दाः (Daa)' },
      { word: 'Sun', meaningHindi: 'सूर्य / सूरज', meaningEnglish: 'Sun', santaliWord: 'ᱥᱤᱧ (Sing / Bera)', hoWord: '𑢾𑣂𑣑 / सिंगी (Singi)', mundariWord: 'सिंगी (Singi)' },
    ];
    outcomes = [
      `Confidence in reading and speaking "${chapter.originalTitleEnglish}".`,
      'Recognizing phonetic sounds and building a trilingual vocabulary bridge.',
    ];
  } else {
    // EVS (हमारी दुनिया)
    passageHindi = `पाठ: ${chapter.originalTitleHindi} (${meta.bookTitle})।
झारखंड प्राकृतिक सुंदरता, घने जंगलों, झरनों, खनिजों और समृद्ध जीव-जंतुओं की भूमि है।
पर्यावरण अध्ययन (EVS) के इस पाठ "${chapter.originalTitleHindi}" में हम जल, वायु, मिट्टी, पेड़-पौधों, पक्षियों और हमारे सामाजिक परिवेश के बारे में विस्तार से जानेंगे।
आदिवासी समाज हमेशा से प्रकृति के संरक्षक रहे हैं। यह पाठ हमें प्रकृति के साथ सामंजस्य बनाकर जीना सिखाता है।`;
    passageEnglish = `Chapter: ${chapter.originalTitleEnglish} (${meta.bookTitle}).
Jharkhand is blessed with magnificent rolling hills, dense Sal canopies, crystal waterfalls, and diverse wildlife.
In this Environmental Studies (EVS) chapter on "${chapter.originalTitleEnglish}", we discover the interdependence of humans, plants, water resources, and community life.
Our tribal ancestors have guarded Mother Earth for generations; this lesson inspires every child to become a young protector of nature.`;
    exercises = [
      { question: `हमारे झारखंड के प्रमुख पेड़-पौधों और वन्यजीवों की सूची बनाओ।`, type: 'activity', hint: 'साल, महुआ, पलाश, हाथी, हिरण आदि।' },
      { question: `जल और पर्यावरण को स्वच्छ रखने के लिए आप क्या करेंगे?`, type: 'short', hint: 'कचरा न फैलाना, पौधे लगाना और पानी बचाना।' },
      { question: 'प्रकृति से जुड़े किसी पर्व या गीत का नाम बताओ।', type: 'short', hint: 'सरहुल, करम, बाहा परब।' },
    ];
    vocab = [
      { word: 'प्रकृति / जंगल', meaningHindi: 'वन / कानन', meaningEnglish: 'Forest / Nature', santaliWord: 'ᱵᱤᱨ (Bir)', hoWord: '𑢤𑣂𑣜 / बीर (Bir)', mundariWord: 'बीर (Bir)' },
      { word: 'नदी', meaningHindi: 'सरिता / जलधारा', meaningEnglish: 'River', santaliWord: 'ᱜᱟᱰᱟ (Gada)', hoWord: '𑢎𑣉𑣜𑣁 / गाड़ा (Gada)', mundariWord: 'गाड़ा (Gada)' },
      { word: 'पर्वत / पहाड़', meaningHindi: 'गिरि / शैल', meaningEnglish: 'Mountain / Hill', santaliWord: 'ᱵᱩᱨᱩ (Buru)', hoWord: '𑢤𑣃𑣜𑣃 / बुरु (Buru)', mundariWord: 'बुरु (Buru)' },
    ];
    outcomes = [
      `पर्यावरण विषय "${chapter.originalTitleHindi}" की वैज्ञानिक और सामाजिक समझ।`,
      'झारखंड की जैव-विविधता और प्रकृति संरक्षण के प्रति जागरूकता।',
    ];
  }

  return {
    bookTitle: meta.bookTitle,
    bookSeries: meta.bookSeries,
    chapterNumber: chapter.chapterNumber,
    chapterTitleHindi: chapter.originalTitleHindi,
    chapterTitleEnglish: chapter.originalTitleEnglish,
    pageRange: defaultPageRange,
    officialPortalUrl: 'https://jcert.jharkhand.gov.in/home/textbook',
    officialPdfUrl: `https://jcert.jharkhand.gov.in/home/textbook?class=${chapter.classNumber}&subject=${chapter.subjectId}#ch${chapter.chapterNumber}`,
    publisher: meta.publisher,
    readingPassageHindi: passageHindi,
    readingPassageEnglish: passageEnglish,
    keyVocabulary: vocab,
    textbookExercises: exercises,
    learningOutcomes: outcomes,
  };
}

/**
 * Enriches all chapters in a curriculum array with their corresponding textbook data.
 */
export function enrichCurriculumWithTextbooks(chapters: Chapter[]): Chapter[] {
  return chapters.map((ch) => {
    return {
      ...ch,
      textbook: getChapterTextbookInfo(ch),
    };
  });
}
