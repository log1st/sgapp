import type { Meta, StoryObj } from "@storybook/react";
import { UiLogo } from "..";

const meta = {
  title: "Components/UiLogo",
  component: UiLogo,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiLogo>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {
      inlineSize: "300px",
    },
  },
  name: "UiLogo",
} satisfies StoryObj<typeof meta>;

export default meta;
