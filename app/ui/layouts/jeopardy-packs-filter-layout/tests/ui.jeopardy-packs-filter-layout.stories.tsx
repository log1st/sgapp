import type { Meta, StoryObj } from "@storybook/react";
import { UiJeopardyPacksFilterLayout } from "../index";

const meta = {
  title: "Layouts/UiJeopardyPacksFilterLayout",
  component: UiJeopardyPacksFilterLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiJeopardyPacksFilterLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiJeopardyPacksFilterLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
