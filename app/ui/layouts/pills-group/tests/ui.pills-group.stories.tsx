import type { Meta, StoryObj } from "@storybook/react";
import { UiPillsGroup } from "../index";

const meta = {
  title: "Layouts/UiPillsGroup",
  component: UiPillsGroup,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiPillsGroup>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    pills: [
      {
        key: "one",
        label: "One",
      },
      {
        key: "two",
        label: "Two",
      },
      {
        key: "three",
        label: "Three",
        selected: true,
      },
      {
        key: "four",
        label: "Four",
      },
    ],
  },
  name: "UiPillsGroup",
} satisfies StoryObj<typeof meta>;

export default meta;
