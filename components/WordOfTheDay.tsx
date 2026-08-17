export default function WordOfTheDay() {
  return (
    <section id="word" className="pb-16 sm:pb-24">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-[#E9DDC8] bg-white p-8 text-center shadow-sm sm:p-10">
        <p className="text-sm font-extrabold tracking-[0.2em] text-[#D94A4A]">
          🇫🇷 MOT DU JOUR
        </p>

        <div className="mt-6 text-6xl">🐱</div>

        <h2 className="mt-4 text-4xl font-black tracking-[0.08em] text-[#315A8D]">
          CHAT
        </h2>

        <p className="mt-2 font-mono text-sm text-[#806C58]">/ʃa/</p>

        <p className="mt-3 text-lg font-semibold">con mèo</p>

        <button
          type="button"
          aria-label="Nghe phát âm từ chat"
          className="mt-7 rounded-full bg-[#F4C95D] px-6 py-3 font-extrabold text-[#4A3828] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          🔊 Nghe
        </button>
      </div>
    </section>
  );
}