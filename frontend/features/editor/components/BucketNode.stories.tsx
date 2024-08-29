import type { Meta, StoryObj } from '@storybook/react';

import BucketNode from './BucketNode';

const meta = {
  component: BucketNode,
} satisfies Meta<typeof BucketNode>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};