import type { Meta, StoryObj } from "@storybook/react";
import { UiSidebarLabel } from "../index";
import { Icon } from "../../icon";
import { UiButton, UiButtonVariant } from "../../button";

const meta = {
  title: "Components/UiSidebarLabel",
  component: UiSidebarLabel,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiSidebarLabel>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    icon: Icon.ellipseBlueSolid,
    label: "Label",
    appendIcon: (
      <UiButton label={Icon.plus} variant={UiButtonVariant.primary} />
    ),
  },
  name: "UiSidebarLabel",
} satisfies StoryObj<typeof meta>;

export default meta;
