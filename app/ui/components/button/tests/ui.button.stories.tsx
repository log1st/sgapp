import type { Meta, StoryObj } from "@storybook/react";
import { UiButton } from "..";
import { Icon } from "../../icon";

const meta = {
  title: "Components/UiButton",
  component: UiButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiButton>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    label: "Button",
    after: Icon.xMarkMini,
  },
  name: "UiButton",
} satisfies StoryObj<typeof meta>;

export default meta;
