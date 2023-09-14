import type { Meta, StoryObj } from "@storybook/react";
import { UiJeopardyConfigForm } from "../index";

const meta = {
title: "Layouts/UiJeopardyConfigForm",
component: UiJeopardyConfigForm,
parameters: {
layout: "centered",
},
argTypes: {},
} satisfies Meta<typeof UiJeopardyConfigForm>;

    export const Story = {
    args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    },
    name: "UiJeopardyConfigForm",
    } satisfies StoryObj<typeof meta>;

        export default meta;
