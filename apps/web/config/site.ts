import { pages } from "@/config/pages";
export { availableParams, pageLimit } from "@/config/catalog";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Cuevana 3",
  description:
    "Cuevana 3 es un agregador de streams de películas y series de TV, de código abierto, gratuito y sin anuncios.",
  mainNav: [],
  links: {
    github: "",
    tmdb: "https://www.themoviedb.org",
  },
  author: {
    name: "Cuevana 3",
    web: "https://cuevana33.lat",
  },
} as const;

export type NavItem = {
  title: string;
  href: string;
  description?: string;
};

const movies: NavItem = {
  title: "Películas",
  href: pages.movie.catalog.link,
};

const tvShows: NavItem = {
  title: "Series",
  href: pages.tv.catalog.link,
};

const people: NavItem = {
  title: "Personas",
  href: pages.people.root.link,
};

const trending: NavItem = {
  title: "Tendencias",
  href: pages.trending.root.link,
};

const anime: NavItem = {
  title: "Anime",
  href: pages.anime.root.link,
};

const liveTv: NavItem = {
  title: "TV en Vivo",
  href: "/live",
};

const navigationItems = [movies, tvShows, anime, people, trending] as NavItem[];

export const navigation = {
  items: navigationItems,
};

export const liveTvNavItem = liveTv;
