import type { Meta, StoryObj } from "@storybook/react";
import { UiJeopardyRoomInfoCardLayout } from "../index";

const meta = {
  title: "Layouts/UiJeopardyRoomInfoCardLayout",
  component: UiJeopardyRoomInfoCardLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiJeopardyRoomInfoCardLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiJeopardyRoomInfoCardLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
