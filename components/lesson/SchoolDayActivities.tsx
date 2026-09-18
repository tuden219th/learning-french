"use client";

import { useState, useEffect } from "react";

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

  static playTick() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
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

  static playBell() {
    // Tiếng chuông trường học bính boong
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const freqs = [659.25, 523.25, 587.33, 392.0]; // E5, C5, D5, G4
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.25);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.25);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + i * 0.25 + 0.8
        );
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.25);
        osc.stop(ctx.currentTime + i * 0.25 + 0.8);
      });
    } catch {}
  }

  static playSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
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

export function speakFrench(text: string, rate: number = 0.88) {
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
// 1. TIMELINE HÀNH TRÌNH MỘT NGÀY ĐẾN TRƯỜNG
// ==========================================
export const schoolTimeline = [
  {
    time: "07:30",
    title: "Le matin à la maison",
    vi: "Buổi sáng ở nhà - Soạn cặp sách",
    emoji: "🎒",
    french: "Le matin, je prépare mon cartable.",
    frenchVi: "Buổi sáng, con soạn cặp sách gọn gàng.",
    vocab: ["le cartable (cặp sách)", "la trousse (hộp bút)", "le cahier (quyển vở)"],
  },
  {
    time: "08:15",
    title: "L'arrivée à l'école",
    vi: "Đến trường học - Chào cô giáo",
    emoji: "🏫",
    french: "Je dis : Bonjour maîtresse ! Bonjour les copains !",
    frenchVi: "Con chào: Em chào cô giáo! Chào các bạn!",
    vocab: ["l'école (trường học)", "la maîtresse (cô giáo)", "les copains (bạn bè)"],
  },
  {
    time: "09:00",
    title: "En classe",
    vi: "Trong lớp học - Giờ học bài",
    emoji: "📚",
    french: "En classe, je lis, j'écris et je compte.",
    frenchVi: "Trong lớp, con đọc bài, viết chữ và làm toán.",
    vocab: ["lire (đọc)", "écrire (viết)", "compter (làm toán/đếm)"],
  },
  {
    time: "10:15",
    title: "La récréation",
    vi: "Giờ ra chơi sân trường",
    emoji: "⚽",
    french: "Dring ! C'est la récré ! Je joue dans la cour.",
    frenchVi: "Reng reng! Giờ ra chơi rồi! Con chạy nhảy ở sân trường.",
    vocab: ["la récréation (giờ ra chơi)", "la cour (sân trường)", "jouer (chơi đùa)"],
  },
  {
    time: "12:00",
    title: "La cantine",
    vi: "Bữa trưa tại nhà ăn trường",
    emoji: "🍽️",
    french: "À midi, je mange à la cantine avec mes amis.",
    frenchVi: "Đến trưa, con ăn cơm ở nhà ăn cùng các bạn bè.",
    vocab: ["la cantine (nhà ăn)", "le déjeuner (bữa trưa)", "manger (ăn cơm)"],
  },
  {
    time: "16:30",
    title: "La sortie de l'école",
    vi: "Tan trường về nhà",
    emoji: "🏡",
    french: "La journée est finie ! Je rentre à la maison.",
    frenchVi: "Ngày học kết thúc rồi! Con vui vẻ về nhà với bố mẹ.",
    vocab: ["la sortie (tan trường)", "rentrer (trở về)", "la maison (ngôi nhà)"],
  },
];

export function SchoolTimelineActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [visited, setVisited] = useState<number[]>([0]);

  const current = schoolTimeline[activeStep];

  const handleSelectStep = (idx: number) => {
    SoundFX.playPop();
    setActiveStep(idx);
    if (!visited.includes(idx)) {
      const updated = [...visited, idx];
      setVisited(updated);
      if (updated.length === schoolTimeline.length && onComplete) {
        SoundFX.playSuccess();
        onComplete();
      }
    }
    speakFrench(schoolTimeline[idx].french);
    onSpeak(schoolTimeline[idx].french);
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-[#E9DDC8] bg-[#FFF8EA] p-6 sm:p-8 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#315A8D] shadow-sm mb-3">
          <span>🎒 MỘT NGÀY ĐI HỌC CỦA BÉ (CE1)</span>
          <span className="bg-[#EAF5EC] text-[#35633F] px-2 py-0.5 rounded-full">
            Đã khám phá: {visited.length}/{schoolTimeline.length}
          </span>
        </div>
        <h3 className="text-2xl font-black text-[#4A3828]">
          Une journée d'école bien remplie
        </h3>
        <p className="text-sm text-[#806C58] mt-1">
          Chạm vào từng mốc thời gian để theo chân một ngày đến trường của học sinh Pháp nhé!
        </p>
      </div>

      {/* Timeline Buttons */}
      <div className="my-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {schoolTimeline.map((step, idx) => {
          const isSelected = idx === activeStep;
          const isVisited = visited.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleSelectStep(idx)}
              className={`p-3 rounded-2xl flex flex-col items-center border-2 transition-all transform active:scale-95 ${
                isSelected
                  ? "bg-white border-[#315A8D] shadow-md scale-105"
                  : isVisited
                  ? "bg-white/80 border-[#C8BBA9]"
                  : "bg-white/40 border-dashed border-[#D8CDBB]"
              }`}
            >
              <span className="text-xs font-black text-[#C96A2B]">
                {step.time}
              </span>
              <span className="text-3xl my-1">{step.emoji}</span>
              <span className="text-xs font-black text-[#4A3828] text-center line-clamp-1">
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Card */}
      <div className="bg-white rounded-3xl p-6 border-2 border-[#E9DDC8] shadow-sm text-center">
        <div className="flex justify-center items-center gap-3 mb-2">
          <span className="text-5xl">{current.emoji}</span>
          <span className="text-xl font-black bg-[#EEF4FA] text-[#315A8D] px-4 py-1 rounded-full">
            ⏰ {current.time}
          </span>
        </div>

        <h4 className="text-2xl font-black text-[#2D3436] mt-2">
          {current.title}
        </h4>
        <p className="text-sm font-bold text-[#806C58]">
          👉 {current.vi}
        </p>

        <div className="my-4 bg-[#FFF8EA] p-4 rounded-2xl border border-[#E9DDC8] max-w-lg mx-auto">
          <p className="text-lg font-black text-[#315A8D]">
            "{current.french}"
          </p>
          <p className="text-sm font-medium text-[#4A3828] mt-1">
            {current.frenchVi}
          </p>
        </div>

        {/* Vocab pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {current.vocab.map((v, i) => (
            <span
              key={i}
              className="bg-[#EEF4FA] text-[#315A8D] text-xs font-extrabold px-3 py-1 rounded-xl"
            >
              📖 {v}
            </span>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              SoundFX.playBell();
              speakFrench(current.french);
            }}
            className="flex items-center gap-2 bg-[#315A8D] hover:bg-[#274B77] text-white px-6 py-2.5 rounded-full font-black text-sm shadow transition active:scale-95"
          >
            <span>🔊 Nghe giọng đọc mẫu</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. KỸ NĂNG NGHE (ÉCOUTER) TRƯỜNG HỌC
// ==========================================
export const schoolListeningQuizzes = [
  {
    audioText: "Bonjour maîtresse !",
    prompt: "Écoute bien : Qui salue l'enfant ?",
    instruction: "Lắng nghe câu nói và đoán bạn nhỏ đang chào ai?",
    options: [
      { text: "La maîtresse", vi: "Cô giáo", correct: true, emoji: "👩‍🏫" },
      { text: "Le chien", vi: "Chú chó", correct: false, emoji: "🐶" },
      { text: "Le policier", vi: "Chú cảnh sát", correct: false, emoji: "👮" },
    ],
  },
  {
    audioText: "Dring ! C'est l'heure de la récréation !",
    prompt: "Quel est ce moment très amusant ?",
    instruction: "Tiếng chuông reo giờ gì đây bé ơi?",
    options: [
      { text: "La cantine", vi: "Giờ ăn trưa", correct: false, emoji: "🍽️" },
      { text: "La récréation", vi: "Giờ ra chơi sân trường", correct: true, emoji: "⚽" },
      { text: "La nuit", vi: "Ban đêm đi ngủ", correct: false, emoji: "🌙" },
    ],
  },
  {
    audioText: "J'écris dans mon cahier avec mon stylo.",
    prompt: "Que fait l'élève en classe ?",
    instruction: "Bạn nhỏ đang làm gì trong lớp học thế?",
    options: [
      { text: "Il dort", vi: "Bạn ấy ngủ", correct: false, emoji: "😴" },
      { text: "Il écrit dans son cahier", vi: "Bạn ấy viết bài vào vở", correct: true, emoji: "✍️" },
      { text: "Il nage", vi: "Bạn ấy bơi", correct: false, emoji: "🏊" },
    ],
  },
];

export function SchoolListeningActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const quiz = schoolListeningQuizzes[index];

  useEffect(() => {
    setSelected(null);
    setIsCorrect(null);
    speakFrench(quiz.audioText);
  }, [index, quiz.audioText]);

  const handleSelect = (optIdx: number) => {
    if (selected !== null) return;
    setSelected(optIdx);
    const correct = quiz.options[optIdx].correct;
    setIsCorrect(correct);

    if (correct) {
      SoundFX.playSuccess();
      if (index === schoolListeningQuizzes.length - 1 && onComplete) {
        onComplete();
      }
    } else {
      SoundFX.playTick();
    }
  };

  const handleNext = () => {
    if (index < schoolListeningQuizzes.length - 1) {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-[#DCE7F2] bg-[#EEF4FA] p-6 sm:p-8 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#315A8D] shadow-sm mb-3">
          <span>🎧 NGHE ÂM THANH TRƯỜNG HỌC</span>
          <span className="bg-[#DCE7F2] text-[#315A8D] px-2 py-0.5 rounded-full">
            {index + 1}/{schoolListeningQuizzes.length}
          </span>
        </div>
        <h3 className="text-2xl font-black text-[#4A3828]">{quiz.prompt}</h3>
        <p className="text-sm text-[#806C58] mt-1">{quiz.instruction}</p>
      </div>

      <div className="my-6 flex justify-center">
        <button
          onClick={() => {
            SoundFX.playBell();
            speakFrench(quiz.audioText);
            onSpeak(quiz.audioText);
          }}
          className="flex items-center gap-3 bg-white border-2 border-[#315A8D] hover:bg-[#315A8D] text-[#315A8D] hover:text-white px-8 py-4 rounded-3xl font-black text-lg shadow-md transition transform hover:scale-105 active:scale-95"
        >
          <span className="text-3xl">🔊</span>
          <span>Bấm để nghe cô giáo nói</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quiz.options.map((opt, i) => {
          let stateClass = "bg-white border-[#E9DDC8] text-[#4A3828] hover:border-[#315A8D]";
          if (selected !== null) {
            if (opt.correct) {
              stateClass = "bg-[#EAF5EC] border-[#4F8A5B] text-[#35633F]";
            } else if (selected === i) {
              stateClass = "bg-[#FFF0F0] border-[#D94A4A] text-[#B63838]";
            } else {
              stateClass = "bg-white/60 border-gray-200 text-gray-400";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`p-5 rounded-3xl border-2 font-black text-center transition-all shadow-sm ${stateClass}`}
            >
              <div className="text-4xl mb-2">{opt.emoji}</div>
              <div className="text-xl">{opt.text}</div>
              <div className="text-xs text-[#806C58] font-bold mt-1">
                {opt.vi}
              </div>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-6 text-center">
          {isCorrect ? (
            <div className="bg-[#EAF5EC] border-2 border-[#4F8A5B] p-4 rounded-2xl">
              <p className="text-lg font-black text-[#35633F]">
                🎉 Bravo ! Con nghe rất chuẩn !
              </p>
              {index < schoolListeningQuizzes.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="mt-3 bg-[#2ECC71] hover:bg-[#27AE60] text-white px-6 py-2 rounded-full font-black text-sm shadow transition"
                >
                  Câu tiếp theo ➔
                </button>
              ) : (
                <p className="text-sm font-bold text-[#27AE60] mt-2">
                  ⭐ Hoàn thành phần luyện Nghe trường học xuất sắc!
                </p>
              )}
            </div>
          ) : (
            <div className="bg-[#FFF0F0] border-2 border-[#D94A4A] p-4 rounded-2xl">
              <p className="text-base font-black text-[#B63838]">
                Chưa đúng rồi 💡 Con nghe lại một lần nữa nhé!
              </p>
              <button
                onClick={() => {
                  setSelected(null);
                  setIsCorrect(null);
                  speakFrench(quiz.audioText);
                }}
                className="mt-2 bg-[#D94A4A] text-white px-5 py-1.5 rounded-full font-extrabold text-xs shadow"
              >
                🔄 Thử lại
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. KỸ NĂNG NÓI (PARLER) GIAO TIẾP ĐẾN TRƯỜNG
// ==========================================
export const schoolSpeakingPrompts = [
  {
    french: "Bonjour maîtresse !",
    phonetic: "/bɔ̃.ʒuʁ mɛ.tʁɛs/",
    vi: "Em chào cô giáo ạ!",
    tip: "Lời chào lễ phép mỗi sáng khi bước vào cổng trường.",
    emoji: "👩‍🏫",
  },
  {
    french: "Je prépare mon cartable.",
    phonetic: "/ʒə pʁe.paʁ mɔ̃ kaʁ.tabl/",
    vi: "Con chuẩn bị cặp sách ạ.",
    tip: "Âm 'cartable' nhấn nhẹ và tròn môi chữ 'ble'.",
    emoji: "🎒",
  },
  {
    french: "J'aime la récréation !",
    phonetic: "/ʒɛm la ʁe.kʁe.a.sjɔ̃/",
    vi: "Con rất thích giờ ra chơi!",
    tip: "Đọc vui vẻ hào hứng như khi ra sân chơi nhé!",
    emoji: "⚽",
  },
  {
    french: "À demain les copains !",
    phonetic: "/a də.mɛ̃ le kɔ.pɛ̃/",
    vi: "Hẹn ngày mai nhé các bạn bè!",
    tip: "Lời chào tạm biệt thân thương khi tan trường ra về.",
    emoji: "👋",
  },
];

export function SchoolSpeakingActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [completedList, setCompletedList] = useState<number[]>([]);
  const [hasPracticed, setHasPracticed] = useState(false);

  const current = schoolSpeakingPrompts[index];

  const handleHearModel = () => {
    SoundFX.playBell();
    speakFrench(current.french);
    onSpeak(current.french);
  };

  const handleCompleteSpeaking = () => {
    SoundFX.playSuccess();
    setHasPracticed(true);
    if (!completedList.includes(index)) {
      const updated = [...completedList, index];
      setCompletedList(updated);
      if (updated.length === schoolSpeakingPrompts.length && onComplete) {
        onComplete();
      }
    }
  };

  const handleNext = () => {
    if (index < schoolSpeakingPrompts.length - 1) {
      setIndex((i) => i + 1);
      setHasPracticed(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-[#E9DDC8] bg-[#FFF8EA] p-6 sm:p-8 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#D94A4A] shadow-sm mb-3">
          <span>🎤 KỸ NĂNG NÓI (PARLER)</span>
          <span className="bg-[#FFEAA7] text-[#D63031] px-2 py-0.5 rounded-full">
            Đã luyện: {completedList.length}/{schoolSpeakingPrompts.length}
          </span>
        </div>
        <h3 className="text-2xl font-black text-[#4A3828]">
          Giao tiếp tự tin như học sinh Pháp
        </h3>
        <p className="text-sm text-[#806C58] mt-1">
          Bé hãy bấm nghe cô đọc mẫu, sau đó tự tin đọc to lên nhé!
        </p>
      </div>

      <div className="my-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E9DDC8] shadow-sm text-center">
        <div className="text-6xl mb-3">{current.emoji}</div>
        <h4 className="text-3xl sm:text-4xl font-black text-[#2D3436]">
          "{current.french}"
        </h4>
        <p className="text-sm font-bold text-[#806C58] mt-1">
          Phiên âm: {current.phonetic} | Nghĩa: {current.vi}
        </p>
        <div className="mt-3 inline-block bg-[#FFF8EA] px-4 py-2 rounded-xl text-xs font-bold text-[#C96A2B] border border-[#E9DDC8]">
          💡 Tình huống: {current.tip}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={handleHearModel}
            className="flex items-center gap-2 bg-[#315A8D] hover:bg-[#274B77] text-white px-6 py-3 rounded-full font-black text-base shadow-md transition active:scale-95"
          >
            <span>🔊 1. Nghe mẫu</span>
          </button>
          <button
            onClick={handleCompleteSpeaking}
            className="flex items-center gap-2 bg-[#2ECC71] hover:bg-[#27AE60] text-white px-6 py-3 rounded-full font-black text-base shadow-md transition active:scale-95"
          >
            <span>⭐ 2. Bé đã đọc to rõ!</span>
          </button>
        </div>

        {hasPracticed && (
          <div className="mt-6 bg-[#EAF5EC] border-2 border-[#4F8A5B] p-4 rounded-2xl animate-bounce">
            <p className="text-lg font-black text-[#35633F]">
              🎉 Magnifique ! Bé nói tiếng Pháp rất tự nhiên !
            </p>
            {index < schoolSpeakingPrompts.length - 1 ? (
              <button
                onClick={handleNext}
                className="mt-3 bg-[#315A8D] text-white px-6 py-2 rounded-full font-black text-sm shadow transition"
              >
                Câu tiếp theo ➔
              </button>
            ) : (
              <p className="text-sm font-bold text-[#27AE60] mt-2">
                🏆 Bé đạt chứng nhận Học sinh Giao tiếp Tự tin!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. KỸ NĂNG ĐỌC (LIRE)
// ==========================================
export const schoolReadingQuestions = [
  {
    q: "Que met Manon dans son cartable ?",
    vi: "Manon xếp những gì vào trong cặp sách?",
    options: [
      { text: "Ses cahiers et ses crayons", correct: true },
      { text: "Son doudou et son oreiller", correct: false },
      { text: "Une casserole", correct: false },
    ],
  },
  {
    q: "Que fait Manon dans la cour de récréation ?",
    vi: "Manon chơi trò gì ở sân trường giờ ra chơi?",
    options: [
      { text: "Elle dort", correct: false },
      { text: "Elle saute à la corde avec ses amies", correct: true },
      { text: "Elle fait la cuisine", correct: false },
    ],
  },
  {
    q: "Où déjeune-t-elle à midi ?",
    vi: "Buổi trưa bạn ấy ăn cơm ở đâu?",
    options: [
      { text: "À la cantine de l'école", correct: true },
      { text: "Dans la forêt", correct: false },
      { text: "Au restaurant", correct: false },
    ],
  },
];

export function SchoolReadingActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);

  const fullText =
    "Chaque matin, Manon prépare son cartable : elle y range sa trousse, ses cahiers et sa règle. À huit heures, elle arrive à l'école et dit bonjour à son maître. Dans la classe, elle apprend à lire et à compter. À dix heures, c'est la récréation : Manon saute à la corde avec ses copines dans la grande cour. À midi, elle mange du poisson et des carottes à la cantine. À seize heures et demie, la cloche sonne : la journée d'école est terminée !";

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    SoundFX.playPop();
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCheck = () => {
    setChecked(true);
    const allCorrect = schoolReadingQuestions.every(
      (q, idx) => answers[idx] !== undefined && q.options[answers[idx]].correct
    );
    if (allCorrect) {
      SoundFX.playSuccess();
      if (onComplete) onComplete();
    } else {
      SoundFX.playTick();
    }
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-[#E9DDC8] bg-[#FFF8EA] p-6 sm:p-8 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#315A8D] shadow-sm mb-3">
          <span>📖 KỸ NĂNG ĐỌC (LIRE)</span>
        </div>
        <h3 className="text-2xl font-black text-[#4A3828]">
          Une journée magique à l'école
        </h3>
        <p className="text-sm text-[#806C58] mt-1">
          Cùng đọc câu chuyện một ngày đi học của bạn Manon và trả lời câu hỏi nhé!
        </p>
      </div>

      <div className="my-6 bg-white rounded-3xl p-6 border-2 border-[#E9DDC8] shadow-sm">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <span className="font-extrabold text-[#315A8D] text-sm">
            🏫 Câu chuyện: Một ngày của bé Manon
          </span>
          <button
            onClick={() => {
              SoundFX.playBell();
              speakFrench(fullText);
            }}
            className="text-xs bg-[#EEF4FA] text-[#315A8D] font-bold px-3 py-1.5 rounded-full hover:bg-[#315A8D] hover:text-white transition"
          >
            🔊 Nghe đọc toàn bài
          </button>
        </div>

        <div className="space-y-3 text-[#2D3436] text-base sm:text-lg leading-relaxed">
          <p className="bg-[#FFF8EA] p-3 rounded-2xl border border-[#E9DDC8]">
            🎒 <strong>Le matin :</strong> Chaque matin, Manon prépare son cartable : elle y range sa trousse, ses cahiers et sa règle.
          </p>
          <p className="bg-[#EEF4FA] p-3 rounded-2xl border border-[#DCE7F2]">
            🏫 <strong>En classe :</strong> À l'école, elle dit : "Bonjour maître !". Elle apprend à lire et à compter avec ses amis.
          </p>
          <p className="bg-[#EAF5EC] p-3 rounded-2xl border border-[#C8E6C9]">
            ⚽ <strong>La récréation & La cantine :</strong> Dans la cour, elle saute à la corde. À midi, elle mange de bons légumes à la cantine.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {schoolReadingQuestions.map((q, qIdx) => (
          <div
            key={qIdx}
            className="bg-white p-5 rounded-2xl border-2 border-[#E9DDC8]"
          >
            <h5 className="font-black text-[#4A3828] text-base mb-1">
              Câu {qIdx + 1}: {q.q}
            </h5>
            <p className="text-xs text-[#806C58] font-bold mb-3">
              👉 {q.vi}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {q.options.map((opt, optIdx) => {
                const isSelected = answers[qIdx] === optIdx;
                let btnStyle = "bg-[#EEF4FA] border-[#DCE7F2] text-[#315A8D]";

                if (isSelected) {
                  btnStyle = "bg-[#315A8D] text-white border-[#315A8D]";
                }

                if (checked) {
                  if (opt.correct) {
                    btnStyle = "bg-[#EAF5EC] text-[#35633F] border-[#4F8A5B]";
                  } else if (isSelected && !opt.correct) {
                    btnStyle = "bg-[#FFF0F0] text-[#B63838] border-[#D94A4A]";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(qIdx, optIdx)}
                    className={`p-3 rounded-xl border-2 font-bold text-sm transition ${btnStyle}`}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleCheck}
          disabled={Object.keys(answers).length < schoolReadingQuestions.length}
          className="bg-[#C96A2B] hover:bg-[#A8551F] text-white px-8 py-3 rounded-full font-black text-base shadow-md transition disabled:opacity-40"
        >
          Kiểm tra bài đọc ➔
        </button>

        {checked && (
          <div className="mt-4">
            {schoolReadingQuestions.every(
              (q, idx) => answers[idx] !== undefined && q.options[answers[idx]].correct
            ) ? (
              <p className="text-lg font-black text-[#2ECC71]">
                🎉 Bravo ! Con đã hiểu câu chuyện trường học rất tường tận !
              </p>
            ) : (
              <p className="text-sm font-bold text-[#E74C3C]">
                Chưa đúng hết rồi, con đọc lại kỹ đoạn văn phía trên nhé!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 5. KỸ NĂNG VIẾT (ÉCRIRE) - GHÉP CÂU
// ==========================================
export const sentencePuzzles = [
  {
    target: "Je vais à l'école.",
    words: ["l'école.", "vais", "Je", "à"],
    vi: "Tôi đi đến trường học.",
    hint: "Bắt đầu bằng chủ ngữ 'Je'",
  },
  {
    target: "J'écris dans mon cahier.",
    words: ["cahier.", "mon", "dans", "J'écris"],
    vi: "Con viết bài vào quyển vở của con.",
    hint: "Bắt đầu bằng động từ 'J'écris'",
  },
  {
    target: "J'aime la grande récréation.",
    words: ["récréation.", "la", "grande", "J'aime"],
    vi: "Con rất thích giờ ra chơi rộng lớn.",
    hint: "Bắt đầu bằng 'J'aime'",
  },
];

export function SchoolWritingActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedList, setCompletedList] = useState<number[]>([]);

  const puzzle = sentencePuzzles[puzzleIdx];

  useEffect(() => {
    setSelectedIndices([]);
    setIsCorrect(false);
    const shuf = [...puzzle.words].sort(() => Math.random() - 0.5);
    setShuffled(shuf);
  }, [puzzleIdx]);

  const handleWordClick = (idx: number) => {
    if (selectedIndices.includes(idx)) return;
    SoundFX.playPop();
    const next = [...selectedIndices, idx];
    setSelectedIndices(next);

    if (next.length === shuffled.length) {
      const sentence = next.map((i) => shuffled[i]).join(" ");
      if (sentence === puzzle.target) {
        setIsCorrect(true);
        SoundFX.playSuccess();
        speakFrench(puzzle.target);
        if (!completedList.includes(puzzleIdx)) {
          const updated = [...completedList, puzzleIdx];
          setCompletedList(updated);
          if (updated.length === sentencePuzzles.length && onComplete) {
            onComplete();
          }
        }
      } else {
        SoundFX.playTick();
      }
    }
  };

  const handleRemoveWord = (pos: number) => {
    SoundFX.playPop();
    setSelectedIndices((prev) => prev.filter((_, idx) => idx !== pos));
    setIsCorrect(false);
  };

  const handleReset = () => {
    SoundFX.playPop();
    setSelectedIndices([]);
    setIsCorrect(false);
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-[#E9DDC8] bg-[#FFF8EA] p-6 sm:p-8 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#D94A4A] shadow-sm mb-3">
          <span>✍️ KỸ NĂNG VIẾT (ÉCRIRE)</span>
          <span className="bg-[#FFEAA7] text-[#D63031] px-2 py-0.5 rounded-full">
            {puzzleIdx + 1}/{sentencePuzzles.length}
          </span>
        </div>
        <h3 className="text-2xl font-black text-[#4A3828]">
          Ghép các từ thành câu đúng chuẩn ngữ pháp
        </h3>
        <p className="text-sm text-[#806C58] mt-1">
          Nghĩa câu: "{puzzle.vi}" | 💡 Gợi ý: {puzzle.hint}
        </p>
      </div>

      <div className="my-6 min-h-[90px] bg-white rounded-3xl border-2 border-dashed border-[#C8BBA9] p-4 flex flex-wrap items-center justify-center gap-2 shadow-inner">
        {selectedIndices.length === 0 ? (
          <p className="text-gray-400 font-bold text-sm italic">
            👉 Chạm vào các thẻ từ bên dưới theo đúng thứ tự câu...
          </p>
        ) : (
          selectedIndices.map((wordIdx, pos) => (
            <button
              key={pos}
              onClick={() => handleRemoveWord(pos)}
              className="bg-[#EEF4FA] border-2 border-[#315A8D] text-[#315A8D] font-black text-lg px-4 py-2 rounded-2xl shadow-sm hover:bg-red-50 hover:border-red-400 hover:text-red-500 transition"
              title="Bấm để bỏ từ này"
            >
              {shuffled[wordIdx]}
            </button>
          ))
        )}
      </div>

      {isCorrect && (
        <div className="mb-6 bg-[#EAF5EC] border-2 border-[#4F8A5B] p-4 rounded-2xl text-center animate-bounce">
          <p className="text-xl font-black text-[#35633F]">
            🎉 Bravo ! Con đã ghép câu hoàn toàn chính xác !
          </p>
          <p className="text-base font-bold text-[#294A3A] mt-1">
            "{puzzle.target}"
          </p>
          {puzzleIdx < sentencePuzzles.length - 1 ? (
            <button
              onClick={() => setPuzzleIdx((i) => i + 1)}
              className="mt-3 bg-[#2ECC71] hover:bg-[#27AE60] text-white px-6 py-2 rounded-full font-black text-sm shadow transition"
            >
              Câu tiếp theo ➔
            </button>
          ) : (
            <p className="text-sm font-bold text-[#27AE60] mt-2">
              ⭐ Bé đã hoàn thành tất cả các câu viết!
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        {shuffled.map((word, idx) => {
          const isUsed = selectedIndices.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleWordClick(idx)}
              disabled={isUsed || isCorrect}
              className={`text-xl font-black px-6 py-3.5 rounded-2xl shadow-sm transition transform ${
                isUsed
                  ? "bg-gray-200 text-gray-400 opacity-40 cursor-not-allowed scale-95"
                  : "bg-white text-[#2D3436] border-2 border-[#E9DDC8] hover:border-[#C96A2B] hover:-translate-y-1 active:scale-95"
              }`}
            >
              {word}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={handleReset}
          disabled={selectedIndices.length === 0}
          className="bg-white border border-[#E9DDC8] px-5 py-2 rounded-full font-bold text-sm text-[#806C58] hover:bg-gray-50 disabled:opacity-40"
        >
          🔄 Xếp lại
        </button>
        <button
          onClick={() => {
            SoundFX.playBell();
            speakFrench(puzzle.target);
          }}
          className="bg-[#315A8D] text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-[#274B77]"
        >
          🔊 Nghe mẫu câu
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 6. MINI GAME: DANS MON CARTABLE (TRONG CẶP SÁCH CỦA BÉ)
// ==========================================
export const cartableItems = [
  { id: "cahier", name: "un cahier", vi: "vở viết", emoji: "📓", shouldPack: true },
  { id: "trousse", name: "une trousse", vi: "hộp bút", emoji: "👝", shouldPack: true },
  { id: "crayons", name: "des crayons", vi: "bút chì màu", emoji: "🖍️", shouldPack: true },
  { id: "regle", name: "une règle", vi: "thước kẻ", emoji: "📏", shouldPack: true },
  { id: "livre", name: "un livre", vi: "sách đọc", emoji: "📖", shouldPack: true },
  { id: "oreiller", name: "un oreiller", vi: "cái gối ngủ", emoji: "🛏️", shouldPack: false },
  { id: "poele", name: "une poêle", vi: "chảo rán", emoji: "🍳", shouldPack: false },
];

export function SchoolBagGameActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [packed, setPacked] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const neededCount = cartableItems.filter((item) => item.shouldPack).length;

  const handleToggle = (item: typeof cartableItems[0]) => {
    SoundFX.playPop();
    if (!item.shouldPack) {
      SoundFX.playTick();
      alert(`Ồ không! Bé đừng mang ${item.name} (${item.vi}) vào lớp nhé! 😅`);
      return;
    }

    speakFrench(item.name);

    if (packed.includes(item.id)) {
      setPacked((prev) => prev.filter((id) => id !== item.id));
    } else {
      const next = [...packed, item.id];
      setPacked(next);
      if (next.length === neededCount) {
        setCompleted(true);
        SoundFX.playSuccess();
        if (onComplete) onComplete();
      }
    }
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-[#E9DDC8] bg-[#FFF8EA] p-6 sm:p-8 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#315A8D] shadow-sm mb-3">
          <span>🎒 TRÒ CHƠI THỰC HÀNH</span>
        </div>
        <h3 className="text-2xl font-black text-[#4A3828]">
          Dans mon cartable d'école (Chuẩn bị cặp sách)
        </h3>
        <p className="text-sm text-[#806C58] mt-1">
          Bé hãy chọn đúng 5 món đồ dùng cần thiết cho vào cặp sách đi học nhé! ({packed.length}/{neededCount})
        </p>
      </div>

      <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cartableItems.map((item) => {
          const isPacked = packed.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => handleToggle(item)}
              className={`p-4 rounded-3xl border-2 flex flex-col items-center justify-center transition transform active:scale-95 ${
                isPacked
                  ? "bg-[#EAF5EC] border-[#4F8A5B] shadow-md scale-105"
                  : "bg-white border-[#E9DDC8] hover:border-[#315A8D]"
              }`}
            >
              <span className="text-4xl mb-1">{item.emoji}</span>
              <span className="font-black text-sm text-[#4A3828]">
                {item.name}
              </span>
              <span className="text-xs font-bold text-[#806C58]">
                {item.vi}
              </span>
              {isPacked && (
                <span className="mt-2 text-xs font-black bg-[#4F8A5B] text-white px-2 py-0.5 rounded-full">
                  ✓ Đã xếp vào cặp
                </span>
              )}
            </button>
          );
        })}
      </div>

      {completed && (
        <div className="bg-[#EAF5EC] border-2 border-[#4F8A5B] p-4 rounded-2xl text-center animate-bounce">
          <p className="text-xl font-black text-[#35633F]">
            🎉 Bravo ! Chiếc cặp sách của con đã sẵn sàng đến lớp !
          </p>
          <p className="text-sm font-bold text-[#27AE60] mt-1">
            Con là một học sinh lớp 2 rất cẩn thận và ngăn nắp!
          </p>
        </div>
      )}
    </div>
  );
}
