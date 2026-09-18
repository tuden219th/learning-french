"use client";

import { useState, useEffect, useMemo } from "react";

export type ScrambleWordItem = {
  id: string;
  word: string; // French word in uppercase without accent for spelling, e.g. "CHAT", "POMME"
  displayWord?: string; // Display format with accents if needed, e.g. "gâteau"
  meaning: string; // Vietnamese meaning, e.g. "con mèo"
  emoji: string; // Visual clue
  audioFile: string; // MP3 file in /audio/fr/
  hint?: string; // Optional hint
  jumbledLetters?: string[]; // Custom scrambled order, or auto-generated
};

type ActivityProps = {
  onSpeak: (text?: string, audioFile?: string) => void;
  onComplete?: () => void;
};

// Preset lists for themed scramble stages
export const animalScrambleWords: readonly ScrambleWordItem[] = [
  {
    id: "chat",
    word: "CHAT",
    displayWord: "chat",
    meaning: "con mèo",
    emoji: "🐱",
    audioFile: "chat.mp3",
    hint: "Bắt đầu bằng chữ C. Tiếng kêu: miaou !",
    jumbledLetters: ["A", "T", "C", "H"],
  },
  {
    id: "chien",
    word: "CHIEN",
    displayWord: "chien",
    meaning: "con chó",
    emoji: "🐶",
    audioFile: "chien.mp3",
    hint: "Từ có 5 chữ cái, bắt đầu bằng C-H.",
    jumbledLetters: ["I", "E", "N", "C", "H"],
  },
  {
    id: "lion",
    word: "LION",
    displayWord: "lion",
    meaning: "con sư tử",
    emoji: "🦁",
    audioFile: "lion.mp3",
    hint: "Vua của muôn loài, có 4 chữ cái.",
    jumbledLetters: ["N", "O", "I", "L"],
  },
];

export const foodScrambleWords: readonly ScrambleWordItem[] = [
  {
    id: "pain",
    word: "PAIN",
    displayWord: "pain",
    meaning: "bánh mì",
    emoji: "🥖",
    audioFile: "pain.mp3",
    hint: "Món ăn sáng nổi tiếng của nước Pháp.",
    jumbledLetters: ["I", "N", "P", "A"],
  },
  {
    id: "lait",
    word: "LAIT",
    displayWord: "lait",
    meaning: "sữa",
    emoji: "🥛",
    audioFile: "lait.mp3",
    hint: "Đồ uống màu trắng bổ dưỡng.",
    jumbledLetters: ["T", "A", "L", "I"],
  },
  {
    id: "pomme",
    word: "POMME",
    displayWord: "pomme",
    meaning: "quả táo",
    emoji: "🍎",
    audioFile: "pomme.mp3",
    hint: "Quả màu đỏ hoặc xanh, có 5 chữ cái với 2 chữ M.",
    jumbledLetters: ["M", "P", "E", "O", "M"],
  },
];

export const audioMysteryScrambleWords: readonly ScrambleWordItem[] = [
  {
    id: "bleu",
    word: "BLEU",
    displayWord: "bleu",
    meaning: "màu xanh dương",
    emoji: "🔵",
    audioFile: "bleu.mp3",
    hint: "Màu của bầu trời và biển cả.",
    jumbledLetters: ["E", "U", "B", "L"],
  },
  {
    id: "vert",
    word: "VERT",
    displayWord: "vert",
    meaning: "màu xanh lá",
    emoji: "🟢",
    audioFile: "vert.mp3",
    hint: "Màu của cây cỏ và thiên nhiên.",
    jumbledLetters: ["T", "R", "V", "E"],
  },
  {
    id: "livre",
    word: "LIVRE",
    displayWord: "livre",
    meaning: "cuốn sách",
    emoji: "📚",
    audioFile: "livre.mp3",
    hint: "Vật dụng dùng để đọc trong lớp học.",
    jumbledLetters: ["R", "E", "L", "V", "I"],
  },
];

