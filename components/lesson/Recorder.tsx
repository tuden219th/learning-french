"use client";

import { useEffect, useRef, useState } from "react";

type RecorderProps = {
  phrase: string;
  translation?: string;
};

export default function Recorder({
  phrase,
  translation,
}: RecorderProps) {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function startRecording() {
    try {
      setError(null);

      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Trình duyệt của bạn không hỗ trợ ghi âm.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        const url = URL.createObjectURL(blob);

        setAudioUrl((previousUrl) => {
          if (previousUrl) {
            URL.revokeObjectURL(previousUrl);
          }

          return url;
        });

        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        recorderRef.current = null;
      };

      recorder.onerror = () => {
        setError("Có lỗi xảy ra khi ghi âm. Hãy thử lại nhé.");

        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        recorderRef.current = null;
        setRecording(false);
      };

      recorderRef.current = recorder;
      recorder.start();
      setRecording(true);
    } catch {
      setError(
        "Không mở được micro. Hãy cho phép trình duyệt sử dụng micro nhé."
      );
    }
  }

  function stopRecording() {
    const recorder = recorderRef.current;

    if (!recorder) return;

    if (recorder.state !== "inactive") {
      recorder.stop();
    }

    setRecording(false);
  }

  function resetRecording() {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setAudioUrl(null);
    setError(null);
  }

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }

      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [audioUrl]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#E9DDC8] bg-[#FFF8EA] p-6 text-center shadow-sm sm:p-7">
      {/* Header */}
      <div>
        <div className="mx-auto flex h-10 w-fit items-center rounded-full bg-white px-4 text-xs font-black tracking-[0.16em] text-[#D94A4A] shadow-sm">
          🗣️ LUYỆN NÓI
        </div>

        <p className="mt-4 text-sm font-semibold text-[#806C58]">
          Nghe và nói theo câu này
        </p>
      </div>

      {/* Target phrase */}
      <div className="mt-5 rounded-3xl bg-white px-5 py-6 shadow-sm">
        <p className="text-3xl font-black leading-tight text-[#315A8D] sm:text-4xl">
          {phrase}
        </p>

        {translation && (
          <p className="mt-3 text-sm font-medium text-[#806C58]">
            {translation}
          </p>
        )}
      </div>

      {/* Recording controls */}
      <div className="mt-6">
        {!recording && !audioUrl && (
          <>
            <button
              type="button"
              onClick={startRecording}
              className="mx-auto flex items-center gap-2 rounded-full bg-[#D94A4A] px-7 py-3.5 font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#C53E3E] hover:shadow-lg active:translate-y-0"
            >
              🎙️ Nhấn để nói
            </button>

            <p className="mt-3 text-xs text-[#9A8875]">
              Hãy nói rõ và tự nhiên nhé.
            </p>
          </>
        )}

        {recording && (
          <>
            <div className="mx-auto flex items-center justify-center gap-2 text-sm font-bold text-[#D94A4A]">
              <span className="h-3 w-3 animate-pulse rounded-full bg-[#D94A4A]" />
              Đang ghi âm...
            </div>

            <button
              type="button"
              onClick={stopRecording}
              className="mt-4 rounded-full bg-[#315A8D] px-7 py-3.5 font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#274B77] active:translate-y-0"
            >
              ⏹ Dừng ghi
            </button>

            <p className="mt-3 text-xs text-[#9A8875]">
              Nói xong hãy bấm Dừng.
            </p>
          </>
        )}

        {audioUrl && (
          <div className="mt-2">
            <p className="mb-3 text-sm font-extrabold text-[#4A3828]">
              🎧 Bản ghi của bạn
            </p>

            <audio
              controls
              src={audioUrl}
              className="mx-auto w-full max-w-sm"
            />

            <button
              type="button"
              onClick={resetRecording}
              className="mt-4 rounded-full border border-[#E9DDC8] bg-white px-6 py-2.5 text-sm font-extrabold text-[#D94A4A] shadow-sm transition hover:bg-[#FFF0F0]"
            >
              🔄 Nói lại
            </button>

            <p className="mt-3 text-xs text-[#9A8875]">
              Nghe lại giọng của mình và thử so sánh với câu mẫu.
            </p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mt-5 rounded-2xl bg-[#FFF0F0] p-4 text-sm font-semibold text-[#B63838]">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}