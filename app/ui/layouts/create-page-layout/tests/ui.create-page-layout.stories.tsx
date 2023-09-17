import type { Meta, StoryObj } from "@storybook/react";
import { UiCreatePageLayout } from "../index";

const meta = {
  title: "Layouts/UiCreatePageLayout",
  component: UiCreatePageLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiCreatePageLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiCreatePageLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
