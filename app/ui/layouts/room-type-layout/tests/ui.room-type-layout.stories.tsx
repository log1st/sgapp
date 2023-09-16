import type { Meta, StoryObj } from "@storybook/react";
import { UiRoomTypeLayout } from "../index";

const meta = {
  title: "Layouts/UiRoomTypeLayout",
  component: UiRoomTypeLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiRoomTypeLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiRoomTypeLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
