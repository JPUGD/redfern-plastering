import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Guides are MDX files in content/guides.
 * To publish a post, add content/guides/your-slug.mdx with:
 * title, metaTitle (60 characters or fewer), description (160 or fewer), and date (YYYY-MM-DD).
 * The filename is the URL slug. Do not put a person's name in the filename.
 */

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  date: string;
  content: string;
};

const GUIDES_DIR = path.join(process.cwd(), "content/guides");

function asDateString(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "").trim();
}

function readGuide(file: string): Guide {
  const slug = file.replace(/\.mdx$/, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      `Guide filename "${file}" must be lowercase words separated by hyphens.`,
    );
  }

  const raw = fs.readFileSync(path.join(GUIDES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const title = String(data.title ?? "").trim();
  const description = String(data.description ?? "").trim();
  const date = asDateString(data.date);
  const metaTitle = String(data.metaTitle ?? "").trim();
  const body = content.trim();

  if (!title || !metaTitle || !description || !body) {
    throw new Error(
      `Guide ${file} needs title, metaTitle, description, and body text.`,
    );
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`Guide ${file} needs date as YYYY-MM-DD.`);
  }
  if (metaTitle.length > 60) {
    throw new Error(
      `Guide ${file} metaTitle is ${metaTitle.length} characters (maximum 60).`,
    );
  }
  if (description.length > 160) {
    throw new Error(
      `Guide ${file} description is ${description.length} characters (maximum 160).`,
    );
  }

  return { slug, title, metaTitle, description, date, content: body };
}

export function getGuides(): Guide[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(readGuide)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getGuide(slug: string): Guide | undefined {
  return getGuides().find((guide) => guide.slug === slug);
}

export function formatGuideDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
