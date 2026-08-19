import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BookOpenText, ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Clickbuz Novels" },
      { name: "description", content: "Sign in with your mobile number and OTP to keep reading on Clickbuz." },
      { property: "og:title", content: "Sign in — Clickbuz Novels" },
      { property: "og:description", content: "Sign in with your mobile number and OTP to keep reading on Clickbuz." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, ready, phoneExists, verify } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && user) navigate({ to: user.landing, replace: true });
  }, [ready, user, navigate]);

  function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneExists(phone)) {
      setError("No demo account for this number. Try 9999999999 or 8888888888.");
      return;
    }
    setError("");
    setStep("otp");
  }

  function confirmOtp(e: React.FormEvent) {
    e.preventDefault();
    const signed = verify(phone, otp);
    if (!signed) {
      setError("Incorrect OTP. Please try again.");
      return;
    }
    navigate({ to: signed.landing, replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-3 text-primary">
          <BookOpenText className="size-8" />
          <span className="font-display text-3xl tracking-[0.2em] text-foreground">CLICKBUZ</span>
        </div>
        <h1 className="text-4xl">
          {step === "phone" ? "Start reading" : "Verify OTP"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {step === "phone"
            ? "Enter your mobile number to continue."
            : `We sent a 4-digit code to +91 ${phone}.`}
        </p>

        {step === "phone" ? (
          <form onSubmit={sendOtp} className="mt-8 space-y-4">
            <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Mobile number
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-input bg-secondary px-4 py-3">
              <span className="text-muted-foreground">+91</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                inputMode="numeric"
                placeholder="9999999999"
                className="w-full bg-transparent text-lg tracking-widest outline-none placeholder:text-muted-foreground/50"
              />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={confirmOtp} className="mt-8 space-y-4">
            <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              One-time password
            </label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
              inputMode="numeric"
              placeholder="••••"
              className="w-full rounded-xl border border-input bg-secondary px-4 py-3 text-center text-2xl tracking-[0.6em] outline-none placeholder:text-muted-foreground/50"
            />
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Verify & continue
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("phone");
                setOtp("");
                setError("");
              }}
              className="flex w-full items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Change number
            </button>
          </form>
        )}
      </div>
    </main>
  );
}