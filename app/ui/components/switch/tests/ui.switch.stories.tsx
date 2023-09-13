import type { Meta, StoryObj } from "@storybook/react";
import { UiSwitch, UiSwitchSize } from "../index";

const meta = {
  title: "Components/Form/UiSwitch",
  component: UiSwitch,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiSwitch>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    size: UiSwitchSize.small,
  },
  name: "UiSwitch",
} satisfies StoryObj<typeof meta>;

export default meta;
