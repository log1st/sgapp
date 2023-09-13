import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { UiMainLayout } from "@/ui/layouts/main-layout";
import {
  getAccessTokenExpirationDate,
  isAuthorized,
} from "@/session/getAccessToken";
import { appRedirect } from "@/utils/router";
import { RefreshHandle } from "@/app/components/refresh/RefreshHandle";
import Sidebar from "@/app/components/layout/Sidebar";
import { getServerTranslation } from "@/i18n/getServerTranslation";

export const generateMetadata = async (): Promise<Metadata> => {
  const { t } = await getServerTranslation(["auth", "meta"]);

  return {
    title: t("meta:pureTitle"),
  };
};

export type SignedLayoutProps = PropsWithChildren;

export default async function SignedLayout({ children }: SignedLayoutProps) {
  if (!isAuthorized()) {
    appRedirect("/auth");
  }

  const expirationDate = getAccessTokenExpirationDate();

  return (
    <>
      <UiMainLayout side={<Sidebar />}>{children}</UiMainLayout>
      {expirationDate && <RefreshHandle refreshAt={expirationDate} />}
    </>
  );
}
