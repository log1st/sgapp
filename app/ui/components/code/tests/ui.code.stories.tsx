import type { Meta, StoryObj } from "@storybook/react";
import { UiCode } from "../index";

const meta = {
  title: "Components/UiCode",
  component: UiCode,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiCode>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    value: "node -v",
  },
  name: "UiCode",
} satisfies StoryObj<typeof meta>;

export default meta;
