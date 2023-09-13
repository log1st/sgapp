import type { Meta, StoryObj } from "@storybook/react";
import { UiMainLayout } from "../index";

const meta = {
  title: "Layouts/UiMainLayout",
  component: UiMainLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiMainLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiMainLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
