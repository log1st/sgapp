import type { Meta, StoryObj } from "@storybook/react";
import { UiProgressTab } from "../index";
import { Icon } from "../../icon";

const meta = {
  title: "Components/UiProgressTab",
  component: UiProgressTab,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiProgressTab>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    icon: Icon.informationCircleSolid,
    label: "Label",
  },
  name: "UiProgressTab",
} satisfies StoryObj<typeof meta>;

export default meta;
