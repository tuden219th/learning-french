import LessonShell from "@/components/lesson/LessonShell";
import { frenchLessons } from "@/data/french-lessons";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    lesson: string;
  }>;
};

export default async function LessonPage({ params }: Props) {
  const { lesson } = await params;

  const lessonData =
    frenchLessons[lesson as keyof typeof frenchLessons];

  if (!lessonData) {
    notFound();
  }

  return <LessonShell lesson={lessonData} />;
}