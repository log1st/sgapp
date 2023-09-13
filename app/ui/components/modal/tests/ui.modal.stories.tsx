import type { Meta, StoryObj } from "@storybook/react";
import { UiModal } from "../index";

const meta = {
  title: "Components/UiModal",
  component: UiModal,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiModal>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiModal",
} satisfies StoryObj<typeof meta>;

export default meta;
