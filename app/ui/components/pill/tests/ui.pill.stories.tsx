import type { Meta, StoryObj } from "@storybook/react";
import { UiPill } from "../index";

const meta = {
  title: "Components/UiPill",
  component: UiPill,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiPill>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    label: "Label",
  },
  name: "UiPill",
} satisfies StoryObj<typeof meta>;

export default meta;
