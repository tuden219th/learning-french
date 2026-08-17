const stops = [
  {
    icon: "👋",
    title: "Bonjour!",
    subtitle: "Chào hỏi",
    active: true,
  },
  {
    icon: "🎨",
    title: "Couleurs",
    subtitle: "Màu sắc",
    active: false,
  },
  {
    icon: "🔢",
    title: "Nombres",
    subtitle: "Các số",
    active: false,
  },
  {
    icon: "🐶",
    title: "Animaux",
    subtitle: "Con vật",
    active: false,
  },
  {
    icon: "🎒",
    title: "À l'école",
    subtitle: "Ở trường",
    active: false,
  },
];

export default function JourneyMap() {
  return (
    <section id="journey" className="py-16 sm:py-24">
      <div className="mb-10">
        <p className="text-sm font-extrabold tracking-[0.2em] text-[#D94A4A]">
          YOUR JOURNEY
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          🗺️ Hành trình tiếng Pháp
        </h2>

        <p className="mt-3 max-w-xl text-[#6F5A46]">
          Mỗi từ mới là một bước nhỏ trên chuyến đi.
        </p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-[#E9DDC8] bg-white p-6 shadow-sm sm:p-10">
        <div className="flex flex-col gap-4">
          {stops.map((stop, index) => (
            <div key={stop.title} className="flex items-center gap-4">
              <div className="flex w-8 justify-center">
                {index > 0 && (
                  <div className="absolute h-16 border-l-2 border-dashed border-[#D8CDBB]" />
                )}
              </div>

              <div
                className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl shadow-sm ${
                  stop.active
                    ? "bg-[#315A8D] ring-4 ring-[#E7EEF7]"
                    : "bg-[#FFF8EA]"
                }`}
              >
                {stop.icon}
              </div>

              <div
                className={`flex-1 rounded-2xl px-5 py-4 ${
                  stop.active ? "bg-[#EEF4FA]" : "bg-[#FFF8EA]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-extrabold text-[#4A3828]">
                      {stop.title}
                    </p>
                    <p className="text-sm text-[#806C58]">{stop.subtitle}</p>
                  </div>

                  <span className="text-sm font-bold text-[#315A8D]">
                    {stop.active ? "Bắt đầu →" : "🔒"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}