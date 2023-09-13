import { PropsWithChildren } from "react";
import { isAuthorized } from "@/session/getAccessToken";
import { appRedirect } from "@/utils/router";
import { UiAuthLayout } from "@/ui/layouts/auth-layout";
import { UiLogo } from "@/ui/components/logo";

export type AuthLayoutProps = PropsWithChildren;

export default function AuthLayout({ children }: AuthLayoutProps) {
  if (isAuthorized()) {
    appRedirect("/");
  }

  return <UiAuthLayout logo={<UiLogo />}>{children}</UiAuthLayout>;
}
