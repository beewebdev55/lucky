import type { NavItem } from "@/config/site";
import {
  BookOpen,
  Clapperboard,
  Flame,
  LayoutGrid,
  RadioTower,
  Tv,
  Users,
  type LucideIcon,
} from "lucide-react";

export const parentIcons: Record<string, LucideIcon> = {
  Movies: Clapperboard,
  "TV Shows": Tv,
  Anime: BookOpen,
  "Live TV": RadioTower,
  People: Users,
  Trending: Flame,
};

export const getNavIcon = (item: NavItem) =>
  parentIcons[item.title] ?? LayoutGrid;

export const toTitleCase = (label: string) =>
  label.replace(/\w\S*/g, (word) =>
    word === word.toUpperCase()
      ? word
      : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );

export const isInNavGroup = (
  pathname: string,
  item: NavItem,
  parentRouteOverride?: string,
) => {
  if (parentRouteOverride) {
    return item.href === parentRouteOverride;
  }

  if (pathname === item.href) return true;
  if (item.href === "/peliculas") return pathname.startsWith("/peliculas/");
  if (item.href === "/series") return pathname.startsWith("/series/");
  if (item.href === "/personaas") return pathname.startsWith("/personaas");
  if (item.href === "/tendencias") return pathname.startsWith("/tendencias");
  if (item.href === "/anime") return pathname.startsWith("/anime");
  if (item.href === "/live") return pathname.startsWith("/live");

  return false;
};
