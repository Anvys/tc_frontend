/**
* Created by abayjanov on 03.09.2024
*/
import { ChangeEvent, useMemo } from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface ISelectOption {
    id: string|number;
    name: string;
    isError?:boolean
}
// export interface ISelectProps<T extends string | number | readonly string[] | undefined = string> {
//     className?: string;
//     options?: ISelectOption[];
//     value?: T;
//     onChange?: (value: T) => void;
//     readonly?: boolean;
//     // children?: ReactNode
// }
// export const Select = <T extends string | number | readonly string[] | undefined = string>(props:ISelectProps<T>) => {
//     const {
//         className,
//         options,
//         value,
//         onChange,
//         readonly,
//
//     } = props;
//     const doHandleChange = (e: Key | null) => {
//         if (onChange) {
//             onChange(e as T);
//         }
//     };
//
//     const optionsList = useMemo(() => (options || []).map((opt) => (
//         <ListBoxItem
//             className={cls.option}
//             id={opt.id}
//             key={opt.id}
//         >
//             {opt.name}
//         </ListBoxItem>
//     )), [options]);
//
//     // console.log('options', optionsList, options, value, options?.find((v) => v.value === value));
//     return (
//         <ASelect
//             selectedKey={value as Key}
//             defaultSelectedKey={value as Key}
//             isDisabled={readonly}
//             className={cn(cls.Select, { [cls.error]: options?.find((v) => v.id === value)?.isError }, [className])}
//             onSelectionChange={doHandleChange}
//             aria-label="l"
//         >
//             {/* <Label>Favorite Animal</Label> */}
//             <Button className={cls.btn}>
//                 <SelectValue />
//                 <span aria-hidden="true">▼</span>
//             </Button>
//             <Popover>
//                 <ListBox items={options}>
//                     {optionsList}
//                 </ListBox>
//             </Popover>
//         </ASelect>
//         // <ASelect
//         //     selectedKey={value as Key}
//         //     defaultSelectedKey={value as Key}
//         //     isDisabled={readonly}
//         //     className={cn(cls.Select, { [cls.error]: options?.find((v) => v.id === value)?.isError }, [className])}
//         //     onSelectionChange={doHandleChange}
//         //     aria-label="l"
//         // >
//         //     {/* <Label>Favorite Animal</Label> */}
//         //     <Button className={cls.btn}>
//         //         <SelectValue />
//         //         <span aria-hidden="true">▼</span>
//         //     </Button>
//         //     <Popover>
//         //         <ListBox items={options}>
//         //             {optionsList}
//         //         </ListBox>
//         //     </Popover>
//         // </ASelect>
//     );
// };
//
// export interface ISelectOption {
//     value: string;
//     content: string;
//     isError?:boolean
// }
export interface ISelectProps<T extends string | number | readonly string[] | undefined = string> {
    className?: string;
    label?: string;
    options?: ISelectOption[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
    // children?: ReactNode
}

export const Select = <T extends string | number | readonly string[] | undefined = string>(props:ISelectProps<T>) => {
    const {
        className,
        label,
        options,
        onChange,
        value = '',
        readonly,
    } = props;
    const doHandleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value as T);
        }
    };

    const optionsList = useMemo(() => (options || []).map((opt) => (
        <option
            className={cn(cls.option, { [cls.error]: opt.isError })}
            value={opt.id}
            key={opt.id}
            disabled={opt.isError}
        >
            {opt.name}
        </option>
    )), [options]);

    // console.log('options', optionsList, options, value, options?.find((v) => v.value === value));
    return (
        <div className={cn(cls.Select, { [cls.error]: options?.find((v) => v.id === value)?.isError }, [className])}>
            {label && (
                <span className={cls.label}>
                    {`${label}>`}
                </span>
            )}
            <select
                disabled={readonly}
                className={cls.select}
                value={value}
                onChange={doHandleChange}
            >
                {optionsList}
            </select>
        </div>
    );
};
