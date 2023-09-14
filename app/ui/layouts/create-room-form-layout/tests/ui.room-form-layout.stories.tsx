import type { Meta, StoryObj } from "@storybook/react";
import { UiRoomFormLayout } from "../index";

const meta = {
  title: "Layouts/UiRoomFormLayout",
  component: UiRoomFormLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiRoomFormLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiRoomFormLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
