"use client";

import { useState } from "react";
import Recorder from "./Recorder";

type Animal = {
  word: string;
  meaning: string;
  emoji: string;
};

type AnimalChoice = Animal & {
  color: string;
};

type AnimalActivitiesProps = {
  animals: readonly Animal[];
  onSpeak: (text: string) => void;
};

const colors = [
  { name: "rouge", hex: "#E63946" },
  { name: "bleu", hex: "#2874F0" },
  { name: "jaune", hex: "#F4D35E" },
  { name: "vert", hex: "#2ECC71" },
];

export function AnimalDiscovery({ animals, onSpeak }: AnimalActivitiesProps) {
  const [heard, setHeard] = useState<string | null>(null);

  return (
    <div>
      <ActivityHeading icon="🌳" title="Khám phá khu rừng" instruction="🐾 Chạm vào từng con vật để nghe tên tiếng Pháp." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {animals.slice(0, 4).map((animal) => (
          <button
            key={animal.word}
            type="button"
            onClick={() => {
              setHeard(animal.word);
              onSpeak(animal.word);
            }}
            className={`rounded-3xl border-2 p-4 text-center transition hover:-translate-y-1 ${
              heard === animal.word
                ? "border-[#4F8A5B] bg-[#EAF5EC]"
                : "border-[#E9DDC8] bg-[#FFF8EA]"
            }`}
          >
            <span className="block text-5xl">{animal.emoji}</span>
            <span className="mt-3 block text-lg font-black text-[#315A8D]">{animal.word}</span>
            <span className="mt-1 block text-sm text-[#806C58]">{animal.meaning}</span>
          </button>
        ))}
      </div>
      {heard && <Feedback text={`🎉 Tu as rencontré ${heard} !`} correct />}
    </div>
  );
}

export function AnimalChoice({ animals, onSpeak }: AnimalActivitiesProps) {
  const target = animals[1];
  return (
    <ChoiceActivity
      icon="👂"
      title="Qui est-ce ?"
      instruction={`🔊 Nghe: “${target.word}”. Chạm vào con vật đúng.`}
      prompt={target.word}
      options={animals.slice(0, 3)}
      answer={target.word}
      onSpeak={() => onSpeak(target.word)}
    />
  );
}

export function AnimalColorActivity({ onSpeak }: { onSpeak: (text: string) => void }) {
  const options: readonly AnimalChoice[] = [
    { word: "le chat", meaning: "con mèo", emoji: "🐱", color: "bleu" },
    { word: "le chien", meaning: "con chó", emoji: "🐶", color: "rouge" },
    { word: "le lapin", meaning: "con thỏ", emoji: "🐰", color: "vert" },
    { word: "l’oiseau", meaning: "con chim", emoji: "🐦", color: "jaune" },
  ];
  const [selected, setSelected] = useState<string | null>(null);
  const answer = "le chat";

  return (
    <div>
      <ActivityHeading icon="🎨" title="Couleur et animal" instruction="🐱 Le chat est bleu. Chạm vào con mèo màu xanh dương." />
      <div className="grid grid-cols-2 gap-3">
        {options.map((animal) => (
          <button
            key={animal.word}
            type="button"
            onClick={() => setSelected(animal.word)}
            className={`rounded-3xl border-2 p-4 text-center ${
              selected === animal.word
                ? animal.word === answer
                  ? "border-[#4F8A5B] bg-[#EAF5EC]"
                  : "border-[#D94A4A] bg-[#FFF0F0]"
                : "border-[#E9DDC8] bg-white"
            }`}
          >
            <span className="block text-5xl">{animal.emoji}</span>
            <span className="mt-2 block font-black text-[#315A8D]">{animal.word}</span>
            <span className="mt-2 mx-auto block h-7 w-7 rounded-full" style={{ background: colors.find((color) => color.name === animal.color)?.hex }} />
          </button>
        ))}
      </div>
      <button type="button" onClick={() => onSpeak("Le chat est bleu.")} className="mx-auto mt-5 block rounded-full bg-[#315A8D] px-6 py-3 font-black text-white">🔊 Nghe câu</button>
      {selected && <Feedback text={selected === answer ? "🌟 Đúng rồi! Le chat est bleu." : "💡 Chưa đúng. Hãy tìm con mèo màu xanh dương."} correct={selected === answer} />}
    </div>
  );
}

