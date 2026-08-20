export const frenchLessons = {
  "bonjour": {
    title: "Bonjour !",
    subtitle: "Je fais connaissance.",
    emoji: "👋",

    steps: [
      {
        type: "intro",
        title: "Bonjour !",
        text: "Bonjour !",
        translation: "Xin chào!",
        // prefer existing mp3 when available
        audioFile: "bonjour.mp3",
      },

      {
        type: "listen",
        // use the salut mp3
        audioFile: "salut.mp3",
      },

      {
        type: "choice",
        audioFile: "bonjour.mp3",
        options: [
          { text: "Bonjour !", correct: true },
          { text: "Merci !", correct: false },
          { text: "Au revoir !", correct: false },
        ],
      },

      {
        type: "intro",
        title: "Je m'appelle...",
        text: "Je m'appelle Léo.",
        translation: "Mình tên là Léo.",
        // no recorded mp3 for this phrase — fallback to TTS
      },

      {
        type: "choice",
        // no specific mp3 here — TTS will be used
        options: [
          { text: "Je m'appelle Léo.", correct: true },
          { text: "Ça va bien.", correct: false },
          { text: "Au revoir.", correct: false },
        ],
      },

      {
        type: "intro",
        title: "Ça va ?",
        text: "Ça va bien !",
        translation: "Mình khỏe!",
        audioFile: "ça-va-bien.mp3",
      },

      {
        type: "dialogue",
        text: `Tom: Bonjour !\nLéa: Bonjour !\nTom: Je m'appelle Tom.\nLéa: Je m'appelle Léa.\nTom: Ça va ?\nLéa: Ça va bien !`,
      },
    ],
  },
  "couleurs": {
    title: "Les couleurs",
    subtitle: "Màu sắc cơ bản.",
    emoji: "🎨",

    steps: [
      // PART 1: Review sampled Lesson 1 phrases in a different interaction
      {
        type: "review",
        title: "On se rappelle?",
        text: "Écoute et touche người bạn muốn.",
        instruction: "🔊 Nghe rồi chạm vào câu bạn nghe.",
        // list of short review phrases
        reviewItems: [
          { text: "Bonjour !", translation: "Xin chào!", audioFile: "bonjour.mp3" },
          { text: "Salut !", translation: "Chào!", audioFile: "salut.mp3" },
          { text: "Comment ça va ?", translation: "Bạn khỏe không?", audioFile: "ça-va.mp3" },
          { text: "Ça va bien !", translation: "Mình khỏe!", audioFile: "ça-va-bien.mp3" },
        ],
      },

      // PART 2: Introduce colors one by one (see → hear → tap → repeat)
      {
        type: "showColor",
        title: "Rouge",
        text: "rouge",
        translation: "đỏ",
        audioFile: "rouge.mp3",
        color: "#E63946",
        instruction: "🔊 Nghe và nói: 'rouge' — màu đỏ.",
      },

      {
        type: "showColor",
        title: "Bleu",
        text: "bleu",
        translation: "xanh dương",
        audioFile: "bleu.mp3",
        color: "#2874F0",
        instruction: "🔊 Nghe và nói: 'bleu' — màu xanh dương.",
      },

      {
        type: "showColor",
        title: "Jaune",
        text: "jaune",
        translation: "vàng",
        audioFile: "jaune.mp3",
        color: "#F4D35E",
        instruction: "🔊 Nghe và nói: 'jaune' — màu vàng.",
      },

      {
        type: "showColor",
        title: "Vert",
        text: "vert",
        translation: "xanh lá",
        audioFile: "vert.mp3",
        color: "#2ECC71",
        instruction: "🔊 Nghe và nói: 'vert' — màu xanh lá.",
      },

      {
        type: "showColor",
        title: "Noir",
        text: "noir",
        translation: "đen",
        audioFile: "noir.mp3",
        color: "#111111",
        instruction: "🔊 Nghe và nói: 'noir' — màu đen.",
      },

      {
        type: "showColor",
        title: "Blanc",
        text: "blanc",
        translation: "trắng",
        audioFile: "blanc.mp3",
        color: "#FFFFFF",
        instruction: "🔊 Nghe và nói: 'blanc' — màu trắng.",
      },

      {
        type: "showColor",
        title: "Orange",
        text: "orange",
        translation: "cam",
        // no recorded mp3 — TTS fallback
        color: "#FF8C42",
        instruction: "🔊 Nghe và nói: 'orange' — màu cam.",
      },

      {
        type: "showColor",
        title: "Violet",
        text: "violet",
        translation: "tím",
        // no recorded mp3 — TTS fallback
        color: "#8E44AD",
        instruction: "🔊 Nghe và nói: 'violet' — màu tím.",
      },

      // PART 3: Play with colors — color hunt
      {
        type: "colorHunt",
        prompt: "Trouve le rouge !",
        target: "rouge",
        instruction: "🎨 Hãy tìm màu đỏ! Chạm vào màu đúng.",
      },

      // listen and find
      {
        type: "colorHunt",
        prompt: "Écoute et montre le bleu.",
        target: "bleu",
        instruction: "🔊 Nghe rồi chạm màu xanh dương.",
      },

      // matching
      {
        type: "matching",
        pairs: [
          { left: "rouge", right: "#E63946" },
          { left: "bleu", right: "#2874F0" },
          { left: "jaune", right: "#F4D35E" },
        ],
        instruction: "🔗 Hãy nối từ tiếng Pháp với màu đúng.",
      },

      // memory (simple)
      {
        type: "memory",
        colors: ["rouge", "bleu", "jaune", "vert"],
        instruction: "🧠 Tìm hai thẻ giống nhau.",
      },

      // object + color
      {
        type: "objectColor",
        object: "pomme",
        question: "De quelle couleur est la pomme ?",
        answer: "rouge",
        instruction: "🍎 Quả táo màu gì? Chạm màu đúng.",
      },

      // PART 4: Mix old + new
      {
        type: "mix",
        text: "Bonjour ! Quelle couleur ?",
        promptColor: "bleu",
        audioFile: "bonjour.mp3",
        instruction: "🔊 Nghe rồi chọn: màu xanh dương.",
      },
    ],
  },
  "animaux": {
    title: "Les animaux",
    subtitle: "Một cuộc phiêu lưu trong khu rừng nhỏ.",
    emoji: "🐾",
    completionTitle: "Tu as découvert les animaux !",
    completionText: "Super ! Tu es un petit explorateur ! 🐾",
    completionAnimals: ["🐶", "🐱", "🐰", "🐦", "🐟", "🐢"],
    animals: [
      { word: "le chat", meaning: "con mèo", emoji: "🐱" },
      { word: "le chien", meaning: "con chó", emoji: "🐶" },
      { word: "le lapin", meaning: "con thỏ", emoji: "🐰" },
      { word: "l’oiseau", meaning: "con chim", emoji: "🐦" },
      { word: "le poisson", meaning: "con cá", emoji: "🐟" },
      { word: "la souris", meaning: "con chuột", emoji: "🐭" },
      { word: "la tortue", meaning: "con rùa", emoji: "🐢" },
      { word: "le lion", meaning: "con sư tử", emoji: "🦁" },
    ],
    steps: [
      {
        type: "animalDiscovery",
        instruction: "🐾 Chạm vào từng con vật để nghe tên tiếng Pháp.",
      },
      {
        type: "animalChoice",
        instruction: "🔊 Nghe: “le chien”. Chạm vào con vật đúng.",
      },
      {
        type: "animalColor",
        instruction: "🎨 Le chat est bleu. Chạm vào con mèo màu xanh dương.",
      },
      {
        type: "animalSound",
        instruction: "🔊 Nghe tiếng kêu. Qui est-ce? Chọn con vật đúng.",
      },
      {
        type: "animalSpeaking",
        instruction: "🎤 Nghe rồi nói: “le chat”.",
      },
      {
        type: "animalSentence",
        instruction: "👋 Nghe câu rồi chọn bạn nhỏ trong câu.",
      },
      {
        type: "animalMission",
        instruction: "🐾 Hoàn thành 4 nhiệm vụ để giúp các con vật về nhà.",
      },
    ],
  },
  "nombres": {
    title: "Les nombres",
    subtitle: "La chasse aux nombres.",
    emoji: "🔢",
    completionTitle: "Tu comptes jusqu’à dix !",
    completionText: "🔥 Et tu as essayé les grands nombres !",
    completionNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    completionChallenge: "Défi spécial : réussi ⭐",
    numberGroups: [[1, 2, 3], [4, 5, 6], [7, 8, 9, 10]],
    steps: [
      {
        type: "numberIntro",
        instruction: "🎯 Chào mừng đến cuộc săn tìm các con số!",
      },
      {
        type: "numberDiscovery",
        group: [1, 2, 3],
        instruction: "🔢 Chạm vào các số 1–3 để nghe tiếng Pháp.",
      },
      {
        type: "numberDiscovery",
        group: [4, 5, 6],
        instruction: "🔢 Chạm vào các số 4–6 để nghe tiếng Pháp.",
      },
      {
        type: "numberDiscovery",
        group: [7, 8, 9, 10],
        instruction: "🔢 Chạm vào các số 7–10 để nghe tiếng Pháp.",
      },
      {
        type: "numberListenFind",
        instruction: "🔊 Nghe “cinq”, rồi chạm vào số đúng.",
      },
      {
        type: "numberCount",
        instruction: "🍎 Đếm các quả táo. Combien ?",
      },
      {
        type: "numberAnimalColor",
        instruction: "🔵 Trouve trois poissons bleus.",
      },
      {
        type: "numberAnimal",
        instruction: "🐶 Trouve trois chiens.",
      },
      {
        type: "numberSpeaking",
        instruction: "🎤 Nghe rồi nói: “trois”.",
      },
      {
        type: "numberSequence",
        instruction: "🔢 Điền số còn thiếu: 1 – 2 – ? – 4",
      },
      {
        type: "numberChallenge",
        instruction: "🔥 SUPER DÉFI: thử tìm 12, 15 và 20.",
      },
    ],
  },
  "famille": {
    title: "Ma famille",
    subtitle: "La maison magique.",
    emoji: "🏠",
    completionTitle: "Tu connais ta famille !",
    completionText: "Tu as exploré une maison en français.",
    completionBadge: "Ami de la famille",
    completionStars: ["⭐", "⭐", "⭐"],
    familyMembers: ["👩", "👨", "👦", "👧", "👶", "👴", "👵"],
    steps: [
      { type: "familyIntro", instruction: "🏠 Chào mừng đến ngôi nhà kỳ diệu!" },
      { type: "familySalon", instruction: "🚪 Phòng khách: học maman, papa, frère, sœur." },
      { type: "familyFind", instruction: "🕵️ Nghe và tìm papa trong phòng khách." },
      { type: "familyChambre", instruction: "🚪 Phòng ngủ: học bébé, grand-père, grand-mère." },
      { type: "familyNumber", instruction: "🔢 Trouve deux personnes trong căn phòng." },
      { type: "familyColor", instruction: "🎨 Trouve la maman bleue." },
      { type: "familyAnimal", instruction: "🐾 Chào người bạn le chien đến thăm nhà." },
      { type: "familySpeaking", instruction: "🎤 Nghe rồi nói: Bonjour, maman !" },
      { type: "familySecret", instruction: "🔒 Mở cánh cửa bí mật bằng 3 thử thách." },
      { type: "familyChallenge", instruction: "🔥 Hoàn thành Super Défi của ngôi nhà." },
    ],
  },
} as const;
