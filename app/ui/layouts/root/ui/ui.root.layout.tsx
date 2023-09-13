import { PropsWithChildren } from "react";

import "../../../assets/fonts/icons/icons.css";
import "../../../assets/drop.scss";
import { clsx } from "@clsx";
import styles from "./ui.root.layout.module.scss";
import { UiIconsMap } from "../../../components/icon/ui/ui.icons-map";

export enum AppTheme {
  light = "light",
  dark = "dark",
}

export type UiRootLayoutProps = PropsWithChildren<{
  app?: boolean;
  theme?: AppTheme;
  lang?: string;
}>;

export function UiRootLayout({
  children,
  app = true,
  theme = AppTheme.light,
  lang = "en",
}: UiRootLayoutProps) {
  if (!app) {
    return (
      <div
        className={clsx([
          styles.root,
          app && styles.isApp,
          styles[`${theme}Theme`],
        ])}
      >
        {children}
        <UiIconsMap className={styles.icons} />
      </div>
    );
  }

  return (
    <html
      lang={lang}
      className={clsx([
        styles.root,
        app && styles.isApp,
        styles[`${theme}Theme`],
      ])}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <UiIconsMap className={styles.icons} />
        <div className={styles.popper} data-app-popper />
      </body>
    </html>
  );
}
