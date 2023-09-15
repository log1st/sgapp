import type { Meta, StoryObj } from "@storybook/react";
import { UiDropZone } from "../index";

const meta = {
  title: "Components/UiDropZone",
  component: UiDropZone,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiDropZone>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiDropZone",
} satisfies StoryObj<typeof meta>;

export default meta;
