import { StaticHero } from "@/components/hero/hero-static";
import { ContentContainer } from "@/components/layout/content-container";
import { LegalPage } from "@/components/layout/legal-page";
import Link from "next/link";

export const metadata = {
  title: "Big News",
};

export default function AdFreePage() {
  return (
    <div className="flex w-full flex-col">
      <StaticHero imageUrl="/movie-banner.webp" title="" route="" />

      <div className="relative z-10 min-h-dvh w-full">
        <ContentContainer className="flex w-full flex-col items-center">
          <LegalPage title="Ad-Free, On Purpose">
            <div className="mx-auto max-w-2xl space-y-6 text-left">
              <p className="text-lg leading-relaxed text-foreground sm:text-xl">
                Despite being yet another streaming site that could make money
                from ads on every single thing you can click on here, we
                don&apos;t care.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                That said, we&apos;re now ad-free. So, when you click play, you'll see the new UI. It's pretty
                intuitive.
              </p>
            </div>
          </LegalPage>
        </ContentContainer>
      </div>
    </div>
  );
}
