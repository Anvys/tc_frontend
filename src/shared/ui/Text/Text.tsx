import { FC } from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum EThemeText{
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
    TEXTONLY = 'textonly',
    SIDE_HEADER = 'sidebarHeader',
    SIDE_GROUP = 'sidebarGroup',
}
export type TTextJustify = 'center' | 'right' | 'left'
export interface ITextProps {
    title?: string;
    text?: string;
    theme?: EThemeText
    justify?: TTextJustify
    className?: string
}

export const TextM: FC<ITextProps> = (props) => {
    const {
        className,
        title,
        text,
        justify = 'left',
        theme = EThemeText.PRIMARY,
    } = props;
    return (
        <div className={cn(cls.Text, {}, [className, cls[theme], cls[justify]])}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
};
