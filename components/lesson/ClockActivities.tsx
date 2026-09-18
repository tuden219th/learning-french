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
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Tiếng tích tắc đồng hồ vui tai
  static playTick() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  }

  // Tiếng chuông đồng hồ bính boong (Chime)
  static playChime() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.6);
      });
    } catch {
      // ignore
    }
  }

  // Tiếng chúc mừng chiến thắng (Success Ding)
  static playSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6
      notes.forEach((note, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(note, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.22, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.4);
      });
    } catch {
      // ignore
    }
  }

  // Tiếng pop khi bấm thẻ từ
  static playPop() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // ignore
    }
  }
}

// Hàm phát âm tiếng Pháp dự phòng chuẩn quốc tế
export function speakFrench(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 0.85; // Nhịp độ vừa phải, rõ ràng cho học sinh lớp 2
    utterance.pitch = 1.1; // Giọng hơi tươi vui
    window.speechSynthesis.speak(utterance);
  } catch {
    // fallback
  }
}

// ==========================================
// INTERACTIVE SVG CLOCK COMPONENT
// ==========================================
interface ClockProps {
  hours: number; // 0-12
  minutes?: number; // 0-59
  size?: number;
  interactive?: boolean;
  onHourChange?: (h: number) => void;
  showDigital?: boolean;
  highlightHour?: number;
}

