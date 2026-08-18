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
      },

      {
        type: "listen",
        audio: "Salut !",
      },

      {
        type: "choice",
        audio: "Bonjour !",
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
      },

      {
        type: "choice",
        audio: "Je m'appelle Léo.",
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
      },

      {
        type: "dialogue",
        text: `Tom: Bonjour !\nLéa: Bonjour !\nTom: Je m'appelle Tom.\nLéa: Je m'appelle Léa.\nTom: Ça va ?\nLéa: Ça va bien !`,
      },
    ],
  },

  "ma-classe": {
    title: "Dans ma classe",
    subtitle: "Les objets de la classe.",
    emoji: "🎒",

    steps: [
      {
        type: "intro",
        title: "Dans ma classe",
        text: "un livre",
        translation: "một quyển sách",
      },

      {
        type: "listen",
        audio: "un livre",
      },

      {
        type: "choice",
        audio: "un crayon",
        options: [
          { text: "un livre", correct: false },
          { text: "un crayon", correct: true },
          { text: "une gomme", correct: false },
        ],
      },

      {
        type: "intro",
        title: "Encore un mot !",
        text: "une gomme",
        translation: "một cục tẩy",
      },

      {
        type: "choice",
        audio: "une gomme",
        options: [
          { text: "un cahier", correct: false },
          { text: "une gomme", correct: true },
          { text: "un stylo", correct: false },
        ],
      },

      {
        type: "intro",
        title: "Une phrase !",
        text: "C'est un livre.",
        translation: "Đây là một quyển sách.",
      },

      {
        type: "dialogue",
        text: `Tom: C'est quoi ?\nLéa: C'est un livre.\nTom: Et ça ?\nLéa: C'est un crayon.`,
      },
    ],
  },

  "couleurs": {
    title: "Les couleurs",
    subtitle: "Les premières couleurs.",
    emoji: "🎨",

    steps: [
      {
        type: "intro",
        title: "Rouge !",
        text: "rouge",
        translation: "đỏ",
      },

      {
        type: "listen",
        audio: "bleu",
      },

      {
        type: "choice",
        audio: "bleu",
        options: [
          { text: "🔴 rouge", correct: false },
          { text: "🔵 bleu", correct: true },
          { text: "🟡 jaune", correct: false },
        ],
      },

      {
        type: "intro",
        title: "Une nouvelle couleur",
        text: "jaune",
        translation: "vàng",
      },

      {
        type: "choice",
        audio: "vert",
        options: [
          { text: "🟢 vert", correct: true },
          { text: "⚫ noir", correct: false },
          { text: "⚪ blanc", correct: false },
        ],
      },

      {
        type: "intro",
        title: "On combine !",
        text: "un crayon bleu",
        translation: "một chiếc bút chì xanh",
      },

      {
        type: "dialogue",
        text: `Tom: C'est quoi ?\nLéa: C'est un crayon.\nTom: Quelle couleur ?\nLéa: Bleu !\nTom: Un crayon bleu !`,
      },
    ],
  },
} as const;