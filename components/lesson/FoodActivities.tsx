"use client";

import { useState } from "react";
import Recorder from "./Recorder";

type Food = {
  id: string;
  word: string;
  meaning: string;
  emoji: string;
  audioFile: string;
};

type FoodProps = {
  onSpeak: (text: string, audioFile?: string) => void;
  onComplete?: () => void;
};

export const picnicFoods: readonly Food[] = [
  { id: "pomme", word: "pomme", meaning: "quả táo", emoji: "🍎", audioFile: "pomme.mp3" },
  { id: "banane", word: "banane", meaning: "quả chuối", emoji: "🍌", audioFile: "banane.mp3" },
  { id: "pain", word: "pain", meaning: "bánh mì", emoji: "🥖", audioFile: "pain.mp3" },
  { id: "lait", word: "lait", meaning: "sữa", emoji: "🥛", audioFile: "lait.mp3" },
  { id: "fromage", word: "fromage", meaning: "phô mai", emoji: "🧀", audioFile: "fromage.mp3" },
  { id: "fraise", word: "fraise", meaning: "quả dâu", emoji: "🍓", audioFile: "fraise.mp3" },
  { id: "eau", word: "eau", meaning: "nước", emoji: "💧", audioFile: "eau.mp3" },
  { id: "gateau", word: "gâteau", meaning: "bánh ngọt", emoji: "🍰", audioFile: "gâteau.mp3" },
];

export function FoodIntro({ onSpeak, onComplete }: FoodProps) {
  return (
    <div>
      <FoodHeading icon="🧺" title="Le pique-nique magique" instruction="🧺 Chuẩn bị một giỏ picnic bằng tiếng Pháp!" />
      <div className="rounded-3xl bg-[#FFF8EA] p-6 text-center">
        <div className="text-8xl">🏕️</div>
        <p className="mt-4 text-lg font-black text-[#315A8D]">Một buổi picnic đang chờ con.</p>
        <div className="mt-5 flex justify-center gap-2 text-4xl">🧺 🍎 🥖 🍓</div>
        <button type="button" onClick={() => { onComplete?.(); onSpeak("pique-nique"); }} className="mt-6 rounded-2xl bg-[#D94A4A] px-8 py-4 text-lg font-black text-white">🌳 Bắt đầu picnic</button>
      </div>
    </div>
  );
}