export function InteractiveClock({
  hours,
  minutes = 0,
  size = 260,
  interactive = false,
  onHourChange,
  showDigital = true,
  highlightHour,
}: ClockProps) {
  // Tính góc xoay kim
  const minuteAngle = minutes * 6;
  const hourAngle = ((hours % 12) + minutes / 60) * 30;

  const clockNumbers = [
    { num: 12, x: 130, y: 38 },
    { num: 1, x: 180, y: 52 },
    { num: 2, x: 215, y: 90 },
    { num: 3, x: 228, y: 136 },
    { num: 4, x: 215, y: 182 },
    { num: 5, x: 180, y: 220 },
    { num: 6, x: 130, y: 234 },
    { num: 7, x: 80, y: 220 },
    { num: 8, x: 45, y: 182 },
    { num: 9, x: 32, y: 136 },
    { num: 10, x: 45, y: 90 },
    { num: 11, x: 80, y: 52 },
  ];

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative select-none"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 260 260"
          className="w-full h-full drop-shadow-xl transition-transform"
        >
          {/* Vành ngoài đồng hồ nhiều lớp vui nhộn */}
          <circle cx="130" cy="130" r="124" fill="#FFEAA7" />
          <circle cx="130" cy="130" r="118" fill="#FDFBF7" stroke="#315A8D" strokeWidth="6" />

          {/* Vạch chia phút nhỏ */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = i * 30;
            return (
              <line
                key={i}
                x1="130"
                y1="18"
                x2="130"
                y2="25"
                stroke="#B2BEC3"
                strokeWidth={i % 3 === 0 ? "3" : "1.5"}
                strokeLinecap="round"
                transform={`rotate(${angle} 130 130)`}
              />
            );
          })}

          {/* 12 Số trên mặt đồng hồ */}
          {clockNumbers.map(({ num, x, y }) => {
            const isHighlighted = (highlightHour !== undefined && (highlightHour % 12 === num % 12)) || (hours % 12 === num % 12);
            return (
              <g
                key={num}
                className={interactive ? "cursor-pointer transition hover:scale-110" : ""}
                onClick={() => {
                  if (interactive && onHourChange) {
                    SoundFX.playTick();
                    onHourChange(num);
                  }
                }}
              >
                {isHighlighted && (
                  <circle
                    cx={x}
                    cy={y - 6}
                    r="15"
                    fill="#FFE8D6"
                    stroke="#FF7675"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                )}
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`font-black select-none ${
                    isHighlighted
                      ? "fill-[#D63031] text-[20px] font-extrabold"
                      : "fill-[#2D3436] text-[17px] font-bold"
                  }`}
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  {num}
                </text>
              </g>
            );
          })}

          {/* Kim giờ (Ngắn, to, màu Cam Đỏ nổi bật) */}
          <g transform={`rotate(${hourAngle} 130 130)`} style={{ transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
            <line
              x1="130"
              y1="130"
              x2="130"
              y2="72"
              stroke="#E17055"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <polygon
              points="130,64 125,74 135,74"
              fill="#D63031"
            />
          </g>

          {/* Kim phút (Dài, mảnh, màu Xanh Dương năng động) */}
          <g transform={`rotate(${minuteAngle} 130 130)`} style={{ transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
            <line
              x1="130"
              y1="130"
              x2="130"
              y2="42"
              stroke="#0984E3"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <line
              x1="130"
              y1="130"
              x2="130"
              y2="145"
              stroke="#0984E3"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* Trục tâm đồng hồ vàng kim */}
          <circle cx="130" cy="130" r="8" fill="#FDCB6E" stroke="#E17055" strokeWidth="2.5" />
          <circle cx="130" cy="130" r="3.5" fill="#D63031" />
        </svg>

        {/* Chú bướm / ngôi sao trang trí mini */}
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-md animate-bounce">
          ✨
        </div>
      </div>

      {showDigital && (
        <div className="mt-3 flex items-center gap-2 bg-white px-5 py-2 rounded-2xl border-2 border-[#E9DDC8] shadow-sm">
          <span className="text-xl">⏰</span>
          <span className="font-mono text-2xl font-black text-[#2D3436]">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] font-extrabold">
            {hours === 12 && minutes === 0 ? "Midi ☀️" : hours === 0 && minutes === 0 ? "Minuit 🌙" : "Heure"}
          </span>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 1. CLOCK DISCOVERY ACTIVITY
// ==========================================
export const timeExploreData = [
  {
    hour: 1,
    minute: 0,
    french: "Il est une heure.",
    vietnamese: "Bây giờ là 1 giờ.",
    audioFile: "un.mp3",
    note: "💡 Chú ý: 'une heure' không có 's' ở cuối nhé!",
    icon: "🕐",
  },
  {
    hour: 2,
    minute: 0,
    french: "Il est deux heures.",
    vietnamese: "Bây giờ là 2 giờ.",
    audioFile: "deux.mp3",
    note: "💡 Từ 2 giờ trở đi, chữ 'heures' có thêm 's'!",
    icon: "🕑",
  },
  {
    hour: 3,
    minute: 0,
    french: "Il est trois heures.",
    vietnamese: "Bây giờ là 3 giờ.",
    audioFile: "trois.mp3",
    note: "💡 Nối âm nhẹ: 'trois-z-heures'!",
    icon: "🕒",
  },
  {
    hour: 6,
    minute: 0,
    french: "Il est six heures.",
    vietnamese: "Bây giờ là 6 giờ.",
    audioFile: "il-est-six-heures.mp3",
    note: "🌅 Sáng sớm bé thức dậy!",
    icon: "🕕",
  },
  {
    hour: 8,
    minute: 0,
    french: "Il est huit heures.",
    vietnamese: "Bây giờ là 8 giờ.",
    audioFile: "il-est-huit-heures.mp3",
    note: "🎒 Giờ vào lớp học tiếng Pháp vui nhộn!",
    icon: "🕗",
  },
  {
    hour: 12,
    minute: 0,
    french: "Il est midi.",
    vietnamese: "Bây giờ là 12 giờ trưa.",
    audioFile: "il-est-midi.mp3",
    note: "☀️ Người Pháp nói 'Il est midi' chứ không nói 'douze heures'!",
    icon: "🕛",
  },
  {
    hour: 2,
    minute: 30,
    french: "Il est deux heures et demie.",
    vietnamese: "Bây giờ là 2 giờ rưỡi (2:30).",
    note: "✨ 'et demie' nghĩa là 'rưỡi' (30 phút) đó con!",
    icon: "🕝",
  },
  {
    hour: 8,
    minute: 15,
    french: "Il est huit heures et quart.",
    vietnamese: "Bây giờ là 8 giờ 15 phút.",
    note: "🥧 'et quart' là 15 phút (một phần tư chiếc bánh đồng hồ)!",
    icon: "🕣",
  },
];

export function ClockDiscoveryActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exploredList, setExploredList] = useState<number[]>([0]);

  const currentItem = timeExploreData[currentIndex];

  const handleSelect = (idx: number) => {
    SoundFX.playTick();
    setCurrentIndex(idx);
    if (!exploredList.includes(idx)) {
      const nextList = [...exploredList, idx];
      setExploredList(nextList);
      if (nextList.length >= 4 && onComplete) {
        onComplete();
      }
    }
  };

  const playCurrentAudio = () => {
    SoundFX.playChime();
    if (currentItem.audioFile) {
      onSpeak(currentItem.french, currentItem.audioFile);
    } else {
      speakFrench(currentItem.french);
      onSpeak(currentItem.french);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Huy hiệu & Hướng dẫn */}
      <div className="flex items-center gap-2 bg-[#FFF3CD] text-[#856404] px-4 py-1.5 rounded-full text-xs font-black tracking-wide mb-4">
        <span>🦉 KHÁM PHÁ THỜI GIAN CÙNG LÉO</span>
      </div>

      <h3 className="text-2xl font-black text-[#294A3A] text-center">
        Chạm các mốc giờ để xoay kim đồng hồ nhé!
      </h3>
      <p className="text-sm text-gray-500 mt-1 mb-5 text-center">
        Đã khám phá: {exploredList.length}/{timeExploreData.length} mốc giờ
      </p>

      {/* Mặt đồng hồ kim trung tâm */}
      <div className="bg-[#FFFDF9] p-6 rounded-[2.5rem] border-2 border-[#E9DDC8] shadow-inner flex flex-col items-center max-w-sm w-full">
        <InteractiveClock
          hours={currentItem.hour}
          minutes={currentItem.minute}
          size={240}
          showDigital={true}
        />

        {/* Nội dung câu đọc */}
        <div className="mt-5 text-center w-full bg-white p-4 rounded-2xl border border-[#E9DDC8]">
          <p className="text-2xl font-black text-[#315A8D] flex items-center justify-center gap-2">
            <span>{currentItem.icon}</span>
            <span>{currentItem.french}</span>
          </p>
          <p className="text-base font-semibold text-gray-600 mt-1">
            {currentItem.vietnamese}
          </p>
          {currentItem.note && (
            <p className="text-xs bg-[#F0FDF4] text-[#166534] p-2 rounded-xl mt-3 font-medium">
              {currentItem.note}
            </p>
          )}
        </div>

        {/* Nút nghe to */}
        <button
          onClick={playCurrentAudio}
          className="mt-4 flex items-center justify-center gap-2 w-full rounded-2xl bg-[#315A8D] px-6 py-3 font-bold text-white shadow-md transition hover:scale-105 active:scale-95"
        >
          <span>🔊</span>
          <span>Nghe phát âm</span>
        </button>
      </div>

      {/* Danh sách các nút chọn giờ nhanh */}
      <div className="mt-6 flex flex-wrap justify-center gap-2.5 max-w-md">
        {timeExploreData.map((item, idx) => {
          const isActive = idx === currentIndex;
          const isExplored = exploredList.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-sm font-extrabold transition-all ${
                isActive
                  ? "bg-[#C96A2B] text-white shadow-md scale-105"
                  : isExplored
                  ? "bg-white text-[#315A8D] border border-[#315A8D]"
                  : "bg-gray-100 text-gray-700 border border-gray-200"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.hour}:{item.minute === 0 ? "00" : item.minute}</span>
              {isExplored && <span className="text-xs">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 2. GAME SẮP XẾP TỪ THÀNH CÂU (SENTENCE BUILDER)
// ==========================================
export interface SentencePuzzle {
  id: string;
  targetSentence: string;
  words: string[];
  translation: string;
  hint: string;
  audioFile?: string;
  emoji: string;
}

export const clockSentencePuzzles: SentencePuzzle[] = [
  {
    id: "q1",
    targetSentence: "Quelle heure est-il ?",
    words: ["est-il", "Quelle", "?", "heure"],
    translation: "Mấy giờ rồi?",
    hint: "Bắt đầu bằng từ 'Quelle' và kết thúc bằng dấu hỏi '?'",
    audioFile: "quelle-heure-est-il.mp3",
    emoji: "❓",
  },
  {
    id: "q2",
    targetSentence: "Il est huit heures.",
    words: ["heures.", "est", "Il", "huit"],
    translation: "Bây giờ là 8 giờ.",
    hint: "Mẫu câu trả lời bắt đầu bằng 'Il' rồi đến 'est'",
    audioFile: "il-est-huit-heures.mp3",
    emoji: "🕗",
  },
  {
    id: "q3",
    targetSentence: "Il est midi.",
    words: ["midi.", "Il", "est"],
    translation: "Bây giờ là 12 giờ trưa.",
    hint: "Câu gồm 3 từ: Il - est - midi.",
    audioFile: "il-est-midi.mp3",
    emoji: "☀️",
  },
  {
    id: "q4",
    targetSentence: "Il est six heures.",
    words: ["six", "Il", "heures.", "est"],
    translation: "Bây giờ là 6 giờ.",
    hint: "Sáng sớm 6 giờ: Il est six heures.",
    audioFile: "il-est-six-heures.mp3",
    emoji: "🌅",
  },
];

export function SentenceBuilderGame({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [status, setStatus] = useState<"playing" | "correct" | "wrong">("playing");

  const puzzle = clockSentencePuzzles[puzzleIndex];

  useEffect(() => {
    setSelectedIndices([]);
    setStatus("playing");
    const shuffled = [...puzzle.words].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
  }, [puzzleIndex, puzzle.words]);

  const handleWordClick = (idx: number) => {
    if (selectedIndices.includes(idx)) return;
    SoundFX.playPop();
    const nextIndices = [...selectedIndices, idx];
    setSelectedIndices(nextIndices);

    if (nextIndices.length === shuffledWords.length) {
      const candidate = nextIndices.map((i) => shuffledWords[i]).join(" ");
      if (candidate.toLowerCase() === puzzle.targetSentence.toLowerCase()) {
        setStatus("correct");
        SoundFX.playSuccess();
        if (puzzle.audioFile) {
          onSpeak(puzzle.targetSentence, puzzle.audioFile);
        } else {
          speakFrench(puzzle.targetSentence);
          onSpeak(puzzle.targetSentence);
        }
        if (onComplete && puzzleIndex === clockSentencePuzzles.length - 1) {
          onComplete();
        }
      } else {
        setStatus("wrong");
      }
    }
  };

  const handleRemoveWord = (removePos: number) => {
    SoundFX.playPop();
    const next = selectedIndices.filter((_, idx) => idx !== removePos);
    setSelectedIndices(next);
    setStatus("playing");
  };

  const handleReset = () => {
    setSelectedIndices([]);
    setStatus("playing");
  };

  const handleNextPuzzle = () => {
    if (puzzleIndex < clockSentencePuzzles.length - 1) {
      setPuzzleIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-[#E9DDC8] bg-[#FFF8EA] p-6 sm:p-8 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#D94A4A] shadow-sm mb-3">
          <span>🧩 GAME SẮP XẾP TỪ THÀNH CÂU</span>
          <span className="bg-[#FFEAA7] text-[#D63031] px-2 py-0.5 rounded-full">
            {puzzleIndex + 1}/{clockSentencePuzzles.length}
          </span>
        </div>

        <h3 className="text-2xl font-black text-[#4A3828] flex items-center justify-center gap-2">
          <span>{puzzle.emoji}</span>
          <span>Ghép câu có nghĩa: "{puzzle.translation}"</span>
        </h3>
        <p className="text-sm text-[#806C58] mt-1">
          💡 Gợi ý: {puzzle.hint}
        </p>
      </div>

      <div className="my-6 min-h-[90px] rounded-3xl bg-white border-2 border-dashed border-[#C8BBA9] p-4 flex flex-wrap items-center justify-center gap-2 shadow-inner">
        {selectedIndices.length === 0 ? (
          <p className="text-gray-400 font-bold text-sm italic">
            👉 Chạm vào các thẻ từ bên dưới theo đúng thứ tự...
          </p>
        ) : (
          selectedIndices.map((wordIdx, pos) => (
            <button
              key={pos}
              onClick={() => handleRemoveWord(pos)}
              className="bg-[#EEF4FA] border-2 border-[#315A8D] text-[#315A8D] font-black text-lg px-4 py-2 rounded-2xl shadow-sm hover:bg-red-50 hover:border-red-400 hover:text-red-500 transition-all active:scale-95"
              title="Chạm để bỏ từ này"
            >
              {shuffledWords[wordIdx]}
            </button>
          ))
        )}
      </div>

      {status === "correct" && (
        <div className="mb-6 bg-[#EAF5EC] border-2 border-[#4F8A5B] p-4 rounded-2xl text-center animate-bounce">
          <p className="text-xl font-black text-[#35633F]">
            🎉 Bravo ! Xuất sắc lắm bé ơi !
          </p>
          <p className="text-base font-bold text-[#294A3A] mt-1">
            "{puzzle.targetSentence}" ➔ {puzzle.translation}
          </p>
          {puzzleIndex < clockSentencePuzzles.length - 1 ? (
            <button
              onClick={handleNextPuzzle}
              className="mt-3 bg-[#2ECC71] hover:bg-[#27AE60] text-white px-6 py-2 rounded-full font-black text-sm shadow-md transition"
            >
              Câu tiếp theo ➔
            </button>
          ) : (
            <p className="text-sm font-bold text-[#27AE60] mt-2">
              ⭐ Bé đã hoàn thành tất cả các câu ghép từ!
            </p>
          )}
        </div>
      )}

      {status === "wrong" && (
        <div className="mb-6 bg-[#FFF0F0] border-2 border-[#D94A4A] p-4 rounded-2xl text-center">
          <p className="text-lg font-black text-[#B63838]">
            Chưa đúng thứ tự rồi 🔄 Hãy thử lại nhé!
          </p>
          <button
            onClick={handleReset}
            className="mt-2 bg-[#D94A4A] text-white px-5 py-1.5 rounded-full font-extrabold text-xs shadow transition"
          >
            Làm lại câu này
          </button>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        {shuffledWords.map((word, idx) => {
          const isUsed = selectedIndices.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleWordClick(idx)}
              disabled={isUsed || status === "correct"}
              className={`text-xl font-black px-6 py-3.5 rounded-2xl shadow-sm transition-all transform ${
                isUsed
                  ? "bg-gray-200 text-gray-400 opacity-40 cursor-not-allowed scale-95"
                  : "bg-white text-[#2D3436] border-2 border-[#E9DDC8] hover:border-[#C96A2B] hover:-translate-y-1 hover:shadow-md active:translate-y-0 active:scale-95"
              }`}
            >
              {word}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-3 border-t border-[#E9DDC8] pt-4">
        <button
          onClick={handleReset}
          disabled={selectedIndices.length === 0}
          className="rounded-full border border-[#E9DDC8] bg-white px-5 py-2 text-sm font-black text-[#806C58] hover:bg-gray-50 disabled:opacity-40"
        >
          🔄 Xếp lại
        </button>
        <button
          onClick={() => {
            SoundFX.playChime();
            speakFrench(puzzle.targetSentence);
          }}
          className="rounded-full bg-[#315A8D] px-5 py-2 text-sm font-black text-white hover:bg-[#274B77]"
        >
          🔊 Nghe mẫu câu
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 3. THỬ THÁCH CHỈNH KIM ĐỒNG HỒ (CLOCK HANDS MISSION)
// ==========================================
export const clockMissions = [
  {
    targetHour: 3,
    targetMinute: 0,
    frenchPrompt: "Mets l'horloge à 3 heures !",
    sentence: "Il est trois heures.",
    vietnamese: "Hãy chỉnh đồng hồ chỉ 3 giờ!",
    audioFile: "trois.mp3",
  },
  {
    targetHour: 6,
    targetMinute: 0,
    frenchPrompt: "Mets l'horloge à 6 heures !",
    sentence: "Il est six heures.",
    vietnamese: "Hãy chỉnh đồng hồ chỉ 6 giờ!",
    audioFile: "il-est-six-heures.mp3",
  },
  {
    targetHour: 8,
    targetMinute: 0,
    frenchPrompt: "Mets l'horloge à 8 heures !",
    sentence: "Il est huit heures.",
    vietnamese: "Hãy chỉnh đồng hồ chỉ 8 giờ!",
    audioFile: "il-est-huit-heures.mp3",
  },
  {
    targetHour: 12,
    targetMinute: 0,
    frenchPrompt: "Mets l'horloge à midi !",
    sentence: "Il est midi.",
    vietnamese: "Hãy chỉnh đồng hồ chỉ 12 giờ trưa (midi)!",
    audioFile: "il-est-midi.mp3",
  },
];

export function ClockHandsChallenge({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [missionIndex, setMissionIndex] = useState(0);
  const [currentHour, setCurrentHour] = useState(1);
  const [solved, setSolved] = useState(false);

  const mission = clockMissions[missionIndex];

  const handleHourSelect = (h: number) => {
    SoundFX.playTick();
    setCurrentHour(h);
    if (h === mission.targetHour) {
      setSolved(true);
      SoundFX.playSuccess();
      if (mission.audioFile) {
        onSpeak(mission.sentence, mission.audioFile);
      } else {
        speakFrench(mission.sentence);
        onSpeak(mission.sentence);
      }
      if (onComplete && missionIndex === clockMissions.length - 1) {
        onComplete();
      }
    } else {
      setSolved(false);
    }
  };

  const handleNext = () => {
    if (missionIndex < clockMissions.length - 1) {
      setMissionIndex((prev) => prev + 1);
      setCurrentHour(1);
      setSolved(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#FFEAA7] text-[#D63031] px-4 py-1.5 rounded-full text-xs font-black mb-3">
        🎯 NHIỆM VỤ XOAY KIM ĐỒNG HỒ ({missionIndex + 1}/{clockMissions.length})
      </div>

      <h3 className="text-2xl font-black text-[#294A3A] text-center">
        {mission.vietnamese}
      </h3>
      <p className="text-base font-extrabold text-[#315A8D] mt-1 mb-4">
        🔊 "{mission.frenchPrompt}"
      </p>

      <div className="bg-white p-6 rounded-[2.5rem] border-2 border-[#E9DDC8] shadow-md flex flex-col items-center">
        <InteractiveClock
          hours={currentHour}
          minutes={0}
          size={240}
          interactive={true}
          onHourChange={handleHourSelect}
          highlightHour={mission.targetHour}
        />

        {solved ? (
          <div className="mt-4 p-3 bg-green-50 border-2 border-green-500 rounded-2xl text-center w-full animate-bounce">
            <p className="font-black text-green-700 text-lg">
              🎉 Chính xác! C'est super !
            </p>
            <p className="font-extrabold text-[#294A3A]">
              {mission.sentence}
            </p>
            {missionIndex < clockMissions.length - 1 && (
              <button
                onClick={handleNext}
                className="mt-2 bg-[#2ECC71] text-white px-5 py-1.5 rounded-full font-black text-xs shadow hover:scale-105"
              >
                Nhiệm vụ tiếp theo ➔
              </button>
            )}
          </div>
        ) : (
          <p className="text-xs text-gray-500 mt-4 text-center">
            👉 Chạm vào các số trên mặt đồng hồ để kim nhảy tới số đó!
          </p>
        )}
      </div>

      <div className="mt-5 grid grid-cols-6 gap-2 max-w-sm">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
          <button
            key={h}
            onClick={() => handleHourSelect(h)}
            className={`w-12 h-12 rounded-2xl font-black text-base shadow-sm transition-all ${
              currentHour === h
                ? "bg-[#C96A2B] text-white scale-105 shadow-md"
                : "bg-white text-[#315A8D] border border-[#E9DDC8] hover:bg-orange-50"
            }`}
          >
            {h}h
          </button>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 4. LUYỆN NÓI TIẾNG PHÁP (SPEAKING ACTIVITY)
// ==========================================
export function ClockSpeakingActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenSuccess, setSpokenSuccess] = useState(false);

  const prompts = [
    {
      french: "Quelle heure est-il ?",
      vietnamese: "Mấy giờ rồi?",
      audioFile: "quelle-heure-est-il.mp3",
      phonetic: "/kɛl œʁ ɛ-t-il/",
    },
    {
      french: "Il est huit heures.",
      vietnamese: "Bây giờ là 8 giờ.",
      audioFile: "il-est-huit-heures.mp3",
      phonetic: "/il ɛ ɥit œʁ/",
    },
    {
      french: "Il est midi !",
      vietnamese: "Bây giờ là 12 giờ trưa!",
      audioFile: "il-est-midi.mp3",
      phonetic: "/il ɛ mi-di/",
    },
  ];

  const current = prompts[currentPromptIdx];

  const handleSimulatedRecord = () => {
    setIsRecording(true);
    SoundFX.playPop();

    // Check SpeechRecognition if available
    if (typeof window !== "undefined") {
      const windowObj = window as unknown as Record<string, unknown>;
      const SpeechRecognitionClass = (windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition) as
        | { new (): { lang: string; start: () => void; onresult: () => void; onerror: () => void } }
        | undefined;

      if (SpeechRecognitionClass) {
        try {
          const recognizer = new SpeechRecognitionClass();
          recognizer.lang = "fr-FR";
          recognizer.onresult = () => {
            setIsRecording(false);
            setSpokenSuccess(true);
            SoundFX.playSuccess();
            if (onComplete) onComplete();
          };
          recognizer.onerror = () => {
            simulateFinish();
          };
          recognizer.start();
          return;
        } catch {
          // fallback
        }
      }
    }

    simulateFinish();
  };

  const simulateFinish = () => {
    setTimeout(() => {
      setIsRecording(false);
      setSpokenSuccess(true);
      SoundFX.playSuccess();
      if (onComplete) onComplete();
    }, 2000);
  };

  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 bg-[#EEF4FA] text-[#315A8D] px-4 py-1.5 rounded-full text-xs font-black mb-3">
        🎤 LUYỆN NÓI TIẾNG PHÁP CÙNG CHÚ CÚ
      </div>

      <h3 className="text-2xl font-black text-[#294A3A]">
        Nghe mẫu và nói to theo nhé!
      </h3>

      <div className="my-6 mx-auto max-w-md bg-white border-2 border-[#E9DDC8] p-6 rounded-3xl shadow-sm">
        <div className="text-5xl mb-3">🦉</div>
        <p className="text-3xl font-black text-[#315A8D]">
          {current.french}
        </p>
        <p className="text-sm text-gray-500 font-mono mt-1">
          {current.phonetic}
        </p>
        <p className="text-lg font-bold text-gray-700 mt-2">
          {current.vietnamese}
        </p>

        <button
          onClick={() => {
            SoundFX.playChime();
            if (current.audioFile) {
              onSpeak(current.french, current.audioFile);
            } else {
              speakFrench(current.french);
            }
          }}
          className="mt-4 bg-[#EEF4FA] hover:bg-[#DCE7F2] text-[#315A8D] px-6 py-2.5 rounded-full font-black text-sm transition"
        >
          🔊 Nghe giọng chuẩn Pháp
        </button>
      </div>

      <div className="flex flex-col items-center">
        <button
          onClick={handleSimulatedRecord}
          disabled={isRecording}
          className={`flex items-center justify-center gap-3 px-8 py-4 rounded-3xl font-black text-lg text-white shadow-lg transition-all ${
            isRecording
              ? "bg-[#E17055] animate-pulse scale-105"
              : "bg-[#D63031] hover:bg-[#C0392B] hover:scale-105 active:scale-95"
          }`}
        >
          <span className="text-2xl">{isRecording ? "🔴" : "🎙️"}</span>
          <span>{isRecording ? "Đang lắng nghe bé nói..." : "Bấm vào đây để nói"}</span>
        </button>

        {spokenSuccess && (
          <div className="mt-5 p-4 bg-[#EAF5EC] border-2 border-[#4F8A5B] rounded-2xl max-w-sm w-full animate-bounce">
            <div className="text-2xl text-yellow-400">⭐⭐⭐</div>
            <p className="font-black text-[#35633F] mt-1">
              🎉 Giỏi quá! Bé phát âm rất hay!
            </p>
            {currentPromptIdx < prompts.length - 1 && (
              <button
                onClick={() => {
                  setCurrentPromptIdx((p) => p + 1);
                  setSpokenSuccess(false);
                }}
                className="mt-3 bg-[#2ECC71] text-white px-5 py-1.5 rounded-full font-black text-xs shadow"
              >
                Luyện câu tiếp theo ➔
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 5. ĐỌC HIỂU: MỘT NGÀY CỦA LÉO (READING ACTIVITY)
// ==========================================
export const dailyRoutineStories = [
  {
    time: "7:00",
    hour: 7,
    minute: 0,
    text: "Le matin à 7 heures, Léo se lève.",
    translation: "Buổi sáng lúc 7 giờ, Léo thức dậy.",
    emoji: "⏰",
    options: ["7:00", "12:00", "20:00"],
    correct: "7:00",
  },
  {
    time: "8:00",
    hour: 8,
    minute: 0,
    text: "À 8 heures, il va à l'école avec ses amis.",
    translation: "Lúc 8 giờ, bạn ấy đi đến trường cùng các bạn.",
    emoji: "🎒",
    options: ["6:00", "8:00", "15:00"],
    correct: "8:00",
  },
  {
    time: "12:00",
    hour: 12,
    minute: 0,
    text: "À midi, c'est l'heure du déjeuner !",
    translation: "Lúc 12 giờ trưa, là giờ ăn trưa ngon tuyệt!",
    emoji: "🥪",
    options: ["10:00", "12:00", "18:00"],
    correct: "12:00",
  },
  {
    time: "20:00",
    hour: 8,
    minute: 0,
    text: "À 8 heures du soir, Léo va dormir. Bonne nuit !",
    translation: "Lúc 8 giờ tối, Léo đi ngủ. Chúc ngủ ngon!",
    emoji: "🌙",
    options: ["8:00 tối", "12:00 trưa", "6:00 sáng"],
    correct: "8:00 tối",
  },
];

export function ClockStoryReadingActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const story = dailyRoutineStories[index];

  const handleChoose = (opt: string) => {
    setSelected(opt);
    if (opt === story.correct) {
      SoundFX.playSuccess();
      speakFrench(story.text);
      if (onComplete && index === dailyRoutineStories.length - 1) {
        onComplete();
      }
    } else {
      SoundFX.playTick();
    }
  };

  const handleNext = () => {
    if (index < dailyRoutineStories.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-[#E9DDC8] bg-white p-6 sm:p-8 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-[#FFF8EA] text-[#315A8D] px-4 py-1.5 rounded-full text-xs font-black mb-3">
          📖 ĐỌC HIỂU: MỘT NGÀY CỦA LÉO ({index + 1}/{dailyRoutineStories.length})
        </div>
        <h3 className="text-2xl font-black text-[#4A3828]">
          Đọc câu chuyện và chọn mốc giờ đúng!
        </h3>
      </div>

      <div className="my-6 bg-[#FFF9F2] border border-[#E9DDC8] p-5 rounded-3xl flex flex-col sm:flex-row items-center gap-4">
        <div className="text-5xl bg-white p-4 rounded-2xl shadow-sm">
          {story.emoji}
        </div>
        <div className="text-center sm:text-left flex-1">
          <p className="text-xl font-black text-[#315A8D]">
            "{story.text}"
          </p>
          <p className="text-sm font-semibold text-gray-600 mt-1">
            {story.translation}
          </p>
          <button
            onClick={() => speakFrench(story.text)}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#C96A2B] hover:underline"
          >
            <span>🔊</span>
            <span>Nghe Léo đọc</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {story.options.map((opt) => {
          const isSelected = selected === opt;
          const isCorrect = opt === story.correct;
          return (
            <button
              key={opt}
              onClick={() => handleChoose(opt)}
              className={`p-4 rounded-2xl font-black text-lg border-2 transition-all ${
                isSelected
                  ? isCorrect
                    ? "bg-green-50 border-green-500 text-green-700 shadow-md scale-105"
                    : "bg-red-50 border-red-400 text-red-500"
                  : "bg-white border-gray-200 text-[#2D3436] hover:border-[#315A8D]"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-5 text-center">
          {selected === story.correct ? (
            <div className="bg-[#EAF5EC] p-3 rounded-2xl">
              <p className="font-black text-green-700">
                🎉 Bé đọc và hiểu đúng rồi!
              </p>
              {index < dailyRoutineStories.length - 1 && (
                <button
                  onClick={handleNext}
                  className="mt-2 bg-[#2ECC71] text-white px-5 py-1.5 rounded-full font-black text-xs shadow"
                >
                  Trang tiếp theo ➔
                </button>
              )}
            </div>
          ) : (
            <p className="font-bold text-red-500">
              💡 Chưa đúng rồi, bé hãy đọc kỹ lại câu chuyện nhé!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. LUYỆN VIẾT CHỮ THỜI GIAN (WRITING ACTIVITY)
// ==========================================
export const timeWritingWords = [
  {
    word: "HEURE",
    letters: ["E", "H", "R", "U", "E"],
    meaning: "giờ",
    emoji: "⏰",
    hint: "Từ có 5 chữ cái, bắt đầu bằng chữ H (âm câm).",
  },
  {
    word: "MIDI",
    letters: ["I", "M", "I", "D"],
    meaning: "12 giờ trưa",
    emoji: "☀️",
    hint: "12 giờ trưa có 4 chữ cái: M-I-D-I.",
  },
  {
    word: "MINUIT",
    letters: ["N", "M", "I", "T", "U", "I"],
    meaning: "nửa đêm / 12 giờ đêm",
    emoji: "🌙",
    hint: "Bắt đầu bằng M-I-N... nửa đêm.",
  },
];

export function ClockWritingActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [selectedLetterIndices, setSelectedLetterIndices] = useState<number[]>([]);
  const currentWord = timeWritingWords[wordIndex];

  const currentText = selectedLetterIndices.map((i) => currentWord.letters[i]).join("");
  const isCorrect = currentText.toLowerCase() === currentWord.word.toLowerCase();
  const isFull = selectedLetterIndices.length === currentWord.word.length;

  const handleAddLetter = (idx: number) => {
    if (selectedLetterIndices.includes(idx) || isFull) return;
    SoundFX.playPop();
    const next = [...selectedLetterIndices, idx];
    setSelectedLetterIndices(next);
    if (next.length === currentWord.word.length) {
      const candidate = next.map((i) => currentWord.letters[i]).join("");
      if (candidate.toLowerCase() === currentWord.word.toLowerCase()) {
        SoundFX.playSuccess();
        speakFrench(currentWord.word.toLowerCase());
        if (onComplete && wordIndex === timeWritingWords.length - 1) {
          onComplete();
        }
      }
    }
  };

  const handleBackspace = () => {
    SoundFX.playPop();
    setSelectedLetterIndices((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    setSelectedLetterIndices([]);
  };

  const handleNextWord = () => {
    if (wordIndex < timeWritingWords.length - 1) {
      setWordIndex((w) => w + 1);
      setSelectedLetterIndices([]);
    }
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-[#E9DDC8] bg-[#FFF8EA] p-6 sm:p-8 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#D94A4A] shadow-sm mb-3">
          ✍️ BÉ TẬP VIẾT TỪ THỜI GIAN ({wordIndex + 1}/{timeWritingWords.length})
        </div>
        <h3 className="text-2xl font-black text-[#4A3828] flex items-center justify-center gap-2">
          <span>{currentWord.emoji}</span>
          <span>Ghép chữ: "{currentWord.meaning}"</span>
        </h3>
        <p className="text-sm text-[#806C58] mt-1">
          💡 Gợi ý: {currentWord.hint}
        </p>
      </div>

      <div className="my-6 flex min-h-[76px] items-center justify-center rounded-3xl bg-white px-5 shadow-sm border-2 border-[#E9DDC8]">
        {currentText ? (
          <p className="text-3xl font-black tracking-[0.25em] text-[#315A8D]">
            {selectedLetterIndices.map((i) => currentWord.letters[i]).join(" ")}
          </p>
        ) : (
          <p className="text-2xl font-black tracking-widest text-[#C8BBA9]">
            {Array.from({ length: currentWord.word.length })
              .map(() => "＿")
              .join(" ")}
          </p>
        )}
      </div>

      {isCorrect && (
        <div className="mb-6 bg-[#EAF5EC] border-2 border-[#4F8A5B] p-4 rounded-2xl text-center animate-bounce">
          <p className="font-black text-[#35633F] text-lg">
            🎉 Bravo ! Bé viết đúng từ: {currentWord.word} !
          </p>
          {wordIndex < timeWritingWords.length - 1 && (
            <button
              onClick={handleNextWord}
              className="mt-2 bg-[#2ECC71] text-white px-5 py-1.5 rounded-full font-black text-xs shadow"
            >
              Từ tiếp theo ➔
            </button>
          )}
        </div>
      )}

      {isFull && !isCorrect && (
        <div className="mb-6 bg-[#FFF0F0] border-2 border-[#D94A4A] p-3 rounded-2xl text-center">
          <p className="font-bold text-[#D94A4A] text-sm">
            Thứ tự chữ cái chưa đúng, bé thử lại nhé!
          </p>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        {currentWord.letters.map((letter, idx) => {
          const isUsed = selectedLetterIndices.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleAddLetter(idx)}
              disabled={isUsed || isFull}
              className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black shadow-sm transition-all ${
                isUsed
                  ? "bg-[#E9DDC8] text-[#B5A592] opacity-50 cursor-not-allowed"
                  : "bg-white text-[#315A8D] border border-[#E9DDC8] hover:-translate-y-1 hover:shadow-md active:translate-y-0"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-3 border-t border-[#E9DDC8] pt-4">
        <button
          onClick={handleBackspace}
          disabled={selectedLetterIndices.length === 0}
          className="rounded-full border border-[#E9DDC8] bg-white px-5 py-2 text-sm font-extrabold text-[#806C58] disabled:opacity-40"
        >
          ⌫ Xóa chữ
        </button>
        <button
          onClick={handleReset}
          className="rounded-full bg-[#315A8D] px-5 py-2 text-sm font-extrabold text-white"
        >
          🔄 Làm lại
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 7. TRẮC NGHIỆM ĐỒNG HỒ (CLOCK MULTIPLE CHOICE)
// ==========================================
export function ClockQuizChoiceActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [step, setStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions = [
    {
      hour: 8,
      minute: 0,
      options: [
        { text: "Il est huit heures.", correct: true },
        { text: "Il est six heures.", correct: false },
        { text: "Il est midi.", correct: false },
      ],
      audioFile: "il-est-huit-heures.mp3",
    },
    {
      hour: 12,
      minute: 0,
      options: [
        { text: "Il est minuit.", correct: false },
        { text: "Il est midi.", correct: true },
        { text: "Il est dix heures.", correct: false },
      ],
      audioFile: "il-est-midi.mp3",
    },
    {
      hour: 6,
      minute: 0,
      options: [
        { text: "Il est six heures.", correct: true },
        { text: "Il est deux heures.", correct: false },
        { text: "Il est neuf heures.", correct: false },
      ],
      audioFile: "il-est-six-heures.mp3",
    },
  ];

  const currentQ = questions[step];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (currentQ.options[index].correct) {
      SoundFX.playSuccess();
      if (currentQ.audioFile) {
        onSpeak(currentQ.options[index].text, currentQ.audioFile);
      } else {
        speakFrench(currentQ.options[index].text);
      }
      if (onComplete && step === questions.length - 1) {
        onComplete();
      }
    } else {
      SoundFX.playTick();
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
      setSelectedAnswer(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#E8F0FE] text-[#1967D2] px-4 py-1.5 rounded-full text-xs font-black mb-3">
        ❓ ĐỒNG HỒ NÀY CHỈ MẤY GIỜ? ({step + 1}/{questions.length})
      </div>

      <h3 className="text-2xl font-black text-[#294A3A] text-center mb-4">
        Nhìn kim đồng hồ và chọn câu đúng:
      </h3>

      <div className="bg-white p-6 rounded-3xl border-2 border-[#E9DDC8] shadow-sm flex flex-col items-center max-w-sm w-full">
        <InteractiveClock
          hours={currentQ.hour}
          minutes={currentQ.minute}
          size={200}
          showDigital={false}
        />

        <div className="mt-6 w-full space-y-3">
          {currentQ.options.map((opt, i) => {
            const isSelected = selectedAnswer === i;
            let btnClass = "bg-white border-2 border-gray-200 text-[#2D3436] hover:border-[#315A8D]";
            if (isSelected) {
              btnClass = opt.correct
                ? "bg-green-50 border-2 border-green-500 text-green-700 shadow-md"
                : "bg-red-50 border-2 border-red-400 text-red-500";
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`w-full p-4 rounded-2xl font-black text-left text-base transition-all ${btnClass}`}
              >
                {opt.text}
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-4 text-center">
            {currentQ.options[selectedAnswer].correct ? (
              <div>
                <p className="font-black text-green-600">
                  🎉 Chính xác! C'est bien !
                </p>
                {step < questions.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="mt-2 bg-[#2ECC71] text-white px-5 py-1.5 rounded-full font-black text-xs shadow"
                  >
                    Câu tiếp theo ➔
                  </button>
                )}
              </div>
            ) : (
              <p className="font-bold text-red-500 text-sm">
                ❌ Chưa đúng rồi, nhìn lại kim ngắn chỉ số mấy nhé!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
