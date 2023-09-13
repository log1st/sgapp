import type { Meta, StoryObj } from "@storybook/react";
import { UiBoxWrapper } from "../index";

const meta = {
  title: "Components/UiBoxWrapper",
  component: UiBoxWrapper,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiBoxWrapper>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    label: "Label",
    children: "X",
    hint: "Hint",
    panel: true,
  },
  name: "UiBoxWrapper",
} satisfies StoryObj<typeof meta>;

export default meta;
