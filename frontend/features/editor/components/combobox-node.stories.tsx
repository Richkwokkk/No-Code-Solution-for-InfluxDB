import { BucketNode } from "@/features/editor/components/editor-nodes";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BucketNode> = {
  title: "Editor/ComboboxNode",
  component: BucketNode,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof BucketNode>;

export const BucketNodeStory: Story = {};
