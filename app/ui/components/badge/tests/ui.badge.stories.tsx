import type { Meta, StoryObj } from "@storybook/react";
import { UiBadge } from "..";
import { Icon } from "../../icon";

const meta = {
  title: "Components/UiBadge",
  component: UiBadge,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiBadge>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    label: "Badge",
    before: Icon.user,
    after: Icon.xMarkMini,
  },
  name: "UiBadge",
} satisfies StoryObj<typeof meta>;

export default meta;
