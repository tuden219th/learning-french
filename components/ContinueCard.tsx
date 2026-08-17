export default function ContinueCard() {
  return (
    <section className="pb-16 sm:pb-24">
      <div className="overflow-hidden rounded-[2rem] bg-[#315A8D] p-7 text-white shadow-lg sm:p-10">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-extrabold tracking-[0.18em] text-[#F4C95D]">
              CHUYẾN ĐI ĐANG TIẾP TỤC
            </p>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              👋 Bonjour!
            </h2>

            <p className="mt-2 max-w-lg text-white/80">
              Học những câu chào đầu tiên bằng tiếng Pháp.
            </p>

            <p className="mt-4 text-lg tracking-wide">⭐⭐⭐⭐☆</p>
          </div>

          <a
            href="#journey"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-3.5 font-extrabold text-[#315A8D] transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Đi tiếp →
          </a>
        </div>
      </div>
    </section>
  );
}