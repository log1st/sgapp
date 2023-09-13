import type { Meta, StoryObj } from "@storybook/react";
import {
  UiFlyout,
  UiFlyoutContent,
  UiFlyoutContentType,
  UiFlyoutRow,
  UiFlyoutDelimiter,
} from "../index";
import { Icon, UiIcon } from "../../icon";
import { UiHoverCard } from "../../hover-card";
import { UiActiveActions } from "../../active-actions";
import { UiButtonVariant } from "../../button";

const meta = {
  title: "Components/UiFlyout",
  component: UiFlyout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiFlyout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    children: "Children",
  },
  name: "UiFlyout",
} satisfies StoryObj<typeof meta>;

export const ExampleStory = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    children: (
      <>
        <UiFlyoutContent>
          <UiHoverCard
            card={false}
            title="Username"
            hint={"User's status"}
            avatar={{ letters: "L" }}
          />
        </UiFlyoutContent>
        <UiFlyoutDelimiter />
        <UiFlyoutRow checked radio label="No Sorting" />
        <UiFlyoutDelimiter />
        <UiFlyoutRow label="Alphabetical" hint="A -> Z" />
        <UiFlyoutRow label="Reverse alphabetical" hint="Z -> A" />
        <UiFlyoutRow label="Created date - Ascending" hint="1 -> 30" />
        <UiFlyoutRow label="Created date - Descending" hint="30 -> 1" />
        <UiFlyoutDelimiter />
        <UiFlyoutRow label="Account Settings" icon={Icon.user} />
        <UiFlyoutRow label="Help" icon={Icon.questionMarkCircle} />
        <UiFlyoutDelimiter />
        <UiFlyoutContent type={UiFlyoutContentType.skeleton} />
        <UiFlyoutContent type={UiFlyoutContentType.skeleton} />
        <UiFlyoutDelimiter />
        <UiFlyoutContent type={UiFlyoutContentType.loader}>
          <UiIcon icon={Icon.spinner} size={20} spin />
        </UiFlyoutContent>
        <UiFlyoutDelimiter />
        <UiFlyoutContent type={UiFlyoutContentType.actions}>
          <UiActiveActions
            block
            actions={[
              {
                key: "one",
                label: "Delete",
                variant: UiButtonVariant.danger,
              },
              {
                key: "two",
                label: "Two",
                variant: UiButtonVariant.secondary,
              },
              {
                key: "three",
                label: "Three",
                variant: UiButtonVariant.primary,
              },
            ]}
          />
        </UiFlyoutContent>
        <UiFlyoutDelimiter />
        <UiFlyoutRow
          label="Log Out"
          icon={Icon.arrowRightOnRectangle}
          hint="⌥⇧Q"
        />
      </>
    ),
  },
  name: "Example",
} satisfies StoryObj<typeof meta>;

export default meta;
