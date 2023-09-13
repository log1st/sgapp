import type { Meta, StoryObj } from "@storybook/react";
import { UiProgressTabsGroup } from "../index";

const meta = {
  title: "Layouts/UiProgressTabsGroup",
  component: UiProgressTabsGroup,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiProgressTabsGroup>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    tabs: [
      {
        key: "one",
        label: "One",
      },
      {
        key: "two",
        label: "Two",
        active: true,
        selected: true,
      },
      {
        key: "three",
        label: "Three",
      },
      {
        key: "four",
        label: "Four",
      },
    ],
  },
  name: "UiProgressTabsGroup",
} satisfies StoryObj<typeof meta>;

export default meta;
