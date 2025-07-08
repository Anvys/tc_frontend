/**
* Created by abayjanov on 03.09.2024
*/
import { FC, ReactNode } from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import { TextM } from 'shared/ui/Text';
import { Select, ISelectOption } from 'shared/ui/Select';
import cls from './FieldSelect.module.scss';

export enum EFieldSelectTheme {
    DEFAULT = 'defaultText',
    SMALL = 'smallText',
    LARGE = 'largeText',
}
enum EFieldInputAssertTextToInput{
    'defaultText'= 'defaultInput',
    'smallText' = 'largeInput',
    'largeText'= 'smallInput',

}
export interface IFieldSelectProps
<
    T extends string | number | readonly string[] | undefined = string
>{
    label: string
    value?: T
    onChange?: (value: T) => void
    options?: ISelectOption[];
    className?: string
    theme?: EFieldSelectTheme
    isError?: boolean
    children?: ReactNode
    disabled?: boolean

}

export const FieldSelect = <
    T extends string | number | readonly string[] | undefined = string
>(props:IFieldSelectProps<T>) => {
    const {
        className,
        value,
        onChange,
        label,
        children,
        theme = EFieldSelectTheme.DEFAULT,
        options,
        isError = false,
        disabled = false,
    } = props;
    // const textModes = useMemo(
    //     () => ({ [cls.longLabel]: isLongLabel }),
    //     [isLongLabel],
    // );
    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className={cn(cls.FieldSelect, {}, [className])}>
            {label && <TextM text={label} className={cn(cls.label, { [cls.error]: isError }, [cls[theme]])} />}
            <div className={cls.fieldBlock}>
                <Select
                    value={value}
                    onChange={onChange}
                    options={options}
                    className={cn(cls.input, {}, [cls[EFieldInputAssertTextToInput[theme]]])}
                    readonly={disabled}
                />
                {children}
            </div>
        </label>
    );
};
