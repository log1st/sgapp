import type { Meta, StoryObj } from "@storybook/react";
import { UiRoomPageLayout } from "../index";

const meta = {
  title: "Layouts/UiRoomPageLayout",
  component: UiRoomPageLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiRoomPageLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiRoomPageLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
