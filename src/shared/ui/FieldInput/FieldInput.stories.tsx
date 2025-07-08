/**
 * ========================================
 */

import { Meta } from '@storybook/react/*';
import { StoryObj } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { EGlobalThemes } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { FieldInput } from './FieldInput';
//
const meta = {
    title: 'shared/FieldInput',
    component: FieldInput,
    parameters: {
    },
    args: {
    },
} satisfies Meta<typeof FieldInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        onChange: () => {},
        label: 'label',
        value: 'someValue',
    },
};

// export const PrimaryDark = { ...Primary };
// PrimaryDark.decorators = [ThemeDecorator(EGlobalThemes.DARK)];
