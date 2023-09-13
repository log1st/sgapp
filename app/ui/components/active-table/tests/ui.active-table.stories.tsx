import type { Meta, StoryObj } from "@storybook/react";
import { randomDate, randomNumber, randomString } from "@/utils";
import { UiActiveTable } from "../index";
import { Icon } from "../../icon";
import { UiButtonVariant } from "../../button";

const meta = {
  title: "Components/UiActiveTable",
  component: UiActiveTable,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiActiveTable>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    records: Array.from({ length: 20 }).map(() => ({
      id: randomString(),
      name: randomString(),
      date: randomDate(),
      count: randomNumber(0, 10000),
    })),
    keyIndex: "id",
    columns: [
      {
        key: "id",
      },
      {
        key: "name",
      },
      {
        key: "date",
        render: (_, value: Date) => value.toString(),
      },
      {
        key: "count",
      },
    ],
    getRowHref: (payload) => `#${(payload.record as { id: string }).id}`,
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
    selectedKeys: [],
  },
  name: "UiActiveTable",
} satisfies StoryObj<typeof meta>;

export default meta;
