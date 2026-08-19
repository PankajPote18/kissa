import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getNovel } from "@/lib/novels";

export const Route = createFileRoute("/novel_/$novelId/chapter/$chapterIndex")({
  loader: ({ params }) => {
    const novel = getNovel(params.novelId);
    const index = Number(params.chapterIndex);
    const chapter = novel?.chapters[index];
    if (!novel || !chapter) throw notFound();
    return { novel, chapter, index };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Chapter unavailable — Kissa" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.chapter.title} — ${loaderData.novel.title}`;
    return {
      meta: [
        { title },
        { name: "description", content: `Read ${loaderData.chapter.title} of ${loaderData.novel.title} on Kissa.` },
        { property: "og:title", content: title },
        { property: "og:description", content: `Read ${loaderData.chapter.title} of ${loaderData.novel.title} on Kissa.` },
      ],
    };
  },
  component: Reader,
});

function Reader() {
  const { novel, chapter, index } = Route.useLoaderData();
  const prev = index > 0 ? index - 1 : null;
  const next = index < novel.chapters.length - 1 ? index + 1 : null;

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <Link
          to="/novel/$novelId"
          params={{ novelId: novel.id }}
          className="grid size-9 place-items-center rounded-full bg-secondary text-foreground"
          aria-label="Back to novel"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="truncate text-xl">{chapter.title}</h1>
      </header>

      <article className="mx-auto max-w-3xl px-5 py-8 font-reader text-[15px] leading-8 text-foreground/90 md:text-base">
        {chapter.blocks.map((block, i) =>
          block.type === "heading" ? (
            <h2 key={i} className="mt-10 mb-4 font-sans text-lg font-bold tracking-wide text-foreground">
              {block.text}
            </h2>
          ) : (
            <p key={i} className="mb-5">
              {block.text}
            </p>
          ),
        )}

        <nav className="mt-12 flex items-center justify-between gap-3 border-t border-border pt-6">
          {prev !== null ? (
            <Link
              to="/novel/$novelId/chapter/$chapterIndex"
              params={{ novelId: novel.id, chapterIndex: String(prev) }}
              className="rounded-xl border border-border px-5 py-2.5 font-sans text-sm hover:bg-secondary"
            >
              Previous
            </Link>
          ) : (
            <span />
          )}
          {next !== null ? (
            <Link
              to="/novel/$novelId/chapter/$chapterIndex"
              params={{ novelId: novel.id, chapterIndex: String(next) }}
              className="rounded-xl bg-primary px-5 py-2.5 font-sans text-sm font-semibold text-primary-foreground"
            >
              Next chapter
            </Link>
          ) : (
            <span className="font-sans text-sm text-muted-foreground">More chapters coming soon</span>
          )}
        </nav>
      </article>
    </main>
  );
}