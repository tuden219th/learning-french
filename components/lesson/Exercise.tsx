import ListeningActivity from "./ListeningActivity";
import ReadingActivity from "./ReadingActivity";
import WritingActivity from "./WritingActivity";

export default function Exercise() {
  return (
    <div className="space-y-6">
      <ListeningActivity />
      <ReadingActivity />
      <WritingActivity />
    </div>
  );
}