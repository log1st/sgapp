import type { Meta, StoryObj } from "@storybook/react";
import { UiAvatarsStack } from "../index";

const meta = {
  title: "Layouts/UiAvatarsStack",
  component: UiAvatarsStack,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiAvatarsStack>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiAvatarsStack",
} satisfies StoryObj<typeof meta>;

export default meta;
