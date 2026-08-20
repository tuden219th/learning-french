"use client";

import { useState } from "react";
import Recorder from "./Recorder";

type FamilyMember = {
  id: string;
  word: string;
  meaning: string;
  emoji: string;
  audioFile: string;
};

type FamilyProps = {
  onSpeak: (text: string, audioFile?: string) => void;
  onComplete?: () => void;
};

export const familySalonMembers: readonly FamilyMember[] = [
  { id: "maman", word: "maman", meaning: "mẹ", emoji: "👩", audioFile: "maman.mp3" },
  { id: "papa", word: "papa", meaning: "bố", emoji: "👨", audioFile: "papa.mp3" },
  { id: "frere", word: "frère", meaning: "anh/em trai", emoji: "👦", audioFile: "frere.mp3" },
  { id: "soeur", word: "sœur", meaning: "chị/em gái", emoji: "👧", audioFile: "soeur.mp3" },
];

export const familyBedroomMembers: readonly FamilyMember[] = [
  { id: "bebe", word: "bébé", meaning: "em bé", emoji: "👶", audioFile: "bebe.mp3" },
  { id: "grand-pere", word: "grand-père", meaning: "ông", emoji: "👴", audioFile: "grand-pere.mp3" },
  { id: "grand-mere", word: "grand-mère", meaning: "bà", emoji: "👵", audioFile: "grand-mere.mp3" },
];

const salonMembers = familySalonMembers;

export function FamilyIntro({ onSpeak, onComplete }: FamilyProps) {
  return (
    <div>
      <FamilyHeading icon="🏠" title="La maison magique" instruction="🏠 Bienvenue dans la maison magique ! Bấm cửa để bước vào." />
      <div className="rounded-3xl bg-[#FFF8EA] p-5 text-center">
        <div className="text-8xl">🏠</div>
        <p className="mt-4 text-lg font-black text-[#315A8D]">Một gia đình đang chờ con khám phá.</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-left sm:grid-cols-4">
          {["🚪 Salon", "🚪 Chambre", "🔒 Secret", "✨ Famille"].map((room) => <div key={room} className="rounded-2xl bg-white p-3 text-center text-sm font-black text-[#4A3828]">{room}</div>)}
        </div>
        <button type="button" onClick={() => { onSpeak("famille", "famille.mp3"); onComplete?.(); }} className="mt-6 rounded-2xl bg-[#D94A4A] px-8 py-4 text-lg font-black text-white">🚪 Entrer</button>
      </div>
    </div>
  );
}

export function FamilyTeachingRoom({ room, members, onSpeak, onComplete }: FamilyProps & { room: "Salon" | "Chambre"; members: readonly FamilyMember[] }) {
  const [phase, setPhase] = useState<"learn" | "find" | "done">("learn");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const current = members[index];
  const target = members[members.length - 1];

  return (
    <div>
      <FamilyHeading icon={room === "Salon" ? "🛋️" : "🛏️"} title={room} instruction={phase === "learn" ? "👀 Nhìn, nghe và nhớ từng người trong nhà." : `🔊 Nghe “${target.word}”, rồi tìm đúng người.`} />
      <div className="mb-5 flex justify-center gap-2">{members.map((member, memberIndex) => <span key={member.id} className={`h-3 w-3 rounded-full ${memberIndex < index || phase !== "learn" ? "bg-[#F4C95D]" : "bg-[#DCE7F2]"}`} />)}</div>
      {phase === "learn" && (
        <div className="text-center">
          <div className="rounded-3xl bg-[#EEF4FA] p-6">
            <div className="text-8xl">{current.emoji}</div>
            <p className="mt-3 text-3xl font-black text-[#315A8D]">{current.word}</p>
            <p className="mt-2 text-[#806C58]">{current.meaning}</p>
            <p className="mt-4 text-lg font-bold text-[#4A3828]">C’est {current.word}.</p>
          </div>
          <button type="button" onClick={() => onSpeak(current.word, current.audioFile)} className="mt-5 rounded-2xl bg-[#315A8D] px-7 py-4 text-xl font-black text-white">🔊 Nghe {current.word}</button>
          <button type="button" onClick={() => index < members.length - 1 ? setIndex((value) => value + 1) : setPhase("find")} className="mt-4 block w-full rounded-2xl bg-[#D94A4A] px-6 py-4 text-lg font-black text-white">{index < members.length - 1 ? "Gặp người tiếp theo →" : "Mở nhiệm vụ phòng →"}</button>
        </div>
      )}
      {phase === "find" && (
        <div>
          <div className="text-center"><button type="button" onClick={() => onSpeak(target.word, target.audioFile)} className="rounded-2xl bg-[#315A8D] px-7 py-4 text-xl font-black text-white">🔊 {target.word}</button></div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{members.map((member) => <button key={member.id} type="button" onClick={() => { setSelected(member.id); if (member.id === target.id) { setPhase("done"); onComplete?.(); } }} className={`rounded-3xl border-2 p-4 text-center ${selected === member.id ? member.id === target.id ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#D94A4A] bg-[#FFF0F0]" : "border-[#E9DDC8] bg-white"}`}><span className="block text-6xl">{member.emoji}</span><span className="mt-2 block font-black text-[#315A8D]">{member.word}</span></button>)}</div>
          {selected && <FamilyFeedback correct={selected === target.id} text={selected === target.id ? "❤️ Bravo ! Đúng rồi." : "👀 Essaie encore !"} />}
        </div>
      )}
      {phase === "done" && <FamilyFeedback correct text={`🎉 C’est ${target.word} ! Phòng ${room} đã mở.`} />}
    </div>
  );
}

