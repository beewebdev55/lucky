import { navigation } from "@/config/site";
import { getNavigationItems } from "@/lib/navigation";
import { isInNavGroup } from "@/lib/nav/browse";
import { describe, expect, test } from "vitest";

describe("browse navigation", () => {
  test("only exposes top-level destinations", () => {
    expect(navigation.items).toEqual([
      { title: "Movies", href: "/peliculas" },
      { title: "TV Shows", href: "/series" },
      { title: "Anime", href: "/anime" },
      { title: "People", href: "/personaas" },
      { title: "Trending", href: "/tendencias" },
    ]);
  });

  test("inserts Live TV without introducing a second menu level", () => {
    expect(getNavigationItems(true)).toEqual([
      { title: "Movies", href: "/peliculas" },
      { title: "TV Shows", href: "/series" },
      { title: "Anime", href: "/anime" },
      { title: "Live TV", href: "/live" },
      { title: "People", href: "/personaas" },
      { title: "Trending", href: "/tendencias" },
    ]);
  });

  test("keeps deeper pages in their top-level nav group", () => {
    const people = navigation.items.find((item) => item.title === "People");
    const movies = navigation.items.find((item) => item.title === "Movies");

    expect(people).toBeDefined();
    expect(movies).toBeDefined();
    expect(isInNavGroup("/personaas/popular", people!)).toBe(true);
    expect(isInNavGroup("/peliculas/123", movies!)).toBe(true);
  });

  test("uses parent route override for anime TV detail pages", () => {
    const anime = navigation.items.find((item) => item.title === "Anime");
    const tvShows = navigation.items.find((item) => item.title === "TV Shows");

    expect(anime).toBeDefined();
    expect(tvShows).toBeDefined();
    expect(isInNavGroup("/series/207840", anime!, "/anime")).toBe(true);
    expect(isInNavGroup("/series/207840", tvShows!, "/anime")).toBe(false);
  });

  test("uses parent route override for anime movie detail pages", () => {
    const anime = navigation.items.find((item) => item.title === "Anime");
    const movies = navigation.items.find((item) => item.title === "Movies");

    expect(anime).toBeDefined();
    expect(movies).toBeDefined();
    expect(isInNavGroup("/peliculas/12345", anime!, "/anime")).toBe(true);
    expect(isInNavGroup("/peliculas/12345", movies!, "/anime")).toBe(false);
  });
});
