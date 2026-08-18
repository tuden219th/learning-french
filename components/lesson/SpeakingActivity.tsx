import Recorder from "./Recorder";

type SpeakingActivityProps = {
  phrase: string;
  translation?: string;
};

export default function SpeakingActivity({
  phrase,
  translation,
}: SpeakingActivityProps) {
  return (
    <section>
      <Recorder
        phrase={phrase}
        translation={translation}
      />
    </section>
  );
}