import { PropsWithChildren } from "react";
import { getSessionTheme } from "@/theming/getSessionTheme";
import { UiRootLayout } from "@/ui/layouts/root";
import { getSessionLanguage } from "@/i18n/getSessionLanguage";

export type RootLayoutProps = PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <UiRootLayout lang={getSessionLanguage()} theme={getSessionTheme()}>
      {children}
    </UiRootLayout>
  );
}