export function FamilyFind({ onSpeak, onComplete }: FamilyProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const target = "papa";
  return (
    <div>
      <FamilyHeading icon="🕵️" title="Qui cherches-tu ?" instruction="🔊 Nghe “papa”, rồi tìm bố trong phòng khách." />
      <div className="rounded-3xl bg-[#FFF8EA] p-5"><div className="grid grid-cols-2 gap-3">{salonMembers.slice(0, 3).map((member) => <button key={member.id} type="button" onClick={() => { setSelected(member.id); onSpeak(member.word, member.audioFile); if (member.id === target) onComplete?.(); }} className={`rounded-3xl border-2 bg-white p-5 text-center ${selected === member.id ? member.id === target ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#D94A4A] bg-[#FFF0F0]" : "border-[#E9DDC8]"}`}><span className="block text-7xl">{member.emoji}</span><span className="mt-2 block font-black text-[#315A8D]">{member.word}</span></button>)}</div></div>
      {selected && <FamilyFeedback correct={selected === target} text={selected === target ? "❤️ Bravo ! Tu as trouvé papa." : "👀 Essaie encore !"} />}
    </div>
  );
}

export function FamilyNumber({ onComplete }: FamilyProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((value) => value !== id) : current.length < 2 ? [...current, id] : current);
  const correct = selected.length === 2;
  return (
    <div>
      <FamilyHeading icon="🔢" title="Deux personnes" instruction="🔢 Trouve deux personnes trong căn phòng." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{salonMembers.map((member) => <button key={member.id} type="button" onClick={() => { toggle(member.id); if (!selected.includes(member.id) && selected.length === 1) onComplete?.(); }} className={`rounded-3xl border-2 p-4 text-center ${selected.includes(member.id) ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#E9DDC8] bg-white"}`}><span className="block text-6xl">{member.emoji}</span><span className="mt-2 block font-black text-[#315A8D]">{member.word}</span></button>)}</div>
      <p className="mt-4 text-center font-bold text-[#806C58]">Đã chọn: {selected.length}/2</p>
      {correct && <FamilyFeedback correct text="🎉 Deux personnes !" />}
    </div>
  );
}

