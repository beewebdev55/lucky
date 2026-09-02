"use client";

import { MovieCollectionClient } from "@/components/movie/movie-collection-client";
import { StatusBadge } from "@/components/media/controls/status-badge";
import { buildProductionCompanyCatalogUrl } from "@/lib/catalog-query";
import { formatValue } from "@/lib/utils";
import { format } from "@/tmdb/utils";
import type { MovieDetails } from "@/tmdb/models";
import { isUpcomingMovie } from "@/utils/movie-helpers";
import { Calendar, Clock, Star } from "lucide-react";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

const factLinkClass =
  "text-sky-300/95 underline decoration-sky-400/35 underline-offset-2 transition hover:text-sky-200 hover:decoration-sky-300/60";

type MovieOverviewTabProps = {
  details: MovieDetails;
  showOverviewHeading?: boolean;
};

type FactItemProps = {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
};

const FactItem = ({ label, value, icon }: FactItemProps) => (
  <div className="flex items-start gap-3 border-t border-border/70 py-4">
    {icon ? (
      <span className="mt-0.5 shrink-0 text-primary/90">{icon}</span>
    ) : null}
    <div className="min-w-0 space-y-1">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="text-sm leading-relaxed text-foreground">{value}</div>
    </div>
  </div>
);

export const MovieOverviewTab = ({
  details,
  showOverviewHeading = true,
}: MovieOverviewTabProps) => {
  const isUpcoming = isUpcomingMovie(details);
  const hasRuntime = Boolean(details.runtime && details.runtime > 0);
  const hours = Math.floor((details.runtime || 0) / 60);
  const minutes = (details.runtime || 0) % 60;
  const formattedRuntime = hasRuntime ? `${hours}h ${minutes}m` : "Duración por confirmar";

  const releaseDate = details.release_date
    ? new Date(details.release_date).toLocaleDateString("es-MX", {
        timeZone: "UTC",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Fecha de estreno por confirmar";

  const {
    status,
    budget,
    revenue,
    production_companies,
    belongs_to_collection,
    original_language,
    overview,
    vote_average,
    vote_count,
  } = details;

  const ratingValue =
    vote_average && vote_average > 0 ? (
      <>
        {vote_average.toFixed(1)}/10
        {vote_count && vote_count > 0 ? (
          <span className="text-muted-foreground">
            {" "}
            ({vote_count.toLocaleString()} votos)
          </span>
        ) : null}
      </>
    ) : (
      "Aún no calificado"
    );

  const uniqueProductionCompanies = (production_companies ?? []).filter(
    (company, index, companies) => {
      const nameKey = company.name.trim().toLowerCase();
      return (
        companies.findIndex(
          (entry) =>
            entry.id === company.id ||
            entry.name.trim().toLowerCase() === nameKey,
        ) === index
      );
    },
  );

  const productionCompanies = uniqueProductionCompanies.length ? (
    <span>
      {uniqueProductionCompanies.map((company, index) => (
        <Fragment key={company.id}>
          {index > 0 ? ", " : null}
          <Link
            href={buildProductionCompanyCatalogUrl("movie", company)}
            className={factLinkClass}
          >
            {company.name}
          </Link>
        </Fragment>
      ))}
    </span>
  ) : (
    "—"
  );

  const facts: FactItemProps[] = [
    ...(hasRuntime || !isUpcoming
      ? [
          {
            label: "Duración",
            value: formattedRuntime,
            icon: <Clock className="size-5" aria-hidden />,
          },
        ]
      : []),
    {
      label: "Estreno",
      value: releaseDate,
      icon: <Calendar className="size-5" aria-hidden />,
    },
    ...((vote_count && vote_count > 0) || !isUpcoming
      ? [
          {
            label: "Calificación",
            value: ratingValue,
            icon: <Star className="size-5 text-amber-400" aria-hidden />,
          },
        ]
      : []),
    ...(isUpcoming && status
      ? [{ label: "Estado", value: <StatusBadge status={status} /> }]
      : []),
    ...(!isUpcoming && budget > 0
      ? [{ label: "Presupuesto", value: `$${budget.toLocaleString()}` }]
      : []),
    ...(!isUpcoming && revenue > 0
      ? [{ label: "Ingresos", value: `$${revenue.toLocaleString()}` }]
      : []),
    {
      label: "Idioma original",
      value: formatValue(original_language, format.country),
    },
    { label: "Productoras", value: productionCompanies },
  ];

  return (
    <section className="space-y-6">
      <div className="space-y-4">
        {showOverviewHeading ? (
          <h2 className="text-xl font-semibold text-foreground">Sinopsis</h2>
        ) : null}
        {overview ? (
          <p className="max-w-5xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {overview}
          </p>
        ) : null}
      </div>

      <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
        {facts.map((fact) => (
          <FactItem
            key={fact.label}
            label={fact.label}
            value={fact.value}
            icon={fact.icon}
          />
        ))}
      </div>

      {isUpcoming ? (
        <p className="text-sm text-muted-foreground">
          Habrá más detalles disponibles cuando se acerque la fecha de estreno.
        </p>
      ) : null}

      {belongs_to_collection ? (
        <MovieCollectionClient collectionId={belongs_to_collection.id} />
      ) : null}
    </section>
  );
};
