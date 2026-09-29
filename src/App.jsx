import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import Skills from "./components/Skills";
import Leadership from "./components/Leadership";
import Works from "./components/Works";
import Journey from "./components/Journey";
import OpenSource from "./components/OpenSource";
import Writings from "./components/Writings";
import Moments from "./components/Moments";
import Hobbies from "./components/Hobbies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-ink)] selection:text-[var(--color-paper)]">
      <Navbar />
      <main>
        {/* 1. Identity & Value Proposition */}
        <Hero />

        {/* 2. Key Proof Metrics */}
        <Metrics />

        {/* 3. Core Tech Stack & Capabilities (Top Priority for Recruiters) */}
        <Skills />

        {/* 4. Stage Talks & Technical Leadership */}
        <Leadership />

        {/* 5. Featured Production Systems & Case Studies */}
        <Works />

        {/* 5. Professional Journey & Apprenticeships */}
        <Journey />

        {/* 6. Public Open Source Contributions & Tools */}
        <OpenSource />

        {/* 7. Technical Writing & Publications */}
        <Writings />

        {/* 8. Milestones, Hackathon Honors & Stage Pitch Reel */}
        <Moments />

        {/* 9. Personal Balance & Hobbies */}
        <Hobbies />

        {/* 10. Direct Contact & Hire Inquiry */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}