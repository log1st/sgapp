import { PropsWithChildren } from "react";
import { isAuthorized } from "@/session/getAccessToken";
import { appRedirect } from "@/utils/router";

export type AuthLayoutProps = PropsWithChildren;

export default function AuthLayout({ children }: AuthLayoutProps) {
  if (isAuthorized()) {
    appRedirect("/");
  }

  return children;
}