export function FamilyColor({ onComplete }: FamilyProps) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div>
      <FamilyHeading icon="🎨" title="Famille et couleurs" instruction="🎨 Trouve la maman bleue. Chọn mẹ màu xanh dương." />
      <div className="grid grid-cols-2 gap-3">{[{ id: "maman-blue", word: "maman", emoji: "👩", color: "#2874F0" }, { id: "papa-red", word: "papa", emoji: "👨", color: "#E63946" }, { id: "soeur-yellow", word: "sœur", emoji: "👧", color: "#F4D35E" }, { id: "frere-green", word: "frère", emoji: "👦", color: "#2ECC71" }].map((member) => <button key={member.id} type="button" onClick={() => { setSelected(member.id); if (member.id === "maman-blue") onComplete?.(); }} className={`rounded-3xl border-2 p-4 text-center ${selected === member.id ? member.id === "maman-blue" ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#D94A4A] bg-[#FFF0F0]" : "border-[#E9DDC8] bg-white"}`}><span className="block text-6xl">{member.emoji}</span><span className="mt-2 block font-black text-[#315A8D]">{member.word}</span><span className="mx-auto mt-2 block h-8 w-8 rounded-full" style={{ background: member.color }} /></button>)}</div>
      {selected && <FamilyFeedback correct={selected === "maman-blue"} text={selected === "maman-blue" ? "💙 Bravo ! La maman bleue." : "👀 Essaie encore !"} />}
    </div>
  );
}

export function FamilyAnimal({ onSpeak, onComplete }: FamilyProps) {
  const [found, setFound] = useState(false);
  return (
    <div>
      <FamilyHeading icon="🐶" title="Un invité spécial" instruction="🐾 Có một người bạn từ khu rừng đến thăm. Tìm le chien!" />
      <div className="rounded-3xl bg-[#EEF4FA] p-7 text-center"><div className="text-8xl">🐶</div><p className="mt-3 text-2xl font-black text-[#315A8D]">le chien</p><button type="button" onClick={() => { setFound(true); onSpeak("Bonjour, le chien !"); onComplete?.(); }} className="mt-5 rounded-2xl bg-[#315A8D] px-7 py-4 text-lg font-black text-white">👋 Bonjour, le chien !</button></div>
      {found && <FamilyFeedback correct text="🐾 Easter egg trouvé !" />}
    </div>
  );
}

export function FamilySpeaking({ onSpeak, onComplete }: FamilyProps) {
  return <div><FamilyHeading icon="🎙️" title="Dis bonjour" instruction="👂 Nghe mẫu, rồi nói: “Bonjour, maman !”" /><div className="mb-5 text-center"><button type="button" onClick={() => onSpeak("Bonjour, maman !")} className="rounded-full bg-[#315A8D] px-6 py-3 font-black text-white">🔊 Nghe mẫu</button></div><Recorder phrase="Bonjour, maman !" translation="Xin chào mẹ!" onComplete={onComplete} /></div>;
}

export function FamilySecret({ onSpeak, onComplete }: FamilyProps) {
  const [challenge, setChallenge] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const finish = () => { if (challenge === 2) { onComplete?.(); setChallenge(3); } else { setChallenge((value) => value + 1); setSelected([]); } };
  if (challenge === 3) return <div className="text-center"><FamilyHeading icon="🔓" title="PORTE OUVERTE !" instruction="✨ Con đã mở được căn phòng bí mật!" /><div className="text-8xl">🚪✨</div><FamilyFeedback correct text="🎉 Ba thử thách đã hoàn thành." /></div>;
  return (
    <div>
      <FamilyHeading icon="🔒" title="La porte secrète" instruction={`🔐 Challenge ${challenge + 1}/3: ${challenge === 0 ? "nghe maman và chọn đúng người" : challenge === 1 ? "Trouve deux personnes" : "Trouve la maman bleue"}.`} />
      {challenge === 0 && <div className="grid grid-cols-3 gap-3">{salonMembers.slice(0, 3).map((member) => <button key={member.id} type="button" onClick={() => { setSelected([member.id]); onSpeak(member.word, member.audioFile); if (member.id === "maman") finish(); else setFeedback("👀 Essaie encore !"); }} className={`rounded-3xl border-2 p-4 text-center ${selected.includes(member.id) ? "border-[#D94A4A] bg-[#FFF0F0]" : "border-[#E9DDC8]"}`}><span className="block text-6xl">{member.emoji}</span><span className="font-black">{member.word}</span></button>)}</div>}
      {challenge === 1 && <div className="grid grid-cols-2 gap-3">{salonMembers.map((member) => <button key={member.id} type="button" onClick={() => { const next = selected.includes(member.id) ? selected.filter((value) => value !== member.id) : [...selected, member.id]; setSelected(next); if (next.length === 2) finish(); }} className={`rounded-3xl border-2 p-4 text-center ${selected.includes(member.id) ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#E9DDC8]"}`}><span className="block text-6xl">{member.emoji}</span><span className="font-black">{member.word}</span></button>)}</div>}
      {challenge === 2 && <FamilyColor onComplete={finish} onSpeak={onSpeak} />}
      {feedback && <FamilyFeedback correct={false} text={feedback} />}
    </div>
  );
}

