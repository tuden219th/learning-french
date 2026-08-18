export default function LessonComplete() {
  return (
    <section className="rounded-[2rem] bg-[#315A8D] p-8 text-center text-white shadow-lg">
      <div className="text-5xl">🎉</div>

      <h2 className="mt-4 text-3xl font-black">
        Bravo!
      </h2>

      <p className="mt-2 text-white/80">
        Con đã hoàn thành bài Bonjour!
      </p>

      <div className="mt-6 text-2xl tracking-widest">
        ⭐⭐⭐⭐
      </div>

      <button
        type="button"
        className="mt-7 rounded-full bg-white px-7 py-3 font-extrabold text-[#315A8D]"
      >
        🚀 Đi tiếp
      </button>
    </section>
  );
}