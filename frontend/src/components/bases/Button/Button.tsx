import { clsx } from "clsx";
import { FC, ButtonHTMLAttributes } from "react";

import './Button.scss';

export type ButtonProps = {
    variant?: 'fill' | 'fade' | 'outline' | 'empty'
    size?: 'sm' | 'md' | 'lg'
    color?: 'light' | 'dark' | 'primary' | 'danger' | 'warning' | 'success'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = props =>
{
    const {
        variant = 'outline',
        size = 'md',
        color = 'dark',
        children = 'Button',
        disabled,
        className,
    } = props;

    const classes = clsx(
        'btn',
        `btn-${size}`,
        `btn-${variant}`,
        `btn-${color}`,
        className,
        {
            disabled,
        }
    )

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    )
}