export const superChallengeScrambleWords: readonly ScrambleWordItem[] = [
  {
    id: "lapin",
    word: "LAPIN",
    displayWord: "lapin",
    meaning: "con thỏ",
    emoji: "🐰",
    audioFile: "lapin.mp3",
    hint: "Bạn nhỏ tai dài rất thích ăn cà rốt.",
    jumbledLetters: ["P", "N", "L", "I", "A"],
  },
  {
    id: "fraise",
    word: "FRAISE",
    displayWord: "fraise",
    meaning: "quả dâu tây",
    emoji: "🍓",
    audioFile: "fraise.mp3",
    hint: "Quả dâu đỏ mọng ngọt ngào (6 chữ cái).",
    jumbledLetters: ["S", "I", "A", "F", "E", "R"],
  },
  {
    id: "banane",
    word: "BANANE",
    displayWord: "banane",
    meaning: "quả chuối",
    emoji: "🍌",
    audioFile: "banane.mp3",
    hint: "Trái cây màu vàng cong cong (6 chữ cái).",
    jumbledLetters: ["N", "E", "B", "A", "N", "A"],
  },
];

// Helper to shuffle letters deterministically if not given
function shuffleLetters(word: string): string[] {
  const letters = word.toUpperCase().split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = (i * 7 + 3) % (i + 1);
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  // Ensure it doesn't accidentally equal the original word
  if (letters.join("") === word.toUpperCase() && letters.length > 1) {
    [letters[0], letters[1]] = [letters[1], letters[0]];
  }
  return letters;
}

export function ScrambleHeader({
  icon,
  title,
  instruction,
}: {
  icon: string;
  title: string;
  instruction: string;
}) {
  return (
    <div className="mb-6 text-center">
      <div className="text-5xl sm:text-6xl">{icon}</div>
      <h2 className="mt-3 text-2xl font-black text-[#294A3A] sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 text-sm font-semibold text-[#806C58] sm:text-base">
        {instruction}
      </p>
    </div>
  );
}

