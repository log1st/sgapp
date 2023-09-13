import type { Meta, StoryObj } from "@storybook/react";
import { UiPaginationLayout } from "../index";

const meta = {
  title: "Layouts/UiPaginationLayout",
  component: UiPaginationLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiPaginationLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiPaginationLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
