import type { Meta, StoryObj } from "@storybook/react";
import { getMockImageUrl } from "@/utils";
import { UiHoverCard } from "../index";

const meta = {
  title: "Components/UiHoverCard",
  component: UiHoverCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiHoverCard>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    avatar: getMockImageUrl(),
    hint: "Hint",
    title: "Title",
    card: false,
  },
  name: "UiHoverCard",
} satisfies StoryObj<typeof meta>;

export default meta;
