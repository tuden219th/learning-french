"use client";

import { useEffect, useRef, useState } from "react";

type AudioPlayerProps = {
  src: string;
  label?: string;
};

export default function AudioPlayer({
  src,
  label = "Nghe mẫu",
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSrc = src.startsWith("/")
    ? src
    : `/audio/fr/${encodeURIComponent(src)}`;

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.playbackRate = speed;
    audio.volume = volume;

    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setLoading(true);
    setError(false);
  }, [src, speed, volume]);

  function togglePlay() {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {
        setError(true);
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }

  function handleLoadedMetadata() {
    const audio = audioRef.current;

    if (!audio) return;

    setDuration(audio.duration);
    setLoading(false);
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;

    if (!audio || !audio.duration) return;

    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100);
  }

  function handleEnded() {
    setPlaying(false);
    setCurrentTime(0);
    setProgress(0);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }

  function handleError() {
    setLoading(false);
    setError(true);
    setPlaying(false);
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;

    if (!audio || !audio.duration) return;

    const value = Number(e.target.value);
    const time = (value / 100) * audio.duration;

    audio.currentTime = time;
    setProgress(value);
    setCurrentTime(time);
  }

  function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);

    setVolume(value);

    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  }

  function changeSpeed() {
    const speeds = [1, 0.75, 1.25, 1.5];
    const currentIndex = speeds.indexOf(speed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];

    setSpeed(nextSpeed);

    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  }

  function formatTime(seconds: number) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <div className="rounded-[2rem] border border-[#DCE7F2] bg-[#EEF4FA] p-5 shadow-sm sm:p-6">
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={() => {
          handleError();
          console.warn(`[French Audio Missing] ${audioSrc}`);
        }}
      />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={togglePlay}
          disabled={loading || error}
          aria-label={playing ? "Tạm dừng" : `Nghe ${label}`}
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#315A8D] text-2xl text-white shadow-lg transition hover:scale-105 hover:bg-[#274B77] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "…" : playing ? "Ⅱ" : "▶"}
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate font-extrabold text-[#4A3828]">
            🎧 {label}
          </p>

          <p className="mt-1 text-xs text-[#806C58]">
            {error
              ? "Không thể tải âm thanh"
              : playing
                ? "Đang phát..."
                : "Bấm ▶ để nghe"}
          </p>
        </div>

        <button
          type="button"
          onClick={changeSpeed}
          disabled={loading || error}
          className="hidden rounded-xl bg-white px-3 py-2 text-xs font-extrabold text-[#315A8D] shadow-sm transition hover:bg-[#F8FBFE] sm:block"
          aria-label="Đổi tốc độ phát"
        >
          {speed}x
        </button>
      </div>

      <div className="mt-5">
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={progress}
          onChange={seek}
          disabled={loading || error}
          aria-label="Tiến trình âm thanh"
          className="h-2 w-full cursor-pointer accent-[#315A8D] disabled:cursor-not-allowed"
        />

        <div className="mt-2 flex justify-between text-xs font-semibold text-[#806C58]">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-sm">🔊</span>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={changeVolume}
          disabled={loading || error}
          aria-label="Âm lượng"
          className="w-24 cursor-pointer accent-[#315A8D] disabled:cursor-not-allowed"
        />

        <button
          type="button"
          onClick={changeSpeed}
          disabled={loading || error}
          className="ml-auto rounded-xl bg-white px-3 py-2 text-xs font-extrabold text-[#315A8D] shadow-sm sm:hidden"
        >
          {speed}x
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-[#806C58]">
        🔁 Nghe lại nhiều lần và nói theo nhé!
      </p>
    </div>
  );
}