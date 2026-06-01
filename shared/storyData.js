// ──────────────────────────────────────────────────────────────
//  Story data for the story bank.
//  ALL content follows STORY_GUIDELINES.md: no violence/fear/sadness,
//  happy endings, simple moral, warm & funny.
//
//  Variety comes from THREE things combined, so stories don't read the
//  same with only the name changed:
//    1. SUBJECTS each have a unique `trait` — a signature happy action
//       (lion roars, peacock dances, train goes choo-choo…).
//    2. OPENERS vary the first words (and shift per age group).
//    3. TEMPLATES give different plots + morals.
//  Builders receive { hero, heroHi, place, placeHi, trait, traitHi, opener, openerHi }.
// ──────────────────────────────────────────────────────────────

// Varied opening phrases (English + Hindi). The generator also shifts the
// choice per age group, so a subject's 2-3 / 4-6 / 7-9 stories start differently.
export const OPENERS = ['One bright morning,', 'Once upon a time,', 'On a warm sunny day,', 'Early one morning,', 'One fine day,', 'On a happy little morning,']
export const OPENERS_HI = ['एक चमकीली सुबह,', 'एक बार की बात है,', 'एक गरम धूप वाले दिन,', 'एक सुबह जल्दी,', 'एक प्यारे दिन,', 'एक खुशनुमा सुबह,']

