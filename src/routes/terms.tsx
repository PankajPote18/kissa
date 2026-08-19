import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — Clickbuz Novels" },
      { name: "description", content: "The rules for using Clickbuz, its subscriptions and its published stories." },
      { property: "og:title", content: "Terms and Conditions — Clickbuz Novels" },
      { property: "og:description", content: "The rules for using Clickbuz, its subscriptions and its published stories." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Terms & Conditions"
      subtitle="By reading on Clickbuz you agree to the terms below."
      sections={[
        {
          heading: "Your account",
          body: "You are responsible for keeping your mobile number and one-time passwords secure. One account is intended for one reader; sharing credentials may result in access being withdrawn.",
        },
        {
          heading: "Content licence",
          body: "All stories, cover artwork and chapter text remain the property of Clickbuz and its authors. You may read them for personal use but may not copy, republish, translate or distribute them without written permission.",
        },
        {
          heading: "Subscriptions",
          body: "Weekly, monthly and yearly plans renew at the end of each period unless cancelled beforehand. In this demo build no payment is charged and plans are illustrative only.",
        },
        {
          heading: "Changes to these terms",
          body: "We may update these terms as the platform grows. Continued use of Clickbuz after an update means you accept the revised terms.",
        },
      ]}
    />
  ),
});