import type { Meta, StoryObj } from "@storybook/react";
import { UiCodeBlock, UiCodeBlockTheme, UiCodeBlockType } from "../index";
import { UiBadgeColor } from "../../badge";
import { Icon } from "../../icon";

const meta = {
  title: "Components/UiCodeBlock",
  component: UiCodeBlock,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiCodeBlock>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    badge: {
      label: "Get",
      color: UiBadgeColor.green,
    },
    contents: [
      {
        key: "npm",
        content: "$ npm run start",
        label: "npm",
      },
      {
        key: "yarn",
        content: "$ yarn start",
        label: "Yarn",
      },
    ],
    type: UiCodeBlockType.advanced,
    title: "/products-list.js",
    theme: UiCodeBlockTheme.loud,
    actions: [
      {
        key: "warn",
        icon: Icon.exclamationCircle,
      },
      {
        key: "copy",
        icon: Icon.squareTwoStack,
      },
    ],
  },
  name: "UiCodeBlock",
} satisfies StoryObj<typeof meta>;

export default meta;
