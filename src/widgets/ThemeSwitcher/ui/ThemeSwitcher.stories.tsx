/**
 * ========================================
 */

import { Meta } from '@storybook/react/*';
import { StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { EGlobalThemes } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { ThemeSwitcher } from './ThemeSwitcher';

const meta = {
    title: 'widgets/ThemeSwitcher',
    component: ThemeSwitcher,
    parameters: {
    },
    args: { },
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Configurable: Story = {
    argTypes: { },
    args: { },
};

export const ConfigurableDark = { ...Configurable };
ConfigurableDark.decorators = [ThemeDecorator(EGlobalThemes.DARK)];
