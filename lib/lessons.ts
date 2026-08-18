import fs from "fs";
import path from "path";
import matter from "gray-matter";

const lessonsDir = path.join(process.cwd(), "content", "lessons");

export type Lesson = {
  id: string;
  module: string;
  title: string;
  subtitle: string;
  level: number;
  order: number;
  duration: number;
  icon?: string;
  published?: boolean;
  content: string;
};

export function getLesson(id: string): Lesson | null {
  const filePath = path.join(lessonsDir, `${id}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  return {
    id: data.id,
    module: data.module,
    title: data.title,
    subtitle: data.subtitle,
    level: Number(data.level),
    order: Number(data.order),
    duration: Number(data.duration),
    icon: data.icon,
    published: data.published !== false,
    content,
  };
}

export function getLessons(): Lesson[] {
  if (!fs.existsSync(lessonsDir)) return [];

  return fs
    .readdirSync(lessonsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => getLesson(file.replace(".mdx", "")))
    .filter(
      (lesson): lesson is Lesson =>
        lesson !== null && lesson.published !== false,
    )
    .sort((a, b) => a.order - b.order);
}