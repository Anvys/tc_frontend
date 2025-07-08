/**
 * ========================================
 */

import { Meta } from '@storybook/react/*';
import { StoryObj } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { EGlobalThemes } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { FieldRadioSelect } from './FieldRadioSelect';

const meta = {
    title: 'shared/FieldRadioSelect',
    component: FieldRadioSelect,
    parameters: {},
    args: {},
} satisfies Meta<typeof FieldRadioSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: 'FieldRadioSelect',
        // value: 'someValue',
        onChange: () => {},
    },
};

// export const PrimaryDark = { ...Primary };
// PrimaryDark.decorators = [ThemeDecorator(EGlobalThemes.DARK)];
