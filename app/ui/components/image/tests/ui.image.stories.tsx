import type { Meta, StoryObj } from "@storybook/react";
import { getMockImageUrl } from "@/utils";
import { UiImage } from "..";

const meta = {
  title: "Components/UiImage",
  component: UiImage,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiImage>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    alt: "Alt",
    src: getMockImageUrl(),
  },
  name: "UiImage",
} satisfies StoryObj<typeof meta>;

export default meta;
