import type { Meta, StoryObj } from "@storybook/react";
import { UiUserLayout } from "../index";

const meta = {
  title: "Layouts/UiUserLayout",
  component: UiUserLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiUserLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiUserLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
