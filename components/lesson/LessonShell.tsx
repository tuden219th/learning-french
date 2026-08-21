"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimalChoice,
  AnimalColorActivity,
  AnimalDiscovery,
  AnimalMission,
  AnimalSentenceActivity,
  AnimalSoundActivity,
  AnimalSpeakingActivity,
} from "./AnimalActivities";
import {
  CountChoose,
  NumberAnimalColor,
  NumberAnimal,
  NumberChallenge,
  NumberDiscovery,
  NumberIntro,
  NumberListenFind,
  NumberSequence,
  NumberSpeaking,
} from "./NumberActivities";
import {
  FamilyAnimal,
  FamilyColor,
  FamilyFind,
  familyBedroomMembers,
  familySalonMembers,
  FamilyIntro,
  FamilyNumber,
  FamilySecret,
  FamilySpeaking,
  FamilySuperChallenge,
  FamilyTeachingRoom,
} from "./FamilyActivities";
import {
  FoodBasket,
  FoodChallenge,
  FoodColor,
  FoodCount,
  FoodIntro,
  FoodListen,
  FoodSpeaking,
  FoodTeaching,
  FoodWorld,
} from "./FoodActivities";

type LessonStep = {
  type: "intro" | "choice" | "listen" | "dialogue" | "complete" | "review" | "showColor" | "colorHunt" | "matching" | "memory" | "objectColor" | "mix" | "animalDiscovery" | "animalChoice" | "animalColor" | "animalSound" | "animalSpeaking" | "animalSentence" | "animalMission" | "numberIntro" | "numberDiscovery" | "numberListenFind" | "numberCount" | "numberAnimalColor" | "numberAnimal" | "numberSpeaking" | "numberSequence" | "numberChallenge" | "familyIntro" | "familySalon" | "familyFind" | "familyChambre" | "familyNumber" | "familyColor" | "familyAnimal" | "familySpeaking" | "familySecret" | "familyChallenge" | "foodIntro" | "foodTeach" | "foodBasket" | "foodListen" | "foodCount" | "foodColor" | "foodWorld" | "foodSpeaking" | "foodChallenge";
  title?: string;
  text?: string;
  translation?: string;
  instruction?: string;
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
  promptColor?: string;
  animals?: readonly { word: string; meaning: string; emoji: string }[];
  group?: readonly number[];
  foodGroup?: readonly string[];
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
  animals?: readonly { word: string; meaning: string; emoji: string }[];
  completionTitle?: string;
  completionText?: string;
  completionAnimals?: readonly string[];
  completionNumbers?: readonly number[];
  completionChallenge?: string;
  numberGroups?: readonly (readonly number[])[];
  familyMembers?: readonly string[];
  completionBadge?: string;
  completionStars?: readonly string[];
  completionFoods?: readonly string[];
};

