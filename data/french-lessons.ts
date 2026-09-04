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
        audioFile: "je-mappelle-léo.mp3",
      },

      {
        type: "choice",
        audioFile: "je-mappelle-léo.mp3",
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
        audioFile: "orange.mp3",
        color: "#FF8C42",
        instruction: "🔊 Nghe và nói: 'orange' — màu cam.",
      },

      {
        type: "showColor",
        title: "Violet",
        text: "violet",
        translation: "tím",
        audioFile: "violet.mp3",
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
  "nourriture": {
    title: "La nourriture",
    subtitle: "Le pique-nique magique.",
    emoji: "🧺",
    completionTitle: "Bravo ! Ton pique-nique est prêt !",
    completionText: "Tu es un petit chef du monde de Từ Đến.",
    completionBadge: "Petit Chef 👨‍🍳",
    completionStars: ["⭐", "⭐", "⭐"],
    completionFoods: ["🍎", "🍌", "🥖", "🥛", "🧀", "🍓", "💧", "🍰"],
    steps: [
      { type: "foodIntro", instruction: "🧺 Chào mừng đến buổi picnic kỳ diệu!" },
      { type: "foodTeach", foodGroup: ["pomme", "banane", "pain", "lait"], instruction: "👀 Học 4 món ăn đầu tiên: nhìn, nghe và nhớ." },
      { type: "foodTeach", foodGroup: ["fromage", "fraise", "eau", "gateau"], instruction: "👀 Khám phá 4 món ăn tiếp theo." },
      { type: "foodBasket", instruction: "🧺 Chọn pomme, banane và pain để chuẩn bị giỏ." },
      { type: "foodListen", instruction: "🔊 Nghe từ tiếng Pháp rồi tìm đúng món ăn." },
      { type: "foodCount", instruction: "🔢 Dùng số đã học để đếm dâu tây." },
      { type: "foodColor", instruction: "🎨 Dùng màu đã học để tìm pomme rouge." },
      { type: "foodWorld", instruction: "🌍 Mời le chien và maman cùng đi picnic." },
      { type: "foodSpeaking", instruction: "🎤 Nghe mẫu rồi nói: pomme." },
      { type: "foodChallenge", instruction: "🔐 Hoàn thành giỏ bí mật: pomme, fraise và eau." },
    ],
  },
  "objets-de-la-classe": {
    title: "Les objets de la classe",
    subtitle: "Đồ vật trong lớp học.",
    emoji: "🏫",
    completionTitle: "Tu connais les objets de la classe !",
    completionText: "Bravo ! Con đã học những đồ vật đầu tiên trong lớp học.",
    completionBadge: "Petit élève",
    completionStars: ["⭐", "⭐", "⭐"],
    steps: [
      { type: "classDiscovery", instruction: "🏫 Khám phá các đồ vật trong lớp học." },
      { type: "classChoice", instruction: "👂 Nghe và chọn đúng đồ vật." },
      { type: "classMatching", instruction: "🔗 Nối từ tiếng Pháp với đồ vật đúng." },
      { type: "classMemory", instruction: "🧠 Ghi nhớ vị trí các đồ vật." },
      { type: "classObjectColor", instruction: "🎨 Nghe câu và chọn đồ vật cùng màu." },
      { type: "classCount", instruction: "🔢 Đếm đồ vật và chọn số đúng." },
      { type: "classSpeaking", instruction: "🎤 Nghe mẫu rồi nói: C'est un livre." },
      { type: "classMission", instruction: "🏆 Hoàn thành nhiệm vụ cuối trong lớp học." },
    ],
  },
  "moments-de-la-journee": {
    title: "Les moments de la journée et l'heure",
    subtitle: "Các thời điểm trong ngày và hỏi giờ",
    emoji: "🕒",
    // explicit order for reference (JourneyMap uses index but include for clarity)
    order: 8,
    steps: [
      // SECTION 1 — Les moments de la journée
      { type: "intro", title: "Le matin", text: "Le matin", translation: "Buổi sáng", audioFile: "le-matin.mp3" },
      { type: "intro", title: "L'après-midi", text: "L'après-midi", translation: "Buổi chiều", audioFile: "laprès-midi.mp3" },
      { type: "intro", title: "Le soir", text: "Le soir", translation: "Buổi tối", audioFile: "le-soir.mp3" },
      { type: "intro", title: "La nuit", text: "La nuit", translation: "Ban đêm", audioFile: "la-nuit.mp3" },

      // SECTION 2 — Les moments importants
      { type: "intro", title: "Midi", text: "Midi", translation: "Buổi trưa / 12 giờ", audioFile: "midi.mp3" },
      { type: "intro", title: "Minuit", text: "Minuit", translation: "Nửa đêm", audioFile: "minuit.mp3" },
      { type: "intro", title: "Maintenant", text: "Maintenant", translation: "Bây giờ", audioFile: "maintenant.mp3" },
            { type: "intro", title: "Aujourd'hui", text: "Aujourd'hui", translation: "Hôm nay", audioFile: "aujourdhui.mp3" },

      // SECTION 3 — Demander l'heure
      { type: "listen", title: "Quelle heure ?", instruction: "🔊 Nghe và trả lời: Quelle heure est-il ?", audioFile: "quelle-heure-est-il.mp3" },
      { type: "choice", audioFile: "il-est-six-heures.mp3", options: [ { text: "Il est six heures.", correct: true }, { text: "Il est huit heures.", correct: false }, { text: "Il est neuf heures.", correct: false } ] },
      { type: "choice", audioFile: "il-est-huit-heures.mp3", options: [ { text: "Il est huit heures.", correct: true }, { text: "Il est dix heures.", correct: false }, { text: "Il est midi.", correct: false } ] },
      { type: "choice", audioFile: "il-est-neuf-heures.mp3", options: [ { text: "Il est neuf heures.", correct: true }, { text: "Il est six heures.", correct: false }, { text: "Il est minuit.", correct: false } ] },
      { type: "choice", audioFile: "il-est-dix-heures.mp3", options: [ { text: "Il est dix heures.", correct: true }, { text: "Il est neuf heures.", correct: false }, { text: "Il est midi.", correct: false } ] },
      { type: "choice", audioFile: "il-est-midi.mp3", options: [ { text: "Il est midi.", correct: true }, { text: "Il est minuit.", correct: false }, { text: "Il est six heures.", correct: false } ] },

      // SECTION 4 — Une journée de Léo (mini story)
      { type: "intro", title: "Le matin — Léo se lève", text: "Le matin, Léo se lève.", translation: "Sáng, Léo thức dậy.", audioFile: "le-matin-léo-se-lève.mp3" },
      { type: "intro", title: "Petit-déjeuner", text: "Il mange le petit-déjeuner.", translation: "Anh ấy ăn sáng.", audioFile: "il-mange-le-petit-déjeuner.mp3" },
      { type: "intro", title: "À l'école", text: "Il va à l'école.", translation: "Anh ấy đi học.", audioFile: "il-va-à-lécole.mp3" },
      { type: "intro", title: "L'après-midi — jouer", text: "L'après-midi, il joue.", translation: "Buổi chiều, anh ấy chơi.", audioFile: "laprès-midi-il-joue.mp3" },
      { type: "intro", title: "Le soir — rentrer", text: "Le soir, il rentre à la maison.", translation: "Buổi tối, anh ấy về nhà.", audioFile: "le-soir-il-rentre-à-la-maison.mp3" },
      { type: "intro", title: "Dîner", text: "Il mange le dîner.", translation: "Anh ấy ăn tối.", audioFile: "il-mange-le-dîner.mp3" },
      { type: "intro", title: "La nuit — dormir", text: "La nuit, il dort.", translation: "Đêm, anh ấy ngủ.", audioFile: "la-nuit-il-dort.mp3" },

      // SECTION 5 — Practice / Quiz
      { type: "matching", pairs: [ { left: "le matin", right: "Buổi sáng" }, { left: "l'après-midi", right: "Buổi chiều" }, { left: "le soir", right: "Buổi tối" }, { left: "la nuit", right: "Ban đêm" } ], instruction: "🔗 Nối tiếng Pháp với nghĩa tiếng Việt." },
      { type: "choice", instruction: "🔎 Chọn thời điểm phù hợp: 'Je mange le petit-déjeuner le ...' ", options: [ { text: "matin", correct: true }, { text: "soir", correct: false }, { text: "minuit", correct: false } ] },
      { type: "listen", audioFile: "quelle-heure-est-il.mp3", instruction: "🔊 Nghe: Quelle heure est-il ? Chọn câu đúng." },
      { type: "choice", audioFile: "il-est-six-heures.mp3", options: [ { text: "Il est six heures.", correct: true }, { text: "Il est midi.", correct: false }, { text: "Il est minuit.", correct: false } ] },
      { type: "memory", colors: ["le matin", "l'après-midi", "le soir", "la nuit"], instruction: "🧠 Sắp xếp các thời điểm theo đúng thứ tự: matin → après-midi → soir → nuit." }
    ],
  },
} as const;
