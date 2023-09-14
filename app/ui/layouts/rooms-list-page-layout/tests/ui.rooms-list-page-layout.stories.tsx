import type { Meta, StoryObj } from "@storybook/react";
import { UiRoomsListPageLayout } from "../index";

const meta = {
  title: "Layouts/UiRoomsListPageLayout",
  component: UiRoomsListPageLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiRoomsListPageLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiRoomsListPageLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
