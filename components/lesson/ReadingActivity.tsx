"use client";

import { useState } from "react";

type ReadingActivityProps = {
  prompt?: string;
  question?: string;
  options: string[];
  answer: string;
};

export default function ReadingActivity({
  prompt = "👋",
  question = "Câu nào bạn vừa đọc?",
  options,
  answer,
}: ReadingActivityProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const hasAnswered = selected !== null;
  const isCorrect = selected === answer;

  function selectAnswer(option: string) {
    setSelected(option);
  }

  function retry() {
    setSelected(null);
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#E9DDC8] bg-white shadow-sm">
      {/* Header */}
      <div className="px-6 pt-7 text-center sm:px-8">
        <div className="mx-auto flex h-10 w-fit items-center rounded-full bg-[#FFF8EA] px-4 text-xs font-black tracking-[0.16em] text-[#315A8D]">
          📖 ĐỌC VÀ CHỌN
        </div>

        <h3 className="mt-4 text-xl font-black text-[#4A3828]">
          {question}
        </h3>

        <p className="mt-2 text-sm text-[#806C58]">
          Đọc kỹ rồi chọn câu đúng nhé.
        </p>
      </div>

      {/* Prompt */}
      <div className="flex flex-col items-center px-6 py-7">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[#EEF4FA] text-5xl shadow-sm">
          {prompt}
        </div>
      </div>

      {/* Answers */}
      <div className="space-y-3 px-6 pb-6 sm:px-8">
        {options.map((option, index) => {
          const isSelected = selected === option;
          const isCorrectOption = hasAnswered && option === answer;
          const isWrongOption =
            hasAnswered && isSelected && option !== answer;

          let stateClass =
            "border-[#E9DDC8] bg-white text-[#4A3828] hover:border-[#315A8D] hover:-translate-y-0.5";

          if (isCorrectOption) {
            stateClass =
              "border-[#4F8A5B] bg-[#EAF5EC] text-[#35633F]";
          } else if (isWrongOption) {
            stateClass =
              "border-[#D94A4A] bg-[#FFF0F0] text-[#B63838]";
          }

          return (
            <button
              key={`${option}-${index}`}
              type="button"
              onClick={() => selectAnswer(option)}
              className={`w-full rounded-2xl border-2 px-5 py-4 text-left font-extrabold shadow-sm transition-all duration-200 ${stateClass}`}
            >
              <span className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F5EFE5] text-xs font-black text-[#806C58]">
                    {index + 1}
                  </span>

                  <span>{option}</span>
                </span>

                {isCorrectOption && (
                  <span className="text-xl text-[#4F8A5B]">✓</span>
                )}

                {isWrongOption && (
                  <span className="text-xl text-[#D94A4A]">✕</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {hasAnswered && (
        <div className="border-t border-[#E9DDC8] bg-[#FFFDF8] px-6 py-5 sm:px-8">
          <div
            className={`rounded-2xl p-4 text-center ${
              isCorrect
                ? "bg-[#EAF5EC] text-[#35633F]"
                : "bg-[#FFF0F0] text-[#B63838]"
            }`}
          >
            <p className="font-black">
              {isCorrect
                ? "🎉 Bravo ! Chính xác!"
                : "Encore une fois! 📖"}
            </p>

            {!isCorrect && (
              <p className="mt-1 text-sm font-medium">
                Đọc lại và thử chọn một lần nữa nhé.
              </p>
            )}
          </div>

          {!isCorrect && (
            <button
              type="button"
              onClick={retry}
              className="mx-auto mt-4 block rounded-full bg-[#315A8D] px-6 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#274B77] active:translate-y-0"
            >
              🔄 Thử lại
            </button>
          )}
        </div>
      )}
    </div>
  );
}