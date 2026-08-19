import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Clickbuz Novels" },
      { name: "description", content: "How to treat the fiction, characters and demo content published on Clickbuz." },
      { property: "og:title", content: "Disclaimer — Clickbuz Novels" },
      { property: "og:description", content: "How to treat the fiction, characters and demo content published on Clickbuz." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Disclaimer"
      subtitle="Please read this before you continue reading on Clickbuz."
      sections={[
        {
          heading: "Works of fiction",
          body: "Every story published on Clickbuz is a work of fiction. Names, characters, places, businesses and incidents are products of the author's imagination. Any resemblance to actual persons, living or dead, or actual events is purely coincidental.",
        },
        {
          heading: "Mature themes",
          body: "Some titles contain intense emotional situations, mild violence or references to social conflict. Reader discretion is advised. We recommend the platform for readers aged 16 and above.",
        },
        {
          heading: "Demo application",
          body: "This build is a demonstration. Accounts, OTPs, plan prices and reading statistics shown here are sample data and no real payment or verification is processed.",
        },
      ]}
    />
  ),
});