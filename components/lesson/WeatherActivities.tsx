"use client";

import { useState } from "react";

// ==========================================
// AUDIO SYNTHESIS & SOUND EFFECTS (WEB AUDIO)
// ==========================================
class SoundFX {
  private static ctx: AudioContext | null = null;

  private static getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Tiếng chim hót khi trời nắng đẹp
  static playBirds() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const birdFreqs = [1800, 2400, 2100, 2800];
      birdFreqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.09);
        osc.frequency.exponentialRampToValueAtTime(f + 400, ctx.currentTime + i * 0.09 + 0.07);
        gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.09 + 0.07);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.09);
        osc.stop(ctx.currentTime + i * 0.09 + 0.07);
      });
    } catch {}
  }

  // Tiếng mưa rơi tí tách
  static playRain() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      for (let i = 0; i < 6; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        const f = 700 + Math.random() * 500;
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.06);
        gain.gain.setValueAtTime(0.09, ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.06 + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.06);
        osc.stop(ctx.currentTime + i * 0.06 + 0.04);
      }
    } catch {}
  }

  // Tiếng gió thổi nhẹ vu vi
  static playWind() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(380, ctx.currentTime + 0.25);
      osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.6);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.25);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } catch {}
  }

  static playPop() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {}
  }

  static playSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((note, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(note, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + i * 0.08 + 0.45
        );
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.45);
      });
    } catch {}
  }
}

export function speakFrench(text: string, rate: number = 0.85) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = rate;
    window.speechSynthesis.speak(utterance);
  } catch {}
}

// ==========================================
// THÔNG TIN DỮ LIỆU 8 BÀI THỜI TIẾT LỚP 2
// ==========================================
export type WeatherLessonMeta = {
  id: string;
  phrase: string;
  phonetic: string;
  meaningVi: string;
  emoji: string;
  soundType: "birds" | "rain" | "wind" | "success";
  wordTarget: string;
  wordLetters: string[];
  wordHint: string;
  quizPrompt: string;
  quizOptions: {
    emoji: string;
    text: string;
    correct: boolean;
  }[];
  interactivePrompt: string;
  actionText: string;
};

