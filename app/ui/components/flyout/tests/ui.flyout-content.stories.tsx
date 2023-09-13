import type { Meta, StoryObj } from "@storybook/react";
import { UiFlyoutContent } from "../ui/parts/content/ui.flyout-content";

const meta = {
  title: "Components/UiFlyout/Parts/Content",
  component: UiFlyoutContent,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiFlyoutContent>;

export const Story = {
  args: {
    children: "Content",
  },
  name: "Content",
} satisfies StoryObj<typeof meta>;

export default meta;
