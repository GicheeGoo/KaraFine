import { convertSx, Spacing } from "@/utils/sxConverter"
import { FC } from "react"
import { Box, BoxProps } from "../Box/Box"

export type FlexProps = {
    direction?: 'row' | 'col',
    justify?: 'start' | 'end' | 'center' | 'between' | 'around',
    items?: 'center' | 'start' | 'end',
    gap?: Spacing,
} & BoxProps

export const Flex: FC<FlexProps> = props =>
{
    const { sx, gap, direction, justify, items, className: outsideClasses, ...args } = props;

    const classes = convertSx({
        sx,
        outsideClasses,
        insideClasses: 'flex',
        extendedSx: { justify, items, gap }
    })

    return (
        <Box
            className={classes}
            {...args}
        />
    )
}