export const weatherLessonsData: Record<string, WeatherLessonMeta> = {
  "meteo-il-fait-beau": {
    id: "meteo-il-fait-beau",
    phrase: "Il fait beau !",
    phonetic: "/il fɛ bo/",
    meaningVi: "Trời đẹp quá !",
    emoji: "☀️",
    soundType: "birds",
    wordTarget: "BEAU",
    wordLetters: ["A", "B", "U", "E"],
    wordHint: "B-E-A-U (đẹp trời)",
    quizPrompt: "Hình nào là: Il fait beau ! ☀️ ?",
    quizOptions: [
      { emoji: "☀️", text: "Trời nắng đẹp", correct: true },
      { emoji: "🌧️", text: "Trời mưa", correct: false },
    ],
    interactivePrompt: "Chạm vào ông mặt trời để nghe chim hót líu lo nhé!",
    actionText: "Bấm ông mặt trời ☀️",
  },
  "meteo-il-pleut": {
    id: "meteo-il-pleut",
    phrase: "Il pleut !",
    phonetic: "/il plø/",
    meaningVi: "Trời mưa rồi !",
    emoji: "🌧️",
    soundType: "rain",
    wordTarget: "PLUIE",
    wordLetters: ["U", "P", "I", "L", "E"],
    wordHint: "P-L-U-I-E (cơn mưa)",
    quizPrompt: "Hình nào là: Il pleut ! 🌧️ ?",
    quizOptions: [
      { emoji: "🌧️", text: "Trời mưa", correct: true },
      { emoji: "☀️", text: "Trời nắng", correct: false },
    ],
    interactivePrompt: "Chạm vào đám mây để mưa rơi tí tách và bật chiếc ô đỏ nhé!",
    actionText: "Bấm đám mây mưa 🌧️",
  },
  "meteo-il-fait-chaud": {
    id: "meteo-il-fait-chaud",
    phrase: "Il fait chaud !",
    phonetic: "/il fɛ ʃo/",
    meaningVi: "Trời nóng bức !",
    emoji: "🕶️",
    soundType: "birds",
    wordTarget: "CHAUD",
    wordLetters: ["H", "C", "U", "A", "D"],
    wordHint: "C-H-A-U-D (nóng ấm)",
    quizPrompt: "Khi trời nóng (Il fait chaud !), bé cần gì ?",
    quizOptions: [
      { emoji: "🕶️", text: "Kính râm & Kem mát", correct: true },
      { emoji: "🧤", text: "Găng tay len dày", correct: false },
    ],
    interactivePrompt: "Chạm vào que kem và kính râm mát rượi nhé!",
    actionText: "Bấm kính râm & kem 🍦",
  },
  "meteo-il-fait-froid": {
    id: "meteo-il-fait-froid",
    phrase: "Il fait froid !",
    phonetic: "/il fɛ fʁwa/",
    meaningVi: "Trời lạnh giá !",
    emoji: "🧣",
    soundType: "wind",
    wordTarget: "FROID",
    wordLetters: ["R", "F", "I", "O", "D"],
    wordHint: "F-R-O-I-D (lạnh buốt)",
    quizPrompt: "Khi trời lạnh (Il fait froid !), bé nhớ mặc gì ?",
    quizOptions: [
      { emoji: "🧣", text: "Khăn len & Mũ ấm", correct: true },
      { emoji: "🩳", text: "Quần áo tắm biển", correct: false },
    ],
    interactivePrompt: "Chạm vào bạn gấu nhỏ để quàng khăn len ấm áp nào!",
    actionText: "Quàng khăn cho gấu 🐻",
  },
  "meteo-il-neige": {
    id: "meteo-il-neige",
    phrase: "Il neige !",
    phonetic: "/il nɛʒ/",
    meaningVi: "Tuyết rơi rồi !",
    emoji: "⛄",
    soundType: "wind",
    wordTarget: "NEIGE",
    wordLetters: ["E", "N", "G", "I", "E"],
    wordHint: "N-E-I-G-E (tuyết trắng)",
    quizPrompt: "Hình nào là tuyết rơi: Il neige ! ⛄ ?",
    quizOptions: [
      { emoji: "⛄", text: "Người tuyết trắng", correct: true },
      { emoji: "🏖️", text: "Bãi biển mùa hè", correct: false },
    ],
    interactivePrompt: "Chạm vào những bông tuyết để làm người tuyết nhé!",
    actionText: "Làm người tuyết ⛄",
  },
  "meteo-du-vent": {
    id: "meteo-du-vent",
    phrase: "Il y a du vent !",
    phonetic: "/il ja dy vɑ̃/",
    meaningVi: "Trời có gió thổi !",
    emoji: "💨",
    soundType: "wind",
    wordTarget: "VENT",
    wordLetters: ["N", "V", "T", "E"],
    wordHint: "V-E-N-T (ngọn gió)",
    quizPrompt: "Khi trời có gió (Il y a du vent !), đồ chơi nào bay lên cao ?",
    quizOptions: [
      { emoji: "🪁", text: "Chiếc diều bay cao", correct: true },
      { emoji: "🚗", text: "Chiếc ô tô đồ chơi", correct: false },
    ],
    interactivePrompt: "Chạm vào chong chóng để gió thổi xoay tít nào!",
    actionText: "Thổi xoay chong chóng 🪁",
  },
  "meteo-des-nuages": {
    id: "meteo-des-nuages",
    phrase: "Il y a des nuages !",
    phonetic: "/il ja de nɥaʒ/",
    meaningVi: "Trời nhiều mây !",
    emoji: "☁️",
    soundType: "wind",
    wordTarget: "NUAGE",
    wordLetters: ["U", "N", "G", "A", "E"],
    wordHint: "N-U-A-G-E (đám mây)",
    quizPrompt: "Hình nào là: Il y a des nuages ! ☁️ ?",
    quizOptions: [
      { emoji: "☁️", text: "Bầu trời nhiều mây", correct: true },
      { emoji: "🔥", text: "Ngọn lửa nóng", correct: false },
    ],
    interactivePrompt: "Chạm vào những đám mây trắng bồng bềnh trôi nhé!",
    actionText: "Chạm đám mây trôi ☁️",
  },
  "meteo-arc-en-ciel": {
    id: "meteo-arc-en-ciel",
    phrase: "Regarde l'arc-en-ciel !",
    phonetic: "/ʁə.ɡaʁd laʁ.kɑ̃.sjɛl/",
    meaningVi: "Nhìn kìa, cầu vồng rực rỡ !",
    emoji: "🌈",
    soundType: "success",
    wordTarget: "CIEL",
    wordLetters: ["E", "C", "L", "I"],
    wordHint: "C-I-E-L (bầu trời xanh)",
    quizPrompt: "Sau cơn mưa có gì xuất hiện 7 sắc rực rỡ ?",
    quizOptions: [
      { emoji: "🌈", text: "Cầu vồng rực rỡ", correct: true },
      { emoji: "🪨", text: "Hòn đá cuội", correct: false },
    ],
    interactivePrompt: "Mưa tạnh rồi! Chạm vào bầu trời để hiện cầu vồng 7 sắc nào!",
    actionText: "Hiện cầu vồng 🌈",
  },
};

