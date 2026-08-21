"use client";

import { useEffect, useState } from "react";
import Recorder from "./Recorder";

type NumberWord = {
  number: number;
  word: string;
  audioFile: string;
};

type NumberActivitiesProps = {
  onSpeak: (text: string, audioFile?: string) => void;
  onComplete?: () => void;
};

const numberWords: readonly NumberWord[] = [
  { number: 1, word: "un", audioFile: "un.mp3" },
  { number: 2, word: "deux", audioFile: "deux.mp3" },
  { number: 3, word: "trois", audioFile: "trois.mp3" },
  { number: 4, word: "quatre", audioFile: "quatre.mp3" },
  { number: 5, word: "cinq", audioFile: "cinq.mp3" },
  { number: 6, word: "six", audioFile: "six.mp3" },
  { number: 7, word: "sept", audioFile: "sept.mp3" },
  { number: 8, word: "huit", audioFile: "huit.mp3" },
  { number: 9, word: "neuf", audioFile: "neuf.mp3" },
  { number: 10, word: "dix", audioFile: "dix.mp3" },
];

export function NumberIntro({ onSpeak, onComplete }: NumberActivitiesProps) {
  return (
    <div>
      <NumberHeading icon="🎯" title="La chasse aux nombres" instruction="🔢 Mỗi con số là một kho báu. Hãy đi săn từ 1 đến 10!" />
      <div className="rounded-3xl bg-[#EEF4FA] p-5 text-center">
        <p className="text-lg font-black text-[#315A8D]">INTRO • Sẵn sàng chưa?</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {numberWords.map((item) => <span key={item.number} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-black text-[#315A8D] shadow-sm">{item.number}</span>)}
        </div>
        <button type="button" onClick={() => { onSpeak("un", "un.mp3"); onComplete?.(); }} className="mt-6 rounded-full bg-[#D94A4A] px-7 py-3 font-black text-white">🔊 Bắt đầu với un</button>
      </div>
    </div>
  );
}

export function NumberDiscovery({ group, onSpeak, onComplete }: NumberActivitiesProps & { group: readonly number[] }) {
  const [phase, setPhase] = useState<"learn" | "find" | "done">("learn");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const words = group.map((number) => numberWords[number - 1]);
  const current = words[currentIndex];
  const target = words[words.length - 1];

  useEffect(() => {
    if (phase === "done") onComplete?.();
  }, [phase, onComplete]);

  return (
    <div>
      <NumberHeading
        icon="🎯"
        title={phase === "learn" ? "Découvre les nombres" : "Tìm kho báu số"}
        instruction={phase === "learn" ? `👀 Học nhóm số ${group[0]}–${group[group.length - 1]}: nhìn, nghe và đếm.` : `🔊 Nghe “${target.word}”, rồi tìm số đúng.`}
      />
      <div className="mb-5 flex justify-center gap-2">
        {words.map((item, index) => <span key={item.number} className={`h-3 w-3 rounded-full ${index < currentIndex || phase === "find" || phase === "done" ? "bg-[#F4C95D]" : "bg-[#DCE7F2]"}`} />)}
      </div>
      {phase === "learn" && (
        <div className="text-center">
          <div className="rounded-3xl bg-[#FFF8EA] p-5">
            <span className="block text-8xl font-black text-[#315A8D]">{current.number}</span>
            <span className="mt-2 block text-3xl font-black text-[#4A3828]">{current.word}</span>
            <div className="mt-4 flex min-h-12 flex-wrap justify-center gap-1 text-3xl">{Array.from({ length: current.number }, (_, index) => <span key={index}>🍎</span>)}</div>
            <p className="mt-3 text-sm font-semibold text-[#806C58]">{current.number} quả táo = {current.word}</p>
          </div>
          <button type="button" onClick={() => onSpeak(current.word, current.audioFile)} className="mt-5 rounded-2xl bg-[#315A8D] px-7 py-4 text-xl font-black text-white">🔊 Nghe {current.word}</button>
          <button type="button" onClick={() => currentIndex < words.length - 1 ? setCurrentIndex((index) => index + 1) : setPhase("find")} className="mt-4 block w-full rounded-2xl bg-[#D94A4A] px-6 py-4 text-lg font-black text-white">{currentIndex < words.length - 1 ? "Số tiếp theo →" : "Bắt đầu săn số →"}</button>
        </div>
      )}
      {phase !== "learn" && phase !== "done" && (
        <div>
          <div className="text-center"><button type="button" onClick={() => onSpeak(target.word, target.audioFile)} className="rounded-2xl bg-[#315A8D] px-7 py-4 text-xl font-black text-white">🔊 {target.word}</button></div>
          <div className="mt-6 grid grid-cols-3 gap-3">{words.map((item) => <button key={item.number} type="button" onClick={() => { setSelected(item.number); if (item.number === target.number) { setPhase("done"); onComplete?.(); } }} className={`min-h-24 rounded-3xl border-2 text-4xl font-black ${selected === item.number ? item.number === target.number ? "border-[#4F8A5B] bg-[#EAF5EC] text-[#35633F]" : "border-[#D94A4A] bg-[#FFF0F0] text-[#B63838]" : "border-[#E9DDC8] bg-white text-[#315A8D]"}`}>{item.number}</button>)}</div>
          {selected !== null && <Feedback text={selected === target.number ? "🎉 Mission hoàn thành!" : "👀 Chưa đúng. Nghe lại nhé!"} correct={selected === target.number} />}
        </div>
      )}
      {phase === "done" && <Feedback text={`🎉 ${target.number} — ${target.word}! Mission hoàn thành.`} correct />}
    </div>
  );
}

export function NumberListenFind({ onSpeak, onComplete }: NumberActivitiesProps) {
  return (
    <NumberChoice
      title="Nghe và tìm"
      icon="👂"
      instruction="🔊 Nghe “cinq”, rồi chạm vào số đúng."
      prompt="cinq"
      options={[2, 5, 8]}
      answer={5}
      onSpeak={onSpeak}
      onComplete={onComplete}
      audioFile="cinq.mp3"
    />
  );
}

export function CountChoose({ onSpeak, onComplete }: NumberActivitiesProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answer = 5;
  const objects = Array.from({ length: answer }, (_, index) => index);

  return (
    <div>
      <NumberHeading icon="🍎" title="Count & choose" instruction="🍎 Đếm các quả táo. Combien ?" />
      <div className="flex flex-wrap justify-center gap-3 rounded-3xl bg-[#FFF8EA] p-6 text-5xl">
        {objects.map((object) => <span key={object}>🍎</span>)}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[3, 5, 7].map((number) => (
          <button key={number} type="button" onClick={() => { setSelected(number); onSpeak(numberWords[number - 1].word, numberWords[number - 1].audioFile); if (number === answer) onComplete?.(); }} className={`min-h-20 rounded-3xl border-2 text-3xl font-black ${selected === number ? number === answer ? "border-[#4F8A5B] bg-[#EAF5EC] text-[#35633F]" : "border-[#D94A4A] bg-[#FFF0F0] text-[#B63838]" : "border-[#E9DDC8] bg-white text-[#315A8D]"}`}>
            {number}
          </button>
        ))}
      </div>
      {selected !== null && <Feedback text={selected === answer ? "🎉 Đúng rồi! Cinq pommes." : "💡 Đếm lại nhé."} correct={selected === answer} />}
    </div>
  );
}

export function NumberAnimalColor({ onSpeak, onComplete }: NumberActivitiesProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = [
    { id: "blue", label: "3 poissons bleus", phrase: "trois poissons bleus", audioFile: "trois-poissons-bleus.mp3", count: 3, color: "#2874F0", fish: "🐟" },
    { id: "red", label: "5 poissons rouges", phrase: "cinq poissons rouges", audioFile: "cinq-poissons-rouges.mp3", count: 5, color: "#E63946", fish: "🐟" },
    { id: "yellow", label: "2 poissons jaunes", phrase: "deux poissons jaunes", audioFile: "deux-poissons-jaunes.mp3", count: 2, color: "#F4D35E", fish: "🐟" },
  ];
  const answer = "blue";

  return (
    <div>
      <NumberHeading icon="🐟" title="Nombres et couleurs" instruction="🔵 Trouve trois poissons bleus." />
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((option) => (
          <button key={option.id} type="button" onClick={() => { setSelected(option.id); onSpeak(option.phrase, option.audioFile); if (option.id === answer) onComplete?.(); }} className={`rounded-3xl border-2 p-4 ${selected === option.id ? option.id === answer ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#D94A4A] bg-[#FFF0F0]" : "border-[#E9DDC8] bg-white"}`}>
            <div className="flex min-h-20 flex-wrap justify-center gap-1 rounded-2xl p-2" style={{ background: `${option.color}20` }}>
              {Array.from({ length: option.count }, (_, index) => <span key={index} className="text-3xl">{option.fish}</span>)}
            </div>
            <span className="mt-3 block font-black text-[#315A8D]">{option.label}</span>
          </button>
        ))}
      </div>
      {selected && <Feedback text={selected === answer ? "🌟 Bravo! Trois poissons bleus." : "💡 Hãy tìm 3 con cá màu xanh."} correct={selected === answer} />}
    </div>
  );
}

export function NumberAnimal({ onSpeak, onComplete }: NumberActivitiesProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = [
    { id: "two", label: "2 chiens", count: 2 },
    { id: "three", label: "3 chiens", count: 3 },
    { id: "five", label: "5 chiens", count: 5 },
  ];
  const answer = "three";

  return (
    <div>
      <NumberHeading icon="🐶" title="Number + animal" instruction="🐶 Trouve trois chiens. Hãy chọn nhóm có 3 chú chó." />
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map((option) => (
          <button key={option.id} type="button" onClick={() => { setSelected(option.id); onSpeak(numberWords[option.count - 1].word, numberWords[option.count - 1].audioFile); if (option.id === answer) onComplete?.(); }} className={`rounded-3xl border-2 p-4 ${selected === option.id ? option.id === answer ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#D94A4A] bg-[#FFF0F0]" : "border-[#E9DDC8] bg-white"}`}>
            <div className="flex min-h-20 flex-wrap justify-center gap-1 rounded-2xl bg-[#FFF8EA] p-2">{Array.from({ length: option.count }, (_, index) => <span key={index} className="text-3xl">🐶</span>)}</div>
            <span className="mt-3 block font-black text-[#315A8D]">{option.label}</span>
          </button>
        ))}
      </div>
      {selected && <Feedback text={selected === answer ? "🎉 Trois chiens!" : "💡 Đếm lại các chú chó nhé."} correct={selected === answer} />}
    </div>
  );
}

