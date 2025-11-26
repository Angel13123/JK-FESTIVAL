
import { Hero } from "@/components/shared/Hero";
import { FlashNews } from "@/components/shared/FlashNews";
import { MysteryArtist } from "@/components/shared/MysteryArtist";
import { Sponsors } from "@/components/shared/Sponsors";
import { Location } from "@/components/shared/Location";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FlashNews />
      <MysteryArtist />
      <Sponsors />
      <Location />
    </>
  );
}
