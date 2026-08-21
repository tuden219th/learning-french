"use client";

import { useEffect, useState } from "react";
import Recorder from "./Recorder";

export type ClassroomItem = {
  id: string;
  word: string;
  meaning: string;
  emoji: string;
  audioFile: string;
};

type ClassroomProps = {
  onSpeak: (text: string, audioFile?: string) => void;
  onComplete?: () => void;
};

export const classroomItems: readonly ClassroomItem[] = [
  { id: "livre", word: "un livre", meaning: "một quyển sách", emoji: "📖", audioFile: "un-livre.mp3" },
  { id: "cahier", word: "un cahier", meaning: "một quyển vở", emoji: "📒", audioFile: "un-cahier.mp3" },
  { id: "crayon", word: "un crayon", meaning: "một bút chì", emoji: "✏️", audioFile: "un-crayon.mp3" },
  { id: "stylo", word: "un stylo", meaning: "một bút mực", emoji: "🖊️", audioFile: "un-stylo.mp3" },
  { id: "gomme", word: "une gomme", meaning: "một cục tẩy", emoji: "🧼", audioFile: "une-gomme.mp3" },
  { id: "regle", word: "une règle", meaning: "một cái thước", emoji: "📏", audioFile: "une-regle.mp3" },
  { id: "sac", word: "un sac", meaning: "một cái cặp", emoji: "🎒", audioFile: "un-sac.mp3" },
  { id: "table", word: "une table", meaning: "một cái bàn", emoji: "🪑", audioFile: "une-table.mp3" },
  { id: "chaise", word: "une chaise", meaning: "một cái ghế", emoji: "🪑", audioFile: "une-chaise.mp3" },
  { id: "tableau", word: "un tableau", meaning: "một cái bảng", emoji: "🧑‍🏫", audioFile: "un-tableau.mp3" },
];

const itemById = (id: string) => classroomItems.find((item) => item.id === id) ?? classroomItems[0];

export function ClassroomDiscovery({ onSpeak, onComplete }: ClassroomProps) {
  const [heard, setHeard] = useState<string[]>([]);
  const visibleItems = classroomItems.slice(0, 6);

  useEffect(() => {
    if (heard.length === classroomItems.length) onComplete?.();
  }, [heard.length, onComplete]);

  return (
    <div>
      <Heading icon="🏫" title="Dans la classe" instruction="Chạm vào từng đồ vật để nghe tiếng Pháp." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {visibleItems.map((item) => <button key={item.id} type="button" onClick={() => { setHeard((current) => current.includes(item.id) ? current : [...current, item.id]); onSpeak(item.word, item.audioFile); }} className={`rounded-3xl border-2 p-4 text-center ${heard.includes(item.id) ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#E9DDC8] bg-[#FFF8EA]"}`}><span className="block text-5xl">{item.emoji}</span><span className="mt-2 block font-black text-[#315A8D]">{item.word}</span><span className="mt-1 block text-sm text-[#806C58]">{item.meaning}</span></button>)}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{classroomItems.slice(6).map((item) => <button key={item.id} type="button" onClick={() => { setHeard((current) => current.includes(item.id) ? current : [...current, item.id]); onSpeak(item.word, item.audioFile); }} className={`rounded-3xl border-2 p-4 text-center ${heard.includes(item.id) ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#E9DDC8] bg-[#FFF8EA]"}`}><span className="block text-4xl">{item.emoji}</span><span className="mt-2 block text-sm font-black text-[#315A8D]">{item.word}</span></button>)}</div>
      {heard.length === classroomItems.length && <Feedback correct text="🎉 Con đã khám phá cả lớp học!" />}
    </div>
  );
}

export function ClassroomChoice({ onSpeak, onComplete }: ClassroomProps) {
  const target = itemById("cahier");
  const options = [itemById("livre"), target, itemById("stylo")];
  const [selected, setSelected] = useState<string | null>(null);
  const correct = selected === target.id;

  return <div><Heading icon="👂" title="Écoute et choisis" instruction={`Nghe “${target.word}”, rồi chọn đồ vật đúng.`} /><button type="button" onClick={() => onSpeak(target.word, target.audioFile)} className="mx-auto block rounded-2xl bg-[#315A8D] px-7 py-4 text-xl font-black text-white">🔊 Nghe {target.word}</button><div className="mt-6 grid grid-cols-3 gap-3">{options.map((item) => <button key={item.id} type="button" onClick={() => { setSelected(item.id); if (item.id === target.id) onComplete?.(); }} className={`rounded-3xl border-2 p-4 text-center ${selected === item.id ? item.id === target.id ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#D94A4A] bg-[#FFF0F0]" : "border-[#E9DDC8] bg-white"}`}><span className="block text-5xl">{item.emoji}</span><span className="mt-2 block text-sm font-black text-[#315A8D]">{item.word}</span></button>)}</div>{selected && <Feedback correct={correct} text={correct ? "🎉 Chính xác!" : "💡 Nghe lại và thử tiếp nhé."} />}</div>;
}

