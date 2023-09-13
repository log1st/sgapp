import type { Meta, StoryObj } from "@storybook/react";
import { UiTypography } from "../index";

const meta = {
  title: "Utils/UiTypography",
  component: UiTypography,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiTypography>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiTypography",
} satisfies StoryObj<typeof meta>;

export default meta;
