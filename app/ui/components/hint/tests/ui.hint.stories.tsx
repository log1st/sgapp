import type { Meta, StoryObj } from "@storybook/react";
import { UiHint } from "../index";
import { Icon } from "../../icon";

const meta = {
  title: "Components/UiHint",
  component: UiHint,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiHint>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    label: "Label",
    icon: Icon.xMarkMini,
  },
  name: "UiHint",
} satisfies StoryObj<typeof meta>;

export default meta;
