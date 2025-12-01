
import { Hero } from "@/components/shared/Hero";
import { FlashNews } from "@/components/shared/FlashNews";
import { MysteryArtist } from "@/components/shared/MysteryArtist";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FlashNews />
      <MysteryArtist />
      <Footer />
    </>
  );
}
