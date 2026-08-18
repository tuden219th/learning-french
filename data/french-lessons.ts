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
      },

      {
        type: "showColor",
        title: "Bleu",
        text: "bleu",
        translation: "xanh dương",
        audioFile: "bleu.mp3",
        color: "#2874F0",
      },

      {
        type: "showColor",
        title: "Jaune",
        text: "jaune",
        translation: "vàng",
        audioFile: "jaune.mp3",
        color: "#F4D35E",
      },

      {
        type: "showColor",
        title: "Vert",
        text: "vert",
        translation: "xanh lá",
        audioFile: "vert.mp3",
        color: "#2ECC71",
      },

      {
        type: "showColor",
        title: "Noir",
        text: "noir",
        translation: "đen",
        audioFile: "noir.mp3",
        color: "#111111",
      },

      {
        type: "showColor",
        title: "Blanc",
        text: "blanc",
        translation: "trắng",
        audioFile: "blanc.mp3",
        color: "#FFFFFF",
      },

      {
        type: "showColor",
        title: "Orange",
        text: "orange",
        translation: "cam",
        // no recorded mp3 — TTS fallback
        color: "#FF8C42",
      },

      {
        type: "showColor",
        title: "Violet",
        text: "violet",
        translation: "tím",
        // no recorded mp3 — TTS fallback
        color: "#8E44AD",
      },

      // PART 3: Play with colors — color hunt
      {
        type: "colorHunt",
        prompt: "Trouve le rouge !",
        target: "rouge",
      },

      // listen and find
      {
        type: "colorHunt",
        prompt: "Écoute et montre le bleu.",
        target: "bleu",
      },

      // matching
      {
        type: "matching",
        pairs: [
          { left: "rouge", right: "#E63946" },
          { left: "bleu", right: "#2874F0" },
          { left: "jaune", right: "#F4D35E" },
        ],
      },

      // memory (simple)
      {
        type: "memory",
        colors: ["rouge", "bleu", "jaune", "vert"],
      },

      // object + color
      {
        type: "objectColor",
        object: "pomme",
        question: "De quelle couleur est la pomme ?",
        answer: "rouge",
      },

      // PART 4: Mix old + new
      {
        type: "mix",
        text: "Bonjour ! Quelle couleur ?",
        promptColor: "bleu",
        audioFile: "bonjour.mp3",
      },
    ],
  },
} as const;
