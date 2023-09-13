import type { Meta, StoryObj } from "@storybook/react";
import { UiFlyoutRow } from "../ui/parts/row/ui.flyout-row";
import { Icon } from "../../icon";

const meta = {
  title: "Components/UiFlyout/Parts/Row",
  component: UiFlyoutRow,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiFlyoutRow>;

export const Story = {
  args: {
    children: "Children",
    disabled: false,
    label: "Label",
    icon: Icon.computerDesktop,
    hint: "99",
    badge: { label: "Test" },
    checked: true,
    radio: false,
  },
  name: "Row",
} satisfies StoryObj<typeof meta>;

export default meta;
