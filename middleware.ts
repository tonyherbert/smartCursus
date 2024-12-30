import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "./src/lib/auth/auth.const";
import { SiteConfig } from "./src/site-config";

// Configuration du middleware pour exclure certains chemins
export const config = {
  matcher: [
    /*
     * Exclure les chemins suivants :
     * - api (routes API)
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico (favicon)
     * - admin (routes admin)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|admin).*)",
  ],
};

export async function middleware(req: NextRequest) {
  // Injecter l'URL complète et le pathname dans les en-têtes de la requête
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url); // URL complète
  requestHeaders.set("x-current-path", req.nextUrl.pathname); // Pathname uniquement

  // Redirection vers /orgs si l'utilisateur est connecté et qu'il est sur la page d'accueil
  if (
    req.nextUrl.pathname === "/" &&
    SiteConfig.features.enableLandingRedirection
  ) {
    const cookieList = await cookies();
    const authCookie = cookieList.get(AUTH_COOKIE_NAME);

    if (authCookie) {
      const url = new URL(req.url);
      url.pathname = "/orgs";
      return NextResponse.redirect(url.toString());
    }
  }

  // Continuer avec les en-têtes modifiés
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
