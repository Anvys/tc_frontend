import { FlexBlock, FlexProps } from '../Flex/FlexBlock';

type HStackProps = Omit<FlexProps, 'direction'>

export const HBlock = (props: HStackProps) => (
    <FlexBlock direction="row" {...props} />
);
