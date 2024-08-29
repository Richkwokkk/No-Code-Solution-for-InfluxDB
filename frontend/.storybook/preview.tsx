import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import type { Preview } from "@storybook/react";
import '@xyflow/react/dist/style.css';
// import '@/tailwind.css';
import '../app/globals.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ReactFlowProvider>
        <Story />
      </ReactFlowProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
