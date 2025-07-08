/**
 * ========================================
 */

import { Meta } from '@storybook/react/*';
import { StoryObj } from '@storybook/react';
import { StoreDecorator } from '../../../../shared/config/storybook/StoreDecorator/StoreDecorator';
import { NavBar } from './NavBar';

const meta = {
    title: 'widgets/NavBar',
    component: NavBar,
    parameters: {
    },
    args: { },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    argTypes: { },
    args: { },
};

Primary.decorators = [StoreDecorator({
    loginForm: { username: 'user123', password: 'password_asd' },
})];