export function FamilySuperChallenge({ onSpeak, onComplete }: FamilyProps) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const tasks = ["Bonjour ! Chọn hai người trong nhà.", "Trouve deux personnes bleues.", "Dis: Bonjour, maman !"];
  const next = () => { if (step === 2) { setStep(3); onComplete?.(); } else { setStep((value) => value + 1); setSelected([]); } };
  if (step === 3) return <div className="text-center"><FamilyHeading icon="🔥" title="SUPER DÉFI réussi !" instruction="🎉 Con là người bạn của gia đình!" /><div className="text-8xl">🏠🏅</div><FamilyFeedback correct text="Défi réussi !" /></div>;
  return (
    <div>
      <FamilyHeading icon="🔥" title="SUPER DÉFI" instruction={`⭐ ${step + 1}/3 • ${tasks[step]}`} />
      {step === 0 && <div className="grid grid-cols-2 gap-3">{salonMembers.map((member) => <button key={member.id} type="button" onClick={() => { const nextSelected = selected.includes(member.id) ? selected.filter((value) => value !== member.id) : [...selected, member.id]; setSelected(nextSelected); onSpeak("Bonjour, " + member.word); if (nextSelected.length === 2) next(); }} className={`rounded-3xl border-2 p-4 text-center ${selected.includes(member.id) ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#E9DDC8]"}`}><span className="block text-6xl">{member.emoji}</span><span className="font-black">{member.word}</span></button>)}</div>}
      {step === 1 && <div className="grid grid-cols-2 gap-3">{[{ id: "m1", word: "maman", emoji: "👩", color: "#2874F0" }, { id: "p1", word: "papa", emoji: "👨", color: "#2874F0" }, { id: "f1", word: "frère", emoji: "👦", color: "#2ECC71" }].map((member) => <button key={member.id} type="button" onClick={() => { const nextSelected = selected.includes(member.id) ? selected.filter((value) => value !== member.id) : [...selected, member.id]; setSelected(nextSelected); if (nextSelected.length === 2) next(); }} className={`rounded-3xl border-2 p-4 text-center ${selected.includes(member.id) ? "border-[#4F8A5B] bg-[#EAF5EC]" : "border-[#E9DDC8]"}`}><span className="block text-6xl">{member.emoji}</span><span className="mt-2 block font-black">{member.word}</span><span className="mx-auto mt-2 block h-7 w-7 rounded-full" style={{ background: member.color }} /></button>)}</div>}
      {step === 2 && <div className="text-center"><p className="text-2xl font-black text-[#315A8D]">Bonjour, maman !</p><button type="button" onClick={() => { onSpeak("Bonjour, maman !"); next(); }} className="mt-5 rounded-2xl bg-[#D94A4A] px-7 py-4 text-lg font-black text-white">🎙️ Nói xong</button></div>}
    </div>
  );
}

function FamilyHeading({ icon, title, instruction }: { icon: string; title: string; instruction: string }) {
  return <div className="mb-6 text-center"><div className="text-6xl">{icon}</div><h2 className="mt-3 text-2xl font-black text-[#294A3A]">{title}</h2><p className="mt-3 text-lg font-semibold text-[#315A8D]">{instruction}</p></div>;
}

function FamilyFeedback({ text, correct }: { text: string; correct: boolean }) {
  return <p className={`mt-5 rounded-2xl p-4 text-center font-black ${correct ? "bg-[#EAF5EC] text-[#35633F]" : "bg-[#FFF0F0] text-[#B63838]"}`}>{text}</p>;
}
