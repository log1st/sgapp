import type { Meta, StoryObj } from "@storybook/react";
import { UiPureButton } from "..";

const meta = {
  title: "Components/UiPureButton",
  component: UiPureButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiPureButton>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    children: "Children",
  },
  name: "UiPureButton",
} satisfies StoryObj<typeof meta>;

export default meta;
