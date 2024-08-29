import type { Meta, StoryObj } from "@storybook/react";
import { Cylinder, Grid2X2, RectangleEllipsis } from "lucide-react";
import EditorNode from "./EditorNode";

const meta: Meta<typeof EditorNode> = {
  title: "Editor/EditorNode",
  component: EditorNode,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof EditorNode>;

export const BucketNode: Story = {
  args: {
    label: "Bucket",
    title: "example-bucket",
    icon: Cylinder,
    leftHandle: false,
    righttHandle: true,
  },
};

export const MeasurementNode: Story = {
  args: {
    label: "Measurement",
    title: "example-measurement",
    icon: Grid2X2,
    leftHandle: true,
    righttHandle: true,
  },
};

export const FieldNode: Story = {
  args: {
    label: "Field",
    title: "example-field",
    icon: RectangleEllipsis,
    leftHandle: true,
    righttHandle: true,
  },
};
