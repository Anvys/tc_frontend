import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { FlexBlock } from './FlexBlock';

const meta = {
    title: 'shared/FlexBlock',
    component: FlexBlock,
    parameters: {
    },
    args: {
    },
} satisfies Meta<typeof FlexBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
    args: {
        direction: 'row',
        children: (
            <>
                <div>first</div>
                <div>first</div>
                <div>first</div>
                <div>first</div>
            </>
        ),
    },
};
export const RowGap4: Story = {
    args: {
        direction: 'row',
        gap: '4',
        children: (
            <>
                <div>first</div>
                <div>first</div>
                <div>first</div>
                <div>first</div>
            </>
        ),
    },
};
export const RowGap8: Story = {
    args: {
        direction: 'row',
        gap: '8',
        children: (
            <>
                <div>first</div>
                <div>first</div>
                <div>first</div>
                <div>first</div>
            </>
        ),
    },
};
export const RowGap16: Story = {
    args: {
        direction: 'row',
        gap: '16',
        children: (
            <>
                <div>first</div>
                <div>first</div>
                <div>first</div>
                <div>first</div>
            </>
        ),
    },
};
export const Col: Story = {
    args: {
        direction: 'column',
        children: (
            <>
                <div>first</div>
                <div>first</div>
                <div>first</div>
                <div>first</div>
            </>
        ),
    },
};
export const ColGap16: Story = {
    args: {
        direction: 'column',
        gap: '16',
        children: (
            <>
                <div>first</div>
                <div>first</div>
                <div>first</div>
                <div>first</div>
            </>
        ),
    },
};
export const ColGap16AlignEnd: Story = {
    args: {
        direction: 'column',
        gap: '16',
        align: 'end',
        children: (
            <>
                <div>first</div>
                <div>first</div>
                <div>first</div>
                <div>first</div>
            </>
        ),
    },
};
