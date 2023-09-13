import type { Meta, StoryObj } from "@storybook/react";
import { UiAuthSignInFormLayout } from "../index";

const meta = {
  title: "Layouts/UiAuthSignInFormLayout",
  component: UiAuthSignInFormLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiAuthSignInFormLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiAuthSignInFormLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
