import Hero from "@/components/Hero";
import ScrollBridge from "@/components/ScrollBridge";
import EngineeringDomains from "@/components/EngineeringDomains";
import Capabilities from "@/components/Capabilities";
import Technologies from "@/components/Technologies";
import Philosophy from "@/components/Philosophy";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <ScrollBridge />
      <EngineeringDomains />
      <Projects />
      <Capabilities />
      <Technologies />
      <Philosophy />
      <Experience />
      <Contact />
    </div>
  );
};

export default Index;
