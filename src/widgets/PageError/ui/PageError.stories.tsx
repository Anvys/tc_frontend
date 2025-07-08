import { Meta, StoryObj } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { EGlobalThemes } from 'app/providers/ThemeProvider/lib/ThemeContext';
import { PageError } from './PageError';

const meta = {
    title: 'widgets/PageError',
    component: PageError,
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
} satisfies Meta<typeof PageError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryLight: Story = {
    args: {
    },
};
// export const PrimaryDark: Story = { ...PrimaryLight };
// PrimaryDark.decorators = [ThemeDecorator(EGlobalThemes.DARK)];
