import {
    ButtonHTMLAttributes, FC, ReactNode, useMemo,
} from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import { Button as ButtonAria, ButtonProps, PressEvent } from 'react-aria-components';
import cls from './Button.module.scss';

export enum EButtonTheme {
    // CLEAR = 'clear',
    // OUTLINE = 'outline',
    COLLAPSER = 'collapser',
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    // DANGER = 'danger',
    // LOGIN = 'login',
    // TAB = 'tab',

}
export enum EButtonSize {
    // S = 'size_s',
    // M = 'size_m',
    // L = 'size_l',
    // XL = 'size_xl',
}
// export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
export interface IButtonProps extends ButtonProps {
    className?: string
    theme?: EButtonTheme
    // size?: EButtonSize
    // onClick?: (e: PressEvent) => void
    /**
     * Моды
     */
    // isRight?: boolean
    // isGrow?: boolean
    // isWarning?: boolean

    children?: ReactNode
}

export const Button: FC<IButtonProps> = (props) => {
    const {
        className,
        onClick,
        theme = EButtonTheme.SECONDARY,
        // size = EButtonSize.M,
        // isRight = false,
        // isGrow = false,
        children,
        // disabled = false,
        // isWarning = false,
        ...attrs
    } = props;

    // const mods = useMemo(() => ({
    //     [cls.grow]: isGrow,
    //     [cls.disabled]: disabled,
    //     [cls.right]: isRight,
    //     [cls.warning]: isWarning,
    // }), [disabled, isGrow, isRight, isWarning]);
    return (
        <ButtonAria
            onClick={onClick}
            className={
                cn(
                    cls.Button,
                    {},
                    // mods,
                    [className, cls[theme]],
                )
            }
            // isDisabled={disabled}
            {...attrs}
        >
            {children}
        </ButtonAria>

    );
};
