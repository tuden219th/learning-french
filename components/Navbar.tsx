import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E9DDC8] bg-[#FFF8EA]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/becham.png"
            alt="Bé Chấm"
            width={42}
            height={42}
            className="h-10 w-auto"
            priority
          />

          <div className="h-8 w-px bg-[#D8CDBB]" />

          <Image
            src="/logoFrench.png"
            alt="Học tiếng Pháp"
            width={150}
            height={42}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          <Link
            href="#journey"
            className="text-sm font-semibold text-[#4A3828] transition hover:text-[#315A8D]"
          >
            Hành trình
          </Link>

          <Link
            href="#play"
            className="text-sm font-semibold text-[#4A3828] transition hover:text-[#315A8D]"
          >
            Học & chơi
          </Link>

          <Link
            href="#word"
            className="text-sm font-semibold text-[#4A3828] transition hover:text-[#315A8D]"
          >
            Từ vựng
          </Link>

          <Link
            href="#start"
            className="rounded-full bg-[#D94A4A] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Bắt đầu
          </Link>
        </nav>

        {/* Mobile */}
        <button
          type="button"
          aria-label="Mở menu"
          className="rounded-full border border-[#E9DDC8] bg-white px-3 py-2 text-lg md:hidden"
        >
          ☰
        </button>
      </div>
    </header>
  );
}