// 1. Intro Step
export function ScrambleIntro({ onSpeak, onComplete }: ActivityProps) {
  return (
    <div>
      <ScrambleHeader
        icon="🔤"
        title="Le jeu des lettres"
        instruction="Trò chơi ghép chữ kỳ diệu cùng tiếng Pháp!"
      />

      <div className="overflow-hidden rounded-3xl border border-[#E9DDC8] bg-[#FFF8EA] p-6 text-center sm:p-8">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-[#315A8D] text-5xl shadow-md ring-4 ring-[#E7EEF7]">
          ✨
        </div>

        <h3 className="mt-5 text-2xl font-black text-[#315A8D]">
          Chào mừng thám tử chữ cái!
        </h3>

        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#4A3828]">
          Các chữ cái tiếng Pháp đang bị gió thổi bay lộn xộn khắp nơi. Nhiệm
          vụ của con là:
        </p>

        <div className="mt-6 grid gap-4 text-left sm:grid-cols-2">
          <div className="rounded-2xl border border-[#E9DDC8] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🖼️</span>
              <div>
                <p className="font-black text-[#294A3A]">Nhìn hình & Nghe</p>
                <p className="text-xs text-[#806C58]">
                  Quan sát hình ảnh gợi ý hoặc bấm loa để nghe âm thanh từ vựng.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E9DDC8] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧩</span>
              <div>
                <p className="font-black text-[#C96A2B]">Xếp lại từ đúng</p>
                <p className="text-xs text-[#806C58]">
                  Chạm vào các ô chữ cái theo đúng thứ tự để tạo thành từ hoàn
                  chỉnh.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => {
              onSpeak("bravo", "bravo.mp3");
              onComplete?.();
            }}
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#D94A4A] px-8 py-4 text-lg font-black text-white shadow-md transition hover:scale-[1.02] hover:bg-[#c33d3d]"
          >
            <span>Bắt đầu thử thách</span>
            <span className="text-xl">🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// 2. Interactive Single Word Scramble Play Round
export function SingleWordScramble({
  item,
  isAudioMystery = false,
  onSpeak,
  onSolved,
}: {
  item: ScrambleWordItem;
  isAudioMystery?: boolean;
  onSpeak: (text?: string, audioFile?: string) => void;
  onSolved: () => void;
}) {
  const targetLetters = useMemo(
    () => item.word.toUpperCase().split(""),
    [item.word]
  );

  // Pool of available tiles with unique IDs
  const initialPool = useMemo(() => {
    const raw = item.jumbledLetters ?? shuffleLetters(item.word);
    return raw.map((char, index) => ({
      id: `${item.id}-${index}-${char}`,
      char: char.toUpperCase(),
      originalIndex: index,
    }));
  }, [item]);

  const [placedTiles, setPlacedTiles] = useState<
    Array<{ id: string; char: string } | null>
  >(() => Array(targetLetters.length).fill(null));

  const [usedTileIds, setUsedTileIds] = useState<Set<string>>(new Set());
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Reset when item changes
  useEffect(() => {
    setPlacedTiles(Array(targetLetters.length).fill(null));
    setUsedTileIds(new Set());
    setIsSuccess(false);
    setIsError(false);
    setShowHint(false);

    // Auto-play audio when question opens
    onSpeak(item.displayWord ?? item.word.toLowerCase(), item.audioFile);
  }, [item, targetLetters.length]);

  // Handle clicking a letter in the pool -> place in first empty slot
  function handlePickLetter(tile: { id: string; char: string }) {
    if (usedTileIds.has(tile.id) || isSuccess) return;

    const firstEmptyIndex = placedTiles.findIndex((slot) => slot === null);
    if (firstEmptyIndex === -1) return;

    const nextSlots = [...placedTiles];
    nextSlots[firstEmptyIndex] = tile;
    setPlacedTiles(nextSlots);

    const nextUsed = new Set(usedTileIds);
    nextUsed.add(tile.id);
    setUsedTileIds(nextUsed);
    setIsError(false);

    // Check if full
    if (nextSlots.every((slot) => slot !== null)) {
      const spelled = nextSlots.map((s) => s?.char).join("");
      if (spelled === item.word.toUpperCase()) {
        setIsSuccess(true);
        setIsError(false);
        onSpeak(item.displayWord ?? item.word.toLowerCase(), item.audioFile);
        onSolved();
      } else {
        setIsError(true);
      }
    }
  }

  // Handle tapping a placed letter -> remove it back to pool
  function handleRemoveSlot(slotIndex: number) {
    if (isSuccess) return;
    const tile = placedTiles[slotIndex];
    if (!tile) return;

    const nextSlots = [...placedTiles];
    nextSlots[slotIndex] = null;
    setPlacedTiles(nextSlots);

    const nextUsed = new Set(usedTileIds);
    nextUsed.delete(tile.id);
    setUsedTileIds(nextUsed);
    setIsError(false);
  }

  // Clear all
  function handleReset() {
    if (isSuccess) return;
    setPlacedTiles(Array(targetLetters.length).fill(null));
    setUsedTileIds(new Set());
    setIsError(false);
  }

  return (
    <div className="rounded-3xl border border-[#E9DDC8] bg-white p-6 shadow-sm sm:p-8">
      {/* Visual / Audio Cue */}
      <div className="text-center">
        <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-[#EEF4FA] text-7xl shadow-inner ring-4 ring-[#E7EEF7]">
          {isAudioMystery && !isSuccess ? (
            <span className="animate-pulse text-6xl">❓</span>
          ) : (
            <span>{item.emoji}</span>
          )}
        </div>

        {/* Listen Audio Button */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() =>
              onSpeak(item.displayWord ?? item.word.toLowerCase(), item.audioFile)
            }
            className="group inline-flex items-center gap-2 rounded-2xl bg-[#315A8D] px-5 py-3 font-extrabold text-white shadow-sm transition hover:scale-105 hover:bg-[#254770]"
          >
            <span className="text-xl">🔊</span>
            <span>
              {isAudioMystery && !isSuccess ? "Nghe âm thanh bí ẩn" : "Nghe phát âm"}
            </span>
          </button>

          {item.hint && (
            <button
              type="button"
              onClick={() => setShowHint((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-[#E9DDC8] bg-[#FFF8EA] px-4 py-3 text-sm font-bold text-[#806C58] transition hover:bg-[#faebd1]"
            >
              <span>💡 Gợi ý</span>
            </button>
          )}
        </div>

        {/* Hint text if toggled */}
        {showHint && item.hint && (
          <p className="mt-3 text-sm font-semibold text-[#C96A2B]">
            {item.hint}
          </p>
        )}

        {/* Meaning translation */}
        <p className="mt-2 text-base font-medium text-[#806C58]">
          Nghĩa: <strong className="text-[#294A3A]">{item.meaning}</strong>
        </p>
      </div>

      {/* Answer Slots (Ô kết quả) */}
      <div className="mt-8">
        <p className="mb-2 text-center text-xs font-black uppercase tracking-wider text-[#806C58]">
          Từ bạn đang ghép:
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {placedTiles.map((tile, index) => {
            const isFilled = tile !== null;
            return (
              <button
                key={`slot-${index}`}
                type="button"
                onClick={() => handleRemoveSlot(index)}
                disabled={!isFilled || isSuccess}
                className={`flex h-14 w-12 sm:h-16 sm:w-14 items-center justify-center rounded-2xl text-2xl sm:text-3xl font-black transition-all ${
                  isSuccess
                    ? "border-2 border-[#4F8A5B] bg-[#EAF5EC] text-[#2D6A4F] shadow-sm scale-105"
                    : isError
                      ? "border-2 border-[#D94A4A] bg-[#FFF0F0] text-[#D94A4A]"
                      : isFilled
                        ? "border-2 border-[#315A8D] bg-[#EEF4FA] text-[#315A8D] shadow-sm hover:scale-95 cursor-pointer"
                        : "border-2 border-dashed border-[#D8CDBB] bg-[#FAFAFA] text-transparent"
                }`}
                title={isFilled ? "Chạm để gỡ chữ này" : "Ô trống"}
              >
                {tile ? tile.char : ""}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback message */}
      <div className="mt-4 min-h-[32px] text-center">
        {isSuccess ? (
          <div className="space-y-1">
            <p className="text-xl font-black text-[#2D6A4F]">
              🎉 Bravo ! Chính xác: {item.word} ({item.meaning})
            </p>
            <p className="text-xs font-semibold text-[#806C58]">
              Xuất sắc! Con đã giải mã thành công từ này.
            </p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center gap-2">
            <p className="text-sm font-bold text-[#D94A4A]">
              ❌ Chưa đúng thứ tự rồi. Hãy chạm vào chữ để đổi lại hoặc bấm Làm lại nhé!
            </p>
          </div>
        ) : (
          <p className="text-xs text-[#806C58]">
            Chạm vào các chữ cái bên dưới theo đúng thứ tự
          </p>
        )}
      </div>

      {/* Jumbled Letter Tiles Pool */}
      <div className="mt-6 border-t border-[#E9DDC8] pt-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-wider text-[#806C58]">
            Các chữ cái:
          </p>

          {!isSuccess && usedTileIds.size > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-extrabold text-[#D94A4A] hover:underline"
            >
              🔄 Xếp lại từ đầu
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {initialPool.map((tile) => {
            const isUsed = usedTileIds.has(tile.id);
            return (
              <button
                key={tile.id}
                type="button"
                onClick={() => handlePickLetter(tile)}
                disabled={isUsed || isSuccess}
                className={`flex h-14 w-12 sm:h-16 sm:w-14 items-center justify-center rounded-2xl text-2xl sm:text-3xl font-black shadow-sm transition-all active:scale-95 ${
                  isUsed
                    ? "cursor-not-allowed border border-dashed border-gray-300 bg-gray-100 text-gray-300 opacity-40"
                    : "border-2 border-[#E9DDC8] bg-[#FFF8EA] text-[#4A3828] hover:-translate-y-1 hover:border-[#C96A2B] hover:bg-[#FFEECB]"
                }`}
              >
                {tile.char}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 3. Multi-word Stage Component with Progress & Auto Next
export function MultiWordScrambleStage({
  title,
  instruction,
  words,
  isAudioMystery = false,
  onSpeak,
  onComplete,
}: ActivityProps & {
  title: string;
  instruction: string;
  words: readonly ScrambleWordItem[];
  isAudioMystery?: boolean;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const currentItem = words[currentIndex];
  const isCurrentSolved = completedIds.has(currentItem.id);
  const isAllSolved = words.every((w) => completedIds.has(w.id));

  function handleWordSolved() {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.add(currentItem.id);
      if (words.every((w) => next.has(w.id))) {
        onComplete?.();
      }
      return next;
    });
  }

  function handleNextWord() {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handlePrevWord() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  return (
    <div>
      <ScrambleHeader
        icon={isAudioMystery ? "🎧" : "🧩"}
        title={title}
        instruction={instruction}
      />

      {/* Stage Progress Indicator */}
      <div className="mb-5 flex items-center justify-center gap-2">
        {words.map((w, i) => {
          const isSolved = completedIds.has(w.id);
          const isCurrent = i === currentIndex;
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold transition ${
                isCurrent
                  ? "bg-[#315A8D] text-white ring-2 ring-[#E7EEF7]"
                  : isSolved
                    ? "bg-[#EAF5EC] text-[#2D6A4F]"
                    : "bg-[#EEF4FA] text-[#806C58]"
              }`}
            >
              <span>{isSolved ? "✓" : `${i + 1}`}</span>
              <span className="hidden sm:inline">{w.word}</span>
            </button>
          );
        })}
      </div>

      {/* Main scramble tile puzzle */}
      <SingleWordScramble
        key={currentItem.id}
        item={currentItem}
        isAudioMystery={isAudioMystery}
        onSpeak={onSpeak}
        onSolved={handleWordSolved}
      />

      {/* Navigation Controls between words in this stage */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePrevWord}
          disabled={currentIndex === 0}
          className="rounded-2xl border border-[#E9DDC8] bg-white px-4 py-2.5 text-sm font-bold text-[#806C58] transition disabled:opacity-40"
        >
          ← Từ trước
        </button>

        {isCurrentSolved && currentIndex < words.length - 1 && (
          <button
            type="button"
            onClick={handleNextWord}
            className="animate-bounce rounded-2xl bg-[#D94A4A] px-6 py-2.5 text-sm font-black text-white shadow-md transition hover:bg-[#c33d3d]"
          >
            Từ tiếp theo ({currentIndex + 2}/{words.length}) →
          </button>
        )}

        {isAllSolved && (
          <span className="text-sm font-black text-[#2D6A4F]">
            🌟 Đã hoàn thành cả {words.length} từ!
          </span>
        )}
      </div>
    </div>
  );
}

// 4. Animal Word Scramble Stage
export function AnimalScrambleActivity({ onSpeak, onComplete }: ActivityProps) {
  return (
    <MultiWordScrambleStage
      title="Khám phá thế giới động vật"
      instruction="🐱 Nhìn hình ảnh và nghe âm thanh để xếp các từ: CHAT, CHIEN, LION."
      words={animalScrambleWords}
      onSpeak={onSpeak}
      onComplete={onComplete}
    />
  );
}

// 5. Food Scramble Stage
export function FoodScrambleActivity({ onSpeak, onComplete }: ActivityProps) {
  return (
    <MultiWordScrambleStage
      title="Bữa tiệc ẩm thực Pháp"
      instruction="🥖 Sắp xếp các chữ cái để khám phá: PAIN, LAIT, POMME."
      words={foodScrambleWords}
      onSpeak={onSpeak}
      onComplete={onComplete}
    />
  );
}

// 6. Audio Mystery Scramble Stage (Listen and Unscramble without initial picture!)
export function AudioMysteryScrambleActivity({ onSpeak, onComplete }: ActivityProps) {
  return (
    <MultiWordScrambleStage
      title="Thử thách đôi tai — Âm thanh bí ẩn"
      instruction="🎧 Hình ảnh đang bị giấu kín! Hãy bấm loa để nghe từ rồi ghép các chữ cái."
      words={audioMysteryScrambleWords}
      isAudioMystery={true}
      onSpeak={onSpeak}
      onComplete={onComplete}
    />
  );
}

// 7. Super Challenge Scramble Stage (Longer words)
export function SuperChallengeScrambleActivity({ onSpeak, onComplete }: ActivityProps) {
  return (
    <MultiWordScrambleStage
      title="Super Défi — Thám tử chữ cái siêu đẳng"
      instruction="🏆 Thử thách với các từ dài hơn: LAPIN (5 chữ), FRAISE (6 chữ), BANANE (6 chữ)!"
      words={superChallengeScrambleWords}
      onSpeak={onSpeak}
      onComplete={onComplete}
    />
  );
}
