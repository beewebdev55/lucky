import { auth, signIn } from "@/auth";
import { CapLoginForm } from "@/components/auth/cap-login-form";
import { MalLoginButton } from "@/components/auth/mal-login-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCapApiEndpoint } from "@/lib/cap/config";
import { withCapVerifiedSignIn } from "@/lib/cap/auth-authorization";
import { isCapDevBypassEnabled } from "@/lib/cap/constants";
import { verifyCapToken } from "@/lib/cap/server";
import { getDevMagicLink } from "@/lib/dev-magic-link-store";
import { SITE_URL } from "@/lib/constants";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_TYPE,
  OG_IMAGE_SIZE,
} from "@/lib/seo/constants";
import { Mail } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSiteFlags } from "@/lib/flags/site-flags";
import {
  loginErrorHref,
  loginVerifyHref,
  safeAuthCallbackPath,
} from "@/lib/auth/callback-url";
import { AuthShell } from "./auth-shell";

export const metadata: Metadata = {
  title: "Iniciar Sesión | Cuevana 3",
  description: "Iniciar sesión en Cuevana 3 | Accede a tu lista y más",
  keywords: [
    "Cuevana 3",
    "Login",
    "Sign In",
    "Authentication",
    "Movies",
    "TV Shows",
    "Watchlist",
    "Streaming",
    "Entertainment",
  ],
  openGraph: {
    type: "website",
    url: `${SITE_URL}/login`,
    title: "Login | Cuevana 3",
    description: "Login to Cuevana 3 | Access Your Watchlist & More",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: OG_IMAGE_SIZE.width,
        height: OG_IMAGE_SIZE.height,
        type: DEFAULT_OG_IMAGE_TYPE,
        alt: "Login | Cuevana 3",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: `${SITE_URL}/login`,
    title: "Login | Cuevana 3",
    description: "Login to Cuevana 3 | Access Your Watchlist & More",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: "Login | Cuevana 3",
      },
    ],
  },
};

type LoginPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const [flags, session, params] = await Promise.all([
    getSiteFlags(),
    auth(),
    searchParams,
  ]);
  const callbackUrl = safeAuthCallbackPath(params.callbackUrl);
  if (!flags.authEnabled) {
    redirect("/");
  }
  if (session?.user?.id) {
    redirect(callbackUrl);
  }

  const handleLogin = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const capToken = formData.get("cap-token");

    if (
      !email ||
      (!isCapDevBypassEnabled() && !(await verifyCapToken(capToken)))
    ) {
      redirect(loginErrorHref("Captcha", callbackUrl));
      return;
    }

    try {
      await withCapVerifiedSignIn(() =>
        signIn("resend", {
          email,
          redirect: false,
          redirectTo: callbackUrl,
        }),
      );
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }

    if (process.env.NODE_ENV === "development") {
      const magicLink = getDevMagicLink(email);
      if (magicLink) {
        // Server actions can't redirect() to a route handler directly: the
        // client router fetches it, follows the 302 internally, and renders
        // the result under the callback URL. The verify page performs a full
        // browser navigation to the magic link instead.
        redirect(
          loginVerifyHref({
            callbackUrl,
            devLink: magicLink,
          }),
        );
      }
    }

    redirect(loginVerifyHref({ callbackUrl }));
  };

  return (
    <AuthShell
      eyebrow="Inicia sesión para mantener todo sincronizado."
      title="Haz que Cuevana 3 sea tuyo."
      description="Desbloquea listas de seguimiento, progreso y solicitudes de funciones."
    >
      <Card className="overflow-hidden rounded-2xl border-white/12 bg-zinc-950/72 text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <CardHeader className="space-y-3 px-6 pb-4 pt-6 sm:px-8 sm:pt-8">
          <div className="flex size-11 items-center justify-center rounded-xl border border-sky-300/15 bg-sky-300/10 text-sky-200">
            <Mail className="size-5" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold leading-tight tracking-tight text-white">
              Iniciar sesión
            </CardTitle>
            <CardDescription className="text-sm leading-6 text-zinc-400">
              {flags.signupDisabled
                ? "Las cuentas nuevas están pausadas. Los miembros actuales aún pueden solicitar un enlace mágico."
                : "Ingresa tu correo electrónico y te enviaremos un enlace mágico para iniciar sesión."}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8">
          <CapLoginForm action={handleLogin} endpoint={getCapApiEndpoint()} />
          {process.env.MAL_CLIENT_ID ? (
            <div className="mt-5">
              <MalLoginButton callbackUrl={callbackUrl} />
            </div>
          ) : null}
          <p className="mt-5 text-center text-xs leading-5 text-zinc-500">
            Al continuar, aceptas los{" "}
            <Link
              href="/terms"
              className="font-medium text-zinc-300 underline-offset-4 hover:text-white hover:underline"
            >
              Términos
            </Link>{" "}
            y la{" "}
            <Link
              href="/privacy"
              className="font-medium text-zinc-300 underline-offset-4 hover:text-white hover:underline"
            >
              Política de Privacidad
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </AuthShell>
  );
}
