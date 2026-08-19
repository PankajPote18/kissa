import { AppShell, PageHeader } from "@/components/AppShell";

export function LegalPage({
  title,
  subtitle,
  sections,
}: {
  title: string;
  subtitle: string;
  sections: Array<{ heading: string; body: string }>;
}) {
  return (
    <AppShell>
      <main className="pb-16">
        <PageHeader title={title} subtitle={subtitle} />
        <div className="max-w-3xl px-5 py-8 md:px-10">
          {sections.map((section) => (
            <section key={section.heading} className="mb-8">
              <h2 className="text-xl tracking-wide">{section.heading}</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{section.body}</p>
            </section>
          ))}
          <p className="text-xs text-muted-foreground">Last updated: 19 August 2026</p>
        </div>
      </main>
    </AppShell>
  );
}