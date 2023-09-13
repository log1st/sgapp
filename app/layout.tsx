import { PropsWithChildren } from "react";
import { getSessionLanguage } from "@/session/getSessionLanguage";
import { getSessionTheme } from "@/session/getSessionTheme";
import { UiRootLayout } from "@/ui/layouts/root";

export type RootLayoutProps = PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <UiRootLayout lang={getSessionLanguage()} theme={getSessionTheme()}>
      {children}
    </UiRootLayout>
  );
}
