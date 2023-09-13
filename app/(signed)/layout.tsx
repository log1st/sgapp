import { PropsWithChildren } from "react";
import { UiMainLayout } from "@/ui/layouts/main-layout";
import { isAuthorized } from "@/session/getAccessToken";
import { appRedirect } from "@/utils/router";

export type SignedLayoutProps = PropsWithChildren;

export default function SignedLayout({ children }: SignedLayoutProps) {
  if (!isAuthorized()) {
    appRedirect("/auth");
  }

  return <UiMainLayout>{children}</UiMainLayout>;
}
