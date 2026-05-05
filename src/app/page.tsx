import FAQ from "@/components/FAQ";
import Founder from "@/components/Founder";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Problem from "@/components/Problem";
import Proposal from "@/components/Proposal";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <div className="grain min-h-full bg-night text-ink">
      <Hero />
      <Problem />
      <Proposal />
      <HowItWorks />
      <Pricing />
      <Founder />
      <FAQ />
      <SiteFooter />
    </div>
  );
}
