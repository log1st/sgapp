/* eslint-disable import/no-extraneous-dependencies,@typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment */
import type { Preview } from "@storybook/react";
import { Decorator } from "@storybook/react";
import { createGlobalStyle } from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import { useArgs } from "@storybook/client-api";
import { AppTheme, UiRootLayout } from "@/app/ui/layouts/root";

const getThemeByBackground = (background: string = "transparent") => {
  if (background === "transparent") {
    return AppTheme.light;
  }

  const bg = background.substring(1);
  const rgb = parseInt(bg, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luma < 100 ? AppTheme.dark : AppTheme.light;
};

const GlobalStyles = createGlobalStyle`
  #storybook-root {
    padding: 0 !important;
  }
`;

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#FFFFFF",
        },
        {
          name: "dark",
          value: "#1B1B1F",
        },
      ],
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      GlobalStyles,
    }) as Decorator,
    (Story, c) => {
      const [_, updateArgs] = useArgs();

      useEffect(() => {
        updateArgs({
          ..._,
          onChange(
            event: ChangeEvent<{
              value: unknown;
              name: string;
              checked?: boolean;
            }>,
          ) {
            _.onChange?.(event);
            updateArgs({
              [event.target.name]: event.target.value,
            });
          },
        });
      }, []);

      const [theme, toggleTheme] = useState<AppTheme>(
        getThemeByBackground(c.globals.backgrounds?.value),
      );

      useEffect(() => {
        toggleTheme(getThemeByBackground(c.globals.backgrounds?.value));
      }, [c.globals.backgrounds?.value]);

      return (
        <UiRootLayout app={false} theme={theme}>
          <Story />
        </UiRootLayout>
      );
    },
  ],
};

export default preview;