export const SUBJECTS = [
  // ── Animals ──
  { term: 'Lion', termHi: 'शेर', category: 'animal', place: 'jungle', placeHi: 'जंगल', trait: 'let out a big friendly roar', traitHi: 'ने एक बड़ी प्यारी दहाड़ लगाई' },
  { term: 'Tiger', termHi: 'बाघ', category: 'animal', place: 'jungle', placeHi: 'जंगल', trait: 'stretched its soft stripy paws', traitHi: 'ने अपने नरम धारीदार पंजे फैलाए' },
  { term: 'Elephant', termHi: 'हाथी', category: 'animal', place: 'jungle', placeHi: 'जंगल', trait: 'gave a happy trumpet with its long trunk', traitHi: 'ने अपनी लंबी सूँड से खुशी की तुरही बजाई' },
  { term: 'Monkey', termHi: 'बंदर', category: 'animal', place: 'jungle', placeHi: 'जंगल', trait: 'swung merrily from branch to branch', traitHi: 'ने डाली से डाली खुशी से झूला लिया' },
  { term: 'Rabbit', termHi: 'खरगोश', category: 'animal', place: 'jungle', placeHi: 'जंगल', trait: 'hopped about wiggling its fluffy tail', traitHi: 'ने अपनी रुई सी पूँछ हिलाते हुए छलांग लगाई' },
  { term: 'Deer', termHi: 'हिरण', category: 'animal', place: 'jungle', placeHi: 'जंगल', trait: 'leaped lightly across the soft grass', traitHi: 'ने नरम घास पर हल्की छलांग लगाई' },
  { term: 'Bear', termHi: 'भालू', category: 'animal', place: 'jungle', placeHi: 'जंगल', trait: 'gave a big, cuddly stretch', traitHi: 'ने एक बड़ी प्यारी अंगड़ाई ली' },
  { term: 'Fox', termHi: 'लोमड़ी', category: 'animal', place: 'jungle', placeHi: 'जंगल', trait: 'wagged its bushy tail cleverly', traitHi: 'ने अपनी झाड़ीदार पूँछ चतुराई से हिलाई' },
  { term: 'Giraffe', termHi: 'जिराफ़', category: 'animal', place: 'jungle', placeHi: 'जंगल', trait: 'stretched its tall neck up to the leaves', traitHi: 'ने अपनी लंबी गर्दन पत्तों तक तानी' },
  { term: 'Zebra', termHi: 'ज़ेबरा', category: 'animal', place: 'jungle', placeHi: 'जंगल', trait: 'trotted along showing off its stripes', traitHi: 'ने अपनी धारियाँ दिखाते हुए दौड़ लगाई' },
  { term: 'Horse', termHi: 'घोड़ा', category: 'animal', place: 'farm', placeHi: 'खेत', trait: 'gave a cheerful neigh and a little gallop', traitHi: 'ने खुशी से हिनहिनाया और छोटी सी दौड़ लगाई' },
  { term: 'Camel', termHi: 'ऊँट', category: 'animal', place: 'desert', placeHi: 'रेगिस्तान', trait: 'swayed gently across the warm sand', traitHi: 'ने गरम रेत पर धीरे-धीरे झूमते कदम रखे' },
  { term: 'Cow', termHi: 'गाय', category: 'animal', place: 'farm', placeHi: 'खेत', trait: 'gave a soft, friendly moo', traitHi: 'ने एक नरम, प्यारी रंभाहट की' },
  { term: 'Goat', termHi: 'बकरी', category: 'animal', place: 'farm', placeHi: 'खेत', trait: 'gave a happy hop and a cheerful meh', traitHi: 'ने एक खुश छलांग लगाई और में-में की' },
  { term: 'Dog', termHi: 'कुत्ता', category: 'animal', place: 'village', placeHi: 'गाँव', trait: 'wagged its tail and gave a happy woof', traitHi: 'ने पूँछ हिलाई और खुशी से भौंका' },
  { term: 'Cat', termHi: 'बिल्ली', category: 'animal', place: 'village', placeHi: 'गाँव', trait: 'gave a soft purr and a gentle stretch', traitHi: 'ने धीरे से म्याऊँ की और अंगड़ाई ली' },
  { term: 'Squirrel', termHi: 'गिलहरी', category: 'animal', place: 'garden', placeHi: 'बगीचा', trait: 'scurried up with a nut in its tiny paws', traitHi: 'ने नन्हे पंजों में अखरोट लेकर फुर्ती दिखाई' },
  { term: 'Tortoise', termHi: 'कछुआ', category: 'animal', place: 'pond', placeHi: 'तालाब', trait: 'took slow, happy little steps', traitHi: 'ने धीरे-धीरे खुश कदम रखे' },
  { term: 'Frog', termHi: 'मेंढक', category: 'animal', place: 'pond', placeHi: 'तालाब', trait: 'gave a cheerful hop and a ribbit', traitHi: 'ने खुशी से छलांग लगाई और टर्र-टर्र किया' },
  { term: 'Mouse', termHi: 'चूहा', category: 'animal', place: 'village', placeHi: 'गाँव', trait: 'gave a tiny squeak and a quick scamper', traitHi: 'ने नन्ही चूँ-चूँ की और फुर्ती से दौड़ा' },

  // ── Birds ──
  { term: 'Sparrow', termHi: 'गौरैया', category: 'bird', place: 'tall tree', placeHi: 'ऊँचे पेड़', trait: 'fluttered its little wings happily', traitHi: 'ने अपने नन्हे पंख खुशी से फड़फड़ाए' },
  { term: 'Parrot', termHi: 'तोता', category: 'bird', place: 'tall tree', placeHi: 'ऊँचे पेड़', trait: 'said a cheerful hello in its squeaky voice', traitHi: 'ने अपनी प्यारी आवाज़ में नमस्ते कहा' },
  { term: 'Peacock', termHi: 'मोर', category: 'bird', place: 'forest', placeHi: 'जंगल', trait: 'spread its shimmering feathers and danced', traitHi: 'ने अपने चमकीले पंख फैलाकर नाच किया' },
  { term: 'Crow', termHi: 'कौआ', category: 'bird', place: 'tall tree', placeHi: 'ऊँचे पेड़', trait: 'gave a clever little caw', traitHi: 'ने एक चतुर सी काँव-काँव की' },
  { term: 'Pigeon', termHi: 'कबूतर', category: 'bird', place: 'rooftop', placeHi: 'छत', trait: 'cooed softly and ruffled its feathers', traitHi: 'ने धीरे से गुटरगूँ की और पंख फुलाए' },
  { term: 'Owl', termHi: 'उल्लू', category: 'bird', place: 'old tree', placeHi: 'पुराने पेड़', trait: 'blinked its big, wise eyes', traitHi: 'ने अपनी बड़ी समझदार आँखें झपकाईं' },
  { term: 'Duck', termHi: 'बत्तख', category: 'bird', place: 'pond', placeHi: 'तालाब', trait: 'waddled to the water with a happy quack', traitHi: 'ने खुशी से क्वैक करते हुए पानी की ओर चहलकदमी की' },
  { term: 'Swan', termHi: 'हंस', category: 'bird', place: 'lake', placeHi: 'झील', trait: 'glided gracefully across the water', traitHi: 'ने पानी पर खूबसूरती से तैरते हुए सैर की' },
  { term: 'Koel', termHi: 'कोयल', category: 'bird', place: 'mango tree', placeHi: 'आम के पेड़', trait: 'sang a sweet morning song', traitHi: 'ने एक मीठा सुबह का गीत गाया' },

  // ── Cartoon characters ──
  { term: 'Doraemon', termHi: 'डोरेमॉन', category: 'cartoon', place: 'town', placeHi: 'शहर', trait: 'pulled a fun gadget from its magic pocket', traitHi: 'ने अपनी जादुई जेब से एक मज़ेदार गैजेट निकाला' },
  { term: 'Chhota Bheem', termHi: 'छोटा भीम', category: 'cartoon', place: 'village', placeHi: 'गाँव', trait: 'flexed its strong little arms with a grin', traitHi: 'ने मुस्कुराते हुए अपनी मज़बूत बाँहें दिखाईं' },
  { term: 'Motu', termHi: 'मोटू', category: 'cartoon', place: 'town', placeHi: 'शहर', trait: 'happily munched a big, yummy laddu', traitHi: 'ने खुशी से एक बड़ा स्वादिष्ट लड्डू खाया' },
  { term: 'Patlu', termHi: 'पतलू', category: 'cartoon', place: 'town', placeHi: 'शहर', trait: 'pushed up its glasses with a clever smile', traitHi: 'ने चतुर मुस्कान के साथ अपना चश्मा ठीक किया' },
  { term: 'Tom', termHi: 'टॉम', category: 'cartoon', place: 'house', placeHi: 'घर', trait: 'tiptoed around with a playful grin', traitHi: 'ने शरारती मुस्कान के साथ दबे पाँव कदम रखे' },
  { term: 'Jerry', termHi: 'जेरी', category: 'cartoon', place: 'house', placeHi: 'घर', trait: 'gave a quick, cheeky little wave', traitHi: 'ने झट से एक शरारती सी हाथ हिलाई' },
  { term: 'Mickey Mouse', termHi: 'मिकी माउस', category: 'cartoon', place: 'town', placeHi: 'शहर', trait: 'giggled and wiggled its big round ears', traitHi: 'ने हँसते हुए अपने बड़े गोल कान हिलाए' },
  { term: 'Pikachu', termHi: 'पिकाचू', category: 'cartoon', place: 'meadow', placeHi: 'मैदान', trait: 'gave a happy, sparkly cheer', traitHi: 'ने खुशी से एक चमकीली आवाज़ निकाली' },
  { term: 'Oggy', termHi: 'ओग्गी', category: 'cartoon', place: 'house', placeHi: 'घर', trait: 'smiled and tidied up its cozy home', traitHi: 'ने मुस्कुराते हुए अपना आरामदायक घर साफ़ किया' },
  { term: 'Ben', termHi: 'बेन', category: 'cartoon', place: 'town', placeHi: 'शहर', trait: 'looked at its watch with an excited grin', traitHi: 'ने उत्साह से अपनी घड़ी देखी' },
  { term: 'Bablu', termHi: 'बबलू', category: 'cartoon', place: 'town', placeHi: 'शहर', trait: 'skipped along humming a happy tune', traitHi: 'ने खुशी का गाना गुनगुनाते हुए कदम बढ़ाए' },
  { term: 'Ninja Hattori', termHi: 'निंजा हटोरी', category: 'cartoon', place: 'town', placeHi: 'शहर', trait: 'did a quick, friendly little flip', traitHi: 'ने झट से एक प्यारी सी पलटी मारी' },
  { term: 'Chacha Chaudhary', termHi: 'चाचा चौधरी', category: 'cartoon', place: 'town', placeHi: 'शहर', trait: 'stroked its moustache with a wise smile', traitHi: 'ने समझदार मुस्कान के साथ अपनी मूँछ पर हाथ फेरा' },
  { term: 'Bob', termHi: 'बॉब', category: 'cartoon', place: 'town', placeHi: 'शहर', trait: 'tightened its hard hat, ready to build', traitHi: 'ने बनाने के लिए तैयार होकर अपना हेलमेट कसा' },

  // ── Flowers ──
  { term: 'Rose', termHi: 'गुलाब', category: 'flower', place: 'garden', placeHi: 'बगीचा', trait: 'opened its soft red petals to the sun', traitHi: 'ने अपनी नरम लाल पंखुड़ियाँ सूरज की ओर खोलीं' },
  { term: 'Lotus', termHi: 'कमल', category: 'flower', place: 'pond', placeHi: 'तालाब', trait: 'rested gently on the cool water', traitHi: 'ठंडे पानी पर धीरे से टिका रहा' },
  { term: 'Sunflower', termHi: 'सूरजमुखी', category: 'flower', place: 'garden', placeHi: 'बगीचा', trait: 'turned its bright face toward the sun', traitHi: 'ने अपना चमकीला चेहरा सूरज की ओर घुमाया' },
  { term: 'Marigold', termHi: 'गेंदा', category: 'flower', place: 'garden', placeHi: 'बगीचा', trait: 'glowed in cheerful orange and yellow', traitHi: 'नारंगी और पीले रंग में खुशी से चमका' },
  { term: 'Jasmine', termHi: 'चमेली', category: 'flower', place: 'garden', placeHi: 'बगीचा', trait: 'spread a sweet, gentle smell around', traitHi: 'ने चारों ओर मीठी खुशबू फैलाई' },
  { term: 'Lily', termHi: 'लिली', category: 'flower', place: 'garden', placeHi: 'बगीचा', trait: 'swayed softly in the cool breeze', traitHi: 'ठंडी हवा में धीरे-धीरे झूमा' },
  { term: 'Tulip', termHi: 'ट्यूलिप', category: 'flower', place: 'garden', placeHi: 'बगीचा', trait: 'stood up tall and colourful', traitHi: 'रंग-बिरंगा होकर सीधा खड़ा हुआ' },
  { term: 'Daisy', termHi: 'डेज़ी', category: 'flower', place: 'garden', placeHi: 'बगीचा', trait: 'blinked open its tiny white petals', traitHi: 'ने अपनी नन्ही सफ़ेद पंखुड़ियाँ खोलीं' },
  { term: 'Hibiscus', termHi: 'गुड़हल', category: 'flower', place: 'garden', placeHi: 'बगीचा', trait: 'waved its big red flower in the breeze', traitHi: 'ने हवा में अपना बड़ा लाल फूल लहराया' },
  { term: 'Champa', termHi: 'चंपा', category: 'flower', place: 'garden', placeHi: 'बगीचा', trait: 'filled the air with a lovely scent', traitHi: 'ने हवा में प्यारी खुशबू भर दी' },

  // ── Fruits ──
  { term: 'Mango', termHi: 'आम', category: 'fruit', place: 'orchard', placeHi: 'बगीचा', trait: 'shone juicy and golden in the sun', traitHi: 'धूप में रसीला और सुनहरा चमका' },
  { term: 'Apple', termHi: 'सेब', category: 'fruit', place: 'orchard', placeHi: 'बगीचा', trait: 'shone shiny and red on the branch', traitHi: 'डाली पर चमकीला लाल चमका' },
  { term: 'Banana', termHi: 'केला', category: 'fruit', place: 'orchard', placeHi: 'बगीचा', trait: 'gave a cheerful, curvy smile', traitHi: 'ने एक प्यारी सी घुमावदार मुस्कान दी' },
  { term: 'Grapes', termHi: 'अंगूर', category: 'fruit', place: 'orchard', placeHi: 'बगीचा', trait: 'huddled together in a happy purple bunch', traitHi: 'एक खुश बैंगनी गुच्छे में साथ झूले' },
  { term: 'Orange', termHi: 'संतरा', category: 'fruit', place: 'orchard', placeHi: 'बगीचा', trait: 'glowed round and bright', traitHi: 'गोल और चमकीला चमका' },
  { term: 'Guava', termHi: 'अमरूद', category: 'fruit', place: 'orchard', placeHi: 'बगीचा', trait: 'smelled sweet and fresh', traitHi: 'मीठी और ताज़ी महक देता रहा' },
  { term: 'Strawberry', termHi: 'स्ट्रॉबेरी', category: 'fruit', place: 'farm', placeHi: 'खेत', trait: 'sparkled red with tiny seeds', traitHi: 'नन्हे बीजों के साथ लाल चमका' },
  { term: 'Watermelon', termHi: 'तरबूज़', category: 'fruit', place: 'farm', placeHi: 'खेत', trait: 'grinned big, green and stripy', traitHi: 'बड़ा, हरा और धारीदार मुस्कुराया' },

  // ── Vehicles ──
  { term: 'Train', termHi: 'रेलगाड़ी', category: 'vehicle', place: 'station', placeHi: 'स्टेशन', trait: 'gave a cheerful choo-choo whistle', traitHi: 'ने खुशी से छुक-छुक सीटी बजाई' },
  { term: 'Aeroplane', termHi: 'हवाई जहाज़', category: 'vehicle', place: 'airport', placeHi: 'हवाई अड्डा', trait: 'zoomed up with a happy whoosh', traitHi: 'ने खुशी से सर्र से उड़ान भरी' },
  { term: 'Car', termHi: 'कार', category: 'vehicle', place: 'town', placeHi: 'शहर', trait: 'gave a friendly little beep-beep', traitHi: 'ने एक प्यारी सी पों-पों बजाई' },
  { term: 'Boat', termHi: 'नाव', category: 'vehicle', place: 'river', placeHi: 'नदी', trait: 'bobbed gently on the water', traitHi: 'पानी पर धीरे-धीरे डोली' },
  { term: 'Bus', termHi: 'बस', category: 'vehicle', place: 'town', placeHi: 'शहर', trait: 'rolled along with a cheerful honk', traitHi: 'ने खुशी से हॉर्न बजाते हुए सफ़र किया' },
  { term: 'Bicycle', termHi: 'साइकिल', category: 'vehicle', place: 'village', placeHi: 'गाँव', trait: 'rang its little bell, ring-ring', traitHi: 'ने अपनी नन्ही घंटी बजाई, ट्रिंग-ट्रिंग' },

  // ── Fun magical friends ──
  { term: 'Unicorn', termHi: 'यूनिकॉर्न', category: 'magical', place: 'rainbow meadow', placeHi: 'इंद्रधनुषी मैदान', trait: 'shook its sparkly rainbow mane', traitHi: 'ने अपने चमकीले इंद्रधनुषी बाल हिलाए' },
  { term: 'Mermaid', termHi: 'जलपरी', category: 'magical', place: 'blue ocean', placeHi: 'नीला समुद्र', trait: 'splashed its shiny tail in the water', traitHi: 'ने पानी में अपनी चमकीली पूँछ छपछपाई' },
  { term: 'Robot', termHi: 'रोबोट', category: 'magical', place: 'busy town', placeHi: 'व्यस्त शहर', trait: 'beeped a cheerful boop-beep', traitHi: 'ने खुशी से बीप-बूप किया' },
  { term: 'Dinosaur', termHi: 'डायनासोर', category: 'magical', place: 'green valley', placeHi: 'हरी घाटी', trait: 'gave a big, gentle, happy stomp', traitHi: 'ने एक बड़ा, प्यारा खुश कदम रखा' },
  { term: 'Wizard', termHi: 'जादूगर', category: 'magical', place: 'cozy castle', placeHi: 'आरामदायक महल', trait: 'gave its magic wand a friendly wave', traitHi: 'ने अपनी जादुई छड़ी प्यार से लहराई' },
  { term: 'Dragon', termHi: 'ड्रैगन', category: 'magical', place: 'green hills', placeHi: 'हरी पहाड़ियाँ', trait: 'puffed out a tiny cloud of sparkles', traitHi: 'ने नन्हे चमकीले बुलबुले फूँके' },
  { term: 'Fairy', termHi: 'परी', category: 'magical', place: 'flower garden', placeHi: 'फूलों का बगीचा', trait: 'fluttered its tiny glittering wings', traitHi: 'ने अपने नन्हे चमकीले पंख फड़फड़ाए' },
  { term: 'Spaceship', termHi: 'अंतरिक्ष यान', category: 'magical', place: 'starry sky', placeHi: 'तारों भरा आसमान', trait: 'twinkled its lights among the stars', traitHi: 'ने तारों के बीच अपनी रोशनी टिमटिमाई' },
  { term: 'Cupcake', termHi: 'कपकेक', category: 'magical', place: 'sweet bakery', placeHi: 'मीठी बेकरी', trait: 'wobbled its fluffy frosting happily', traitHi: 'ने अपनी मुलायम क्रीम खुशी से हिलाई' },
  { term: 'Astronaut', termHi: 'अंतरिक्ष यात्री', category: 'magical', place: 'starry sky', placeHi: 'तारों भरा आसमान', trait: 'did a slow, happy floating twirl', traitHi: 'ने धीरे से तैरते हुए खुश घुमरी ली' },
  { term: 'Snowman', termHi: 'हिममानव', category: 'magical', place: 'snowy hills', placeHi: 'बर्फीली पहाड़ियाँ', trait: 'gave a frosty, friendly wave', traitHi: 'ने बर्फ़ीला प्यारा हाथ हिलाया' },
  { term: 'Teddy', termHi: 'टेडी', category: 'magical', place: 'cozy playroom', placeHi: 'खेल का कमरा', trait: 'gave the softest, warmest hug', traitHi: 'ने सबसे नरम, गरम झप्पी दी' },
]

