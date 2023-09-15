import type { Meta, StoryObj } from "@storybook/react";
import { UiCreateRoomPageLayout } from "../index";

const meta = {
  title: "Layouts/UiCreateRoomPageLayout",
  component: UiCreateRoomPageLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiCreateRoomPageLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiCreateRoomPageLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
