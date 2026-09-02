import { buildAnilistTmdbRedirectHref } from "@/lib/anilist-tmdb-redirect";
import { describe, expect, it } from "vitest";

describe("buildAnilistTmdbRedirectHref", () => {
  it("carries anilistId and prefers the requested season", () => {
    expect(
      buildAnilistTmdbRedirectHref({
        mapping: { id: 95479, type: "tv", season: 1 },
        entryAnilistId: 113415,
        requestedSeason: 2,
      }),
    ).toBe("/series/95479?anilistId=113415&season=2");
  });

  it("falls back to mapping season when no query season is set", () => {
    expect(
      buildAnilistTmdbRedirectHref({
        mapping: { id: 85937, type: "tv", season: 2 },
        entryAnilistId: 145064,
      }),
    ).toBe("/series/85937?anilistId=145064&season=2");
  });

  it("omits season 1", () => {
    expect(
      buildAnilistTmdbRedirectHref({
        mapping: { id: 30991, type: "tv", season: 1 },
        entryAnilistId: 1,
        autoplay: true,
      }),
    ).toBe("/series/30991?anilistId=1&autoplay=true");
  });
});
