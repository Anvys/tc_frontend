import { FlexBlock, FlexProps } from '../Flex/FlexBlock';

type VStackProps = Omit<FlexProps, 'direction'>

export const VBlock = (props: VStackProps) => {
    const { align = 'start' } = props;
    return (
        <FlexBlock {...props} direction="column" align={align} />
    );
};
