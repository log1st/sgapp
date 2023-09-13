import { PropsWithChildren } from "react";
import { getSessionLanguage } from "@/session/getSessionLanguage";
import { getSessionTheme } from "@/session/getSessionTheme";
import { UiRootLayout } from "@/ui/layouts/root";
import { DialogsProvider } from "@/app/providers/dialogs/DialogsProvider";

export type RootLayoutProps = PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <DialogsProvider>
      <UiRootLayout lang={getSessionLanguage()} theme={getSessionTheme()}>
        {children}
      </UiRootLayout>
    </DialogsProvider>
  );
}
