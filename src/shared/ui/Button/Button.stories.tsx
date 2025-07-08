/**
 * ========================================
 */

import { Meta } from '@storybook/react/*';
import { StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, EButtonTheme, EButtonSize } from './Button';

const meta = {
    title: 'shared/Button',
    component: Button,
    parameters: {
    },
    argTypes: {
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Configurable: Story = {
//     argTypes: {
//         children: {
//             control: { type: 'text' },
//         },
//         theme: {
//             control: { type: 'radio' },
//             // @ts-ignore
//             options: EButtonTheme,
//         },
//         size: {
//             control: { type: 'radio' },
//             // @ts-ignore
//             options: EButtonSize,
//         },
//     },
//     args: {
//         children: 'Применить',
//         theme: EButtonTheme.PRIMARY,
//         size: EButtonSize.M,
//     },
// };
// export const Clear: Story = {
//     args: {
//         children: 'Clear',
//         theme: EButtonTheme.CLEAR,
//     },
// };
// export const Outline: Story = {
//     args: {
//         children: 'Отмена',
//         theme: EButtonTheme.OUTLINE,
//     },
// };
export const Primary: Story = {
    args: {
        children: 'Применить',
        // theme: EButtonTheme.PRIMARY,
    },
};
// export const Secondary: Story = {
//     args: {
//         children: 'Cancel',
//         theme: EButtonTheme.SECONDARY,
//     },
// };
// export const Login: Story = {
//     args: {
//         children: 'Login',
//         theme: EButtonTheme.LOGIN,
//     },
// };
// export const Growing: Story = {
//     args: {
//         children: 'Применить',
//         isGrow: true,
//         theme: EButtonTheme.PRIMARY,
//     },
// };
