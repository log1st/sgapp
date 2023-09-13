import type { Meta, StoryObj } from "@storybook/react";
import { UiFlyoutTitle } from "../ui/parts/title/ui.flyout-title";

const meta = {
  title: "Components/UiFlyout/Parts/Title",
  component: UiFlyoutTitle,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiFlyoutTitle>;

export const Story = {
  args: {
    title: "Title",
    side: "Side",
  },
  name: "Title",
} satisfies StoryObj<typeof meta>;

export default meta;
