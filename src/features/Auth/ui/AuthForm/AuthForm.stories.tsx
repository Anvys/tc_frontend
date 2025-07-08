import { Meta } from '@storybook/react/*';
import { StoryObj } from '@storybook/react';
import { AuthForm } from './AuthForm';
//
const meta = {
    title: 'features/AuthForm',
    component: AuthForm,
    parameters: {
    },
    args: {
    },
} satisfies Meta<typeof AuthForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        // onChange: () => {},
        // label: 'label',
        // value: 'someValue',
        // children: 'children',
    },
};
