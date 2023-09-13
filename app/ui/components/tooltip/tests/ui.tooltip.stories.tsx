import type { Meta, StoryObj } from "@storybook/react";
import { UiTooltip } from "../index";
import { UiButtonVariant } from "../../button";

const meta = {
  title: "Components/UiTooltip",
  component: UiTooltip,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiTooltip>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    label: "Tooltip Text",
    action: {
      key: "action",
      label: "Action",
      variant: UiButtonVariant.secondary,
    },
    kbd: [
      {
        key: "⌘",
        children: "⌘",
      },
      {
        key: "Slash",
        children: "/",
      },
    ],
  },
  name: "UiTooltip",
} satisfies StoryObj<typeof meta>;

export default meta;
