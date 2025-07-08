/**
* Created by abayjanov on 03.09.2024
*/
import {
    FC, InputHTMLAttributes, ReactNode,
} from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import { TextM } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Label, TextField } from 'react-aria-components';
import { HBlock } from 'shared/ui/FlexBlock';
import cls from './FieldInput.module.scss';

export enum EFieldInputTheme {
    DEFAULT = 'defaultText',
    SMALL = 'smallText',
    LARGE = 'largeText',
}
enum EFieldInputAssertTextToInput{
    'defaultText'= 'defaultInput',
    'smallText' = 'largeInput',
    'largeText'= 'smallInput',

}
// type InferType<T> = T extends string ? P extends string ? string : number : any
export interface IFieldInputProps<
    T extends string | number | readonly string[] | undefined = string
> extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    label: string
    value?: T
    onChange: (value: T) => void
    className?: string
    theme?: EFieldInputTheme
    isError?: boolean
    isValidateOnInput?: boolean
    children?: ReactNode
}

export const FieldInput = <T extends string | number | readonly string[] | undefined = string>(props: IFieldInputProps<T>) => {
    const {
        className,
        value,
        onChange,
        label,
        children,
        theme = EFieldInputTheme.DEFAULT,
        isError = false,
        placeholder,
        ...inputProps
    } = props;
    // const textModes = useMemo(
    //     () => ({ [cls.longLabel]: isLongLabel }),
    //     [isLongLabel],
    // );
    return (

        <TextField name={label} className={cn(cls.FieldInput, {}, [className])}>
            {label && (
                <Label className={cn(cls.label, { [cls.error]: isError }, [cls[theme]])}>
                    {/* <label className={cn(cls.FieldInput, {}, [className])}> */}
                    <TextM text={label} />
                </Label>
            )}
            <HBlock className={cls.fieldBlock}>
                <Input
                    value={value}
                    onChange={onChange}
                    className={cn(cls.input, {}, [cls[EFieldInputAssertTextToInput[theme]]])}
                    {...inputProps}
                />
                {/* <div className={cls.control}> */}
                {children}
                {/* </div> */}
            </HBlock>
            {/* </label> */}
        </TextField>
        // <label className={cn(cls.FieldInput, {}, [className])}>
        //     <Text text={label} className={cn(cls.label, { [cls.error]: isError }, [cls[theme]])} />
        //     <div className={cls.fieldBlock}>
        //         <Input
        //             value={value}
        //             onChange={onChange}
        //             className={cn(cls.input, {}, [cls[EFieldInputAssertTextToInput[theme]]])}
        //             {...inputProps}
        //         />
        //         {/* <div className={cls.control}> */}
        //         {children}
        //         {/* </div> */}
        //     </div>
        // </label>
    );
};
