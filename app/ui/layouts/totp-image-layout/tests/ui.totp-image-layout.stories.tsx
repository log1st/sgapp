import type { Meta, StoryObj } from "@storybook/react";
import { UiTotpImageLayout } from "../index";

const meta = {
  title: "Layouts/UiTotpImageLayout",
  component: UiTotpImageLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiTotpImageLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiTotpImageLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
