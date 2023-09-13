import type { Meta, StoryObj } from "@storybook/react";
import { UiAuthSignUpFormLayout } from "../index";

const meta = {
  title: "Layouts/UiAuthSignUpFormLayout",
  component: UiAuthSignUpFormLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiAuthSignUpFormLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiAuthSignUpFormLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