export default function LessonShell({ lesson }: { lesson: Lesson }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [stepComplete, setStepComplete] = useState(false);
  const [finished, setFinished] = useState(false);

  const step = lesson.steps[stepIndex];
  const progress = ((stepIndex + 1) / lesson.steps.length) * 100;

  const frenchAudioFiles: Record<string, string> = {
    "bonjour": "bonjour.mp3",
    "salut": "salut.mp3",
    "comment ca va": "ça-va.mp3",
    "ca va bien": "ça-va-bien.mp3",
    "je m appelle leo": "je-mappelle-léo.mp3",
    "rouge": "rouge.mp3",
    "bleu": "bleu.mp3",
    "jaune": "jaune.mp3",
    "vert": "vert.mp3",
    "noir": "noir.mp3",
    "blanc": "blanc.mp3",
    "orange": "orange.mp3",
    "violet": "violet.mp3",
    "le chat": "le-chat.mp3",
    "le chien": "le-chien.mp3",
    "le lapin": "le-lapin.mp3",
    "l oiseau": "loiseau.mp3",
    "le poisson": "le-poisson.mp3",
    "la souris": "la-souris.mp3",
    "la tortue": "la-tortue.mp3",
    "le lion": "le-lion.mp3",
    "le chat est bleu": "le-chat-est-bleu.mp3",
    "miaou": "miaou.mp3",
    "bonjour petit lapin": "bonjour-petit-lapin.mp3",
    "bonjour le chien": "bonjour-le-chien.mp3",
    "maman": "maman.mp3",
    "papa": "papa.mp3",
    "frere": "frère.mp3",
    "soeur": "sœur.mp3",
    "bebe": "bébé.mp3",
    "grand pere": "grand-père.mp3",
    "grand mere": "grand-mère.mp3",
    "famille": "famille.mp3",
    "bonjour maman": "bonjour-maman.mp3",
    "bonjour papa": "bonjour-papa.mp3",
    "bonjour frere": "bonjour-frère.mp3",
    "bonjour soeur": "bonjour-sœur.mp3",
    "pomme": "pomme.mp3",
    "banane": "banane.mp3",
    "pain": "pain.mp3",
    "lait": "lait.mp3",
    "fromage": "fromage.mp3",
    "fraise": "fraise.mp3",
    "eau": "eau.mp3",
    "gateau": "gâteau.mp3",
    "pique nique": "pique-nique.mp3",
  };

  function normalizeFrench(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .replace(/\s+/g, " ");
  }

  function slugifyFrench(text: string) {
    return normalizeFrench(text).replace(/ /g, "-") || "audio";
  }

  function next() {
    setSelected(null);
    setStepComplete(false);

    if (stepIndex < lesson.steps.length - 1) {
      setStepIndex((value) => value + 1);
    } else {
      setFinished(true);
    }
  }

  function playAudio(text?: string, audioFile?: string) {
    if (typeof window === "undefined") return;

    const resolvedFile = audioFile ?? frenchAudioFiles[normalizeFrench(text ?? "")];

    if (!resolvedFile) {
      console.warn(`[French Audio Missing] /audio/fr/${slugifyFrench(text ?? "audio")}.mp3`);
      return;
    }

    playAudioFile(resolvedFile);
  }

  function playAudioFile(file?: string) {
    if (!file || typeof window === "undefined") return;

    const url = `/audio/fr/${encodeURIComponent(file)}`;
    const audio = new Audio(url);
    audio.addEventListener("error", () => {
      console.warn(`[French Audio Missing] ${url}`);
    }, { once: true });
    audio.play().catch(() => {
      console.warn(`[French Audio Missing] ${url}`);
    });
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
            {lesson.completionTitle ?? "Tu as terminé la leçon !"}
          </p>

          {lesson.completionAnimals && (
            <>
              <div className="mt-7 flex flex-wrap justify-center gap-3 text-4xl">
                {lesson.completionAnimals.map((animal, index) => (
                  <span key={`${animal}-${index}`}>{animal}</span>
                ))}
              </div>
              <p className="mt-4 font-bold text-[#315A8D]">
                {lesson.completionAnimals.length} animaux découverts !
              </p>
              <p className="mt-2 text-gray-600">
                {lesson.completionText}
              </p>
            </>
          )}

          {lesson.completionNumbers && (
            <>
              <div className="mt-7 flex flex-wrap justify-center gap-2 text-2xl font-black text-[#315A8D]">
                {lesson.completionNumbers.map((number) => (
                  <span key={number} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF4FA]">
                    {number}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-gray-600">{lesson.completionText}</p>
              <p className="mt-3 font-black text-[#C96A2B]">{lesson.completionChallenge}</p>
            </>
          )}

          {lesson.familyMembers && (
            <>
              <div className="mt-7 flex flex-wrap justify-center gap-3 text-4xl">
                {lesson.familyMembers.map((member, index) => <span key={`${member}-${index}`}>{member}</span>)}
              </div>
              <p className="mt-5 text-gray-600">{lesson.completionText}</p>
              <div className="mt-4 text-2xl">{lesson.completionStars?.join(" ")}</div>
              <p className="mt-4 font-black text-[#C96A2B]">🏅 {lesson.completionBadge}</p>
            </>
          )}

          {lesson.completionFoods && (
            <>
              <div className="mt-7 flex flex-wrap justify-center gap-3 text-4xl">
                {lesson.completionFoods.map((food, index) => <span key={`${food}-${index}`}>{food}</span>)}
              </div>
              <p className="mt-5 text-gray-600">{lesson.completionText}</p>
              <div className="mt-4 text-2xl">{lesson.completionStars?.join(" ")}</div>
              <p className="mt-4 font-black text-[#C96A2B]">🏅 {lesson.completionBadge}</p>
            </>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-2xl bg-[#315A8D] px-6 py-3 font-bold text-white"
            >
              🏠 Về trang chủ
            </Link>
            <button
              onClick={() => {
                setStepIndex(0);
                setStepComplete(false);
                setFinished(false);
              }}
              className="rounded-2xl bg-[#C96A2B] px-6 py-3 font-bold text-white"
            >
              🔄 Học lại
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8EF] px-4 py-6">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="rounded-full border border-[#E9DDC8] bg-white px-4 py-2 text-sm font-bold text-[#315A8D]"
            >
              🏠 Home
            </Link>
            <span className="text-center text-sm font-semibold text-gray-500">
              <span className="block text-[#315A8D]">{lesson.title}</span>
              Mission {stepIndex + 1}/{lesson.steps.length}
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

          {step.instruction && (
            <div className="text-center mb-4">
              <p className="text-lg font-semibold text-[#294A3A]">{step.instruction}</p>
            </div>
          )}

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
              <p className="mt-3 text-gray-500">Chạm vào màu xanh dương.</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["rouge", "bleu", "jaune", "vert"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelected(color === step.promptColor ? 1 : 0)}
                    className={`rounded-2xl border-2 p-4 font-semibold ${
                      selected === 1 && color === step.promptColor
                        ? "border-green-500 bg-green-50"
                        : selected === 0
                          ? "border-red-400 bg-red-50"
                          : "border-gray-200"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
              {selected !== null && (
                <p className={`mt-4 font-bold ${selected === 1 ? "text-green-600" : "text-red-500"}`}>
                  {selected === 1 ? "🎉 Đúng rồi!" : "❌ Chưa đúng. Thử lại nhé!"}
                </p>
              )}
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

          {step.type === "animalDiscovery" && (
            <AnimalDiscovery animals={lesson.animals ?? []} onSpeak={playAudio} />
          )}

          {step.type === "animalChoice" && (
            <AnimalChoice animals={lesson.animals ?? []} onSpeak={playAudio} />
          )}

          {step.type === "animalColor" && (
            <AnimalColorActivity onSpeak={playAudio} />
          )}

          {step.type === "animalSound" && (
            <AnimalSoundActivity animals={lesson.animals ?? []} onSpeak={playAudio} />
          )}

          {step.type === "animalSpeaking" && <AnimalSpeakingActivity />}

          {step.type === "animalSentence" && (
            <AnimalSentenceActivity onSpeak={playAudio} />
          )}

          {step.type === "animalMission" && <AnimalMission onSpeak={playAudio} />}

          {step.type === "numberDiscovery" && (
            <NumberDiscovery key={`number-discovery-${stepIndex}`} group={step.group ?? []} onSpeak={playAudio} onComplete={() => setStepComplete(true)} />
          )}

          {step.type === "numberIntro" && <NumberIntro onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "numberListenFind" && <NumberListenFind onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "numberCount" && <CountChoose onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "numberAnimalColor" && <NumberAnimalColor onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "numberAnimal" && <NumberAnimal onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "numberSpeaking" && <NumberSpeaking onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "numberSequence" && <NumberSequence onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "numberChallenge" && <NumberChallenge onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "familyIntro" && <FamilyIntro onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "familySalon" && <FamilyTeachingRoom key="family-salon" room="Salon" members={familySalonMembers} onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "familyFind" && <FamilyFind onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "familyChambre" && <FamilyTeachingRoom key="family-chambre" room="Chambre" members={familyBedroomMembers} onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "familyNumber" && <FamilyNumber onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "familyColor" && <FamilyColor onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "familyAnimal" && <FamilyAnimal onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "familySpeaking" && <FamilySpeaking onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "familySecret" && <FamilySecret onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "familyChallenge" && <FamilySuperChallenge onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "foodIntro" && <FoodIntro onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "foodTeach" && <FoodTeaching key={`food-teach-${stepIndex}`} group={step.foodGroup ?? []} onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "foodBasket" && <FoodBasket onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "foodListen" && <FoodListen onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "foodCount" && <FoodCount onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "foodColor" && <FoodColor onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "foodWorld" && <FoodWorld onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "foodSpeaking" && <FoodSpeaking onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

          {step.type === "foodChallenge" && <FoodChallenge onSpeak={playAudio} onComplete={() => setStepComplete(true)} />}

        </section>

        {/* Bottom button */}
        <button
          onClick={next}
          disabled={(step.type === "choice" && selected === null) || ((step.type.startsWith("number") || step.type.startsWith("family") || step.type.startsWith("food")) && !stepComplete)}
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

  const [feedback, setFeedback] = useState<string | null>(null);
  const [correct, setCorrect] = useState(false);

  const handle = (name: string) => {
    const isCorrect = name === target;
    setCorrect(isCorrect);
    setFeedback(isCorrect ? "🌟 Đúng rồi!" : "💡 Chưa đúng. Thử lại nhé!");
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-4 gap-4">
        {colors.map((c) => (
          <button key={c.name} onClick={() => handle(c.name)} className="h-20 w-20 rounded-full shadow-md" style={{ background: c.hex }} aria-label={c.name} />
        ))}
      </div>
      {feedback && <p className={`mt-5 text-center font-bold ${correct ? "text-green-600" : "text-red-500"}`}>{feedback}</p>}
    </div>
  );
}

function Matching({ pairs }: { pairs: readonly { left: string; right: string }[] }) {
  const [leftSel, setLeftSel] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const onLeft = (l: string) => setLeftSel(l);
  const onRight = (r: string) => {
    if (!leftSel) return;
    const correct = pairs.find((p) => p.left === leftSel && p.right === r);
    if (correct) {
      setMatched((m) => ({ ...m, [leftSel]: r }));
      setFeedback("🎉 Nối đúng rồi!");
    } else {
      setFeedback("💡 Chưa đúng. Thử lại nhé!");
    }
    setLeftSel(null);
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-4">
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
      {feedback && <p className="mt-4 text-center font-bold text-[#294A3A]">{feedback}</p>}
    </div>
  );
}

function MemoryActivity({ colors }: { colors: readonly string[] }) {
  const [hidden, setHidden] = useState(false);
  const target = colors[0];
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleChoice = (c: string) => {
    setFeedback(c === target ? "🌟 Nhớ đúng rồi!" : "💡 Chưa đúng. Thử lại nhé!");
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
          {feedback && <p className="mt-4 font-bold text-[#294A3A]">{feedback}</p>}
        </div>
      )}
    </div>
  );
}

function ObjectColor({ activity }: { activity: { object?: string; question?: string; answer?: string } }) {
  const options = ["rouge", "bleu", "jaune", "vert"];
  const [feedback, setFeedback] = useState<string | null>(null);
  const handle = (o: string) => {
    setFeedback(o === activity.answer ? "🌟 Đúng rồi!" : "💡 Chưa đúng. Thử lại nhé!");
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
      {feedback && <p className="mt-4 font-bold text-[#294A3A]">{feedback}</p>}
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