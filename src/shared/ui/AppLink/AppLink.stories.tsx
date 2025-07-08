/**
 * ========================================
 */

import { Meta } from '@storybook/react/*';
import { StoryObj } from '@storybook/react';
import { AppLink, EAppLinkTheme } from './AppLink';

const meta = {
    title: 'shared/AppLink',
    component: AppLink,
    parameters: {
    },
    args: { },
} satisfies Meta<typeof AppLink>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Configurable: Story = {
//     argTypes: {
//         children: {
//             options: ['Link!', 'LargeLink!', '...', '.'],
//             control: { type: 'radio' },
//         },
//         theme: {
//             // @ts-ignore
//             options: EAppLinkTheme,
//             control: { type: 'radio' },
//         },
//     },
//     args: {
//         to: '/somelink',
//         children: 'AppLink!',
//     },
// };

// export const ConfigurableDark = { ...Configurable };
// ConfigurableDark.decorators = [ThemeDecorator(EGlobalThemes.DARK)];
export const Primary: Story = {
    args: {
        to: '/somelink',
        children: 'AppLink!',
        theme: EAppLinkTheme.PRIMARY,
    },
};
export const Secondary: Story = {
    args: {
        to: '/somelink',
        children: 'AppLink!',
        theme: EAppLinkTheme.SECONDARY,
    },
};
