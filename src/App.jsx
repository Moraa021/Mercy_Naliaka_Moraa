import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import About from "./components/About";
import PlataZoomShowcase from "./components/PlataZoomShowcase";
import PlataHorizontalSlider from "./components/PlataHorizontalSlider";
import Journey from "./components/Journey";
import Works from "./components/Works";
import OpenSource from "./components/OpenSource";
import Reel from "./components/Reel";
import Moments from "./components/Moments";
import Skills from "./components/Skills";
import Hobbies from "./components/Hobbies";
import Writings from "./components/Writings";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-ink)] selection:text-[var(--color-paper)]">
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <About />
        <PlataZoomShowcase />
        <PlataHorizontalSlider />
        <Journey />
        <Works />
        <OpenSource />
        <Reel />
        <Moments />
        <Skills />
        <Hobbies />
        <Writings />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}