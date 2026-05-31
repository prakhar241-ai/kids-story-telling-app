// ──────────────────────────────────────────────────────────────
//  Story data for the SQLite story bank.
//  ALL content here follows STORY_GUIDELINES.md (see repo root):
//  no violence/fear/sadness/death/romance — only warm, cozy, funny,
//  age-appropriate stories with a happy ending and a simple moral.
//
//  - SUBJECTS: searchable words kids type (animals, cartoons, flowers,
//    fruits, birds, vehicles, and fun magical friends). English + Hindi.
//  - TEMPLATES: original story plots (one moral each) in BOTH languages,
//    written in 3-4 short paragraphs (2 for toddlers). Each is filled
//    with the chosen subject's name + place.
//  The `moral` is the lesson only; the app shows it as
//  "The End! Remember: <moral>".
// ──────────────────────────────────────────────────────────────

export const SUBJECTS = [
  // ── Animals ──
  { term: 'Lion', termHi: 'शेर', category: 'animal', place: 'jungle', placeHi: 'जंगल' },
  { term: 'Tiger', termHi: 'बाघ', category: 'animal', place: 'jungle', placeHi: 'जंगल' },
  { term: 'Elephant', termHi: 'हाथी', category: 'animal', place: 'jungle', placeHi: 'जंगल' },
  { term: 'Monkey', termHi: 'बंदर', category: 'animal', place: 'jungle', placeHi: 'जंगल' },
  { term: 'Rabbit', termHi: 'खरगोश', category: 'animal', place: 'jungle', placeHi: 'जंगल' },
  { term: 'Deer', termHi: 'हिरण', category: 'animal', place: 'jungle', placeHi: 'जंगल' },
  { term: 'Bear', termHi: 'भालू', category: 'animal', place: 'jungle', placeHi: 'जंगल' },
  { term: 'Fox', termHi: 'लोमड़ी', category: 'animal', place: 'jungle', placeHi: 'जंगल' },
  { term: 'Giraffe', termHi: 'जिराफ़', category: 'animal', place: 'jungle', placeHi: 'जंगल' },
  { term: 'Zebra', termHi: 'ज़ेबरा', category: 'animal', place: 'jungle', placeHi: 'जंगल' },
  { term: 'Horse', termHi: 'घोड़ा', category: 'animal', place: 'farm', placeHi: 'खेत' },
  { term: 'Camel', termHi: 'ऊँट', category: 'animal', place: 'desert', placeHi: 'रेगिस्तान' },
  { term: 'Cow', termHi: 'गाय', category: 'animal', place: 'farm', placeHi: 'खेत' },
  { term: 'Goat', termHi: 'बकरी', category: 'animal', place: 'farm', placeHi: 'खेत' },
  { term: 'Dog', termHi: 'कुत्ता', category: 'animal', place: 'village', placeHi: 'गाँव' },
  { term: 'Cat', termHi: 'बिल्ली', category: 'animal', place: 'village', placeHi: 'गाँव' },
  { term: 'Squirrel', termHi: 'गिलहरी', category: 'animal', place: 'garden', placeHi: 'बगीचा' },
  { term: 'Tortoise', termHi: 'कछुआ', category: 'animal', place: 'pond', placeHi: 'तालाब' },
  { term: 'Frog', termHi: 'मेंढक', category: 'animal', place: 'pond', placeHi: 'तालाब' },
  { term: 'Mouse', termHi: 'चूहा', category: 'animal', place: 'village', placeHi: 'गाँव' },

  // ── Birds ──
  { term: 'Sparrow', termHi: 'गौरैया', category: 'bird', place: 'tall tree', placeHi: 'ऊँचे पेड़' },
  { term: 'Parrot', termHi: 'तोता', category: 'bird', place: 'tall tree', placeHi: 'ऊँचे पेड़' },
  { term: 'Peacock', termHi: 'मोर', category: 'bird', place: 'forest', placeHi: 'जंगल' },
  { term: 'Crow', termHi: 'कौआ', category: 'bird', place: 'tall tree', placeHi: 'ऊँचे पेड़' },
  { term: 'Pigeon', termHi: 'कबूतर', category: 'bird', place: 'rooftop', placeHi: 'छत' },
  { term: 'Owl', termHi: 'उल्लू', category: 'bird', place: 'old tree', placeHi: 'पुराने पेड़' },
  { term: 'Duck', termHi: 'बत्तख', category: 'bird', place: 'pond', placeHi: 'तालाब' },
  { term: 'Swan', termHi: 'हंस', category: 'bird', place: 'lake', placeHi: 'झील' },
  { term: 'Koel', termHi: 'कोयल', category: 'bird', place: 'mango tree', placeHi: 'आम के पेड़' },

  // ── Cartoon characters ──
  { term: 'Doraemon', termHi: 'डोरेमॉन', category: 'cartoon', place: 'town', placeHi: 'शहर' },
  { term: 'Chhota Bheem', termHi: 'छोटा भीम', category: 'cartoon', place: 'Dholakpur', placeHi: 'ढोलकपुर' },
  { term: 'Motu', termHi: 'मोटू', category: 'cartoon', place: 'town', placeHi: 'शहर' },
  { term: 'Patlu', termHi: 'पतलू', category: 'cartoon', place: 'town', placeHi: 'शहर' },
  { term: 'Tom', termHi: 'टॉम', category: 'cartoon', place: 'house', placeHi: 'घर' },
  { term: 'Jerry', termHi: 'जेरी', category: 'cartoon', place: 'house', placeHi: 'घर' },
  { term: 'Mickey Mouse', termHi: 'मिकी माउस', category: 'cartoon', place: 'town', placeHi: 'शहर' },
  { term: 'Pikachu', termHi: 'पिकाचू', category: 'cartoon', place: 'meadow', placeHi: 'मैदान' },
  { term: 'Oggy', termHi: 'ओग्गी', category: 'cartoon', place: 'house', placeHi: 'घर' },
  { term: 'Ben', termHi: 'बेन', category: 'cartoon', place: 'town', placeHi: 'शहर' },
  { term: 'Bablu', termHi: 'बबलू', category: 'cartoon', place: 'town', placeHi: 'शहर' },
  { term: 'Ninja Hattori', termHi: 'निंजा हटोरी', category: 'cartoon', place: 'town', placeHi: 'शहर' },
  { term: 'Chacha Chaudhary', termHi: 'चाचा चौधरी', category: 'cartoon', place: 'town', placeHi: 'शहर' },
  { term: 'Bob', termHi: 'बॉब', category: 'cartoon', place: 'town', placeHi: 'शहर' },

  // ── Flowers ──
  { term: 'Rose', termHi: 'गुलाब', category: 'flower', place: 'garden', placeHi: 'बगीचा' },
  { term: 'Lotus', termHi: 'कमल', category: 'flower', place: 'pond', placeHi: 'तालाब' },
  { term: 'Sunflower', termHi: 'सूरजमुखी', category: 'flower', place: 'garden', placeHi: 'बगीचा' },
  { term: 'Marigold', termHi: 'गेंदा', category: 'flower', place: 'garden', placeHi: 'बगीचा' },
  { term: 'Jasmine', termHi: 'चमेली', category: 'flower', place: 'garden', placeHi: 'बगीचा' },
  { term: 'Lily', termHi: 'लिली', category: 'flower', place: 'garden', placeHi: 'बगीचा' },
  { term: 'Tulip', termHi: 'ट्यूलिप', category: 'flower', place: 'garden', placeHi: 'बगीचा' },
  { term: 'Daisy', termHi: 'डेज़ी', category: 'flower', place: 'garden', placeHi: 'बगीचा' },
  { term: 'Hibiscus', termHi: 'गुड़हल', category: 'flower', place: 'garden', placeHi: 'बगीचा' },
  { term: 'Champa', termHi: 'चंपा', category: 'flower', place: 'garden', placeHi: 'बगीचा' },

  // ── Fruits ──
  { term: 'Mango', termHi: 'आम', category: 'fruit', place: 'orchard', placeHi: 'बगीचा' },
  { term: 'Apple', termHi: 'सेब', category: 'fruit', place: 'orchard', placeHi: 'बगीचा' },
  { term: 'Banana', termHi: 'केला', category: 'fruit', place: 'orchard', placeHi: 'बगीचा' },
  { term: 'Grapes', termHi: 'अंगूर', category: 'fruit', place: 'orchard', placeHi: 'बगीचा' },
  { term: 'Orange', termHi: 'संतरा', category: 'fruit', place: 'orchard', placeHi: 'बगीचा' },
  { term: 'Guava', termHi: 'अमरूद', category: 'fruit', place: 'orchard', placeHi: 'बगीचा' },
  { term: 'Strawberry', termHi: 'स्ट्रॉबेरी', category: 'fruit', place: 'farm', placeHi: 'खेत' },
  { term: 'Watermelon', termHi: 'तरबूज़', category: 'fruit', place: 'farm', placeHi: 'खेत' },

  // ── Vehicles ──
  { term: 'Train', termHi: 'रेलगाड़ी', category: 'vehicle', place: 'station', placeHi: 'स्टेशन' },
  { term: 'Aeroplane', termHi: 'हवाई जहाज़', category: 'vehicle', place: 'airport', placeHi: 'हवाई अड्डा' },
  { term: 'Car', termHi: 'कार', category: 'vehicle', place: 'town', placeHi: 'शहर' },
  { term: 'Boat', termHi: 'नाव', category: 'vehicle', place: 'river', placeHi: 'नदी' },
  { term: 'Bus', termHi: 'बस', category: 'vehicle', place: 'town', placeHi: 'शहर' },
  { term: 'Bicycle', termHi: 'साइकिल', category: 'vehicle', place: 'village', placeHi: 'गाँव' },

  // ── Fun magical friends ──
  { term: 'Unicorn', termHi: 'यूनिकॉर्न', category: 'magical', place: 'rainbow meadow', placeHi: 'इंद्रधनुषी मैदान' },
  { term: 'Mermaid', termHi: 'जलपरी', category: 'magical', place: 'blue ocean', placeHi: 'नीला समुद्र' },
  { term: 'Robot', termHi: 'रोबोट', category: 'magical', place: 'busy town', placeHi: 'व्यस्त शहर' },
  { term: 'Dinosaur', termHi: 'डायनासोर', category: 'magical', place: 'green valley', placeHi: 'हरी घाटी' },
  { term: 'Wizard', termHi: 'जादूगर', category: 'magical', place: 'cozy castle', placeHi: 'आरामदायक महल' },
  { term: 'Dragon', termHi: 'ड्रैगन', category: 'magical', place: 'green hills', placeHi: 'हरी पहाड़ियाँ' },
  { term: 'Fairy', termHi: 'परी', category: 'magical', place: 'flower garden', placeHi: 'फूलों का बगीचा' },
  { term: 'Spaceship', termHi: 'अंतरिक्ष यान', category: 'magical', place: 'starry sky', placeHi: 'तारों भरा आसमान' },
  { term: 'Cupcake', termHi: 'कपकेक', category: 'magical', place: 'sweet bakery', placeHi: 'मीठी बेकरी' },
  { term: 'Astronaut', termHi: 'अंतरिक्ष यात्री', category: 'magical', place: 'starry sky', placeHi: 'तारों भरा आसमान' },
  { term: 'Snowman', termHi: 'हिममानव', category: 'magical', place: 'snowy hills', placeHi: 'बर्फीली पहाड़ियाँ' },
  { term: 'Teddy', termHi: 'टेडी', category: 'magical', place: 'cozy playroom', placeHi: 'खेल का कमरा' },
]