export function NumberSpeaking({ onSpeak, onComplete }: NumberActivitiesProps) {
  return (
    <div>
      <NumberHeading icon="🎙️" title="Dis le nombre" instruction="🎤 Nghe rồi nói: “trois”." />
      <div className="mb-5 text-center">
        <button type="button" onClick={() => onSpeak("trois", "trois.mp3")} className="rounded-full bg-[#315A8D] px-6 py-3 font-black text-white">🔊 Nghe mẫu</button>
      </div>
      <Recorder phrase="Trois." translation="Số 3." onComplete={onComplete} />
    </div>
  );
}

export function NumberSequence({ onSpeak, onComplete }: NumberActivitiesProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [round, setRound] = useState(0);
  const sequences = [
    { label: "1 – 2 – ? – 4", options: [3, 5, 7], answer: 3 },
    { label: "6 – 7 – ? – 9 – 10", options: [3, 8, 5], answer: 8 },
  ];
  const sequence = sequences[round];

  return (
    <div>
      <NumberHeading icon="🧩" title="Số còn thiếu" instruction={`🔢 Dãy ${round + 1}/2: chọn số còn thiếu.`} />
      <div className="rounded-3xl bg-[#EEF4FA] p-6 text-center text-3xl font-black tracking-widest text-[#315A8D]">{sequence.label}</div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {sequence.options.map((number) => (
          <button key={number} type="button" onClick={() => { setSelected(number); if (number === sequence.answer) { if (round === sequences.length - 1) onComplete?.(); setTimeout(() => { setSelected(null); setRound((value) => Math.min(value + 1, sequences.length - 1)); }, 350); } onSpeak(numberWords[number - 1].word, numberWords[number - 1].audioFile); }} className={`min-h-20 rounded-3xl border-2 text-3xl font-black ${selected === number ? number === sequence.answer ? "border-[#4F8A5B] bg-[#EAF5EC] text-[#35633F]" : "border-[#D94A4A] bg-[#FFF0F0] text-[#B63838]" : "border-[#E9DDC8] bg-white text-[#315A8D]"}`}>{number}</button>
        ))}
      </div>
      {selected !== null && <Feedback text={selected === sequence.answer ? round === sequences.length - 1 ? "🎉 Hai dãy đều đúng!" : "🎉 Đúng rồi! Dãy tiếp theo nhé." : "💡 Đếm lại từ đầu nhé."} correct={selected === sequence.answer} />}
    </div>
  );
}

