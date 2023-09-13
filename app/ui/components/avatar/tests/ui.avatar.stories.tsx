import type { Meta, StoryObj } from "@storybook/react";
import { getMockImageUrl } from "@/utils";
import { UiAvatar } from "..";

const meta = {
  title: "Components/UiAvatar",
  component: UiAvatar,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiAvatar>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    image: getMockImageUrl(),
    letters: "L",
  },
  name: "UiAvatar",
} satisfies StoryObj<typeof meta>;

export default meta;
