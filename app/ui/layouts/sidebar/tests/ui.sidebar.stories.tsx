import type { Meta, StoryObj } from "@storybook/react";
import { UiSidebar } from "../index";

const meta = {
  title: "Layouts/UiSidebar",
  component: UiSidebar,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiSidebar>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    label: "label",
    hint: "Hint",
    avatar: "avatar",
    expanded: true,
    expandable: true,
    children: "Children",
  },
  name: "UiSidebar",
} satisfies StoryObj<typeof meta>;

export default meta;