export function NumberChallenge({ onSpeak, onComplete }: NumberActivitiesProps) {
  const challenges = [
    { number: 12, word: "douze", audioFile: "douze.mp3" },
    { number: 15, word: "quinze", audioFile: "quinze.mp3" },
    { number: 20, word: "vingt", audioFile: "vingt.mp3" },
  ];
  const [phase, setPhase] = useState<"learn" | "challenge">("learn");
  const [learnIndex, setLearnIndex] = useState(0);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const current = challenges[phase === "learn" ? learnIndex : challengeIndex];
  const complete = phase === "challenge" && challengeIndex === challenges.length;

  if (phase === "learn") {
    return (
      <div>
        <NumberHeading icon="🔥" title="SUPER DÉFI" instruction="Ồ, số lớn hơn rồi! Nhìn, nghe và làm quen trước khi thử nhé." />
        <div className="mb-5 flex justify-center gap-2">{challenges.map((challenge, index) => <span key={challenge.number} className={`h-3 w-3 rounded-full ${index === learnIndex ? "bg-[#D94A4A]" : index < learnIndex ? "bg-[#F4C95D]" : "bg-[#DCE7F2]"}`} />)}</div>
        <div className="rounded-3xl bg-[#FFF8EA] p-6 text-center">
          <span className="block text-8xl font-black text-[#315A8D]">{current.number}</span>
          <span className="mt-2 block text-3xl font-black text-[#4A3828]">{current.word}</span>
          <button type="button" onClick={() => onSpeak(current.word, current.audioFile)} className="mt-5 rounded-2xl bg-[#D94A4A] px-7 py-4 text-xl font-black text-white">🔊 Nghe {current.word}</button>
        </div>
        <button type="button" onClick={() => learnIndex < challenges.length - 1 ? setLearnIndex((index) => index + 1) : setPhase("challenge")} className="mt-5 w-full rounded-2xl bg-[#315A8D] px-6 py-4 text-lg font-black text-white">{learnIndex < challenges.length - 1 ? "Số lớn tiếp theo →" : "Bắt đầu thử thách →"}</button>
      </div>
    );
  }

  function choose(number: number) {
    setSelected(number);
    if (number === current.number) {
      setTimeout(() => {
        setSelected(null);
        setChallengeIndex((index) => index + 1);
        if (challengeIndex === challenges.length - 1) onComplete?.();
      }, 350);
    }
  }

  if (complete) {
    return <Feedback text="🏅 Défi réussi ! Tu as trouvé les grands nombres." correct />;
  }

  return (
    <div>
      <NumberHeading icon="🔥" title="SUPER DÉFI" instruction={`🔊 Nghe “${current.word}”, rồi chọn số đúng.`} />
      <div className="mb-5 flex justify-center gap-2" aria-label={`Đã hoàn thành ${challengeIndex} trên 3 thử thách`}>
        {challenges.map((challenge, index) => <span key={challenge.number} className={`rounded-full px-3 py-1 text-sm font-black ${index < challengeIndex ? "bg-[#F4C95D] text-[#4A3828]" : "bg-[#EEF4FA] text-[#806C58]"}`}>🏅 {index < challengeIndex ? "✓" : `${index + 1}/3`}</span>)}
      </div>
      <div className="text-center">
        <button type="button" onClick={() => onSpeak(current.word, current.audioFile)} className="rounded-2xl bg-[#D94A4A] px-7 py-4 text-xl font-black text-white">🔊 Nghe lại</button>
        <p className="mt-3 text-sm font-semibold text-[#806C58]">Nghe, nhìn và chọn số đúng.</p>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {challenges.map((challenge) => <button key={challenge.number} type="button" onClick={() => choose(challenge.number)} className={`min-h-24 rounded-3xl border-2 text-4xl font-black ${selected === challenge.number ? challenge.number === current.number ? "border-[#4F8A5B] bg-[#EAF5EC] text-[#35633F]" : "border-[#D94A4A] bg-[#FFF0F0] text-[#B63838]" : "border-[#E9DDC8] bg-white text-[#315A8D]"}`}>{challenge.number}</button>)}
      </div>
      {selected !== null && selected !== current.number && <Feedback text="💡 Écoute encore. Con thử lại nhé!" correct={false} />}
    </div>
  );
}

