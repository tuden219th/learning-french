export default function Hero() {
  return (
    <section
      id="start"
      className="relative overflow-hidden border-b border-[#E9DDC8]"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-bold text-[#315A8D] shadow-sm">
            🇫🇷 BONJOUR!
          </p>

            <h1 className="max-w-xl font-black leading-[1.05] tracking-tight">
              <span className="block text-3xl text-[#4A3828] sm:text-5xl">
                Cùng đi học
              </span>
              <span className="block text-5xl text-[#315A8D] sm:text-6xl">
                Tiếng Pháp
              </span>
            </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[#6F5A46] sm:text-xl">
            Một chuyến đi nhỏ bắt đầu từ hôm nay.
            <br />
            Mỗi từ mới là một bước tiến về phía trước.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#journey"
              className="inline-flex items-center justify-center rounded-full bg-[#D94A4A] px-7 py-3.5 font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              🚀 Bắt đầu thôi!
            </a>

            <a
              href="#journey"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#315A8D] bg-white px-7 py-3.5 font-bold text-[#315A8D] transition hover:bg-[#315A8D] hover:text-white"
            >
              Xem hành trình →
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border-4 border-white bg-[#F4C95D] shadow-xl">
            <div className="absolute left-8 top-8 rotate-[-8deg] rounded-2xl bg-white px-4 py-3 text-lg font-black text-[#315A8D] shadow-md">
              Bonjour!
            </div>

            <div className="absolute right-8 top-20 rotate-[8deg] text-5xl">
              🥐
            </div>

            <div className="absolute bottom-16 left-8 rotate-[6deg] text-5xl">
              🎨
            </div>

            <div className="absolute bottom-12 right-8 rotate-[-6deg] text-5xl">
              🐱
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[7rem] drop-shadow-lg">
              🎒
            </div>

            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-2 text-sm font-extrabold text-[#4A3828] shadow">
              Une petite aventure ✨
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}