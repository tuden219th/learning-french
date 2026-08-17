export default function Footer() {
  return (
    <footer className="border-t border-[#E9DDC8] bg-[#4A3828] text-[#FFF8EA]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xl font-black">TỪ ĐẾN</p>

            <p className="mt-2 max-w-xs text-sm leading-6 text-[#FFF8EA]/70">
              From where you are,
              <br />
              to where you want to be.
            </p>
          </div>

          <div className="text-sm font-semibold text-[#FFF8EA]/70">
            French · Korean
          </div>
        </div>

        <div className="mt-10 border-t border-[#FFF8EA]/10 pt-5 text-xs text-[#FFF8EA]/50">
          © {new Date().getFullYear()} Từ Đến
        </div>
      </div>
    </footer>
  );
}