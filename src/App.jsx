import GlowBackground from "./components/GlowBackground";
import Preloader from "./components/Preloader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import DirectionsGrid from "./components/DirectionsGrid";
import Coach from "./components/Coach";
import Pricing from "./components/Pricing";
import Camp from "./components/Camp";
import Contacts from "./components/Contacts";
import { useScrollReveal } from "./hooks/useScrollReveal";

function Divider() {
  return (
    <div className="site-container">
      <div className="section-divider" />
    </div>
  );
}

export default function App() {
  useScrollReveal();

  return (
    <div className="noise relative min-h-screen bg-[#03040a]">
      <Preloader />
      <GlowBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Divider />
          <DirectionsGrid />
          <Divider />
          <Coach />
          <Divider />
          <Pricing />
          <Divider />
          <Camp />
          <Divider />
          <Contacts />
        </main>
      </div>
    </div>
  );
}
