import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const BRAND_NAME = "Cuevana 3";

export const BRAND_LOGO_SIZES = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-3xl",
} as const;

export type BrandLogoSize = keyof typeof BRAND_LOGO_SIZES;

export type BrandLogoPlacement =
  | "navbar"
  | "footer"
  | "mobile-menu"
  | "auth"
  | "auth-compact"
  | "static";

type PlacementConfig = {
  size: BrandLogoSize;
  priority?: boolean;
  linked?: boolean;
  imageClassName?: string;
  linkClassName?: string;
  wrapperClassName?: string;
  ariaLabel?: string;
};

const PLACEMENT_CONFIG: Record<BrandLogoPlacement, PlacementConfig> = {
  navbar: {
    size: "md",
    priority: true,
    linked: true,
    linkClassName: "inline-flex shrink-0 items-center",
    ariaLabel: `${BRAND_NAME} home`,
  },
  footer: {
    size: "sm",
    linked: true,
    linkClassName: "flex shrink-0 items-center",
    imageClassName: "transition-transform duration-200 hover:scale-105",
    ariaLabel: `${BRAND_NAME} homepage`,
  },
  "mobile-menu": {
    size: "sm",
    linked: true,
    linkClassName: "inline-flex shrink-0 items-center",
    ariaLabel: `${BRAND_NAME} home`,
  },
  auth: {
    size: "lg",
    linked: true,
    linkClassName: "mb-8 inline-flex items-center text-white",
    ariaLabel: `${BRAND_NAME} home`,
  },
  "auth-compact": {
    size: "md",
    linked: true,
    wrapperClassName: "mb-8 flex justify-center lg:hidden",
    linkClassName: "inline-flex items-center",
    ariaLabel: `${BRAND_NAME} home`,
  },
  static: {
    size: "md",
  },
};

type BrandLogoProps = {
  placement?: BrandLogoPlacement;
  size?: BrandLogoSize;
  className?: string;
  linkClassName?: string;
  wrapperClassName?: string;
  priority?: boolean;
  href?: string;
  onClick?: ComponentProps<typeof Link>["onClick"];
};

const BrandLogo = ({
  placement = "static",
  size,
  className,
  linkClassName,
  wrapperClassName,
  priority,
  href = "/",
  onClick,
}: BrandLogoProps) => {
  const config = PLACEMENT_CONFIG[placement];
  const textSize = BRAND_LOGO_SIZES[size || config.size];

  const image = (
    <span className={cn("font-bold tracking-tight text-white", textSize, config.imageClassName, className)}>
      Cuevana <span className="text-primary">3</span>
    </span>
  );

  const content = config.linked ? (
    <Link
      href={href}
      onClick={onClick}
      className={cn(config.linkClassName, linkClassName)}
      aria-label={config.ariaLabel}
    >
      {image}
      <span className="sr-only">{BRAND_NAME}</span>
    </Link>
  ) : (
    image
  );

  const wrapperClasses = cn(config.wrapperClassName, wrapperClassName);
  if (!wrapperClasses) {
    return content;
  }

  return <div className={wrapperClasses}>{content}</div>;
};

export { BrandLogo };

