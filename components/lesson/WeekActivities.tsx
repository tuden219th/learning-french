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
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {}
  }

  static playChime() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + idx * 0.1 + 0.5
        );
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.1);
        osc.stop(ctx.currentTime + idx * 0.1 + 0.5);
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
        osc.type = "sine";
        osc.frequency.setValueAtTime(note, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + i * 0.08 + 0.4
        );
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.4);
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
// 1. KHÁM PHÁ 7 NGÀY & CUỐI TUẦN (DISCOVERY)
// ==========================================
export const weekDaysData = [
  {
    id: "lundi",
    french: "lundi",
    vietnamese: "Thứ Hai",
    emoji: "🌙",
    isWeekend: false,
    example: "Lundi, c'est le premier jour d'école !",
    exampleVi: "Thứ Hai là ngày đầu tiên đến trường!",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "mardi",
    french: "mardi",
    vietnamese: "Thứ Ba",
    emoji: "🔴",
    isWeekend: false,
    example: "Mardi, j'écris dans mon cahier.",
    exampleVi: "Thứ Ba, con viết bài vào vở.",
    color: "from-rose-500 to-red-600",
  },
  {
    id: "mercredi",
    french: "mercredi",
    vietnamese: "Thứ Tư",
    emoji: "⚡",
    isWeekend: false,
    example: "Mercredi après-midi, je dessine à la maison.",
    exampleVi: "Chiều thứ Tư, con vẽ tranh ở nhà.",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "jeudi",
    french: "jeudi",
    vietnamese: "Thứ Năm",
    emoji: "🌩️",
    isWeekend: false,
    example: "Jeudi, nous faisons du sport dans la cour.",
    exampleVi: "Thứ Năm, chúng con tập thể dục ở sân trường.",
    color: "from-purple-500 to-indigo-700",
  },
  {
    id: "vendredi",
    french: "vendredi",
    vietnamese: "Thứ Sáu",
    emoji: "💖",
    isWeekend: false,
    example: "Vendredi, l'école est bientôt finie !",
    exampleVi: "Thứ Sáu, tuần học sắp kết thúc rồi!",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "samedi",
    french: "samedi",
    vietnamese: "Thứ Bảy",
    emoji: "🪐",
    isWeekend: true,
    example: "Samedi, c'est le week-end ! Je vais au parc.",
    exampleVi: "Thứ Bảy là cuối tuần! Con đi công viên dạo chơi.",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "dimanche",
    french: "dimanche",
    vietnamese: "Chủ Nhật",
    emoji: "☀️",
    isWeekend: true,
    example: "Dimanche, toute la famille se repose.",
    exampleVi: "Chủ Nhật, cả gia đình cùng nghỉ ngơi sum vầy.",
    color: "from-yellow-400 to-amber-500",
  },
];

