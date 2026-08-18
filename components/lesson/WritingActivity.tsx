"use client";

import { useState } from "react";

type WritingActivityProps = {
  answer: string;
  letters: string[];
  question?: string;
  hint?: string;
};

export default function WritingActivity({
  answer,
  letters,
  question = "Xếp các chữ cái thành từ đúng",
  hint,
}: WritingActivityProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const currentAnswer = selected
    .map((index) => letters[index])
    .join("");

  const correct =
    currentAnswer.toLowerCase() === answer.toLowerCase();

  const completed = selected.length === answer.length;

  function addLetter(index: number) {
    if (completed || selected.includes(index)) return;

    setSelected((current) => [...current, index]);
  }

  function removeLastLetter() {
    setSelected((current) => current.slice(0, -1));
  }

  function reset() {
    setSelected([]);
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#E9DDC8] bg-[#FFF8EA] shadow-sm">
      {/* Header */}
      <div className="px-6 pt-7 text-center sm:px-8">
        <div className="mx-auto flex h-10 w-fit items-center rounded-full bg-white px-4 text-xs font-black tracking-[0.16em] text-[#D94A4A] shadow-sm">
          ✍️ LUYỆN VIẾT
        </div>

        <h3 className="mt-4 text-xl font-black text-[#4A3828]">
          {question}
        </h3>

        {hint && (
          <p className="mt-2 text-sm text-[#806C58]">
            💡 {hint}
          </p>
        )}
      </div>

      {/* Answer area */}
      <div className="px-6 py-7 sm:px-8">
        <div className="flex min-h-[76px] items-center justify-center rounded-3xl bg-white px-5 shadow-sm">
          {currentAnswer ? (
            <p className="text-3xl font-black tracking-[0.2em] text-[#315A8D]">
              {selected.map((index) => letters[index]).join(" ")}
            </p>
          ) : (
            <p className="text-2xl font-black tracking-widest text-[#C8BBA9]">
              {Array.from({ length: answer.length })
                .map(() => "＿")
                .join(" ")}
            </p>
          )}
        </div>

        {/* Result */}
        {correct && (
          <div className="mt-4 rounded-2xl bg-[#EAF5EC] p-4 text-center">
            <p className="font-black text-[#35633F]">
              🎉 Bravo ! Chính xác !
            </p>

            <p className="mt-1 text-sm text-[#4F7357]">
              {answer}
            </p>
          </div>
        )}

        {completed && !correct && (
          <div className="mt-4 rounded-2xl bg-[#FFF0F0] p-4 text-center">
            <p className="font-black text-[#B63838]">
              Encore une fois! 🔄
            </p>

            <p className="mt-1 text-sm text-[#B63838]">
              Thứ tự chữ chưa đúng. Hãy thử lại nhé.
            </p>
          </div>
        )}
      </div>

      {/* Letters */}
      <div className="px-6 pb-6 sm:px-8">
        <div className="flex flex-wrap justify-center gap-3">
          {letters.map((letter, index) => {
            const used = selected.includes(index);

            return (
              <button
                key={`${letter}-${index}`}
                type="button"
                onClick={() => addLetter(index)}
                disabled={used || completed}
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-black shadow-sm transition-all ${
                  used
                    ? "cursor-not-allowed bg-[#E9DDC8] text-[#B5A592] opacity-60"
                    : "bg-white text-[#315A8D] hover:-translate-y-1 hover:shadow-md active:translate-y-0"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 border-t border-[#E9DDC8] bg-white/50 px-6 py-5">
        <button
          type="button"
          onClick={removeLastLetter}
          disabled={selected.length === 0}
          className="rounded-full border border-[#E9DDC8] bg-white px-5 py-2.5 text-sm font-extrabold text-[#806C58] transition hover:bg-[#FFF8EA] disabled:cursor-not-allowed disabled:opacity-40"
        >
          ⌫ Xóa
        </button>

        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[#315A8D] px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#274B77] active:translate-y-0"
        >
          🔄 Làm lại
        </button>
      </div>
    </div>
  );
}