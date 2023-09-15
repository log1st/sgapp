import type { Meta, StoryObj } from "@storybook/react";
import { UiAvatarEditor } from "../index";

const meta = {
title: "Layouts/UiAvatarEditor",
component: UiAvatarEditor,
parameters: {
layout: "centered",
},
argTypes: {},
} satisfies Meta<typeof UiAvatarEditor>;

    export const Story = {
    args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    },
    name: "UiAvatarEditor",
    } satisfies StoryObj<typeof meta>;

        export default meta;
