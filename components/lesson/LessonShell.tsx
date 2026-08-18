"use client";

import { useState } from "react";

type LessonStep = {
  type: "intro" | "choice" | "listen" | "dialogue" | "complete";
  title?: string;
  text?: string;
  translation?: string;
  audio?: string;
  options?: readonly {
    text: string;
    correct?: boolean;
  }[];
};

type Lesson = {
  title: string;
  subtitle: string;
  emoji: string;
  steps: readonly LessonStep[];
};

export default function LessonShell({ lesson }: { lesson: Lesson }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const step = lesson.steps[stepIndex];
  const progress = ((stepIndex + 1) / lesson.steps.length) * 100;

  function next() {
    setSelected(null);

    if (stepIndex < lesson.steps.length - 1) {
      setStepIndex((value) => value + 1);
    } else {
      setFinished(true);
    }
  }

  function playAudio(text?: string) {
    if (!text || typeof window === "undefined") return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 0.82;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  if (finished) {
    return (
      <main className="min-h-screen bg-[#FFF8EF] px-4 py-8">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="text-6xl">🎉</div>

          <h1 className="mt-4 text-3xl font-bold text-[#294A3A]">
            Bravo !
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Tu as terminé la leçon !
          </p>

          <button
            onClick={() => {
              setStepIndex(0);
              setFinished(false);
            }}
            className="mt-8 rounded-2xl bg-[#C96A2B] px-6 py-3 font-bold text-white"
          >
            Recommencer
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8EF] px-4 py-6">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-500">
              Leçon {stepIndex + 1}/{lesson.steps.length}
            </span>

            <span className="text-2xl">
              {lesson.emoji}
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#C96A2B] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Lesson card */}
        <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">

          {step.type === "intro" && (
            <div className="text-center">
              <div className="text-7xl">
                {lesson.emoji}
              </div>

              <h1 className="mt-5 text-3xl font-bold text-[#294A3A]">
                {step.title}
              </h1>

              {step.text && (
                <p className="mt-5 text-2xl font-semibold text-gray-800">
                  {step.text}
                </p>
              )}

              {step.translation && (
                <p className="mt-3 text-gray-500">
                  {step.translation}
                </p>
              )}

              <button
                onClick={() => playAudio(step.text)}
                className="mt-7 rounded-2xl bg-[#294A3A] px-6 py-3 font-bold text-white"
              >
                🔊 Écouter
              </button>
            </div>
          )}

          {step.type === "listen" && (
            <div className="text-center">
              <div className="text-6xl">👂</div>

              <h2 className="mt-5 text-2xl font-bold text-[#294A3A]">
                Écoute !
              </h2>

              <button
                onClick={() => playAudio(step.audio)}
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#C96A2B] px-6 py-5 text-xl font-bold text-white"
              >
                🔊 Écouter
              </button>

              <p className="mt-6 text-sm text-gray-400">
                Écoute encore une fois si tu veux.
              </p>
            </div>
          )}

          {step.type === "choice" && (
            <div>
              <div className="text-center">
                <div className="text-6xl">👂</div>

                <h2 className="mt-4 text-2xl font-bold text-[#294A3A]">
                  Écoute et choisis !
                </h2>

                <button
                  onClick={() => playAudio(step.audio)}
                  className="mt-5 rounded-full bg-gray-100 px-6 py-3 font-bold"
                >
                  🔊 Réécouter
                </button>
              </div>

              <div className="mt-8 grid gap-3">
                {step.options?.map((option, index) => {
                  const isSelected = selected === index;

                  return (
                    <button
                      key={option.text}
                      onClick={() => setSelected(index)}
                      className={`rounded-2xl border-2 p-4 text-left text-lg font-semibold transition ${
                        isSelected
                          ? option.correct
                            ? "border-green-500 bg-green-50"
                            : "border-red-400 bg-red-50"
                          : "border-gray-200 hover:border-[#C96A2B]"
                      }`}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className="mt-5 text-center">
                  {step.options?.[selected]?.correct ? (
                    <p className="font-bold text-green-600">
                      🎉 Très bien !
                    </p>
                  ) : (
                    <p className="font-bold text-red-500">
                      Essaie encore !
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {step.type === "dialogue" && (
            <div>
              <div className="text-center">
                <div className="text-6xl">💬</div>

                <h2 className="mt-4 text-2xl font-bold text-[#294A3A]">
                  Petit dialogue
                </h2>
              </div>

              <div className="mt-8 space-y-4">
                {step.text?.split("\n").map((line, index) => {
                  const [speaker, ...message] = line.split(":");

                  return (
                    <div
                      key={index}
                      className={`rounded-2xl p-4 ${
                        speaker === "Tom"
                          ? "bg-orange-50"
                          : "bg-green-50"
                      }`}
                    >
                      <div className="text-sm font-bold text-gray-500">
                        {speaker}
                      </div>

                      <div className="mt-1 text-lg font-semibold">
                        {message.join(":").trim()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </section>

        {/* Bottom button */}
        <button
          onClick={next}
          disabled={
            step.type === "choice" &&
            !step.options?.[selected ?? -1]?.correct
          }
          className="mt-5 w-full rounded-2xl bg-[#C96A2B] px-6 py-4 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {stepIndex === lesson.steps.length - 1
            ? "Terminer 🎉"
            : "Continuer →"}
        </button>
      </div>
    </main>
  );
}