export function FoodTeaching({ group, onSpeak, onComplete }: FoodProps & { group: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"learn" | "explore" | "done">("learn");
  const [selected, setSelected] = useState<string | null>(null);
  const foods = group.map((id) => picnicFoods.find((food) => food.id === id)).filter((food): food is Food => Boolean(food));
  const current = foods[index];
  const target = foods[foods.length - 1];

  return (
    <div>
      <FoodHeading icon="🧺" title="Découvre les aliments" instruction={phase === "learn" ? "👀 Nhìn, nghe và nhớ món ăn." : `🔊 Nghe “${target.word}”, rồi tìm món đúng.`} />
      <div className="mb-5 flex justify-center gap-2">{foods.map((food, foodIndex) => <span key={food.id} className={`h-3 w-3 rounded-full ${foodIndex < index || phase !== "learn" ? "bg-[#F4C95D]" : "bg-[#DCE7F2]"}`} />)}</div>
      {phase === "learn" && (
        <div className="text-center">
          <div className="rounded-3xl bg-[#EEF4FA] p-6">
            <div className="text-8xl">{current.emoji}</div>
            <p className="mt-3 text-3xl font-black text-[#315A8D]">{current.word}</p>
            <p className="mt-2 text-[#806C58]">{current.meaning}</p>
            <p className="mt-4 text-lg font-bold text-[#4A3828]">C’est {current.word}.</p>
          </div>
          <button type="button" onClick={() => onSpeak(current.word, current.audioFile)} className="mt-5 rounded-2xl bg-[#315A8D] px-7 py-4 text-xl font-black text-white">🔊 Nghe {current.word}</button>
          <button type="button" onClick={() => index < foods.length - 1 ? setIndex((value) => value + 1) : setPhase("explore")} className="mt-4 block w-full rounded-2xl bg-[#D94A4A] px-6 py-4 text-lg font-black text-white">{index < foods.length - 1 ? "Món tiếp theo →" : "Khám phá giỏ →"}</button>
        </div>
      )}
      {phase === "explore" && (
        <div>
          <div className="text-center"><button type="button" onClick={() => onSpeak(target.word, target.audioFile)} className="rounded-2xl bg-[#315A8D] px-7 py-4 text-xl font-black text-white">🔊 {target.word}</button></div>
          <div className="mt-6 grid grid-cols-2 gap-3">{foods.map((food) => <button key={food.id} type="button" onClick={() => { setSelected(food.id); if (food.id === target.id) { setPhase("done"); onComplete?.(); } }} className={`rounded-3xl border-2 p-4 text-center ${selected === food.id ? food.id === target.id ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#D94A4A] bg-[#FFF0F0]" : "border-[#E9DDC8] bg-white"}`}><span className="block text-6xl">{food.emoji}</span><span className="mt-2 block font-black text-[#315A8D]">{food.word}</span></button>)}</div>
          {selected && <FoodFeedback correct={selected === target.id} text={selected === target.id ? "🎉 Đúng rồi!" : "👀 Essaie encore !"} />}
        </div>
      )}
      {phase === "done" && <FoodFeedback correct text={`🎉 C’est ${target.word} !`} />}
    </div>
  );
}

export function FoodBasket({ onSpeak, onComplete }: FoodProps) {
  const [basket, setBasket] = useState<string[]>([]);
  const required = ["pomme", "banane", "pain"];
  function toggle(food: Food) {
    setBasket((current) => {
      const next = current.includes(food.id) ? current.filter((id) => id !== food.id) : [...current, food.id];
      if (required.every((id) => next.includes(id))) onComplete?.();
      return next;
    });
    onSpeak(food.word, food.audioFile);
  }
  const complete = required.every((id) => basket.includes(id));
  return (
    <div>
      <FoodHeading icon="🧺" title="Prépare le panier" instruction="🧺 Chọn pomme, banane và pain để bỏ vào giỏ." />
      <div className="rounded-3xl bg-[#FFF8EA] p-5 text-center"><div className="text-7xl">{complete ? "🧺✨" : "🧺"}</div><p className="mt-2 font-black text-[#315A8D]">🎒 Mon panier: {basket.length} món</p><div className="mt-3 flex min-h-10 flex-wrap justify-center gap-2 text-3xl">{basket.map((id) => <span key={id}>{picnicFoods.find((food) => food.id === id)?.emoji}</span>)}</div></div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{picnicFoods.slice(0, 4).map((food) => <button key={food.id} type="button" onClick={() => toggle(food)} className={`rounded-3xl border-2 p-4 text-center ${basket.includes(food.id) ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#E9DDC8] bg-white"}`}><span className="block text-5xl">{food.emoji}</span><span className="mt-2 block font-black text-[#315A8D]">{food.word}</span></button>)}</div>
      {complete && <FoodFeedback correct text="🎉 Giỏ picnic đã sẵn sàng!" />}
    </div>
  );
}

export function FoodListen({ onSpeak, onComplete }: FoodProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const target = picnicFoods[4];
  return <div><FoodHeading icon="👂" title="Écoute et trouve" instruction="🔊 Nghe từ rồi tìm đúng món ăn." /><div className="text-center"><button type="button" onClick={() => onSpeak(target.word, target.audioFile)} className="rounded-2xl bg-[#315A8D] px-7 py-4 text-xl font-black text-white">🔊 Nghe fromage</button></div><div className="mt-6 grid grid-cols-3 gap-3">{[picnicFoods[1], target, picnicFoods[6]].map((food) => <button key={food.id} type="button" onClick={() => { setSelected(food.id); if (food.id === target.id) onComplete?.(); }} className={`rounded-3xl border-2 p-4 text-center ${selected === food.id ? food.id === target.id ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#D94A4A] bg-[#FFF0F0]" : "border-[#E9DDC8] bg-white"}`}><span className="block text-6xl">{food.emoji}</span><span className="mt-2 block font-black text-[#315A8D]">{food.word}</span></button>)}</div>{selected && <FoodFeedback correct={selected === target.id} text={selected === target.id ? "🎉 Bravo !" : "👀 Essaie encore !"} />}</div>;
}

export function FoodCount({ onSpeak, onComplete }: FoodProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answer = 3;
  return <div><FoodHeading icon="🔢" title="Compte les fraises" instruction="🔢 Đếm dâu tây. Combien ?" /><div className="rounded-3xl bg-[#FFF8EA] p-6 text-center text-6xl">🍓 🍓 🍓</div><div className="mt-6 grid grid-cols-3 gap-3">{[2, 3, 5].map((number) => <button key={number} type="button" onClick={() => { setSelected(number); onSpeak(number === 2 ? "deux" : number === 3 ? "trois" : "cinq", number === 2 ? "deux.mp3" : number === 3 ? "trois.mp3" : "cinq.mp3"); if (number === answer) onComplete?.(); }} className={`min-h-20 rounded-3xl border-2 text-3xl font-black ${selected === number ? number === answer ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#D94A4A] bg-[#FFF0F0]" : "border-[#E9DDC8] bg-white"}`}>{number}</button>)}</div>{selected !== null && <FoodFeedback correct={selected === answer} text={selected === answer ? "🎉 Trois fraises !" : "💡 Đếm lại nhé."} />}</div>;
}

export function FoodColor({ onComplete }: FoodProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = [{ id: "red", word: "pomme rouge", emoji: "🍎", color: "#E63946" }, { id: "blue", word: "pomme bleue", emoji: "🍎", color: "#2874F0" }, { id: "yellow", word: "pomme jaune", emoji: "🍎", color: "#F4D35E" }];
  return <div><FoodHeading icon="🎨" title="Nourriture et couleurs" instruction="🎨 Trouve la pomme rouge." /><div className="grid grid-cols-3 gap-3">{options.map((option) => <button key={option.id} type="button" onClick={() => { setSelected(option.id); if (option.id === "red") onComplete?.(); }} className={`rounded-3xl border-2 p-4 text-center ${selected === option.id ? option.id === "red" ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#D94A4A] bg-[#FFF0F0]" : "border-[#E9DDC8] bg-white"}`}><span className="block text-6xl">{option.emoji}</span><span className="mx-auto mt-3 block h-8 w-8 rounded-full" style={{ background: option.color }} /><span className="mt-2 block text-sm font-black text-[#315A8D]">{option.word}</span></button>)}</div>{selected && <FoodFeedback correct={selected === "red"} text={selected === "red" ? "❤️ Bravo !" : "👀 Essaie encore !"} />}</div>;
}

export function FoodWorld({ onSpeak, onComplete }: FoodProps) {
  const [found, setFound] = useState<string | null>(null);
  return <div><FoodHeading icon="🌍" title="Le monde de Từ Đến" instruction="🐶👩 Một người bạn và một thành viên gia đình đến picnic." /><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => { setFound("chien"); onSpeak("Bonjour, le chien !"); }} className="rounded-3xl border-2 border-[#E9DDC8] bg-[#EEF4FA] p-5 text-center"><span className="block text-7xl">🐶</span><span className="font-black text-[#315A8D]">le chien</span></button><button type="button" onClick={() => { setFound("maman"); onSpeak("Bonjour, maman !"); }} className="rounded-3xl border-2 border-[#E9DDC8] bg-[#FFF8EA] p-5 text-center"><span className="block text-7xl">👩</span><span className="font-black text-[#315A8D]">maman</span></button></div>{found && <><FoodFeedback correct text={`👋 Bonjour, ${found} !`} /><button type="button" onClick={() => onComplete?.()} className="mx-auto mt-4 block rounded-full bg-[#D94A4A] px-6 py-3 font-black text-white">🎒 Mời vào picnic</button></>}</div>;
}

