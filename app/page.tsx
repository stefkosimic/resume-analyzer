import Hero from "@/components/hero-section";
import { ResumeWrapper } from "@/components/resume-wrapper";
import SubscribeSection from "@/components/subscribe-section";

export default function Home() {
  return (
    <div>
      <Hero />
      <ResumeWrapper />
      <SubscribeSection />
    </div>
  );
}
