import type { Meta, StoryObj } from "@storybook/react";
import { UiRadio } from "../index";

const meta = {
  title: "Components/Form/UiRadio",
  component: UiRadio,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiRadio>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiRadio",
} satisfies StoryObj<typeof meta>;

export default meta;
