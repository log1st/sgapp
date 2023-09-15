import type { Meta, StoryObj } from "@storybook/react";
import { UiRoomHeaderLayout } from "../index";

const meta = {
  title: "Layouts/UiRoomHeaderLayout",
  component: UiRoomHeaderLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiRoomHeaderLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiRoomHeaderLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