function NumberChoice({ title, icon, instruction, prompt, options, answer, onSpeak, audioFile, onComplete }: { title: string; icon: string; instruction: string; prompt: string; options: readonly number[]; answer: number; onSpeak: (text: string, audioFile?: string) => void; audioFile: string; onComplete?: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = selected === answer;

  return (
    <div>
      <NumberHeading icon={icon} title={title} instruction={instruction} />
      <div className="text-center">
        <button type="button" onClick={() => onSpeak(prompt, audioFile)} className="rounded-2xl bg-[#315A8D] px-7 py-4 text-xl font-black text-white">🔊 {prompt}</button>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {options.map((number) => <button key={number} type="button" onClick={() => { setSelected(number); if (number === answer) onComplete?.(); }} className={`min-h-24 rounded-3xl border-2 text-4xl font-black ${selected === number ? correct ? "border-[#4F8A5B] bg-[#EAF5EC] text-[#35633F]" : "border-[#D94A4A] bg-[#FFF0F0] text-[#B63838]" : "border-[#E9DDC8] bg-white text-[#315A8D]"}`}>{number}</button>)}
      </div>
      {selected !== null && <Feedback text={correct ? "🎉 Đúng rồi!" : "👂 Écoute encore, rồi thử lại nhé."} correct={correct} />}
    </div>
  );
}

function NumberHeading({ icon, title, instruction }: { icon: string; title: string; instruction: string }) {
  return <div className="mb-6 text-center"><div className="text-6xl">{icon}</div><h2 className="mt-3 text-2xl font-black text-[#294A3A]">{title}</h2><p className="mt-3 text-lg font-semibold text-[#315A8D]">{instruction}</p></div>;
}

function Feedback({ text, correct }: { text: string; correct: boolean }) {
  return <p className={`mt-5 rounded-2xl p-4 text-center font-black ${correct ? "bg-[#EAF5EC] text-[#35633F]" : "bg-[#FFF0F0] text-[#B63838]"}`}>{text}</p>;
}
