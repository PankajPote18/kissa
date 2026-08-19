import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { AppShell, PageHeader } from "@/components/AppShell";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Explore Plans — Clickbuz Novels" },
      { name: "description", content: "Weekly, monthly and yearly reading plans with unlimited chapters on Clickbuz." },
      { property: "og:title", content: "Explore Plans — Clickbuz Novels" },
      { property: "og:description", content: "Weekly, monthly and yearly reading plans with unlimited chapters on Clickbuz." },
    ],
  }),
  component: Plans,
});

const plans = [
  {
    name: "Weekly",
    price: "₹49",
    period: "/week",
    highlight: false,
    perks: ["Unlimited chapters for 7 days", "Ad-free reading", "Cancel anytime"],
  },
  {
    name: "Monthly",
    price: "₹149",
    period: "/month",
    highlight: true,
    perks: ["Everything in Weekly", "Early access to daily updates", "Offline reading list", "2 devices"],
  },
  {
    name: "Yearly",
    price: "₹1,199",
    period: "/year",
    highlight: false,
    perks: ["Everything in Monthly", "Save 33% vs monthly", "Exclusive bonus chapters", "5 devices"],
  },
];

function Plans() {
  return (
    <AppShell>
      <main className="pb-16">
        <PageHeader
          title="Explore Plans"
          subtitle="Pick a plan and keep every chapter unlocked. Prices are demo values only."
        />
        <div className="grid gap-5 px-5 py-8 md:grid-cols-3 md:px-10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 ${
                plan.highlight
                  ? "border-primary bg-surface-2 shadow-[0_0_60px_-25px_var(--primary)]"
                  : "border-border bg-surface"
              }`}
            >
              {plan.highlight ? (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  Most popular
                </span>
              ) : null}
              <h2 className="text-2xl tracking-widest">{plan.name}</h2>
              <p className="mt-2">
                <span className="font-display text-5xl">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {perk}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-6 w-full rounded-xl py-3 text-sm font-semibold transition-opacity hover:opacity-90 ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-secondary text-foreground"
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}