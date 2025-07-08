/**
 * ========================================
 */
// TODO: В локи анимация снимается криво и почти всегда будет отличаться от предыдущего каdра.

import { Meta } from '@storybook/react/*';
import { StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
    title: 'shared/Spinner',
    component: Spinner,
    parameters: {
    },
    argTypes: {
    },
    args: {
    },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {

    },
};
// export default {};