// ==========================================
// COMPONENT CHÍNH CHO 1 BÀI HỌC THỜI TIẾT
// ==========================================
export function WeatherKidsActivity({
  lessonKey,
  onSpeak,
  onComplete,
}: {
  lessonKey: string;
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const meta = weatherLessonsData[lessonKey] || weatherLessonsData["meteo-il-fait-beau"];

  // 4 bước cực kỳ tinh gọn cho bé lớp 2:
  // 0: Khám phá chạm & âm thanh
  // 1: Nghe và chọn hình
  // 2: Bấm micro đọc to
  // 3: Ghép 1 từ ngắn
  const [subStep, setSubStep] = useState<0 | 1 | 2 | 3>(0);
  const [interacted, setInteracted] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [spokenDone, setSpokenDone] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [wordFinished, setWordFinished] = useState(false);

  const currentWord = selectedLetters.map((i) => meta.wordLetters[i]).join("");
  const isWordCorrect = currentWord === meta.wordTarget;
  const subSteps = [
    { label: "1. Khám phá", icon: "👀", index: 0 },
    { label: "2. Nghe", icon: "🎧", index: 1 },
    { label: "3. Nói", icon: "🎤", index: 2 },
    { label: "4. Ghép chữ", icon: "✍️", index: 3 },
  ] as const;

  // Âm thanh môi trường
  const triggerSound = () => {
    if (meta.soundType === "birds") SoundFX.playBirds();
    else if (meta.soundType === "rain") SoundFX.playRain();
    else if (meta.soundType === "wind") SoundFX.playWind();
    else SoundFX.playSuccess();
  };

  const handleTouchHero = () => {
    SoundFX.playPop();
    triggerSound();
    setInteracted(true);
    speakFrench(meta.phrase);
    onSpeak(meta.phrase);
  };

  const handleSelectQuiz = (idx: number) => {
    setQuizAnswer(idx);
    const correct = meta.quizOptions[idx].correct;
    if (correct) {
      SoundFX.playSuccess();
      speakFrench(meta.phrase);
    } else {
      SoundFX.playPop();
    }
  };

  const handleSpokenClick = () => {
    SoundFX.playSuccess();
    setSpokenDone(true);
  };

  const handleLetterClick = (letterIdx: number) => {
    if (selectedLetters.includes(letterIdx)) return;
    SoundFX.playPop();
    const next = [...selectedLetters, letterIdx];
    setSelectedLetters(next);

    const formed = next.map((i) => meta.wordLetters[i]).join("");
    if (formed === meta.wordTarget) {
      SoundFX.playSuccess();
      setWordFinished(true);
      speakFrench(meta.wordTarget.toLowerCase());
      if (onComplete) onComplete();
    }
  };

  const handleRemoveLetter = () => {
    SoundFX.playPop();
    setSelectedLetters((prev) => prev.slice(0, -1));
  };

  return (
    <div className="overflow-hidden rounded-[2.5rem] border-2 border-[#E9DDC8] bg-[#FFF8EA] p-5 sm:p-8 shadow-sm">
      {/* Thanh 4 bước siêu ngắn */}
      <div className="flex items-center justify-between gap-2 max-w-sm mx-auto mb-6 bg-white/70 p-2 rounded-2xl border border-[#E9DDC8]">
        {subSteps.map((step) => (
          <button
            key={step.index}
            onClick={() => setSubStep(step.index)}
            className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition ${
              subStep === step.index
                ? "bg-[#315A8D] text-white shadow-sm"
                : "text-[#806C58] hover:bg-white"
            }`}
          >
            <div>{step.icon}</div>
            <div className="hidden sm:block text-[10px]">{step.label}</div>
          </button>
        ))}
      </div>

      {/* ==================================== */}
      {/* BƯỚC 1: CHẠM VÀ CẢM NHẬN (TOUCH & PLAY) */}
      {/* ==================================== */}
      {subStep === 0 && (
        <div className="text-center">
          <div className="inline-block bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#315A8D] shadow-sm mb-3">
            <span>✨ CHẠM VÀO HÌNH ĐỂ KHÁM PHÁ</span>
          </div>

          <p className="text-sm font-bold text-[#806C58] mb-4">
            {meta.interactivePrompt}
          </p>

          <div className="my-6 flex justify-center">
            <button
              onClick={handleTouchHero}
              className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-3xl bg-white border-4 border-[#315A8D] shadow-xl flex flex-col items-center justify-center transform hover:scale-105 active:scale-95 transition"
            >
              <span className="text-7xl sm:text-8xl animate-bounce">
                {meta.emoji}
              </span>
              <span className="mt-2 text-xs font-black text-[#315A8D] bg-[#EEF4FA] px-3 py-1 rounded-full">
                {meta.actionText}
              </span>
            </button>
          </div>

          <div className="bg-white rounded-3xl p-5 border-2 border-[#E9DDC8] max-w-md mx-auto shadow-sm">
            <h3 className="text-3xl sm:text-4xl font-black text-[#2D3436]">
              &ldquo;{meta.phrase}&rdquo;
            </h3>
            <p className="text-sm font-bold text-[#806C58] mt-1">
              Phát âm: <span className="text-[#315A8D]">{meta.phonetic}</span>
            </p>
            <p className="text-base font-extrabold text-[#C96A2B] mt-1">
              👉 {meta.meaningVi}
            </p>
          </div>

          {interacted && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setSubStep(1)}
                className="bg-[#2ECC71] hover:bg-[#27AE60] text-white px-8 py-3 rounded-full font-black text-base shadow-md transition"
              >
                Tiếp theo: Nghe & Đoán hình ➔
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==================================== */}
      {/* BƯỚC 2: NGHE VÀ CHỌN HÌNH (ÉCOUTER) */}
      {/* ==================================== */}
      {subStep === 1 && (
        <div className="text-center">
          <div className="inline-block bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#315A8D] shadow-sm mb-3">
            <span>🎧 NGHE RỒI CHẠM HÌNH ĐÚNG</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-black text-[#4A3828] mb-4">
            {meta.quizPrompt}
          </h4>

          <div className="mb-6 flex justify-center">
            <button
              onClick={() => {
                SoundFX.playPop();
                triggerSound();
                speakFrench(meta.phrase);
              }}
              className="flex items-center gap-2 bg-[#315A8D] text-white px-6 py-3 rounded-full font-black text-base shadow-md hover:bg-[#274B77] transition"
            >
              <span className="text-2xl">🔊</span>
              <span>Bấm để nghe cô đọc</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {meta.quizOptions.map((opt, i) => {
              const isSelected = quizAnswer === i;
              let style = "bg-white border-[#E9DDC8] hover:border-[#315A8D]";
              if (isSelected) {
                style = opt.correct
                  ? "bg-[#EAF5EC] border-[#4F8A5B] text-[#35633F]"
                  : "bg-[#FFF0F0] border-[#D94A4A] text-[#B63838]";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelectQuiz(i)}
                  className={`p-6 rounded-3xl border-4 text-center transition transform active:scale-95 shadow-sm ${style}`}
                >
                  <div className="text-6xl mb-2">{opt.emoji}</div>
                  <div className="text-sm font-black">{opt.text}</div>
                </button>
              );
            })}
          </div>

          {quizAnswer !== null && meta.quizOptions[quizAnswer].correct && (
            <div className="mt-6">
              <p className="text-lg font-black text-[#2ECC71] mb-3">
                🎉 Bravo ! Con đã chọn hoàn toàn đúng !
              </p>
              <button
                onClick={() => setSubStep(2)}
                className="bg-[#2ECC71] hover:bg-[#27AE60] text-white px-8 py-3 rounded-full font-black text-base shadow-md transition"
              >
                Tiếp theo: Luyện nói to ➔
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==================================== */}
      {/* BƯỚC 3: LUYỆN NÓI TO (PARLER) */}
      {/* ==================================== */}
      {subStep === 2 && (
        <div className="text-center">
          <div className="inline-block bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#D94A4A] shadow-sm mb-3">
            <span>🎤 LUYỆN NÓI CÂU NGẮN CÙNG CÔ GIÁO</span>
          </div>

          <div className="text-6xl my-3">{meta.emoji}</div>

          <h4 className="text-3xl sm:text-4xl font-black text-[#2D3436] mb-1">
            &ldquo;{meta.phrase}&rdquo;
          </h4>
          <p className="text-sm font-bold text-[#806C58]">
            Đọc là: <span className="text-[#315A8D]">{meta.phonetic}</span>
          </p>

          <div className="my-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                SoundFX.playPop();
                speakFrench(meta.phrase);
              }}
              className="flex items-center gap-2 bg-[#315A8D] text-white px-6 py-3 rounded-full font-black text-sm shadow hover:bg-[#274B77] transition"
            >
              <span>🔊 1. Nghe cô đọc mẫu</span>
            </button>
            <button
              onClick={handleSpokenClick}
              className="flex items-center gap-2 bg-[#2ECC71] text-white px-6 py-3 rounded-full font-black text-sm shadow hover:bg-[#27AE60] transition"
            >
              <span>⭐ 2. Bé đã đọc to rõ!</span>
            </button>
          </div>

          {spokenDone && (
            <div className="bg-[#EAF5EC] border-2 border-[#4F8A5B] p-4 rounded-2xl max-w-sm mx-auto animate-bounce">
              <p className="text-base font-black text-[#35633F]">
                ⭐⭐⭐ Tuyệt vời lắm bé ơi !
              </p>
              <button
                onClick={() => setSubStep(3)}
                className="mt-2 bg-[#315A8D] text-white px-6 py-2 rounded-full font-black text-xs shadow"
              >
                Thử thách cuối: Ghép chữ ➔
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==================================== */}
      {/* BƯỚC 4: GHÉP CHỮ CÁI NGẮN (ÉCRIRE) */}
      {/* ==================================== */}
      {subStep === 3 && (
        <div className="text-center">
          <div className="inline-block bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#315A8D] shadow-sm mb-3">
            <span>✍️ GHÉP CHỮ CÁI THÀNH TỪ ĐÚNG</span>
          </div>

          <h4 className="text-xl font-black text-[#4A3828] mb-1">
            Ghép từ: &ldquo;{meta.wordTarget}&rdquo;
          </h4>
          <p className="text-xs font-bold text-[#806C58] mb-4">
            💡 Gợi ý: {meta.wordHint}
          </p>

          {/* Ô hiển thị từ đang ghép */}
          <div className="my-4 min-h-[70px] bg-white rounded-2xl border-2 border-dashed border-[#C8BBA9] p-3 flex items-center justify-center gap-2 max-w-xs mx-auto shadow-inner">
            {meta.wordTarget.split("").map((_, i) => {
              const char =
                selectedLetters[i] !== undefined
                  ? meta.wordLetters[selectedLetters[i]]
                  : "";
              return (
                <div
                  key={i}
                  className={`w-11 h-13 rounded-xl flex items-center justify-center text-xl font-black border-2 ${
                    char
                      ? "bg-[#EEF4FA] border-[#315A8D] text-[#315A8D]"
                      : "bg-gray-50 border-gray-200 text-transparent"
                  }`}
                >
                  {char || "_"}
                </div>
              );
            })}
          </div>

          {/* Các chữ cái để bấm */}
          <div className="flex justify-center gap-2 mb-4">
            {meta.wordLetters.map((char, idx) => {
              const used = selectedLetters.includes(idx);
              return (
                <button
                  key={idx}
                  onClick={() => handleLetterClick(idx)}
                  disabled={used || isWordCorrect}
                  className={`w-12 h-12 rounded-xl text-xl font-black border-2 transition transform active:scale-95 ${
                    used
                      ? "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed"
                      : "bg-white text-[#2D3436] border-[#E9DDC8] hover:border-[#315A8D] shadow-sm"
                  }`}
                >
                  {char}
                </button>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={handleRemoveLetter}
              disabled={selectedLetters.length === 0 || isWordCorrect}
              className="text-xs bg-white border border-[#E9DDC8] px-4 py-1.5 rounded-full font-bold text-[#806C58] disabled:opacity-40"
            >
              ⌫ Xóa chữ cuối
            </button>
          </div>

          {wordFinished && (
            <div className="bg-[#EAF5EC] border-2 border-[#4F8A5B] p-4 rounded-2xl max-w-sm mx-auto animate-bounce">
              <p className="text-lg font-black text-[#35633F]">
                🎉 Chúc mừng bé đã hoàn thành bài học !
              </p>
              <p className="text-xs font-bold text-[#27AE60] mt-1">
                Con đã học câu: &ldquo;{meta.phrase}&rdquo; rất xuất sắc!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