// Each template: a complete story plot with one moral.
// `ages` = suitable age groups. `en`/`hi` get { hero, place, heroHi, placeHi }.
// Bodies use \n\n between short paragraphs.
export const TEMPLATES = [
  // ════════ AGE 2-3 : 2 tiny paragraphs, very simple ════════
  {
    key: 'good-morning', ages: ['2-3'],
    en: (s) => ({
      title: `${s.hero} Says Good Morning`,
      body: `${s.hero} woke up in the ${s.place}. The sun was warm and bright. ${s.hero} gave a big, happy stretch and a tiny yawn.\n\n"Good morning, friends!" said ${s.hero} with a smile. All the friends smiled back. It was a lovely, happy day.`,
      moral: `A kind hello makes everyone smile.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने कहा सुप्रभात`,
      body: `${s.heroHi} ${s.placeHi} में उठा। धूप गरम और चमकीली थी। ${s.heroHi} ने अंगड़ाई ली और एक नन्ही जम्हाई ली।\n\n"सुप्रभात दोस्तों!" ${s.heroHi} ने मुस्कुरा कर कहा। सब दोस्त मुस्कुराए। बहुत प्यारा दिन था।`,
      moral: `प्यार से नमस्ते कहने पर सब खुश होते हैं।`,
    }),
  },
  {
    key: 'share-toddler', ages: ['2-3'],
    en: (s) => ({
      title: `${s.hero} Shares a Treat`,
      body: `${s.hero} had two yummy treats. A little friend had none and looked a bit hungry.\n\n${s.hero} thought for a moment, then gave one treat to the friend. They munched together and giggled — crunch, crunch! Sharing felt so good.`,
      moral: `Sharing makes playtime sweeter.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने मिठाई बाँटी`,
      body: `${s.heroHi} के पास दो स्वादिष्ट मिठाइयाँ थीं। एक छोटे दोस्त के पास एक भी नहीं थी।\n\n${s.heroHi} ने सोचा, फिर एक मिठाई दोस्त को दी। दोनों ने साथ खाया और खूब हँसे — कुरकुर, कुरकुर! बाँटना बहुत अच्छा लगा।`,
      moral: `बाँटने से खेल और मज़ेदार हो जाता है।`,
    }),
  },
  {
    key: 'wash-hands', ages: ['2-3'],
    en: (s) => ({
      title: `${s.hero} Washes Up`,
      body: `${s.hero} played all day in the ${s.place}. Oh my — those little hands got dusty and grey!\n\nBefore eating, ${s.hero} washed them with soap and water. Scrub, scrub, splash! Now the hands were clean and bright, and ${s.hero} ate a happy meal.`,
      moral: `Clean hands keep us healthy.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने हाथ धोए`,
      body: `${s.heroHi} दिन भर ${s.placeHi} में खेला। अरे — नन्हे हाथ धूल से सने हो गए!\n\nखाने से पहले ${s.heroHi} ने साबुन और पानी से हाथ धोए। रगड़ो, रगड़ो, छप-छप! अब हाथ साफ़ हो गए, और ${s.heroHi} ने खुशी से खाना खाया।`,
      moral: `साफ़ हाथ हमें तंदुरुस्त रखते हैं।`,
    }),
  },
  {
    key: 'tidy-up', ages: ['2-3'],
    en: (s) => ({
      title: `${s.hero} Tidies Up`,
      body: `${s.hero} had toys all over the ${s.place} — here, there, everywhere! It looked like a happy little mess.\n\nSo ${s.hero} sang a tidy-up song and put each toy in its box. One, two, three — all done! The ${s.place} looked neat, and ${s.hero} clapped with joy.`,
      moral: `Tidying up makes our home happy.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने सफ़ाई की`,
      body: `${s.heroHi} के खिलौने ${s.placeHi} में चारों ओर बिखरे थे — यहाँ, वहाँ, हर जगह!\n\nतो ${s.heroHi} ने सफ़ाई का गाना गाया और हर खिलौना उसके डिब्बे में रखा। एक, दो, तीन — हो गया! ${s.placeHi} साफ़-सुथरा लगने लगा, और ${s.heroHi} खुशी से ताली बजाने लगा।`,
      moral: `सफ़ाई करने से हमारा घर खुश रहता है।`,
    }),
  },
  {
    key: 'thank-you', ages: ['2-3'],
    en: (s) => ({
      title: `${s.hero} Says Thank You`,
      body: `A kind friend gave ${s.hero} a juicy fruit. It was sweet and yummy!\n\n${s.hero} smiled wide and said, "Thank you!" The friend felt happy, and ${s.hero} felt happy too. Two little thank-you smiles lit up the day.`,
      moral: `Saying "thank you" spreads happiness.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने धन्यवाद कहा`,
      body: `एक प्यारे दोस्त ने ${s.heroHi} को रसीला फल दिया। वह मीठा और स्वादिष्ट था!\n\n${s.heroHi} ने मुस्कुरा कर कहा, "धन्यवाद!" दोस्त खुश हुआ, और ${s.heroHi} भी खुश हुआ। दो नन्ही मुस्कानों ने दिन रोशन कर दिया।`,
      moral: `"धन्यवाद" कहने से खुशियाँ बढ़ती हैं।`,
    }),
  },

  // ════════ AGE 4-6 : 3 short paragraphs, a tiny problem + happy ending ════════
  {
    key: 'honesty', ages: ['4-6'],
    en: (s) => ({
      title: `${s.hero} and the Truth`,
      body: `One sunny day in the ${s.place}, ${s.hero} was playing and accidentally knocked over a friend's tall tower of blocks. Crash — down it tumbled! No one had seen it happen.\n\n${s.hero} felt a little wobbly inside and thought about staying quiet. But that did not feel right. So ${s.hero} went to the friend and said softly, "I knocked over your tower by mistake. I'm sorry."\n\nThe friend smiled and gave ${s.hero} a big hug. "Thank you for telling me!" Together they built a brand-new tower, even taller and wobblier and more fun than before.`,
      moral: `Telling the truth turns worry into friendship.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} और सच्चाई`,
      body: `एक धूप वाले दिन ${s.placeHi} में ${s.heroHi} खेलते हुए गलती से एक दोस्त के ब्लॉक के ऊँचे मीनार को गिरा बैठा। धड़ाम — सब गिर गया! किसी ने नहीं देखा।\n\n${s.heroHi} के मन में थोड़ी घबराहट हुई और उसने चुप रहने के बारे में सोचा। पर यह सही नहीं लगा। तो ${s.heroHi} ने दोस्त के पास जाकर धीरे से कहा, "तुम्हारा मीनार मुझसे गलती से गिर गया। मुझे माफ़ करना।"\n\nदोस्त मुस्कुराया और ${s.heroHi} को गले लगाया। "बताने के लिए धन्यवाद!" दोनों ने मिलकर नया मीनार बनाया, पहले से भी ऊँचा और मज़ेदार।`,
      moral: `सच बोलने से चिंता दोस्ती में बदल जाती है।`,
    }),
  },
  {
    key: 'helping', ages: ['4-6'],
    en: (s) => ({
      title: `${s.hero} Lends a Hand`,
      body: `In the ${s.place}, a tiny ant was pushing a big crumb up a little hill. The crumb kept rolling back down — boing, boing!\n\n${s.hero} was passing by and saw the ant huffing and puffing. With a gentle nudge, ${s.hero} helped roll the crumb all the way to the top. "Thank you, kind ${s.hero}!" cheered the happy ant.\n\nThat evening, when ${s.hero} dropped a snack, a whole parade of ants marched over to help carry it home. Kindness had come back around, just like a circle of friends.`,
      moral: `When we help others, kindness comes back to us.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने मदद की`,
      body: `${s.placeHi} में एक नन्ही चींटी बड़ा टुकड़ा एक छोटी पहाड़ी पर धकेल रही थी। टुकड़ा बार-बार नीचे लुढ़क जाता — गुड़क, गुड़क!\n\n${s.heroHi} वहाँ से गुज़र रहा था और चींटी को हाँफते देखा। एक हल्के से धक्के से ${s.heroHi} ने टुकड़ा ऊपर तक पहुँचा दिया। "धन्यवाद, प्यारे ${s.heroHi}!" खुश चींटी बोली।\n\nउस शाम जब ${s.heroHi} से नाश्ता गिरा, तो चींटियों की पूरी कतार उसे घर ले जाने में मदद करने आ गई। अच्छाई घूम कर वापस आ गई, दोस्तों के घेरे की तरह।`,
      moral: `दूसरों की मदद करने पर अच्छाई लौट कर आती है।`,
    }),
  },
  {
    key: 'courage-newthing', ages: ['4-6'],
    en: (s) => ({
      title: `Brave Little ${s.hero}`,
      body: `At the ${s.place} park there was a big, curly slide. All the friends zoomed down, but ${s.hero} felt a little shy and stood at the bottom, watching.\n\n"You can do it!" the friends called kindly. ${s.hero} took a deep breath, climbed up the steps, and sat at the top. Then — wheee! — ${s.hero} whooshed all the way down, giggling the whole way.\n\n"That was SO much fun! Let's go again!" laughed ${s.hero}. From that day, ${s.hero} learned that trying something new can turn into the best fun of all.`,
      moral: `Being brave means trying new things.`,
    }),
    hi: (s) => ({
      title: `बहादुर नन्हा ${s.heroHi}`,
      body: `${s.placeHi} के पार्क में एक बड़ी, घुमावदार फिसलपट्टी थी। सब दोस्त सर्र-सर्र नीचे आते, पर ${s.heroHi} थोड़ा शरमा कर नीचे खड़ा देखता रहा।\n\n"तुम कर सकते हो!" दोस्तों ने प्यार से कहा। ${s.heroHi} ने गहरी साँस ली, सीढ़ियाँ चढ़ीं और ऊपर बैठ गया। फिर — वाह! — ${s.heroHi} हँसते हुए सर्र से नीचे आ गया।\n\n"कितना मज़ा आया! चलो फिर से!" ${s.heroHi} हँसा। उस दिन ${s.heroHi} ने सीखा कि कुछ नया करने की कोशिश सबसे बड़ी मस्ती बन सकती है।`,
      moral: `बहादुरी का मतलब है नई चीज़ें आज़माना।`,
    }),
  },
  {
    key: 'patience', ages: ['4-6'],
    en: (s) => ({
      title: `${s.hero} and the Little Seed`,
      body: `${s.hero} planted a tiny seed in the ${s.place} and wanted a flower right away. Each morning ${s.hero} peeked at the soil, but nothing showed. "Hurry up, little seed!" said ${s.hero}.\n\nA wise old owl smiled and said, "Good things take time. Just water it with care every day." So ${s.hero} watered the seed and waited, and waited some more.\n\nThen one happy morning, a tiny green shoot peeked out — hello! Soon a beautiful flower bloomed, nodding in the breeze. ${s.hero} clapped and clapped with joy.`,
      moral: `Good things grow for those who wait with care.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} और नन्हा बीज`,
      body: `${s.heroHi} ने ${s.placeHi} में एक नन्हा बीज बोया और तुरंत फूल चाहता था। हर सुबह ${s.heroHi} मिट्टी में झाँकता, पर कुछ नहीं उगता। "जल्दी करो, नन्हे बीज!" ${s.heroHi} कहता।\n\nएक समझदार उल्लू मुस्कुराया और बोला, "अच्छी चीज़ों में समय लगता है। बस रोज़ प्यार से पानी देते रहो।" तो ${s.heroHi} पानी देता और इंतज़ार करता रहा।\n\nफिर एक खुशनुमा सुबह, एक नन्ही हरी कोंपल निकली — नमस्ते! जल्दी ही एक सुंदर फूल खिल गया, हवा में झूमता हुआ। ${s.heroHi} खुशी से ताली बजाने लगा।`,
      moral: `धीरज रखने वालों के लिए अच्छी चीज़ें खिलती हैं।`,
    }),
  },
  {
    key: 'friendship', ages: ['4-6'],
    en: (s) => ({
      title: `${s.hero} Makes a Friend`,
      body: `A new little one came to the ${s.place} and sat all alone, not sure what to do. Everyone else was busy playing games.\n\n${s.hero} noticed and walked right over with a smile. "Hello! Would you like to play with me?" The new friend's eyes lit up like little stars.\n\nThey played and laughed and made up silly games all day long. Soon the whole ${s.place} was one big, giggly group of friends.`,
      moral: `A friendly hello can make someone's whole day.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने दोस्त बनाया`,
      body: `${s.placeHi} में एक नया नन्हा आया और अकेला बैठ गया, समझ नहीं पा रहा था क्या करे। बाकी सब खेलने में व्यस्त थे।\n\n${s.heroHi} ने यह देखा और मुस्कुरा कर पास गया। "नमस्ते! क्या तुम मेरे साथ खेलोगे?" नए दोस्त की आँखें तारों सी चमक उठीं।\n\nदोनों दिन भर खेले, हँसे और मज़ेदार खेल बनाए। जल्दी ही पूरा ${s.placeHi} एक बड़ा, खिलखिलाता दोस्तों का समूह बन गया।`,
      moral: `एक प्यारा नमस्ते किसी का पूरा दिन खुश कर सकता है।`,
    }),
  },

  // ════════ AGE 7-9 : 3-4 short paragraphs, a clear lesson + gentle humor ════════
  {
    key: 'perseverance', ages: ['7-9'],
    en: (s) => ({
      title: `${s.hero} Never Gives Up`,
      body: `Every friend in the ${s.place} was getting ready for the yearly Hop-and-Skip game up Gentle Hill. ${s.hero} was not the fastest or the strongest, but oh, how ${s.hero} loved to try!\n\nWhile some friends rested and chatted, ${s.hero} practised quietly every single morning. Hop, skip, wobble, tumble — and up again with a giggle. Some mornings were tricky, but ${s.hero} always tried just one more time.\n\nOn game day, the others grew tired halfway up the hill. Slow and steady, ${s.hero} kept going, step by cheerful step, and reached the top with a happy hop.\n\nEveryone clapped. "I'm not the fastest," said ${s.hero} with a grin, "but I never stopped trying!"`,
      moral: `Steady practice and a happy heart win the day.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने हार नहीं मानी`,
      body: `${s.placeHi} का हर दोस्त हर साल होने वाले उछल-कूद खेल की तैयारी कर रहा था, जो प्यारी पहाड़ी तक होता था। ${s.heroHi} न सबसे तेज़ था, न सबसे ताकतवर, पर कोशिश करना उसे बहुत पसंद था!\n\nजब कुछ दोस्त आराम करते और बातें करते, ${s.heroHi} हर सुबह चुपचाप अभ्यास करता। उछल, कूद, डगमग, धम — और फिर हँसते हुए ऊपर। कुछ सुबहें मुश्किल होतीं, पर ${s.heroHi} हमेशा एक बार और कोशिश करता।\n\nखेल के दिन बाकी दोस्त आधी पहाड़ी पर ही थक गए। धीरे और लगातार, ${s.heroHi} खुशी से कदम बढ़ाता रहा और एक प्यारी छलाँग के साथ चोटी पर पहुँचा।\n\nसबने तालियाँ बजाईं। "मैं सबसे तेज़ नहीं हूँ," ${s.heroHi} ने मुस्कुरा कर कहा, "पर मैंने कोशिश करना कभी नहीं छोड़ा!"`,
      moral: `लगातार अभ्यास और खुश मन से जीत मिलती है।`,
    }),
  },
  {
    key: 'teamwork', ages: ['7-9'],
    en: (s) => ({
      title: `${s.hero} and the Team`,
      body: `After a breezy day, soft leaves and little branches had drifted all across the path in the ${s.place}. The way to the playground was completely covered.\n\n${s.hero} tried to clear the big pile alone, tugging and puffing, but it was simply too much for one. Then ${s.hero} had a bright idea and called all the friends together.\n\n"If each of us carries just one branch, the work becomes light as a feather!" said ${s.hero}. One by one, everyone joined in, humming a cheerful tune.\n\nWith many hands working as a team, the path was clear before teatime. They sat together, happy and proud, and shared a lovely picnic.`,
      moral: `Together, a big job becomes easy.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} और टीम`,
      body: `एक हवादार दिन के बाद, ${s.placeHi} में रास्ते पर नरम पत्ते और नन्ही टहनियाँ बिखर गई थीं। खेल के मैदान का रास्ता पूरी तरह ढक गया था।\n\n${s.heroHi} ने अकेले बड़ा ढेर हटाने की कोशिश की, खींचा और हाँफा, पर एक के लिए यह बहुत ज़्यादा था। फिर ${s.heroHi} को एक शानदार तरकीब सूझी और उसने सब दोस्तों को बुलाया।\n\n"अगर हम में से हर एक सिर्फ़ एक टहनी उठाए, तो काम पंख जैसा हल्का हो जाएगा!" ${s.heroHi} ने कहा। एक-एक करके सब खुशी का गाना गुनगुनाते हुए जुट गए।\n\nकई हाथों ने टीम बन कर काम किया और चाय के समय से पहले रास्ता साफ़ हो गया। सब खुश और गर्व से साथ बैठे और प्यारी पिकनिक की।`,
      moral: `मिलकर काम करने से बड़ा काम आसान हो जाता है।`,
    }),
  },
  {
    key: 'humility', ages: ['7-9'],
    en: (s) => ({
      title: `${s.hero} Learns to Listen`,
      body: `${s.hero} was very clever and could solve almost any puzzle in the ${s.place}. Soon ${s.hero} began to say, "I always know best!" and stopped listening to the smaller friends.\n\nOne day a big puzzle box appeared, with a tricky little lock. ${s.hero} tried this way and that way, but it just would not open. Hmph!\n\nA quiet little snail, whom ${s.hero} had not been listening to, said gently, "Try turning it the other way." ${s.hero} did — and click! — the box popped open, full of fun toys.\n\n${s.hero} felt a warm little blush. "I'm sorry I didn't listen. Everyone has good ideas!" After that, ${s.hero} listened to all friends, big and small, and solved even more puzzles together.`,
      moral: `Stay humble — everyone has something to teach us.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने सुनना सीखा`,
      body: `${s.heroHi} बहुत होशियार था और ${s.placeHi} की लगभग हर पहेली सुलझा लेता था। जल्दी ही ${s.heroHi} कहने लगा, "मुझे हमेशा सबसे अच्छा पता है!" और छोटे दोस्तों की सुनना बंद कर दिया।\n\nएक दिन एक बड़ा पहेली-बक्सा आया, जिस पर एक पेचीदा सा ताला था। ${s.heroHi} ने इधर-उधर बहुत कोशिश की, पर वह खुला ही नहीं। हुंह!\n\nएक शांत नन्हा घोंघा, जिसकी ${s.heroHi} नहीं सुन रहा था, धीरे से बोला, "इसे दूसरी ओर घुमा कर देखो।" ${s.heroHi} ने ऐसा किया — और खट! — बक्सा खुल गया, मज़ेदार खिलौनों से भरा।\n\n${s.heroHi} थोड़ा शरमाया। "माफ़ करना, मैंने नहीं सुना। हर किसी के पास अच्छे विचार होते हैं!" इसके बाद ${s.heroHi} छोटे-बड़े सब दोस्तों की सुनता और मिलकर और भी पहेलियाँ सुलझाता।`,
      moral: `विनम्र रहो — हर किसी से कुछ सीखने को मिलता है।`,
    }),
  },
  {
    key: 'nature-care', ages: ['7-9'],
    en: (s) => ({
      title: `${s.hero} Brightens the ${s.place}`,
      body: `The ${s.place} where ${s.hero} lived had become a bit untidy. Stray wrappers lay here and there, and the little stream looked cloudy and sad.\n\nSome friends shrugged and said, "That's not our job." But ${s.hero} loved their home dearly and decided to help. Each day ${s.hero} picked up a little litter and planted one small sapling.\n\nSeeing this, one friend joined in, then another, then a whole cheerful bunch. They popped litter into bins and planted saplings in neat little rows, singing as they worked.\n\nWithin one season, the ${s.place} was green and fresh again, with sparkling water and singing birds. ${s.hero} smiled. "When we care for our home, our home smiles back at us."`,
      moral: `Caring for nature keeps our home beautiful.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने ${s.placeHi} को चमकाया`,
      body: `${s.heroHi} जिस ${s.placeHi} में रहता था, वह थोड़ा गंदा हो गया था। इधर-उधर कागज़ पड़े थे, और नन्ही धारा मैली और उदास लग रही थी।\n\nकुछ दोस्तों ने कंधे उचका कर कहा, "यह हमारा काम नहीं।" पर ${s.heroHi} अपने घर से बहुत प्यार करता था और मदद करने की ठानी। हर दिन ${s.heroHi} थोड़ा कचरा उठाता और एक नन्हा पौधा लगाता।\n\nयह देख कर एक दोस्त जुड़ा, फिर दूसरा, फिर पूरी खुशमिज़ाज टोली। सब कचरा कूड़ेदान में डालते और कतार में पौधे लगाते, गाते-गाते।\n\nएक मौसम में ${s.placeHi} फिर हरा-भरा और ताज़ा हो गया, चमकते पानी और चहचहाते पक्षियों के साथ। ${s.heroHi} मुस्कुराया। "जब हम अपने घर का ख्याल रखते हैं, तो घर हम पर मुस्कुराता है।"`,
      moral: `प्रकृति की देखभाल हमारे घर को सुंदर रखती है।`,
    }),
  },
  {
    key: 'kindness-picnic', ages: ['7-9'],
    en: (s) => ({
      title: `${s.hero} and the Picnic`,
      body: `It was a bright, happy picnic day in the ${s.place}. Everyone spread out their baskets full of yummy treats on the soft grass.\n\nBut one little friend had forgotten their lunch basket at home and sat quietly with an empty plate. ${s.hero} noticed right away.\n\nWithout a second thought, ${s.hero} shared half of everything — a sandwich here, a sweet fruit there — onto the friend's plate. "We can share mine! It's more fun to eat together anyway," said ${s.hero} with a grin.\n\nSeeing this, all the other friends happily shared a little too. Soon there was a giant feast in the middle, and it became the merriest picnic the ${s.place} had ever seen.`,
      moral: `A small act of sharing can make a big, happy feast.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} और पिकनिक`,
      body: `${s.placeHi} में एक चमकीला, खुशनुमा पिकनिक का दिन था। सबने नरम घास पर स्वादिष्ट चीज़ों से भरी टोकरियाँ फैलाईं।\n\nपर एक नन्हा दोस्त अपनी टोकरी घर भूल आया था और खाली थाली लिए चुपचाप बैठा था। ${s.heroHi} ने तुरंत देख लिया।\n\nबिना सोचे ${s.heroHi} ने हर चीज़ का आधा हिस्सा — एक सैंडविच, एक मीठा फल — दोस्त की थाली में रख दिया। "हम मेरा बाँट सकते हैं! साथ खाने में वैसे भी ज़्यादा मज़ा है," ${s.heroHi} ने मुस्कुरा कर कहा।\n\nयह देख कर बाकी सब दोस्तों ने भी खुशी से थोड़ा-थोड़ा बाँटा। जल्दी ही बीच में एक बड़ी दावत लग गई, और यह ${s.placeHi} की अब तक की सबसे खुशनुमा पिकनिक बन गई।`,
      moral: `बाँटने का छोटा काम बड़ी खुशी की दावत बना देता है।`,
    }),
  },
]
