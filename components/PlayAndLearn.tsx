const activities = [
  {
    icon: "🎨",
    title: "Màu sắc",
    french: "Les couleurs",
  },
  {
    icon: "🐶",
    title: "Con vật",
    french: "Les animaux",
  },
  {
    icon: "🔢",
    title: "Các số",
    french: "Les nombres",
  },
];

export default function PlayAndLearn() {
  return (
    <section id="play" className="pb-16 sm:pb-24">
      <div className="mb-8">
        <p className="text-sm font-extrabold tracking-[0.2em] text-[#D94A4A]">
          LEARN & PLAY
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          🎮 Học một chút — chơi một chút
        </h2>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="group rounded-[1.75rem] border border-[#E9DDC8] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF8EA] text-4xl">
              {activity.icon}
            </div>

            <h3 className="mt-5 text-xl font-black">{activity.title}</h3>

            <p className="mt-1 text-sm font-medium text-[#315A8D]">
              {activity.french}
            </p>

            <button
              type="button"
              className="mt-6 font-extrabold text-[#D94A4A] transition group-hover:translate-x-1"
            >
              Chơi →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}