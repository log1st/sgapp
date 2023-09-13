import type { Meta, StoryObj } from "@storybook/react";
import { UiActiveActions } from "../index";
import { Icon } from "../../icon";
import { UiButtonVariant } from "../../button";

const meta = {
  title: "Components/UiActiveActions",
  component: UiActiveActions,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiActiveActions>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    actions: [
      {
        key: "see",
        label: Icon.eye,
      },
      {
        key: "delete",
        label: Icon.trash,
        variant: UiButtonVariant.danger,
      },
    ],
    record: {},
  },
  name: "UiActiveActions",
} satisfies StoryObj<typeof meta>;

export default meta;
