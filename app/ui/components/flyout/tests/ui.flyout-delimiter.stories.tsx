import type { Meta, StoryObj } from "@storybook/react";
import { UiFlyoutDelimiter } from "../ui/parts/delimiter/ui.flyout-delimiter";

const meta = {
  title: "Components/UiFlyout/Parts/Delimiter",
  component: UiFlyoutDelimiter,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiFlyoutDelimiter>;

export const Story = {
  args: {},
  name: "Delimiter",
} satisfies StoryObj<typeof meta>;

export default meta;
