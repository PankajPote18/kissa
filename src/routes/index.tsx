import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import {
  heroSlides,
  trending,
  youMightLike,
  mostLoved,
  mostViewed,
  type Novel,
} from "@/lib/novels";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clickbuz — Binge Original Novels Daily" },
      {
        name: "description",
        content: "Romance, history and thrillers updated chapter by chapter. Start reading free on Clickbuz.",
      },
      { property: "og:title", content: "Clickbuz — Binge Original Novels Daily" },
      {
        property: "og:description",
        content: "Romance, history and thrillers updated chapter by chapter. Start reading free on Clickbuz.",
      },
    ],
  }),
  component: Home,
});

function Poster({ novel, className = "" }: { novel: Novel; className?: string }) {
  return (
    <Link
      to="/novel/$novelId"
      params={{ novelId: novel.id }}
      className={`group block w-32 shrink-0 sm:w-40 ${className}`}
    >
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <img
          src={novel.cover}
          alt={`${novel.title} cover`}
          loading="lazy"
          width={640}
          height={960}
          className="aspect-2/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="mt-2 truncate text-[11px] font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">
        {novel.title}
      </p>
    </Link>
  );
}

function Rail({ title, items }: { title: string; items: Novel[] }) {
  return (
    <section className="mt-10">
      <h2 className="rail-title px-5 md:px-10">{title}</h2>
      <div className="no-scrollbar mt-4 flex gap-4 overflow-x-auto px-5 pb-2 md:px-10">
        {items.map((n, i) => (
          <Poster key={`${title}-${n.id}-${i}`} novel={n} />
        ))}
      </div>
    </section>
  );
}

function HeroBanner({ slides }: { slides: Novel[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  const current = slides[active]!;
  const goPrev = () => setActive((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setActive((i) => (i + 1) % slides.length);

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="relative h-[420px] w-full md:h-[520px]">
        {slides.map((n, i) => (
          <img
            key={n.id}
            src={n.heroCover ?? n.cover}
            alt={`${n.title} cover`}
            width={1280}
            height={720}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-transparent" />

        <div className="relative flex h-full max-w-xl flex-col justify-end gap-3 px-5 pb-10 md:px-10 md:pb-14">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
            Featured original
          </span>
          <h1 className="text-5xl leading-none md:text-7xl">{current.title}</h1>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {current.genre} <span className="text-primary">•</span>{" "}
            <span className="text-primary">Popular {current.cadence}</span>
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">{current.tagline}</p>
          <Link
            to="/novel/$novelId"
            params={{ novelId: current.id }}
            className="mt-3 inline-flex w-fit rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Read now
          </Link>
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={goPrev}
          className="absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-background/50 p-2 text-foreground backdrop-blur transition-colors hover:bg-background/80 md:flex md:left-10"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={goNext}
          className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-background/50 p-2 text-foreground backdrop-blur transition-colors hover:bg-background/80 md:flex md:right-10"
        >
          <ChevronRight className="size-6" />
        </button>

        <div className="absolute bottom-4 right-5 flex gap-2 md:right-10">
          {slides.map((n, i) => (
            <button
              key={n.id}
              type="button"
              aria-label={`Show ${n.title}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-6 bg-primary" : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <AppShell>
      <main className="pb-16">
        <HeroBanner slides={heroSlides} />

        <section className="mt-10">
          <h2 className="rail-title px-5 md:px-10">Top Trending</h2>
          <div className="no-scrollbar mt-4 flex gap-6 overflow-x-auto py-2 pl-3 pr-5 md:pl-8 md:pr-10">
            {trending.map((n, i) => (
              <div key={n.id} className="relative flex shrink-0 items-end">
                <span className="rank-numeral pointer-events-none absolute -left-1 bottom-6 z-10">
                  {i + 1}
                </span>
                <Poster novel={n} className="ml-10" />
              </div>
            ))}
          </div>
        </section>

        <Rail title="You Might Like This" items={youMightLike} />
        <Rail title="Most Loved Ones" items={mostLoved} />
        <Rail title="Most Viewed" items={mostViewed} />
      </main>
    </AppShell>
  );
}
