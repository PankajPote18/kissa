import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Home, User, BookOpenText } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/profile", label: "My Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login", replace: true });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Loading…
      </div>
    );
  }

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-20 flex-col items-center border-r border-border bg-sidebar py-6 md:flex">
        <Link to="/" className="flex items-center justify-center px-2 text-primary" title="Kissa">
          <BookOpenText className="size-7 shrink-0" />
          <span className="sr-only">Kissa</span>
        </Link>
        <nav className="flex w-full flex-1 flex-col items-center justify-center gap-2">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              title={item.label}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-2 py-3 transition-colors",
                isActive(item.to)
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
              )}
            >
              <item.icon className="size-5" />
              <span className="sr-only">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="pb-20 md:pb-0 md:pl-20">{children}</div>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-sidebar/95 backdrop-blur md:hidden">
        {nav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex flex-col items-center gap-1 py-3 text-[11px] font-semibold uppercase tracking-wider transition-colors",
              isActive(item.to) ? "text-primary" : "text-muted-foreground",
            )}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="border-b border-border px-5 py-8 md:px-10">
      <h1 className="text-4xl text-foreground md:text-5xl">{title}</h1>
      {subtitle ? <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p> : null}
    </header>
  );
}