export function FoodSpeaking({ onSpeak, onComplete }: FoodProps) {
  return <div><FoodHeading icon="🎙️" title="Dis le mot" instruction="👂 Nghe mẫu, rồi nói: “pomme”." /><div className="mb-5 text-center"><button type="button" onClick={() => onSpeak("pomme", "pomme.mp3")} className="rounded-full bg-[#315A8D] px-6 py-3 font-black text-white">🔊 Nghe mẫu</button></div><Recorder phrase="Pomme." translation="Quả táo." onComplete={onComplete} /></div>;
}

export function FoodChallenge({ onSpeak, onComplete }: FoodProps) {
  const [items, setItems] = useState<string[]>([]);
  const required = ["pomme", "fraise", "eau"];
  const done = required.every((id) => items.includes(id));
  function add(id: string) { setItems((current) => current.includes(id) ? current : [...current, id]); onSpeak(id, picnicFoods.find((food) => food.id === id)?.audioFile); }
  return <div><FoodHeading icon="🔐" title="SECRET PICNIC" instruction="🧺 Hoàn thành giỏ bí mật: pomme, fraise và eau." /><div className="rounded-3xl bg-[#FFF8EA] p-5 text-center"><div className="text-7xl">{done ? "🧺✨" : "🧺🔒"}</div><p className="mt-2 font-black text-[#315A8D]">🎒 Mon panier: {items.length}/3</p><div className="mt-3 flex justify-center gap-2 text-3xl">{items.map((id) => <span key={id}>{picnicFoods.find((food) => food.id === id)?.emoji}</span>)}</div></div><div className="mt-5 grid grid-cols-3 gap-3">{[picnicFoods[0], picnicFoods[5], picnicFoods[6], picnicFoods[1]].map((food) => <button key={food.id} type="button" onClick={() => add(food.id)} className={`rounded-3xl border-2 p-4 text-center ${items.includes(food.id) ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#E9DDC8] bg-white"}`}><span className="block text-5xl">{food.emoji}</span><span className="mt-2 text-sm font-black text-[#315A8D]">{food.word}</span></button>)}</div>{done && <><FoodFeedback correct text="🔓 Panier secret réussi !" /><button type="button" onClick={() => onComplete?.()} className="mx-auto mt-4 block rounded-full bg-[#D94A4A] px-7 py-3 font-black text-white">🏅 Nhận badge</button></>}</div>;
}

function FoodHeading({ icon, title, instruction }: { icon: string; title: string; instruction: string }) {
  return <div className="mb-6 text-center"><div className="text-6xl">{icon}</div><h2 className="mt-3 text-2xl font-black text-[#294A3A]">{title}</h2><p className="mt-3 text-lg font-semibold text-[#315A8D]">{instruction}</p></div>;
}

function FoodFeedback({ text, correct }: { text: string; correct: boolean }) {
  return <p className={`mt-5 rounded-2xl p-4 text-center font-black ${correct ? "bg-[#EAF5EC] text-[#35633F]" : "bg-[#FFF0F0] text-[#B63838]"}`}>{text}</p>;
}
