"use client";

import { useFeatureFlags } from "@/components/providers/feature-flags-provider";
import { getFooterLinks } from "@/lib/navigation";
import { Cannabis, Heart } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import Link from "next/link";

export const FooterSection = () => {
  const flags = useFeatureFlags();
  const footerLinks = getFooterLinks(flags.liveTvEnabled);
  return (
    <footer
      id="footer"
      className="relative z-10 mt-auto w-full border-t border-border/40 bg-card/35 backdrop-blur-xs"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:gap-3">
          <BrandLogo placement="footer" />

          <div className="flex flex-wrap items-center justify-start gap-3 sm:justify-end sm:gap-4 lg:gap-5">
            <nav aria-label="Explore" className="hidden sm:block">
              <ul
                className="flex flex-wrap items-center gap-x-3 gap-y-1 md:gap-x-4 lg:gap-x-5"
                role="list"
              >
                {footerLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>


          </div>
        </div>

        <div className="mt-4 flex flex-col items-start gap-2 border-t border-border/40 pt-4 sm:gap-2.5 lg:mt-3 lg:flex-row lg:items-center lg:justify-between lg:gap-3 lg:pt-3">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Hecho con{" "}
            <Cannabis className="inline-block w-4 h-4 text-green-500 mb-1" />{" "}
            y <Heart className="inline-block w-4 h-4 text-red-500 mb-1" /> para
            ti y para mí.
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground lg:max-w-xl lg:shrink-0 lg:text-right">
            Solo otra interfaz de{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-primary"
            >
              {" "}
              TMDB{" "}
            </a>{" "}
            y{" "}
            <a
              href="https://anilist.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-primary"
            >
              {" "}
              AniList{" "}
            </a>{" "}
            .
          </p>
        </div>
      </div>
    </footer>
  );
};
