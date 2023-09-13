import type { Meta, StoryObj } from "@storybook/react";
import { UiResponsiveUtil } from "../index";

const meta = {
  title: "Utils/UiResponsiveUtil",
  component: UiResponsiveUtil,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiResponsiveUtil>;

export const Story = {
  args: {
    tablet: false,
    mobile: false,
    children: "Children",
  },
  name: "UiResponsiveUtil",
} satisfies StoryObj<typeof meta>;

export default meta;
