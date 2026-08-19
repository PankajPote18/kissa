import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Eye } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { getNovel } from "@/lib/novels";

export const Route = createFileRoute("/novel/$novelId")({
  loader: ({ params }) => {
    const novel = getNovel(params.novelId);
    if (!novel) throw notFound();
    return { novel };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Novel unavailable — Kissa" }, { name: "robots", content: "noindex" }] };
    }
    const { novel } = loaderData;
    return {
      meta: [
        { title: `${novel.title} — Read on Kissa` },
        { name: "description", content: novel.synopsis.slice(0, 155) },
        { property: "og:title", content: `${novel.title} — Read on Kissa` },
        { property: "og:description", content: novel.synopsis.slice(0, 155) },
      ],
    };
  },
  component: NovelDetail,
});

function NovelDetail() {
  const { novel } = Route.useLoaderData();

  return (
    <AppShell>
      <main className="pb-16">
        <div className="relative">
          <div
            className="absolute inset-0 h-72 opacity-25 blur-2xl"
            style={{ backgroundImage: `url(${novel.cover})`, backgroundSize: "cover" }}
          />
          <div className="relative px-5 py-6 md:px-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Back
            </Link>
            <div className="mt-6 flex flex-col gap-6 md:flex-row">
              <img
                src={novel.cover}
                alt={`${novel.title} cover`}
                width={640}
                height={960}
                className="w-40 shrink-0 rounded-2xl border border-border object-cover shadow-2xl md:w-56"
              />
              <div className="max-w-2xl">
                <h1 className="text-4xl leading-none md:text-6xl">{novel.title}</h1>
                <p className="mt-3 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <span>{novel.genre}</span>
                  <span className="text-primary">{novel.cadence}</span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="size-3.5" /> {novel.views}
                  </span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{novel.synopsis}</p>
                <Link
                  to="/novel/$novelId/chapter/$chapterIndex"
                  params={{ novelId: novel.id, chapterIndex: "0" }}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <BookOpen className="size-4" /> Start reading
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10 px-5 md:px-10">
          <h2 className="rail-title">Chapters</h2>
          <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
            {novel.chapters.map((chapter, i) => (
              <li key={chapter.title}>
                <Link
                  to="/novel/$novelId/chapter/$chapterIndex"
                  params={{ novelId: novel.id, chapterIndex: String(i) }}
                  className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-secondary"
                >
                  <span className="text-sm font-medium">{chapter.title}</span>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Read</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </AppShell>
  );
}