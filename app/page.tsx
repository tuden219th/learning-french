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