export function ClassroomMatching({ onSpeak, onComplete }: ClassroomProps) {
  const pairs = classroomItems.slice(0, 4);
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const choose = (id: string) => {
    if (!selected || matched.includes(id)) return;
    if (selected === id) {
      const next = [...matched, id]; setMatched(next); setFeedback("🎉 Nối đúng rồi!"); setSelected(null); if (next.length === pairs.length) onComplete?.();
    } else { setFeedback("💡 Chưa đúng. Thử lại nhé!"); setSelected(null); }
  };
  return <div><Heading icon="🔗" title="Associe" instruction="Nghe từ, chọn thẻ chữ rồi nối với đồ vật." /><div className="grid grid-cols-2 gap-3">{pairs.map((item) => <div key={item.id} className={`rounded-3xl border-2 p-3 text-center ${matched.includes(item.id) ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#E9DDC8] bg-white"}`}><button type="button" onClick={() => { setSelected(item.id); onSpeak(item.word, item.audioFile); }} className="text-5xl">{item.emoji}</button><button type="button" onClick={() => choose(item.id)} className="mt-2 block w-full rounded-xl bg-[#EEF4FA] p-2 text-sm font-black text-[#315A8D]">{item.word}</button></div>)}</div>{feedback && <Feedback correct={matched.length > 0 && feedback.startsWith("🎉")} text={feedback} />}</div>;
}

export function ClassroomMemory({ onSpeak, onComplete }: ClassroomProps) {
  const items = classroomItems.slice(0, 4);
  const [hidden, setHidden] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const pick = (id: string) => { const next = selected.includes(id) ? selected.filter((value) => value !== id) : [...selected, id]; setSelected(next); if (next.length === 2) { const correct = next[0] === "livre" && next[1] === "cahier" || next[0] === "cahier" && next[1] === "livre"; setFeedback(correct ? "🎉 Mémoire parfaite!" : "💡 Essaie encore."); if (correct) onComplete?.(); } };
  return <div><Heading icon="🧠" title="Mémoire" instruction="Nhớ vị trí của un livre và un cahier." />{hidden ? <><div className="grid grid-cols-2 gap-3">{items.map((item) => <button key={item.id} type="button" onClick={() => onSpeak(item.word, item.audioFile)} className="rounded-3xl bg-[#EEF4FA] p-6 text-5xl">{item.emoji}</button>)}</div><button type="button" onClick={() => setHidden(false)} className="mt-5 w-full rounded-2xl bg-[#294A3A] px-6 py-3 font-bold text-white">Ẩn và bắt đầu</button></> : <div className="grid grid-cols-2 gap-3">{items.map((item) => <button key={item.id} type="button" onClick={() => pick(item.id)} className={`rounded-3xl border-2 p-5 text-center ${selected.includes(item.id) ? "border-[#C96A2B] bg-[#FFF8EA]" : "border-[#E9DDC8] bg-white"}`}><span className="block text-5xl">{item.emoji}</span><span className="mt-2 block text-sm font-black">{item.word}</span></button>)}</div>}{feedback && <Feedback correct={feedback.startsWith("🎉")} text={feedback} />}</div>;
}

export function ClassroomObjectColor({ onSpeak, onComplete }: ClassroomProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = [{ id: "livre", word: "C'est un livre.", color: "#E63946", audioFile: "le-livre-est-rouge.mp3" }, { id: "crayon", word: "C'est un crayon.", color: "#2874F0", audioFile: "le-crayon-est-bleu.mp3" }, { id: "gomme", word: "C'est une gomme.", color: "#FFFFFF", audioFile: "la-gomme-est-blanche.mp3" }];
  return <div><Heading icon="🎨" title="Objet et couleur" instruction="Nghe câu, rồi chọn đồ vật và màu đúng." /><div className="grid grid-cols-3 gap-3">{options.map((option) => <button key={option.id} type="button" onClick={() => { setSelected(option.id); onSpeak(option.word, option.audioFile); if (option.id === "livre") onComplete?.(); }} className={`rounded-3xl border-2 p-4 ${selected === option.id ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#E9DDC8] bg-white"}`}><span className="block text-5xl">{itemById(option.id).emoji}</span><span className="mx-auto mt-3 block h-8 w-8 rounded-full border" style={{ background: option.color }} /><span className="mt-2 block text-xs font-black text-[#315A8D]">{option.word}</span></button>)}</div></div>;
}