// Each template = a plot with one moral. `ages` = suitable groups.
// Every body OPENS with the subject's own opener + signature trait, so two
// characters never start the same way.
export const TEMPLATES = [
  // ════════ AGE 2-3 : 2 tiny paragraphs ════════
  {
    key: 'good-morning', ages: ['2-3'],
    en: (s) => ({
      title: `${s.hero} Says Good Morning`,
      body: `${s.opener} ${s.hero} ${s.trait}. The sun was warm and bright over the ${s.place}.\n\n"Good morning, friends!" said ${s.hero}. All the friends smiled back, and it was a lovely, happy day.`,
      moral: `A kind hello makes everyone smile.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने कहा सुप्रभात`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi}। ${s.placeHi} पर धूप गरम और चमकीली थी।\n\n"सुप्रभात दोस्तों!" ${s.heroHi} ने कहा। सब दोस्त मुस्कुराए, और बहुत प्यारा दिन था।`,
      moral: `प्यार से नमस्ते कहने पर सब खुश होते हैं।`,
    }),
  },
  {
    key: 'share-toddler', ages: ['2-3'],
    en: (s) => ({
      title: `${s.hero} Shares a Treat`,
      body: `${s.opener} ${s.hero} ${s.trait}. ${s.hero} had two yummy treats, but a little friend had none.\n\n${s.hero} gave one treat to the friend, and they munched together — crunch, crunch! Sharing felt so good.`,
      moral: `Sharing makes playtime sweeter.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने मिठाई बाँटी`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi}। ${s.heroHi} के पास दो स्वादिष्ट मिठाइयाँ थीं, पर एक छोटे दोस्त के पास एक भी नहीं।\n\n${s.heroHi} ने एक मिठाई दोस्त को दी, और दोनों ने साथ खाया — कुरकुर, कुरकुर! बाँटना बहुत अच्छा लगा।`,
      moral: `बाँटने से खेल और मज़ेदार हो जाता है।`,
    }),
  },
  {
    key: 'wash-hands', ages: ['2-3'],
    en: (s) => ({
      title: `${s.hero} Gets Clean`,
      body: `${s.opener} ${s.hero} ${s.trait} and played all day in the ${s.place}. Oh my — all dusty from so much fun!\n\nBefore eating, ${s.hero} had a good wash with soap and water. Scrub, scrub, splash! All clean and fresh, and ${s.hero} enjoyed a happy meal.`,
      moral: `Staying clean keeps us healthy.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ${s.g('साफ़-सुथरा हुआ', 'साफ़-सुथरी हुई')}`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi} और दिन भर ${s.placeHi} में ${s.g('खेला', 'खेली')}। अरे — खेल-खेल में सब गंदा हो गया!\n\nखाने से पहले ${s.heroHi} ने साबुन और पानी से अच्छी तरह सफ़ाई की। रगड़ो, रगड़ो, छप-छप! सब साफ़ और ताज़ा, और ${s.heroHi} ने खुशी से खाना खाया।`,
      moral: `साफ़-सुथरा रहना हमें तंदुरुस्त रखता है।`,
    }),
  },
  {
    key: 'tidy-up', ages: ['2-3'],
    en: (s) => ({
      title: `${s.hero} Tidies Up`,
      body: `${s.opener} ${s.hero} ${s.trait}. But oh dear — toys were all over the ${s.place}, here, there, everywhere!\n\nSo ${s.hero} sang a tidy-up song and put each toy in its box. One, two, three — all done! The ${s.place} looked neat, and ${s.hero} cheered with joy.`,
      moral: `Tidying up makes our home happy.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने सफ़ाई की`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi}। पर अरे — ${s.placeHi} में खिलौने हर जगह बिखरे थे!\n\nतो ${s.heroHi} ने सफ़ाई का गाना गाया और हर खिलौना डिब्बे में रखा। एक, दो, तीन — हो गया! ${s.placeHi} साफ़ हो गया, और ${s.heroHi} खुशी से झूम ${s.g('उठा', 'उठी')}।`,
      moral: `सफ़ाई करने से हमारा घर खुश रहता है।`,
    }),
  },
  {
    key: 'thank-you', ages: ['2-3'],
    en: (s) => ({
      title: `${s.hero} Says Thank You`,
      body: `${s.opener} ${s.hero} ${s.trait}. A kind friend came by and gave ${s.hero} a sweet, juicy fruit.\n\n${s.hero} smiled wide and said, "Thank you!" The friend felt happy, and so did ${s.hero}. Two little thank-you smiles lit up the day.`,
      moral: `Saying "thank you" spreads happiness.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने धन्यवाद कहा`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi}। एक प्यारे दोस्त ने आकर ${s.heroHi} को मीठा, रसीला फल दिया।\n\n${s.heroHi} ने मुस्कुरा कर कहा, "धन्यवाद!" दोस्त खुश हुआ, और ${s.heroHi} भी। दो नन्ही मुस्कानों ने दिन रोशन कर दिया।`,
      moral: `"धन्यवाद" कहने से खुशियाँ बढ़ती हैं।`,
    }),
  },

  // ════════ AGE 4-6 : 3 short paragraphs ════════
  {
    key: 'honesty', ages: ['4-6'],
    en: (s) => ({
      title: `${s.hero} and the Truth`,
      body: `${s.opener} ${s.hero} ${s.trait} while playing in the ${s.place}. By accident, ${s.hero} knocked over a friend's tall tower of blocks. Crash — down it tumbled, and no one had seen!\n\n${s.hero} felt a little wobbly inside and thought about staying quiet. But that did not feel right. So ${s.hero} went to the friend and said softly, "I knocked over your tower by mistake. I'm sorry."\n\nThe friend smiled and gave a big hug. "Thank you for telling me!" Together they built a brand-new tower, even taller and more fun than before.`,
      moral: `Telling the truth turns worry into friendship.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} और सच्चाई`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi} और ${s.placeHi} में खेलने ${s.g('लगा', 'लगी')}। गलती से ${s.heroHi} से एक दोस्त के ब्लॉक का ऊँचा मीनार गिर गया। धड़ाम — सब गिर गया, और किसी ने नहीं देखा!\n\n${s.heroHi} के मन में थोड़ी घबराहट हुई और चुप रहने का मन हुआ। पर यह सही नहीं लगा। तो ${s.heroHi} ने दोस्त के पास जाकर धीरे से कहा, "तुम्हारा मीनार मुझसे गलती से गिर गया। माफ़ करना।"\n\nदोस्त मुस्कुराया और गले लगाया। "बताने के लिए धन्यवाद!" दोनों ने मिलकर नया मीनार बनाया, पहले से भी ऊँचा और मज़ेदार।`,
      moral: `सच बोलने से चिंता दोस्ती में बदल जाती है।`,
    }),
  },
  {
    key: 'helping', ages: ['4-6'],
    en: (s) => ({
      title: `${s.hero} Lends a Hand`,
      body: `${s.opener} ${s.hero} ${s.trait} near the ${s.place}. There, a tiny ant was pushing a big crumb up a little hill — but it kept rolling back down, boing, boing!\n\n${s.hero} saw the ant huffing and puffing, and with a gentle nudge helped roll the crumb to the top. "Thank you, kind ${s.hero}!" cheered the happy ant.\n\nThat evening, when ${s.hero} dropped a snack, a whole parade of ants marched over to help carry it home. Kindness had come back around, like a circle of friends.`,
      moral: `When we help others, kindness comes back to us.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने मदद की`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi} और ${s.placeHi} के पास ${s.g('पहुँचा', 'पहुँची')}। वहाँ एक नन्ही चींटी बड़ा टुकड़ा पहाड़ी पर धकेल रही थी — पर वह बार-बार लुढ़क जाता, गुड़क, गुड़क!\n\n${s.heroHi} ने चींटी को हाँफते देखा और हल्के से धक्के से टुकड़ा ऊपर पहुँचा दिया। "धन्यवाद, प्यारे ${s.heroHi}!" खुश चींटी बोली।\n\nउस शाम जब ${s.heroHi} से नाश्ता गिरा, तो चींटियों की पूरी कतार उसे घर ले जाने में मदद करने आ गई। अच्छाई घूम कर वापस आ गई, दोस्तों के घेरे की तरह।`,
      moral: `दूसरों की मदद करने पर अच्छाई लौट कर आती है।`,
    }),
  },
  {
    key: 'courage-newthing', ages: ['4-6'],
    en: (s) => ({
      title: `Brave Little ${s.hero}`,
      body: `${s.opener} ${s.hero} ${s.trait} at the ${s.place} park. There was a big, curly slide, and all the friends zoomed down — but ${s.hero} felt a little shy and watched from below.\n\n"You can do it!" the friends called kindly. ${s.hero} took a deep breath, climbed the steps, and sat at the top. Then — wheee! — ${s.hero} whooshed all the way down, giggling.\n\n"That was SO much fun! Let's go again!" laughed ${s.hero}. From that day, ${s.hero} learned that trying something new can be the best fun of all.`,
      moral: `Being brave means trying new things.`,
    }),
    hi: (s) => ({
      title: `${s.g('बहादुर नन्हा', 'बहादुर नन्ही')} ${s.heroHi}`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi} और ${s.placeHi} के पार्क ${s.g('पहुँचा', 'पहुँची')}। वहाँ एक बड़ी घुमावदार फिसलपट्टी थी, और सब दोस्त सर्र-सर्र नीचे आते — पर ${s.heroHi} थोड़ा शरमा कर नीचे से ${s.g('देखता रहा', 'देखती रही')}।\n\n"तुम कर सकते हो!" दोस्तों ने प्यार से कहा। ${s.heroHi} ने गहरी साँस ली, सीढ़ियाँ चढ़ीं और ऊपर ${s.g('बैठ गया', 'बैठ गई')}। फिर — वाह! — ${s.heroHi} हँसते हुए सर्र से नीचे ${s.g('आ गया', 'आ गई')}।\n\n"कितना मज़ा आया! चलो फिर से!" ${s.heroHi} ${s.g('हँसा', 'हँसी')}। उस दिन ${s.heroHi} ने सीखा कि कुछ नया करने की कोशिश सबसे बड़ी मस्ती बन सकती है।`,
      moral: `बहादुरी का मतलब है नई चीज़ें आज़माना।`,
    }),
  },
  {
    key: 'patience', ages: ['4-6'],
    en: (s) => ({
      title: `${s.hero} and the Little Seed`,
      body: `${s.opener} ${s.hero} ${s.trait} and planted a tiny seed in the ${s.place}. ${s.hero} wanted a flower right away! Each morning ${s.hero} peeked at the soil, but nothing showed.\n\nA wise old owl smiled and said, "Good things take time. Just water it with care every day." So ${s.hero} watered the seed and waited, and waited some more.\n\nThen one happy morning, a tiny green shoot peeked out — hello! Soon a beautiful flower bloomed, nodding in the breeze. ${s.hero} cheered and bounced with joy.`,
      moral: `Good things grow for those who wait with care.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} और नन्हा बीज`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi} और ${s.placeHi} में एक नन्हा बीज बोया। ${s.heroHi} तुरंत फूल ${s.g('चाहता था', 'चाहती थी')}! हर सुबह ${s.heroHi} मिट्टी में ${s.g('झाँकता', 'झाँकती')}, पर कुछ नहीं उगता।\n\nएक समझदार उल्लू मुस्कुराया और बोला, "अच्छी चीज़ों में समय लगता है। बस रोज़ प्यार से पानी देते रहो।" तो ${s.heroHi} पानी ${s.g('देता', 'देती')} और इंतज़ार ${s.g('करता रहा', 'करती रही')}।\n\nफिर एक खुशनुमा सुबह, एक नन्ही हरी कोंपल निकली — नमस्ते! जल्दी ही एक सुंदर फूल खिल गया, हवा में झूमता हुआ। ${s.heroHi} खुशी से झूम ${s.g('उठा', 'उठी')}।`,
      moral: `धीरज रखने वालों के लिए अच्छी चीज़ें खिलती हैं।`,
    }),
  },
  {
    key: 'friendship', ages: ['4-6'],
    en: (s) => ({
      title: `${s.hero} Makes a Friend`,
      body: `${s.opener} ${s.hero} ${s.trait} in the ${s.place}. Nearby, a new little one sat all alone, not sure what to do, while everyone else was busy playing.\n\n${s.hero} noticed and walked right over with a smile. "Hello! Would you like to play with me?" The new friend's eyes lit up like little stars.\n\nThey played and laughed and made up silly games all day long. Soon the whole ${s.place} was one big, giggly group of friends.`,
      moral: `A friendly hello can make someone's whole day.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने दोस्त बनाया`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi} और ${s.placeHi} में खेलने ${s.g('लगा', 'लगी')}। पास ही एक नया नन्हा अकेला बैठा था, समझ नहीं पा रहा था क्या करे, जबकि बाकी सब खेलने में व्यस्त थे।\n\n${s.heroHi} ने यह देखा और मुस्कुरा कर पास ${s.g('गया', 'गई')}। "नमस्ते! क्या तुम मेरे साथ खेलोगे?" नए दोस्त की आँखें तारों सी चमक उठीं।\n\nदोनों दिन भर खेले, हँसे और मज़ेदार खेल बनाए। जल्दी ही पूरा ${s.placeHi} एक बड़ा, खिलखिलाता दोस्तों का समूह बन गया।`,
      moral: `एक प्यारा नमस्ते किसी का पूरा दिन खुश कर सकता है।`,
    }),
  },

  // ════════ AGE 7-9 : 3-4 short paragraphs ════════
  {
    key: 'perseverance', ages: ['7-9'],
    en: (s) => ({
      title: `${s.hero} Never Gives Up`,
      body: `${s.opener} ${s.hero} ${s.trait}. Everyone in the ${s.place} was getting ready for the yearly Hop-and-Skip game up Gentle Hill. ${s.hero} was not the fastest, but oh, how ${s.hero} loved to try!\n\nWhile some friends rested and chatted, ${s.hero} practised quietly every single morning. Hop, skip, wobble, tumble — and up again with a giggle. Some mornings were tricky, but ${s.hero} always tried just one more time.\n\nOn game day, the others grew tired halfway up. Slow and steady, ${s.hero} kept going, step by cheerful step, and reached the top with a happy hop.\n\nEveryone clapped. "I'm not the fastest," said ${s.hero} with a grin, "but I never stopped trying!"`,
      moral: `Steady practice and a happy heart win the day.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने हार नहीं मानी`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi}। ${s.placeHi} में हर कोई हर साल होने वाले उछल-कूद खेल की तैयारी कर रहा था, जो प्यारी पहाड़ी तक होता था। ${s.heroHi} सबसे तेज़ नहीं ${s.g('था', 'थी')}, पर कोशिश करना उसे बहुत पसंद था!\n\nजब कुछ दोस्त आराम करते, ${s.heroHi} हर सुबह चुपचाप अभ्यास ${s.g('करता', 'करती')}। उछल, कूद, डगमग, धम — और फिर हँसते हुए ऊपर। कुछ सुबहें मुश्किल होतीं, पर ${s.heroHi} हमेशा एक बार और कोशिश ${s.g('करता', 'करती')}।\n\nखेल के दिन बाकी आधी पहाड़ी पर ही थक गए। धीरे और लगातार, ${s.heroHi} खुशी से कदम ${s.g('बढ़ाता रहा', 'बढ़ाती रही')} और एक प्यारी छलाँग के साथ चोटी पर ${s.g('पहुँचा', 'पहुँची')}।\n\nसबने तालियाँ बजाईं। "मैं सबसे तेज़ नहीं हूँ," ${s.heroHi} ने मुस्कुरा कर कहा, "पर मैंने कोशिश करना कभी नहीं छोड़ा!"`,
      moral: `लगातार अभ्यास और खुश मन से जीत मिलती है।`,
    }),
  },
  {
    key: 'teamwork', ages: ['7-9'],
    en: (s) => ({
      title: `${s.hero} and the Team`,
      body: `${s.opener} ${s.hero} ${s.trait}. After a breezy day, soft leaves and little branches had drifted across the path in the ${s.place}, and the way to the playground was completely covered.\n\n${s.hero} tried to clear the big pile alone, tugging and puffing, but it was simply too much for one. Then ${s.hero} had a bright idea and called all the friends together.\n\n"If each of us carries just one branch, the work becomes light as a feather!" said ${s.hero}. One by one, everyone joined in, humming a cheerful tune.\n\nWith many hands working as a team, the path was clear before teatime. They sat together, happy and proud, and shared a lovely picnic.`,
      moral: `Together, a big job becomes easy.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} और टीम`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi}। एक हवादार दिन के बाद, ${s.placeHi} में रास्ते पर नरम पत्ते और नन्ही टहनियाँ बिखर गई थीं, और खेल के मैदान का रास्ता पूरी तरह ढक गया।\n\n${s.heroHi} ने अकेले बड़ा ढेर हटाने की कोशिश की, खींचा और ${s.g('हाँफा', 'हाँफी')}, पर एक के लिए यह बहुत ज़्यादा था। फिर ${s.heroHi} को एक शानदार तरकीब सूझी और उसने सब दोस्तों को बुलाया।\n\n"अगर हम में से हर एक सिर्फ़ एक टहनी उठाए, तो काम पंख जैसा हल्का हो जाएगा!" ${s.heroHi} ने कहा। एक-एक करके सब खुशी का गाना गुनगुनाते हुए जुट गए।\n\nकई हाथों ने टीम बन कर काम किया और चाय के समय से पहले रास्ता साफ़ हो गया। सब खुश और गर्व से साथ बैठे और प्यारी पिकनिक की।`,
      moral: `मिलकर काम करने से बड़ा काम आसान हो जाता है।`,
    }),
  },
  {
    key: 'humility', ages: ['7-9'],
    en: (s) => ({
      title: `${s.hero} Learns to Listen`,
      body: `${s.opener} ${s.hero} ${s.trait}. ${s.hero} was very clever and could solve almost any puzzle in the ${s.place}. Soon ${s.hero} began to say, "I always know best!" and stopped listening to the smaller friends.\n\nOne day a big puzzle box appeared, with a tricky little lock. ${s.hero} tried this way and that way, but it just would not open. Hmph!\n\nA quiet little snail, whom ${s.hero} had not been listening to, said gently, "Try turning it the other way." ${s.hero} did — and click! — the box popped open, full of fun toys.\n\n${s.hero} felt a warm little blush. "I'm sorry I didn't listen. Everyone has good ideas!" After that, ${s.hero} listened to all friends, big and small.`,
      moral: `Stay humble — everyone has something to teach us.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने सुनना सीखा`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi}। ${s.heroHi} बहुत होशियार ${s.g('था', 'थी')} और ${s.placeHi} की लगभग हर पहेली सुलझा ${s.g('लेता था', 'लेती थी')}। जल्दी ही ${s.heroHi} कहने ${s.g('लगा', 'लगी')}, "मुझे हमेशा सबसे अच्छा पता है!" और छोटे दोस्तों की सुनना बंद कर दिया।\n\nएक दिन एक बड़ा पहेली-बक्सा आया, जिस पर एक पेचीदा ताला था। ${s.heroHi} ने इधर-उधर बहुत कोशिश की, पर वह खुला ही नहीं। हुंह!\n\nएक शांत नन्हा घोंघा, जिसकी ${s.heroHi} नहीं सुन ${s.g('रहा था', 'रही थी')}, धीरे से बोला, "इसे दूसरी ओर घुमा कर देखो।" ${s.heroHi} ने ऐसा किया — और खट! — बक्सा खुल गया, मज़ेदार खिलौनों से भरा।\n\n${s.heroHi} थोड़ा ${s.g('शरमाया', 'शरमाई')}। "माफ़ करना, मैंने नहीं सुना। हर किसी के पास अच्छे विचार होते हैं!" इसके बाद ${s.heroHi} छोटे-बड़े सब दोस्तों की सुनने ${s.g('लगा', 'लगी')}।`,
      moral: `विनम्र रहो — हर किसी से कुछ सीखने को मिलता है।`,
    }),
  },
  {
    key: 'nature-care', ages: ['7-9'],
    en: (s) => ({
      title: `${s.hero} Brightens the ${s.place}`,
      body: `${s.opener} ${s.hero} ${s.trait} and looked around the ${s.place}. It had become a bit untidy — stray wrappers lay here and there, and the little stream looked cloudy.\n\nSome friends shrugged and said, "That's not our job." But ${s.hero} loved their home dearly. Each day ${s.hero} picked up a little litter and planted one small sapling.\n\nSeeing this, one friend joined in, then another, then a whole cheerful bunch. They popped litter into bins and planted saplings in neat rows, singing as they worked.\n\nWithin one season, the ${s.place} was green and fresh again, with sparkling water and singing birds. "When we care for our home," smiled ${s.hero}, "our home smiles back at us."`,
      moral: `Caring for nature keeps our home beautiful.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} ने ${s.placeHi} को चमकाया`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi} और ${s.placeHi} में चारों ओर देखा। वह थोड़ा गंदा हो गया था — इधर-उधर कागज़ पड़े थे, और नन्ही धारा मैली लग रही थी।\n\nकुछ दोस्तों ने कंधे उचका कर कहा, "यह हमारा काम नहीं।" पर ${s.heroHi} अपने घर से बहुत प्यार ${s.g('करता था', 'करती थी')}। हर दिन ${s.heroHi} थोड़ा कचरा ${s.g('उठाता', 'उठाती')} और एक नन्हा पौधा ${s.g('लगाता', 'लगाती')}।\n\nयह देख कर एक दोस्त जुड़ा, फिर दूसरा, फिर पूरी खुशमिज़ाज टोली। सब कचरा कूड़ेदान में डालते और कतार में पौधे लगाते, गाते-गाते।\n\nएक मौसम में ${s.placeHi} फिर हरा-भरा हो गया, चमकते पानी और चहचहाते पक्षियों के साथ। "जब हम अपने घर का ख्याल रखते हैं," ${s.heroHi} ${s.g('मुस्कुराया', 'मुस्कुराई')}, "तो घर हम पर मुस्कुराता है।"`,
      moral: `प्रकृति की देखभाल हमारे घर को सुंदर रखती है।`,
    }),
  },
  {
    key: 'kindness-picnic', ages: ['7-9'],
    en: (s) => ({
      title: `${s.hero} and the Picnic`,
      body: `${s.opener} ${s.hero} ${s.trait}. It was a bright picnic day in the ${s.place}, and everyone spread out baskets full of yummy treats on the soft grass.\n\nBut one little friend had forgotten their basket at home and sat quietly with an empty plate. ${s.hero} noticed right away.\n\nWithout a second thought, ${s.hero} shared half of everything — a sandwich here, a sweet fruit there. "We can share mine! It's more fun to eat together anyway," said ${s.hero} with a grin.\n\nSeeing this, all the other friends happily shared a little too. Soon there was a giant feast in the middle — the merriest picnic the ${s.place} had ever seen.`,
      moral: `A small act of sharing can make a big, happy feast.`,
    }),
    hi: (s) => ({
      title: `${s.heroHi} और पिकनिक`,
      body: `${s.openerHi} ${s.heroHi} ${s.traitHi}। ${s.placeHi} में एक चमकीला पिकनिक का दिन था, और सबने नरम घास पर स्वादिष्ट चीज़ों से भरी टोकरियाँ फैलाईं।\n\nपर एक नन्हा दोस्त अपनी टोकरी घर भूल आया था और खाली थाली लिए चुपचाप बैठा था। ${s.heroHi} ने तुरंत देख लिया।\n\nबिना सोचे ${s.heroHi} ने हर चीज़ का आधा हिस्सा बाँट दिया — एक सैंडविच, एक मीठा फल। "हम मेरा बाँट सकते हैं! साथ खाने में ज़्यादा मज़ा है," ${s.heroHi} ने मुस्कुरा कर कहा।\n\nयह देख कर बाकी सब ने भी खुशी से थोड़ा-थोड़ा बाँटा। जल्दी ही बीच में एक बड़ी दावत लग गई — ${s.placeHi} की अब तक की सबसे खुशनुमा पिकनिक।`,
      moral: `बाँटने का छोटा काम बड़ी खुशी की दावत बना देता है।`,
    }),
  },
]
