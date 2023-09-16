import type { Meta, StoryObj } from "@storybook/react";
import { UiStatusLayout } from "../index";

const meta = {
  title: "Layouts/UiRoomStatusLayout",
  component: UiStatusLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiStatusLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiRoomStatusLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
