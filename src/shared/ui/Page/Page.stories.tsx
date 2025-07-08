/**
 * ========================================
 */

import { Meta } from '@storybook/react/*';
import { StoryObj } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { EGlobalThemes } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { Page } from './Page';

const meta = {
    title: 'shared/Page',
    component: Page,
    parameters: {},
    args: {},
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};

// export const PrimaryDark = { ...Primary };
// PrimaryDark.decorators = [ThemeDecorator(EGlobalThemes.DARK)];
