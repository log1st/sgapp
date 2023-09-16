import type { Meta, StoryObj } from "@storybook/react";
import { UiListPageLayout } from "../index";

const meta = {
  title: "Layouts/UiListPageLayout",
  component: UiListPageLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiListPageLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiListPageLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