export function WeekDiscoveryActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [activeDay, setActiveDay] = useState<string>("lundi");
  const [exploredDays, setExploredDays] = useState<string[]>(["lundi"]);

  const current = weekDaysData.find((d) => d.id === activeDay)!;

  const handleSelectDay = (dayId: string) => {
    SoundFX.playPop();
    setActiveDay(dayId);
    if (!exploredDays.includes(dayId)) {
      const updated = [...exploredDays, dayId];
      setExploredDays(updated);
      if (updated.length === weekDaysData.length && onComplete) {
        SoundFX.playSuccess();
        onComplete();
      }
    }
    const dayObj = weekDaysData.find((d) => d.id === dayId);
    if (dayObj) {
      speakFrench(dayObj.french);
      onSpeak(dayObj.french);
    }
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-[#E9DDC8] bg-[#FFF8EA] p-6 sm:p-8 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#315A8D] shadow-sm mb-3">
          <span>📅 KHÁM PHÁ 7 NGÀY TRONG TUẦN</span>
          <span className="bg-[#EAF5EC] text-[#35633F] px-2 py-0.5 rounded-full">
            Đã nghe: {exploredDays.length}/7
          </span>
        </div>
        <h3 className="text-2xl font-black text-[#4A3828]">
          Les 7 jours de la semaine & Le week-end
        </h3>
        <p className="text-sm text-[#806C58] mt-1">
          Chạm vào từng ngày để nghe cô giáo phát âm chuẩn tiếng Pháp nhé!
        </p>
      </div>

      {/* 7 Days selector pill buttons */}
      <div className="my-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {weekDaysData.map((day) => {
          const isSelected = day.id === activeDay;
          const isExplored = exploredDays.includes(day.id);
          return (
            <button
              key={day.id}
              onClick={() => handleSelectDay(day.id)}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center border-2 transition-all transform active:scale-95 ${
                isSelected
                  ? "bg-white border-[#315A8D] shadow-md scale-105"
                  : isExplored
                  ? "bg-white/80 border-[#C8BBA9] hover:border-[#315A8D]"
                  : "bg-white/40 border-dashed border-[#D8CDBB] hover:bg-white"
              }`}
            >
              <span className="text-2xl mb-1">{day.emoji}</span>
              <span
                className={`font-black text-sm capitalize ${
                  isSelected ? "text-[#315A8D]" : "text-[#4A3828]"
                }`}
              >
                {day.french}
              </span>
              <span className="text-[11px] font-bold text-[#806C58]">
                {day.vietnamese}
              </span>
              {day.isWeekend && (
                <span className="mt-1 px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded-md">
                  Week-end
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Day Showcase Card */}
      <div className="bg-white rounded-3xl p-6 border-2 border-[#E9DDC8] shadow-sm text-center">
        <div className="flex justify-center mb-3">
          <span className="text-6xl animate-bounce">{current.emoji}</span>
        </div>
        <div className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 bg-[#EEF4FA] text-[#315A8D]">
          {current.isWeekend ? "🎉 Jour du week-end (Ngày cuối tuần)" : "🎒 Jour d'école (Ngày đi học)"}
        </div>
        <h4 className="text-4xl font-black text-[#2D3436] capitalize mb-1">
          {current.french}
        </h4>
        <p className="text-lg font-bold text-[#636E72] mb-4">
          = {current.vietnamese}
        </p>

        <div className="bg-[#FFF8EA] rounded-2xl p-4 border border-[#E9DDC8] max-w-lg mx-auto">
          <p className="text-base font-extrabold text-[#315A8D]">
            "{current.example}"
          </p>
          <p className="text-sm font-medium text-[#806C58] mt-1">
            👉 {current.exampleVi}
          </p>
        </div>

        <div className="mt-5 flex justify-center gap-3">
          <button
            onClick={() => {
              SoundFX.playChime();
              speakFrench(current.french);
            }}
            className="flex items-center gap-2 bg-[#315A8D] hover:bg-[#274B77] text-white px-5 py-2.5 rounded-full font-black text-sm shadow transition active:scale-95"
          >
            <span>🔊 Nghe từ: {current.french}</span>
          </button>
          <button
            onClick={() => {
              SoundFX.playPop();
              speakFrench(current.example);
            }}
            className="flex items-center gap-2 bg-[#C96A2B] hover:bg-[#A8551F] text-white px-5 py-2.5 rounded-full font-black text-sm shadow transition active:scale-95"
          >
            <span>💬 Nghe câu ví dụ</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. KỸ NĂNG NGHE (ÉCOUTER)
// ==========================================
export const weekListeningQuizzes = [
  {
    id: "l1",
    audioText: "mercredi",
    prompt: "Écoute bien : Quel est ce jour ?",
    instruction: "Bé lắng nghe âm thanh và chọn đúng thứ nhé!",
    options: [
      { text: "mardi", vi: "Thứ Ba", correct: false, emoji: "🔴" },
      { text: "mercredi", vi: "Thứ Tư", correct: true, emoji: "⚡" },
      { text: "vendredi", vi: "Thứ Sáu", correct: false, emoji: "💖" },
    ],
  },
  {
    id: "l2",
    audioText: "vendredi",
    prompt: "Écoute et trouve le dernier jour d'école de la semaine !",
    instruction: "Ngày đi học cuối cùng trong tuần là gì nào?",
    options: [
      { text: "lundi", vi: "Thứ Hai", correct: false, emoji: "🌙" },
      { text: "jeudi", vi: "Thứ Năm", correct: false, emoji: "🌩️" },
      { text: "vendredi", vi: "Thứ Sáu", correct: true, emoji: "💖" },
    ],
  },
  {
    id: "l3",
    audioText: "C'est le week-end !",
    prompt: "Quels jours forment le week-end ?",
    instruction: "Nghe câu 'C'est le week-end !'. Hai ngày cuối tuần là hai ngày nào?",
    options: [
      { text: "lundi et mardi", vi: "Thứ Hai và Thứ Ba", correct: false, emoji: "🎒" },
      { text: "samedi et dimanche", vi: "Thứ Bảy và Chủ Nhật", correct: true, emoji: "🎉" },
      { text: "jeudi et vendredi", vi: "Thứ Năm và Thứ Sáu", correct: false, emoji: "🏫" },
    ],
  },
  {
    id: "l4",
    audioText: "Aujourd'hui, c'est dimanche !",
    prompt: "Quel jour est aujourd'hui ?",
    instruction: "Nghe câu nói của bạn nhỏ và chọn đúng ngày hôm nay nhé!",
    options: [
      { text: "dimanche", vi: "Chủ Nhật", correct: true, emoji: "☀️" },
      { text: "samedi", vi: "Thứ Bảy", correct: false, emoji: "🪐" },
      { text: "mercredi", vi: "Thứ Tư", correct: false, emoji: "⚡" },
    ],
  },
];

export function WeekListeningActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const quiz = weekListeningQuizzes[index];

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
      if (index === weekListeningQuizzes.length - 1 && onComplete) {
        onComplete();
      }
    } else {
      SoundFX.playTick();
    }
  };

  const handleNext = () => {
    if (index < weekListeningQuizzes.length - 1) {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-[#DCE7F2] bg-[#EEF4FA] p-6 sm:p-8 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#315A8D] shadow-sm mb-3">
          <span>🎧 KỸ NĂNG NGHE (ÉCOUTER)</span>
          <span className="bg-[#DCE7F2] text-[#315A8D] px-2 py-0.5 rounded-full">
            {index + 1}/{weekListeningQuizzes.length}
          </span>
        </div>
        <h3 className="text-2xl font-black text-[#4A3828]">
          {quiz.prompt}
        </h3>
        <p className="text-sm text-[#806C58] mt-1">{quiz.instruction}</p>
      </div>

      {/* Audio Play Button */}
      <div className="my-6 flex justify-center">
        <button
          onClick={() => {
            SoundFX.playChime();
            speakFrench(quiz.audioText);
            onSpeak(quiz.audioText);
          }}
          className="flex items-center gap-3 bg-white border-2 border-[#315A8D] hover:bg-[#315A8D] text-[#315A8D] hover:text-white px-8 py-4 rounded-3xl font-black text-lg shadow-md transition transform hover:scale-105 active:scale-95"
        >
          <span className="text-3xl">🔊</span>
          <span>Bấm để nghe: "{quiz.audioText}"</span>
        </button>
      </div>

      {/* Options */}
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
              <div className="text-xl capitalize">{opt.text}</div>
              <div className="text-xs text-[#806C58] font-bold mt-1">
                {opt.vi}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback & Next */}
      {selected !== null && (
        <div className="mt-6 text-center">
          {isCorrect ? (
            <div className="bg-[#EAF5EC] border-2 border-[#4F8A5B] p-4 rounded-2xl">
              <p className="text-lg font-black text-[#35633F]">
                🎉 Bravo ! Con đã nghe và chọn rất chính xác !
              </p>
              {index < weekListeningQuizzes.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="mt-3 bg-[#2ECC71] hover:bg-[#27AE60] text-white px-6 py-2 rounded-full font-black text-sm shadow transition"
                >
                  Câu tiếp theo ➔
                </button>
              ) : (
                <p className="text-sm font-bold text-[#27AE60] mt-2">
                  ⭐ Hoàn thành phần luyện Nghe xuất sắc!
                </p>
              )}
            </div>
          ) : (
            <div className="bg-[#FFF0F0] border-2 border-[#D94A4A] p-4 rounded-2xl">
              <p className="text-base font-black text-[#B63838]">
                Chưa đúng rồi 💡 Hãy nghe lại một lần nữa nhé!
              </p>
              <button
                onClick={() => {
                  setSelected(null);
                  setIsCorrect(null);
                  speakFrench(quiz.audioText);
                }}
                className="mt-2 bg-[#D94A4A] text-white px-5 py-1.5 rounded-full font-extrabold text-xs shadow"
              >
                🔄 Thử lại câu này
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. KỸ NĂNG NÓI (PARLER)
// ==========================================
export const weekSpeakingPrompts = [
  {
    id: "s1",
    french: "lundi",
    phonetic: "/lœ̃.di/",
    vi: "Thứ Hai",
    tip: "Âm 'un' đọc như 'ăng' nhẹ trong tiếng Pháp, kết thúc là 'đi'.",
    emoji: "🌙",
  },
  {
    id: "s2",
    french: "vendredi",
    phonetic: "/vɑ̃.dʁə.di/",
    vi: "Thứ Sáu",
    tip: "Nhẹ nhàng phát âm 'văng - đrơ - đi'.",
    emoji: "💖",
  },
  {
    id: "s3",
    french: "Aujourd'hui, c'est samedi !",
    phonetic: "/o.ʒuʁ.dɥi sɛ sam.di/",
    vi: "Hôm nay là thứ Bảy!",
    tip: "Nói vui vẻ chào đón ngày nghỉ cuối tuần nhé!",
    emoji: "🪐",
  },
  {
    id: "s4",
    french: "Vive le week-end !",
    phonetic: "/viv lə wi.kɛnd/",
    vi: "Cuối tuần muôn năm! (Hoan hô cuối tuần!)",
    tip: "Câu reo vui cực kỳ phổ biến của học sinh Pháp!",
    emoji: "🎉",
  },
];

export function WeekSpeakingActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [completedList, setCompletedList] = useState<number[]>([]);
  const [hasPracticed, setHasPracticed] = useState(false);

  const current = weekSpeakingPrompts[index];

  const handleHearModel = () => {
    SoundFX.playChime();
    speakFrench(current.french);
    onSpeak(current.french);
  };

  const handleCompleteSpeaking = () => {
    SoundFX.playSuccess();
    setHasPracticed(true);
    if (!completedList.includes(index)) {
      const updated = [...completedList, index];
      setCompletedList(updated);
      if (updated.length === weekSpeakingPrompts.length && onComplete) {
        onComplete();
      }
    }
  };

  const handleNext = () => {
    if (index < weekSpeakingPrompts.length - 1) {
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
            Đã luyện: {completedList.length}/{weekSpeakingPrompts.length}
          </span>
        </div>
        <h3 className="text-2xl font-black text-[#4A3828]">
          Luyện phát âm to rõ cùng cô giáo
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
          💡 Mẹo phát âm: {current.tip}
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
              🎉 Très bien ! Giọng bé phát âm rất chuẩn và hay !
            </p>
            {index < weekSpeakingPrompts.length - 1 ? (
              <button
                onClick={handleNext}
                className="mt-3 bg-[#315A8D] text-white px-6 py-2 rounded-full font-black text-sm shadow transition"
              >
                Câu tiếp theo ➔
              </button>
            ) : (
              <p className="text-sm font-bold text-[#27AE60] mt-2">
                🏆 Bé là Bậc thầy Luyện nói Tiếng Pháp!
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
export const readingQuestions = [
  {
    q: "Quels jours forment le week-end ?",
    vi: "Hai ngày nào tạo nên ngày cuối tuần (le week-end)?",
    options: [
      { text: "Lundi et mardi", correct: false },
      { text: "Samedi et dimanche", correct: true },
      { text: "Jeudi et vendredi", correct: false },
    ],
  },
  {
    q: "Quel jour Léo commence-t-il la semaine d'école ?",
    vi: "Léo bắt đầu tuần học vào ngày thứ mấy?",
    options: [
      { text: "Lundi", correct: true },
      { text: "Mercredi", correct: false },
      { text: "Dimanche", correct: false },
    ],
  },
  {
    q: "Que fait Léo le week-end avec sa famille ?",
    vi: "Léo làm gì vào cuối tuần cùng gia đình?",
    options: [
      { text: "Il va à l'école", correct: false },
      { text: "Il fait du vélo au parc", correct: true },
      { text: "Il écrit dans son cahier", correct: false },
    ],
  },
];

export function WeekReadingActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);

  const fullText =
    "Bonjour ! Je m'appelle Léo. Du lundi au vendredi, je vais à l'école avec mes copains. Samedi et dimanche, c'est le week-end ! Je fais du vélo au parc avec ma famille.";

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    SoundFX.playPop();
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCheck = () => {
    setChecked(true);
    const allCorrect = readingQuestions.every(
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
          Mon carnet de la semaine (Nhật ký tuần lễ)
        </h3>
        <p className="text-sm text-[#806C58] mt-1">
          Bé hãy cùng đọc mẩu nhật ký nhỏ của bạn Léo và trả lời câu hỏi nhé!
        </p>
      </div>

      {/* Story Box */}
      <div className="my-6 bg-white rounded-3xl p-6 border-2 border-[#E9DDC8] shadow-sm">
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <span className="font-extrabold text-[#315A8D] text-sm">
            📝 Nhật ký của bé Léo
          </span>
          <button
            onClick={() => {
              SoundFX.playChime();
              speakFrench(fullText);
            }}
            className="text-xs bg-[#EEF4FA] text-[#315A8D] font-bold px-3 py-1.5 rounded-full hover:bg-[#315A8D] hover:text-white transition"
          >
            🔊 Nghe đọc toàn bài
          </button>
        </div>

        <div className="space-y-3 text-[#2D3436] text-base sm:text-lg leading-relaxed">
          <p className="font-bold">
            👋 "Bonjour ! Je m'appelle Léo."
          </p>
          <p className="bg-[#FFF8EA] p-3 rounded-2xl border border-[#E9DDC8]">
            🎒 <strong>Lundi, mardi, mercredi, jeudi, vendredi :</strong> Je vais à l'école avec mes copains. J'apprends à lire et à compter.
          </p>
          <p className="bg-[#EAF5EC] p-3 rounded-2xl border border-[#C8E6C9]">
            🎉 <strong>Samedi et dimanche :</strong> C'est le week-end ! L'école est fermée. Je fais du vélo au parc avec ma famille. Vive le week-end !
          </p>
        </div>
      </div>

      {/* Comprehension Questions */}
      <div className="space-y-6">
        {readingQuestions.map((q, qIdx) => {
          return (
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
          );
        })}
      </div>

      {/* Check Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleCheck}
          disabled={Object.keys(answers).length < readingQuestions.length}
          className="bg-[#C96A2B] hover:bg-[#A8551F] text-white px-8 py-3 rounded-full font-black text-base shadow-md transition disabled:opacity-40"
        >
          Kiểm tra câu trả lời ➔
        </button>

        {checked && (
          <div className="mt-4">
            {readingQuestions.every(
              (q, idx) => answers[idx] !== undefined && q.options[answers[idx]].correct
            ) ? (
              <p className="text-lg font-black text-[#2ECC71]">
                🎉 Bravo ! Bé đã hiểu hết nội dung bài đọc rồi !
              </p>
            ) : (
              <p className="text-sm font-bold text-[#E74C3C]">
                Có câu chưa đúng, bé đọc lại nhật ký và sửa lại nhé!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 5. KỸ NĂNG VIẾT (ÉCRIRE) - SẮP XẾP CHỮ & THỨ TỰ
// ==========================================
export const weekPuzzles = [
  {
    target: "LUNDI",
    hint: "Thứ Hai (🌙 Jour de la Lune)",
    letters: ["D", "L", "I", "U", "N"],
  },
  {
    target: "SAMEDI",
    hint: "Thứ Bảy - Ngày đầu tiên của week-end",
    letters: ["M", "S", "D", "A", "I", "E"],
  },
  {
    target: "DIMANCHE",
    hint: "Chủ Nhật - Ngày nghỉ cùng gia đình",
    letters: ["A", "H", "D", "C", "I", "E", "M", "N"],
  },
];

export function WeekWritingActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [completedPuzzles, setCompletedPuzzles] = useState<number[]>([]);

  const puzzle = weekPuzzles[puzzleIdx];
  const currentWord = selectedLetters.map((i) => puzzle.letters[i]).join("");
  const isCorrect = currentWord === puzzle.target;

  useEffect(() => {
    setSelectedLetters([]);
  }, [puzzleIdx]);

  const handleAddLetter = (idx: number) => {
    if (selectedLetters.includes(idx)) return;
    SoundFX.playPop();
    const next = [...selectedLetters, idx];
    setSelectedLetters(next);

    const testWord = next.map((i) => puzzle.letters[i]).join("");
    if (testWord === puzzle.target) {
      SoundFX.playSuccess();
      speakFrench(puzzle.target.toLowerCase());
      if (!completedPuzzles.includes(puzzleIdx)) {
        const updated = [...completedPuzzles, puzzleIdx];
        setCompletedPuzzles(updated);
        if (updated.length === weekPuzzles.length && onComplete) {
          onComplete();
        }
      }
    }
  };

  const handleRemove = () => {
    SoundFX.playPop();
    setSelectedLetters((prev) => prev.slice(0, -1));
  };

  const handleReset = () => {
    SoundFX.playPop();
    setSelectedLetters([]);
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-[#E9DDC8] bg-[#FFF8EA] p-6 sm:p-8 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#D94A4A] shadow-sm mb-3">
          <span>✍️ KỸ NĂNG VIẾT (ÉCRIRE)</span>
          <span className="bg-[#FFEAA7] text-[#D63031] px-2 py-0.5 rounded-full">
            {puzzleIdx + 1}/{weekPuzzles.length}
          </span>
        </div>
        <h3 className="text-2xl font-black text-[#4A3828]">
          Ghép các chữ cái thành từ đúng
        </h3>
        <p className="text-sm text-[#806C58] mt-1">
          💡 Gợi ý: {puzzle.hint}
        </p>
      </div>

      {/* Display Board */}
      <div className="my-6 min-h-[80px] bg-white rounded-3xl border-2 border-dashed border-[#C8BBA9] p-4 flex items-center justify-center gap-2 shadow-inner">
        {puzzle.target.split("").map((_, i) => {
          const char = selectedLetters[i] !== undefined ? puzzle.letters[selectedLetters[i]] : "";
          return (
            <div
              key={i}
              className={`w-12 h-14 rounded-2xl flex items-center justify-center text-2xl font-black border-2 ${
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

      {isCorrect && (
        <div className="mb-6 bg-[#EAF5EC] border-2 border-[#4F8A5B] p-4 rounded-2xl text-center animate-bounce">
          <p className="text-xl font-black text-[#35633F]">
            🎉 Bravo ! Con đã viết đúng từ "{puzzle.target}" !
          </p>
          {puzzleIdx < weekPuzzles.length - 1 ? (
            <button
              onClick={() => setPuzzleIdx((i) => i + 1)}
              className="mt-3 bg-[#2ECC71] hover:bg-[#27AE60] text-white px-6 py-2 rounded-full font-black text-sm shadow transition"
            >
              Từ tiếp theo ➔
            </button>
          ) : (
            <p className="text-sm font-bold text-[#27AE60] mt-2">
              ⭐ Bé đã hoàn thành xuất sắc tất cả các từ!
            </p>
          )}
        </div>
      )}

      {/* Shuffled Letters */}
      <div className="flex flex-wrap justify-center gap-3">
        {puzzle.letters.map((char, idx) => {
          const isUsed = selectedLetters.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleAddLetter(idx)}
              disabled={isUsed || isCorrect}
              className={`w-14 h-14 rounded-2xl text-2xl font-black border-2 transition transform active:scale-95 ${
                isUsed
                  ? "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed"
                  : "bg-white text-[#2D3436] border-[#E9DDC8] hover:border-[#315A8D] shadow-sm hover:-translate-y-1"
              }`}
            >
              {char}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={handleRemove}
          disabled={selectedLetters.length === 0 || isCorrect}
          className="bg-white border border-[#E9DDC8] px-5 py-2 rounded-full font-bold text-sm text-[#806C58] hover:bg-gray-50 disabled:opacity-40"
        >
          ⌫ Xóa chữ cuối
        </button>
        <button
          onClick={handleReset}
          disabled={selectedLetters.length === 0 || isCorrect}
          className="bg-white border border-[#E9DDC8] px-5 py-2 rounded-full font-bold text-sm text-[#806C58] hover:bg-gray-50 disabled:opacity-40"
        >
          🔄 Xếp lại từ đầu
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 6. THỬ THÁCH SẮP XẾP THỨ TỰ 7 NGÀY
// ==========================================
export function WeekOrderActivity({
  onSpeak,
  onComplete,
}: {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
}) {
  const correctOrder = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
  const [placed, setPlaced] = useState<string[]>([]);
  const [available, setAvailable] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);
    setAvailable(shuffled);
    setPlaced([]);
    setSuccess(false);
  }, []);

  const handlePlace = (day: string) => {
    SoundFX.playPop();
    const nextPlaced = [...placed, day];
    const nextAvail = available.filter((d) => d !== day);
    setPlaced(nextPlaced);
    setAvailable(nextAvail);

    speakFrench(day);

    if (nextPlaced.length === 7) {
      const isCorrect = nextPlaced.every((d, i) => d === correctOrder[i]);
      if (isCorrect) {
        setSuccess(true);
        SoundFX.playSuccess();
        if (onComplete) onComplete();
      } else {
        SoundFX.playTick();
      }
    }
  };

  const handleReset = () => {
    SoundFX.playPop();
    const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);
    setAvailable(shuffled);
    setPlaced([]);
    setSuccess(false);
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-[#E9DDC8] bg-[#FFF8EA] p-6 sm:p-8 shadow-sm">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-black text-[#315A8D] shadow-sm mb-3">
          <span>🏆 SIÊU THỬ THÁCH THỨ TỰ 7 NGÀY</span>
        </div>
        <h3 className="text-2xl font-black text-[#4A3828]">
          Sắp xếp 7 ngày từ Thứ Hai đến Chủ Nhật
        </h3>
        <p className="text-sm text-[#806C58] mt-1">
          Chạm vào các ngày theo đúng thứ tự thời gian trong tuần nhé!
        </p>
      </div>

      {/* Placed Row */}
      <div className="my-6 min-h-[90px] bg-white rounded-3xl border-2 border-dashed border-[#C8BBA9] p-4 flex flex-wrap items-center justify-center gap-2">
        {placed.length === 0 ? (
          <p className="text-gray-400 font-bold text-sm italic">
            👉 Chạm vào từng thứ bên dưới theo thứ tự: lundi ➔ mardi...
          </p>
        ) : (
          placed.map((day, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-[#EEF4FA] border-2 border-[#315A8D] text-[#315A8D] px-4 py-2 rounded-2xl font-black text-sm capitalize shadow-sm"
            >
              <span className="bg-[#315A8D] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                {idx + 1}
              </span>
              <span>{day}</span>
            </div>
          ))
        )}
      </div>

      {success && (
        <div className="mb-6 bg-[#EAF5EC] border-2 border-[#4F8A5B] p-4 rounded-2xl text-center animate-bounce">
          <p className="text-xl font-black text-[#35633F]">
            🎉 Félicitations ! Con là Quán quân về các ngày trong tuần !
          </p>
          <p className="text-sm font-bold text-[#27AE60] mt-1">
            Lundi ➔ Mardi ➔ Mercredi ➔ Jeudi ➔ Vendredi ➔ Samedi ➔ Dimanche
          </p>
        </div>
      )}

      {placed.length === 7 && !success && (
        <div className="mb-6 bg-[#FFF0F0] border-2 border-[#D94A4A] p-4 rounded-2xl text-center">
          <p className="text-base font-black text-[#B63838]">
            Thứ tự chưa đúng rồi 🔄 Hãy bấm làm lại nhé!
          </p>
          <button
            onClick={handleReset}
            className="mt-2 bg-[#D94A4A] text-white px-5 py-1.5 rounded-full font-bold text-xs"
          >
            Làm lại từ đầu
          </button>
        </div>
      )}

      {/* Available Days */}
      <div className="flex flex-wrap justify-center gap-2">
        {available.map((day) => (
          <button
            key={day}
            onClick={() => handlePlace(day)}
            className="bg-white hover:bg-[#FFF8EA] text-[#4A3828] border-2 border-[#E9DDC8] hover:border-[#315A8D] px-5 py-3 rounded-2xl font-black text-base capitalize shadow-sm transition transform hover:-translate-y-1 active:scale-95"
          >
            {day}
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleReset}
          className="text-xs bg-white border border-[#E9DDC8] text-[#806C58] px-4 py-2 rounded-full font-bold hover:bg-gray-50"
        >
          🔄 Xếp lại
        </button>
      </div>
    </div>
  );
}
