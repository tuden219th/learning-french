"use client";

import { useState } from "react";

type LessonStep = {
  type: "intro" | "choice" | "listen" | "dialogue" | "complete" | "review" | "showColor" | "colorHunt" | "matching" | "memory" | "objectColor" | "mix";
  title?: string;
  text?: string;
  translation?: string;
  audio?: string;
  audioFile?: string;
  // additional fields for new step types
  color?: string;
  reviewItems?: readonly { text: string; translation?: string; audioFile?: string }[];
  prompt?: string;
  target?: string;
  pairs?: readonly { left: string; right: string }[];
  colors?: readonly string[];
  object?: string;
  question?: string;
  answer?: string;
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
    if (typeof window === "undefined") return;

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.rate = 0.9;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function playAudioFile(file?: string) {
    if (!file || typeof window === "undefined") return;

    try {
      const url = `/audio/fr/${encodeURIComponent(file)}`;
      const audio = new Audio(url);
      audio.play().catch(() => {
        // ignore play errors; TTS can be used by caller if needed
      });
    } catch {
      // ignore
    }
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

              <div className="mt-7 flex items-center justify-center">
                <button
                  onClick={() => {
                    if (step.audioFile) playAudioFile(step.audioFile);
                    else playAudio(step.text);
                  }}
                  className="rounded-2xl bg-[#294A3A] px-6 py-3 font-bold text-white"
                >
                  🔊 Nghe
                </button>
              </div>
            </div>
          )}

          {step.type === "listen" && (
            <div className="text-center">
              <div className="text-6xl">👂</div>

              <h2 className="mt-5 text-2xl font-bold text-[#294A3A]">
                Écoute !
              </h2>

              <button
                onClick={() => {
                  if (step.audioFile) playAudioFile(step.audioFile);
                  else playAudio(step.audio);
                }}
                className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#C96A2B] px-6 py-5 text-xl font-bold text-white"
              >
                🔊 Nghe
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
                  onClick={() => {
                    if (step.audioFile) playAudioFile(step.audioFile);
                    else playAudio(step.audio);
                  }}
                  className="mt-5 rounded-full bg-gray-100 px-6 py-3 font-bold"
                >
                  🔊 Nghe lại
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
                    <p className="font-bold text-green-600">🎉 Rất tốt!</p>
                  ) : (
                    <div className="space-y-2">
                      <p className="font-bold text-red-500">❌ Chưa đúng.</p>
                      <p className="text-sm text-gray-600">
                        Đáp án: <strong>{step.options?.find((o) => o.correct)?.text}</strong>
                      </p>
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => {
                            if (step.audioFile) playAudioFile(step.audioFile);
                            else playAudio(step.options?.find((o) => o.correct)?.text);
                          }}
                          className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold"
                        >
                          🔊 Nghe đáp án
                        </button>
                      </div>
                    </div>
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

          {/* New interactive activities for Lesson 2 */}
          {step.type === "review" && (
            <div className="text-center">
              <div className="text-6xl">🔁</div>

              <h2 className="mt-5 text-2xl font-bold text-[#294A3A]">{step.title}</h2>

              <p className="mt-3 text-sm text-gray-500">Nhấn vào câu để nghe và nhớ nhé.</p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {step.reviewItems?.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (item.audioFile) playAudioFile(item.audioFile);
                      else playAudio(item.text);
                    }}
                    className="rounded-2xl border p-4 text-left font-semibold"
                  >
                    <div className="text-lg">{item.text}</div>
                    <div className="text-sm text-gray-500">{item.translation}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step.type === "showColor" && (
            <div className="text-center">
              <div style={{ background: step.color }} className="mx-auto mt-4 h-40 w-40 rounded-full shadow-inner" />

              <h2 className="mt-6 text-3xl font-bold text-[#294A3A]">{step.text}</h2>
              <p className="mt-2 text-gray-600">{step.translation}</p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    if (step.audioFile) playAudioFile(step.audioFile);
                    else playAudio(step.text);
                  }}
                  className="rounded-2xl bg-[#294A3A] px-6 py-3 font-bold text-white"
                >
                  🔊 Nghe
                </button>

                <button
                  onClick={() => playAudio(step.text)}
                  className="rounded-2xl bg-[#EEF4FA] px-6 py-3 font-bold text-[#294A3A]"
                >
                  Lặp lại
                </button>
              </div>
            </div>
          )}

          {step.type === "colorHunt" && (
            <ColorHunt target={step.target} />
          )}

          {step.type === "matching" && (
            <Matching pairs={step.pairs ?? []} />
          )}

          {step.type === "memory" && (
            <MemoryActivity colors={step.colors ?? []} />
          )}

          {step.type === "objectColor" && (
            <ObjectColor activity={step} />
          )}

          {step.type === "mix" && (
            <div className="text-center">
              <div className="text-6xl">🔗</div>
              <h2 className="mt-4 text-2xl font-bold text-[#294A3A]">{step.text}</h2>
              <p className="mt-3 text-gray-500">Kể xem màu của đồ vật nhé.</p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    if (step.audioFile) playAudioFile(step.audioFile);
                    else playAudio(step.text);
                  }}
                  className="rounded-2xl bg-[#C96A2B] px-6 py-3 font-bold text-white"
                >
                  🔊 Nghe
                </button>
              </div>
            </div>
          )}

        </section>

        {/* Bottom button */}
        <button
          onClick={next}
          disabled={step.type === "choice" && selected === null}
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

