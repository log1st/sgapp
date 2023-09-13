import type { Meta, StoryObj } from "@storybook/react";
import { UiLabel } from "../index";
import { Icon } from "../../icon";

const meta = {
  title: "Components/UiLabel",
  component: UiLabel,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiLabel>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    icon: Icon.informationCircleSolid,
    label: "Label",
    hint: "Hint",
  },
  name: "UiLabel",
} satisfies StoryObj<typeof meta>;

export default meta;
