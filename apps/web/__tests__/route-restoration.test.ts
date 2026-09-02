import {
  commitNavigationEntry,
  consumePendingRouteSnapshot,
  findSnapshotAnchor,
  prepareNavigationBack,
  readRouteSnapshot,
  recordNavigationOrigin,
  subscribePendingRouteRestore,
} from "@/lib/navigation/route-restoration";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

describe("route restoration", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/peliculas?genre=crime");
    window.sessionStorage.clear();
    Object.defineProperty(window, "scrollX", {
      configurable: true,
      value: 12,
    });
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 840,
    });

    document.body.innerHTML = `
      <section><a href="/peliculas/42">First appearance</a></section>
      <section><a href="/peliculas/42">Exact clicked card</a></section>
    `;
  });

  afterEach(() => {
    window.history.replaceState({}, "", "/");
    window.sessionStorage.clear();
    document.body.innerHTML = "";
  });

  test("records the viewport, card, and carousel scroll progress", () => {
    const anchors = document.querySelectorAll<HTMLAnchorElement>("a");
    const clickedCard = anchors[1];

    recordNavigationOrigin(new URL(clickedCard.href), clickedCard, {
      carouselScrollProgress: 0.42,
      pageCarouselScrolls: [0.1, 0.42, 0.0],
    });

    const snapshot = readRouteSnapshot("/peliculas?genre=crime");
    expect(snapshot).toMatchObject({
      url: "/peliculas?genre=crime",
      scrollX: 12,
      scrollY: 840,
      anchorHref: "/peliculas/42",
      anchorOccurrence: 1,
      carouselScrollProgress: 0.42,
      pageCarouselScrolls: [0.1, 0.42, 0.0],
    });
    expect(snapshot && findSnapshotAnchor(snapshot)).toBe(clickedCard);
  });

  test("only prepares a history back when the current route has an origin", () => {
    const clickedCard = document.querySelectorAll<HTMLAnchorElement>("a")[1];
    recordNavigationOrigin(new URL(clickedCard.href), clickedCard);

    window.history.pushState({}, "", "/peliculas/42");
    commitNavigationEntry("/peliculas/42");
    expect(prepareNavigationBack()).toBe(true);

    window.history.replaceState({}, "", "/peliculas?genre=crime");
    expect(consumePendingRouteSnapshot("/peliculas?genre=crime")).toMatchObject({
      scrollY: 840,
      anchorOccurrence: 1,
    });
    expect(consumePendingRouteSnapshot("/peliculas?genre=crime")).toBeNull();
  });

  test("signals pending restore subscribers when soft-back is prepared", () => {
    const clickedCard = document.querySelectorAll<HTMLAnchorElement>("a")[1];
    recordNavigationOrigin(new URL(clickedCard.href), clickedCard);

    window.history.pushState({}, "", "/peliculas/42");
    commitNavigationEntry("/peliculas/42");

    const seen: boolean[] = [];
    const unsubscribe = subscribePendingRouteRestore((active) => {
      seen.push(active);
    });

    expect(prepareNavigationBack()).toBe(true);
    expect(seen).toEqual([true]);
    unsubscribe();
  });

  test("does not trust an origin that was not bound to this history entry", () => {
    const clickedCard = document.querySelectorAll<HTMLAnchorElement>("a")[1];
    recordNavigationOrigin(new URL(clickedCard.href), clickedCard);

    window.history.pushState({}, "", "/peliculas/99");
    commitNavigationEntry("/peliculas/99");

    expect(prepareNavigationBack()).toBe(false);
  });

  test("still prepares back when Next.js wipes custom history state", () => {
    const clickedCard = document.querySelectorAll<HTMLAnchorElement>("a")[1];
    recordNavigationOrigin(new URL(clickedCard.href), clickedCard);

    window.history.pushState({}, "", "/peliculas/42");
    commitNavigationEntry("/peliculas/42");

    window.history.replaceState({ __NA: true }, "", "/peliculas/42");

    expect(prepareNavigationBack()).toBe(true);
    expect(consumePendingRouteSnapshot("/peliculas?genre=crime")).toMatchObject({
      scrollY: 840,
      anchorOccurrence: 1,
    });
  });
});
