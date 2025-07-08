/* eslint-disable react/jsx-props-no-spreading */
import {
    ChangeEvent, FC, InputHTMLAttributes, useEffect, useMemo, useRef,
} from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import { Input as AriaInput } from 'react-aria-components';
import cls from './Input.module.scss';

export enum EInputTheme {
    PRIMARY= 'primary',
    // FILTER= 'filter',
    LOGIN= 'login',
}
export interface IInputProps<
        T extends string | number | readonly string[] | undefined = string
    >
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    theme?: EInputTheme
    value?: T;
    onChange?: (value: T) => void;
    autofocus?: boolean;
    isValidateOnInput?: boolean
    isError?: boolean
    className?: string
}

export const Input = <T extends string | number | readonly string[] | undefined = string>(props:IInputProps<T>) => {
    const {
        className,
        value,
        onChange,
        theme = EInputTheme.PRIMARY,
        type = 'text',
        autofocus,
        isError = false,
        isValidateOnInput,
        ...rest
    } = props;

    const ref = useRef<HTMLInputElement>(null);
    // const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (autofocus) {
            // setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (type === 'number' && rest.min !== undefined && rest.max !== undefined) {
            const val = +e.target.value;
            const min = +rest.min;
            const max = +rest.max;
            onChange?.(
                `${val < min ? min : (val > max ? max : val)}` as T,
            );
        } else {
            onChange?.(e.target.value as T);
        }
    };

    const onBlur = () => {
        // setIsFocused(false);
    };

    const onFocus = () => {
        // setIsFocused(true);
    };

    const mods = useMemo(() => ({
        [cls.error]: isError,
    }), [isError]);

    return (
        <AriaInput
            ref={ref}
            type={type}
            value={value}
            onChange={onChangeHandler}
            // onInput={onChangeHandler}
            className={cn(cls.Input, mods, [className, cls[theme]])}
            onFocus={onFocus}
            onBlur={onBlur}
            {...rest}
        />
    );
};
/* eslint-enable react/jsx-props-no-spreading */
