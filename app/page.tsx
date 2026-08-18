import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JourneyMap from "@/components/JourneyMap";
import ContinueCard from "@/components/ContinueCard";
import PlayAndLearn from "@/components/PlayAndLearn";
import WordOfTheDay from "@/components/WordOfTheDay";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF8EA] text-[#4A3828]">
      <Navbar />

      <Hero />

      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <JourneyMap />

        <ContinueCard />

        {/* French Lesson */}
        <section className="py-8">
          <Link
            href="/learn/bonjour"
            className="group block rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-8"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold tracking-[0.2em] text-[#315A8D]">
                  🇫🇷 TIẾNG PHÁP
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#4A3828] sm:text-3xl">
                  Bonjour !
                </h2>

                <p className="mt-2 text-gray-500">
                  Bài học đầu tiên — Chào hỏi và làm quen.
                </p>
              </div>

              <div className="inline-flex items-center justify-center rounded-2xl bg-[#C96A2B] px-6 py-3 font-bold text-white transition group-hover:bg-[#B85D24]">
                Bắt đầu học →
              </div>
            </div>
          </Link>
        </section>

        <PlayAndLearn />

        <WordOfTheDay />

        <section className="py-20 text-center sm:py-28">
          <p className="mx-auto max-w-2xl text-2xl font-medium leading-relaxed sm:text-4xl">
            “Từ một từ nhỏ,
            <br />
            đến một thế giới mới.”
          </p>

          <p className="mt-6 text-sm font-bold tracking-[0.25em] text-[#315A8D]">
            TỪ ĐẾN
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}