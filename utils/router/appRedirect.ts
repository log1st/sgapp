import { RedirectType } from "next/dist/client/components/redirect";
import { Route } from "next";
import { redirect } from "next/navigation";

export const appRedirect = (url: Route, type?: RedirectType): never =>
  redirect(url, type);