export function AnimalSoundActivity({ animals, onSpeak }: AnimalActivitiesProps) {
  const options = animals.slice(0, 3);
  const target = options[0];
  return (
    <ChoiceActivity
      icon="🔊"
      title="Đoán tiếng kêu"
      instruction="🔊 Nghe tiếng kêu. Qui est-ce ? Chọn con vật đúng."
      prompt="Miaou !"
      options={options}
      answer={target.word}
      onSpeak={() => onSpeak("Miaou !")}
    />
  );
}

export function AnimalSpeakingActivity() {
  return (
    <div>
      <ActivityHeading icon="🎙️" title="Nói cùng bạn nhỏ" instruction="🎤 Nghe rồi nói: “le chat”." />
      <Recorder phrase="Le chat." translation="Con mèo." />
    </div>
  );
}

export function AnimalSentenceActivity({ onSpeak }: { onSpeak: (text: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = [
    { word: "le chat", emoji: "🐱" },
    { word: "le chien", emoji: "🐶" },
    { word: "le lapin", emoji: "🐰" },
  ];
  const answer = "le lapin";

  return (
    <div>
      <ActivityHeading icon="💬" title="Dùng lại từ mới" instruction="👋 Nghe câu rồi chọn bạn nhỏ trong câu." />
      <div className="rounded-3xl bg-[#EEF4FA] p-6 text-center">
        <p className="text-2xl font-black text-[#315A8D]">Bonjour, petit lapin !</p>
        <button type="button" onClick={() => onSpeak("Bonjour, petit lapin !")} className="mt-4 rounded-full bg-white px-6 py-3 font-black text-[#315A8D]">🔊 Nghe câu</button>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {options.map((option) => (
          <button key={option.word} type="button" onClick={() => setSelected(option.word)} className={`rounded-3xl border-2 p-4 text-center ${selected === option.word ? option.word === answer ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#D94A4A] bg-[#FFF0F0]" : "border-[#E9DDC8] bg-white"}`}>
            <span className="block text-5xl">{option.emoji}</span>
            <span className="mt-2 block font-black text-[#315A8D]">{option.word}</span>
          </button>
        ))}
      </div>
      {selected && <Feedback text={selected === answer ? "🎉 Bonjour, petit lapin !" : "💡 Nghe lại và tìm chú thỏ nhé."} correct={selected === answer} />}
    </div>
  );
}

export function AnimalMission({ onSpeak }: { onSpeak: (text: string) => void }) {
  const [done, setDone] = useState<boolean[]>([false, false, false, false]);
  const [colorChoice, setColorChoice] = useState<string | null>(null);
  const [animalChoice, setAnimalChoice] = useState<string | null>(null);
  const allDone = done.every(Boolean);

  function complete(index: number) {
    setDone((current) => current.map((value, i) => (i === index ? true : value)));
  }

  return (
    <div>
      <ActivityHeading icon="🐾" title="Nhiệm vụ cuối trong rừng" instruction="🐾 Hoàn thành 4 nhiệm vụ để giúp các con vật về nhà." />
      <div className="space-y-4">
        <MissionRow number="1" text="Nghe và tìm le chien." done={done[0]}>
          <button type="button" onClick={() => { onSpeak("Le chien"); complete(0); }} className="rounded-full bg-[#315A8D] px-5 py-3 font-black text-white">🔊 Nghe và tìm 🐶</button>
        </MissionRow>
        <MissionRow number="2" text="Tìm con vật màu rouge." done={done[1]}>
          <div className="flex flex-wrap gap-2">
            {colors.slice(0, 3).map((color) => <button key={color.name} type="button" onClick={() => { setColorChoice(color.name); if (color.name === "rouge") complete(1); }} className={`h-12 w-12 rounded-full ${colorChoice === color.name ? "ring-4 ring-[#315A8D]" : ""}`} style={{ background: color.hex }} aria-label={color.name} />)}
          </div>
        </MissionRow>
        <MissionRow number="3" text="Nghe và chọn le chat." done={done[2]}>
          <div className="flex gap-2">
            {[["le chat", "🐱"], ["le chien", "🐶"], ["le lapin", "🐰"]].map(([word, emoji]) => <button key={word} type="button" onClick={() => { onSpeak(word); setAnimalChoice(word); if (word === "le chat") complete(2); }} className={`rounded-2xl border-2 px-4 py-3 text-3xl ${animalChoice === word ? "border-[#315A8D] bg-[#EEF4FA]" : "border-[#E9DDC8]"}`}>{emoji}</button>)}
          </div>
        </MissionRow>
        <MissionRow number="4" text="Nói: Bonjour, le lapin !" done={done[3]}>
          <button type="button" onClick={() => complete(3)} className="rounded-full bg-[#D94A4A] px-5 py-3 font-black text-white">🎤 Con đã nói xong</button>
        </MissionRow>
      </div>
      {allDone && <Feedback text="🎉 Các con vật đã về nhà!" correct />}
    </div>
  );
}

function ChoiceActivity({ icon, title, instruction, prompt, options, answer, onSpeak }: { icon: string; title: string; instruction: string; prompt: string; options: readonly Animal[]; answer: string; onSpeak: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const correct = selected === answer;

  return (
    <div>
      <ActivityHeading icon={icon} title={title} instruction={instruction} />
      <div className="text-center">
        <button type="button" onClick={onSpeak} className="rounded-2xl bg-[#315A8D] px-7 py-4 text-xl font-black text-white">🔊 {prompt}</button>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {options.map((animal) => (
          <button key={animal.word} type="button" onClick={() => setSelected(animal.word)} className={`rounded-3xl border-2 p-3 text-center ${selected === animal.word ? animal.word === answer ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#D94A4A] bg-[#FFF0F0]" : "border-[#E9DDC8] bg-white"}`}>
            <span className="block text-5xl">{animal.emoji}</span>
            <span className="mt-2 block text-sm font-black text-[#315A8D]">{animal.word}</span>
          </button>
        ))}
      </div>
      {selected && <Feedback text={correct ? "🎉 Chính xác!" : "💡 Chưa đúng. Thử lại nhẹ nhàng nhé."} correct={correct} />}
    </div>
  );
}

function ActivityHeading({ icon, title, instruction }: { icon: string; title: string; instruction: string }) {
  return (
    <div className="mb-6 text-center">
      <div className="text-6xl">{icon}</div>
      <h2 className="mt-3 text-2xl font-black text-[#294A3A]">{title}</h2>
      <p className="mt-3 text-lg font-semibold text-[#315A8D]">{instruction}</p>
    </div>
  );
}

function MissionRow({ number, text, done, children }: { number: string; text: string; done: boolean; children: React.ReactNode }) {
  return (
    <div className={`rounded-3xl border-2 p-4 ${done ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#E9DDC8] bg-white"}`}>
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#315A8D] font-black text-white">{done ? "✓" : number}</span>
        <div className="min-w-0 flex-1">
          <p className="font-black text-[#4A3828]">{text}</p>
          <div className="mt-3">{done ? <p className="font-bold text-[#35633F]">🎉 Xong rồi!</p> : children}</div>
        </div>
      </div>
    </div>
  );
}

function Feedback({ text, correct }: { text: string; correct: boolean }) {
  return <p className={`mt-5 rounded-2xl p-4 text-center font-black ${correct ? "bg-[#EAF5EC] text-[#35633F]" : "bg-[#FFF0F0] text-[#B63838]"}`}>{text}</p>;
}
