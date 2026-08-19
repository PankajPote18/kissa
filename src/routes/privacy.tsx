import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Kissa Novels" },
      { name: "description", content: "What Kissa stores about your reading session and how that information is used." },
      { property: "og:title", content: "Privacy Policy — Kissa Novels" },
      { property: "og:description", content: "What Kissa stores about your reading session and how that information is used." },
    ],
  }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      subtitle="A short, plain-language summary of how your information is handled."
      sections={[
        {
          heading: "What we store",
          body: "In this demo, your signed-in mobile number and display name are stored only in your own browser's local storage. Nothing is transmitted to a server or a third party.",
        },
        {
          heading: "Reading activity",
          body: "Chapter progress and the plan you select are kept locally so the app can restore your session. Clearing your browser data removes all of it permanently.",
        },
        {
          heading: "Cookies and analytics",
          body: "No advertising cookies or third-party trackers are used in this build. If analytics are added later, this page will be updated before collection begins.",
        },
        {
          heading: "Contact",
          body: "For any privacy request, write to support@kissa.example and we will respond within seven working days.",
        },
      ]}
    />
  ),
});