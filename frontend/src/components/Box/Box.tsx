import { ComponentProps, FC, JSXElementConstructor, PropsWithChildren } from "react";

import { convertSx, Sx } from "@/utils/sxConverter";

const defaultTag = 'div'

export type BoxProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = typeof defaultTag> = PropsWithChildren<{
    component?: T,
    sx?: Sx,
    className?: string
}>

export const Box: FC<BoxProps> = props =>
{
    const { component: Component = defaultTag, sx, className: outsideClasses, ...args } = props;

    const classes = convertSx({ sx, outsideClasses });

    return (
        <Component className={classes} {...args}/>
    )
}