export function ClassroomCount({ onSpeak, onComplete }: ClassroomProps) {
  const [selected, setSelected] = useState<number | null>(null);
  return <div><Heading icon="🔢" title="Compte les objets" instruction="Combien de crayons? Nghe và chọn số đúng." /><div className="rounded-3xl bg-[#FFF8EA] p-6 text-center text-5xl">✏️ ✏️ ✏️</div><button type="button" onClick={() => onSpeak("Trois crayons.", "trois-crayons.mp3")} className="mx-auto mt-5 block rounded-2xl bg-[#315A8D] px-7 py-4 text-xl font-black text-white">🔊 Nghe câu</button><div className="mt-5 grid grid-cols-3 gap-3">{[2, 3, 5].map((number) => <button key={number} type="button" onClick={() => { setSelected(number); if (number === 3) onComplete?.(); }} className={`rounded-3xl border-2 p-5 text-3xl font-black ${selected === number ? number === 3 ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#D94A4A] bg-[#FFF0F0]" : "border-[#E9DDC8] bg-white"}`}>{number}</button>)}</div>{selected !== null && <Feedback correct={selected === 3} text={selected === 3 ? "🎉 Trois crayons!" : "💡 Đếm lại nhé."} />}</div>;
}

export function ClassroomSpeaking({ onSpeak, onComplete }: ClassroomProps) {
  return <div><Heading icon="🎙️" title="Dis le mot" instruction="Nghe mẫu, rồi nói: C'est un livre." /><button type="button" onClick={() => onSpeak("C'est un livre.", "c-est-un-livre.mp3")} className="mx-auto mb-5 block rounded-full bg-[#315A8D] px-6 py-3 font-black text-white">🔊 Nghe mẫu</button><Recorder phrase="C'est un livre." translation="Đây là một quyển sách." onComplete={onComplete} /></div>;
}

export function ClassroomMission({ onSpeak, onComplete }: ClassroomProps) {
  const [done, setDone] = useState<string[]>([]);
  const tasks = [{ id: "book", label: "Le livre est rouge.", audio: "le-livre-est-rouge.mp3" }, { id: "pencil", label: "Le crayon est bleu.", audio: "le-crayon-est-bleu.mp3" }, { id: "count", label: "Deux livres.", audio: "deux-livres.mp3" }];
  const finish = (id: string, audio: string, text: string) => { onSpeak(text, audio); setDone((current) => { const next = current.includes(id) ? current : [...current, id]; if (next.length === tasks.length) onComplete?.(); return next; }); };
  return <div><Heading icon="🏆" title="Mission finale" instruction="Hoàn thành 3 thử thách trong lớp học." /><div className="space-y-3">{tasks.map((task) => <button key={task.id} type="button" onClick={() => finish(task.id, task.audio, task.label)} className={`flex w-full items-center gap-3 rounded-3xl border-2 p-5 text-left font-black ${done.includes(task.id) ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#E9DDC8] bg-white"}`}><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#315A8D] text-white">{done.includes(task.id) ? "✓" : "🔊"}</span><span>{task.label}</span></button>)}</div>{done.length === tasks.length && <Feedback correct text="🎉 Mission réussie!" />}</div>;
}

function Heading({ icon, title, instruction }: { icon: string; title: string; instruction: string }) { return <div className="mb-6 text-center"><div className="text-6xl">{icon}</div><h2 className="mt-3 text-2xl font-black text-[#294A3A]">{title}</h2><p className="mt-3 text-lg font-semibold text-[#315A8D]">{instruction}</p></div>; }
function Feedback({ text, correct }: { text: string; correct: boolean }) { return <p className={`mt-5 rounded-2xl p-4 text-center font-black ${correct ? "bg-[#EAF5EC] text-[#35633F]" : "bg-[#FFF0F0] text-[#B63838]"}`}>{text}</p>; }