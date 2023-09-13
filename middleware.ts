import { NextMiddleware, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { urlContextKey } from "@/session/getServerUrl";
import { localeCookieName } from "@/session/getSessionLanguage";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

export const middleware: NextMiddleware = (req) => {
  const headers = new Headers(req.headers);
  headers.set(urlContextKey, req.url);

  const lng =
    req.cookies.get(localeCookieName)?.value ??
    acceptLanguage.get(req.headers.get("Accept-Language")) ??
    "en";

  const res = NextResponse.next({
    request: {
      headers,
    },
  });
  res.cookies.set("lng", lng);

  return res;
};
