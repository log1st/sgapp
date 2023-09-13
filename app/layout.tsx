import { PropsWithChildren } from "react";
import { UiRootLayout } from "@/app/ui/layouts/root";
import { getSessionLanguage } from "@/session/getSessionLanguage";
import { getSessionTheme } from "@/session/getSessionTheme";

export type RootLayoutProps = PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <UiRootLayout lang={getSessionLanguage()} theme={getSessionTheme()}>
      {children}
    </UiRootLayout>
  );
}
