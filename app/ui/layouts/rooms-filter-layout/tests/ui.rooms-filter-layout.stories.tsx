import type { Meta, StoryObj } from "@storybook/react";
import { UiRoomsFilterLayout } from "../index";

const meta = {
  title: "Layouts/UiRoomsFilterLayout",
  component: UiRoomsFilterLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiRoomsFilterLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiRoomsFilterLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
