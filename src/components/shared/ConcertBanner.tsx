import Image from "next/image";

export function ConcertBanner() {
  const imageUrl = "https://images.unsplash.com/photo-1459749411177-2a296581dca1?q=80&w=1470&auto=format&fit=crop";

  return (
    <section className="relative w-full h-[400px]">
      <Image
        src={imageUrl}
        alt="High-energy concert crowd"
        fill
        className="object-cover"
        data-ai-hint="festival crowd"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
    </section>
  );
}
