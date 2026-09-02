import { buildCatalogCtaUrl } from "@/lib/catalog-query";
import { buildAniListUrl } from "@/lib/anilist";

const movie = {
  root: {
    title: "Películas",
    link: "/peliculas",
  },
  catalog: {
    title: "Películas",
    link: "/peliculas",
    resultsLink: buildCatalogCtaUrl("movie", {
      mode: "results",
      extra: { view: "discover" },
    }),
  },
  discover: {
    title: "Películas",
    link: "/peliculas",
  },
  discoverResults: {
    title: "Más Popular",
  },
  popular: {
    title: "Películas Populares",
    link: buildCatalogCtaUrl("movie", { view: "popular", mode: "results" }),
    discoverHubLink: buildCatalogCtaUrl("movie", {
      mode: "results",
      extra: { sort_by: "vote_count.desc" },
    }),
  },
  topRated: {
    title: "Mejor Valoradas",
    link: buildCatalogCtaUrl("movie", { view: "top_rated", mode: "results" }),
  },
  nowPlaying: {
    title: "En Cines",
    link: buildCatalogCtaUrl("movie", { view: "now_playing", mode: "results" }),
  },
};

const tv = {
  root: {
    title: "Series",
    link: "/series",
  },
  catalog: {
    title: "Series",
    link: "/series",
    resultsLink: buildCatalogCtaUrl("tv", {
      mode: "results",
      extra: { view: "discover" },
    }),
  },
  discover: {
    title: "Series",
    link: "/series",
  },
  discoverResults: {
    title: "Más Popular",
  },
  popular: {
    title: "Series Populares",
    link: buildCatalogCtaUrl("tv", { view: "popular", mode: "results" }),
    discoverHubLink: buildCatalogCtaUrl("tv", {
      mode: "results",
      extra: { sort_by: "vote_count.desc" },
    }),
  },
  topRated: {
    title: "Mejor Valoradas",
    link: buildCatalogCtaUrl("tv", { view: "top_rated", mode: "results" }),
  },
  airingToday: {
    title: "Emitiéndose Hoy",
    link: buildCatalogCtaUrl("tv", { view: "airing_today", mode: "results" }),
  },
  onTheAir: {
    title: "En Emisión",
    link: buildCatalogCtaUrl("tv", { view: "on_the_air", mode: "results" }),
  },
};

const people = {
  root: {
    title: "Personas",
    link: "/personaas",
  },
  popular: {
    title: "Personas Populares",
    link: "/personaas",
  },
  search: {
    title: "Buscar Personas",
    link: "/buscar",
  },
  popularActors: {
    title: "Actores Populares",
    link: "/personaas?department=Acting&gender=2",
  },
  popularActresses: {
    title: "Actrices Populares",
    link: "/personaas?department=Acting&gender=1",
  },
  popularDirectors: {
    title: "Directores Populares",
    link: "/personaas?department=Directing",
  },
};

const trending = {
  root: {
    title: "Tendencias",
    link: "/tendencias",
  },
  movie: {
    title: "Películas en Tendencia",
    link: buildCatalogCtaUrl("movie", { view: "trending", mode: "results" }),
  },
  tv: {
    title: "Series en Tendencia",
    link: buildCatalogCtaUrl("tv", { view: "trending", mode: "results" }),
  },
  people: {
    title: "Personas en Tendencia",
    link: "/tendencias/personas",
  },
};

const anime = {
  root: {
    title: "Anime",
    link: "/anime",
  },
  trendingAnime: {
    title: "Anime en Tendencia",
    link: buildAniListUrl({}),
  },
  popularAnime: {
    title: "Anime Popular",
    link: buildAniListUrl({ medium: "ANIME", sort: "POPULARITY_DESC" }),
  },
  topAnime: {
    title: "Anime Mejor Valorado",
    link: buildAniListUrl({ medium: "ANIME", sort: "SCORE_DESC" }),
  },
  releasingAnime: {
    title: "Anime en Emisión",
    link: buildAniListUrl({
      medium: "ANIME",
      sort: "POPULARITY_DESC",
      status: "RELEASING",
    }),
  },
  actionAnime: {
    title: "Anime de Acción",
    link: buildAniListUrl({
      medium: "ANIME",
      sort: "POPULARITY_DESC",
      genres: ["Action"],
    }),
  },
  romanceAnime: {
    title: "Anime de Romance",
    link: buildAniListUrl({
      medium: "ANIME",
      sort: "POPULARITY_DESC",
      genres: ["Romance"],
    }),
  },
};

const collection = {
  root: {
    title: "Colecciones",
    link: "/buscar",
  },
};

const search = {
  title: "Buscar",
  link: "/buscar",
};

const person = {
  detail: {
    title: "Persona",
    link: "/personaa",
  },
};

export const pages = {
  movie,
  tv,
  people,
  trending,
  anime,
  collection,
  search,
  person,
};
