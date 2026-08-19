import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, ShieldAlert, Lock, FileText, LogOut, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — Kissa Novels" },
      { name: "description", content: "Manage your Kissa plan, read the policies and sign out of your account." },
      { property: "og:title", content: "My Profile — Kissa Novels" },
      { property: "og:description", content: "Manage your Kissa plan, read the policies and sign out of your account." },
    ],
  }),
  component: Profile,
});

const links = [
  { to: "/plans", label: "Explore plans", icon: Sparkles },
  { to: "/disclaimer", label: "Disclaimer", icon: ShieldAlert },
  { to: "/privacy", label: "Privacy policy", icon: Lock },
  { to: "/terms", label: "Terms and conditions", icon: FileText },
] as const;

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppShell>
      <main className="pb-16">
        <section className="border-b border-border px-5 py-8 md:px-10">
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-full bg-primary font-display text-2xl text-primary-foreground">
              {user?.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl">{user?.name}</h1>
              <p className="text-sm text-muted-foreground">+91 {user?.phone}</p>
              <span className="mt-1 inline-block rounded-full bg-secondary px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold">
                {user?.plan} member
              </span>
            </div>
          </div>
        </section>

        <section className="px-5 py-6 md:px-10">
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
            {links.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="flex items-center gap-3 px-5 py-4 text-sm transition-colors hover:bg-secondary"
                >
                  <item.icon className="size-4 text-primary" />
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => {
              logout();
              navigate({ to: "/login", replace: true });
            }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 px-5 py-4 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/20"
          >
            <LogOut className="size-4" /> Log out
          </button>
        </section>
      </main>
    </AppShell>
  );
}