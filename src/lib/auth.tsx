import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type DemoUser = {
  phone: string;
  name: string;
  plan: string;
  landing: "/" | "/plans";
};

const ACCOUNTS: Record<string, { otp: string; user: DemoUser }> = {
  "9999999999": {
    otp: "1234",
    user: { phone: "9999999999", name: "Aarav Reader", plan: "Premium", landing: "/" },
  },
  "8888888888": {
    otp: "5678",
    user: { phone: "8888888888", name: "Meher Reader", plan: "Free", landing: "/plans" },
  },
};

const STORAGE_KEY = "kissa-demo-user";

type AuthValue = {
  user: DemoUser | null;
  ready: boolean;
  phoneExists: (phone: string) => boolean;
  verify: (phone: string, otp: string) => DemoUser | null;
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as DemoUser);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      ready,
      phoneExists: (phone) => Boolean(ACCOUNTS[phone.trim()]),
      verify: (phone, otp) => {
        const account = ACCOUNTS[phone.trim()];
        if (!account || account.otp !== otp.trim()) return null;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(account.user));
        setUser(account.user);
        return account.user;
      },
      logout: () => {
        localStorage.removeItem(STORAGE_KEY);
        setUser(null);
      },
    }),
    [user, ready],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}