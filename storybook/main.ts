/* eslint-disable import/no-extraneous-dependencies */

import type { StorybookConfig } from "@storybook/nextjs";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const config: StorybookConfig = {
  stories: ["../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: (cfg) => ({
    ...cfg,
    resolve: {
      ...cfg.resolve,
      plugins: [
        ...(cfg.resolve?.plugins || []),
        new TsconfigPathsPlugin({
          extensions: cfg.resolve?.extensions,
        }),
      ],
    },
  }),
};
export default config;