function ColorHunt({ target }: { target?: string }) {
  const colors = [
    { name: "rouge", hex: "#E63946" },
    { name: "bleu", hex: "#2874F0" },
    { name: "jaune", hex: "#F4D35E" },
    { name: "vert", hex: "#2ECC71" },
  ];

  const handle = (name: string) => {
    if (name === target) {
      alert("🌟 Bravo !");
    } else {
      alert("💡 Thử lại nhé!");
    }
  };

  return (
    <div className="mt-6 grid grid-cols-4 gap-4">
      {colors.map((c) => (
        <button key={c.name} onClick={() => handle(c.name)} className="h-20 w-20 rounded-full shadow-md" style={{ background: c.hex }} aria-label={c.name} />
      ))}
    </div>
  );
}

function Matching({ pairs }: { pairs: readonly { left: string; right: string }[] }) {
  const [leftSel, setLeftSel] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});

  const onLeft = (l: string) => setLeftSel(l);
  const onRight = (r: string) => {
    if (!leftSel) return;
    const correct = pairs.find((p) => p.left === leftSel && p.right === r);
    if (correct) setMatched((m) => ({ ...m, [leftSel]: r }));
    setLeftSel(null);
  };

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      <div>
        {pairs.map((p) => (
          <button key={p.left} onClick={() => onLeft(p.left)} disabled={!!matched[p.left]} className={`block w-full rounded-2xl p-3 mb-2 ${leftSel===p.left? 'ring-2 ring-[#C96A2B]': 'bg-[#EEF4FA]'} ${matched[p.left] ? 'opacity-50' : ''}`}>
            {p.left}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-start">
        {pairs.map((p) => (
          <button key={p.right} onClick={() => onRight(p.right)} disabled={Object.values(matched).includes(p.right)} className="h-10 w-10 mb-3 rounded-full" style={{ background: p.right }} />
        ))}
      </div>
    </div>
  );
}

function MemoryActivity({ colors }: { colors: readonly string[] }) {
  const [hidden, setHidden] = useState(false);
  const target = colors[0];

  const handleChoice = (c: string) => {
    if (c === target) alert("🌟 Bravo !");
    else alert("💡 Thử lại nhé!");
  };

  return (
    <div className="mt-6 text-center">
      {!hidden ? (
        <>
          <div className="grid grid-cols-4 gap-3">
            {colors.map((c) => (
              <div key={c} className="h-20 w-20 rounded-md" style={{ background: getColorHex(c) }} />
            ))}
          </div>

          <div className="mt-4">
            <button onClick={() => setHidden(true)} className="rounded-2xl bg-[#294A3A] px-6 py-3 font-bold text-white">Ẩn và bắt đầu</button>
          </div>
        </>
      ) : (
        <div>
          <p className="text-lg">Tìm màu: <strong>{target}</strong></p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {colors.map((c) => (
              <button key={c} onClick={() => handleChoice(c)} className="rounded-2xl border p-4 font-semibold">{c}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ObjectColor({ activity }: { activity: { object?: string; question?: string; answer?: string } }) {
  const options = ["rouge", "bleu", "jaune", "vert"];
  const handle = (o: string) => {
    if (o === activity.answer) alert("🌟 Bravo !");
    else alert("💡 Thử lại nhé!");
  };

  return (
    <div className="text-center">
      <div className="text-6xl mt-4">🍎</div>
      <h3 className="mt-4 text-xl font-bold">{activity.question}</h3>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {options.map((o) => (
          <button key={o} onClick={() => handle(o)} className="rounded-2xl border p-4 font-semibold">{o}</button>
        ))}
      </div>
    </div>
  );
}

function getColorHex(name: string) {
  switch (name) {
    case "rouge":
      return "#E63946";
    case "bleu":
      return "#2874F0";
    case "jaune":
      return "#F4D35E";
    case "vert":
      return "#2ECC71";
    default:
      return "#DDD";
  }
}