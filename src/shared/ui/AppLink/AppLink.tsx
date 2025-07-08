import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
// import {Link as AriaLink} from 'react-aria-components';

export enum EAppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

type TAppLinkProps = {
    to: string
    className?: string
    theme?: EAppLinkTheme
    children?: ReactNode
}
export const AppLink: FC<TAppLinkProps> = ({
    to,
    theme = EAppLinkTheme.PRIMARY,
    className,
    children,
}) => (
    <Link to={to} className={cn(cls.AppLink, {}, [className, cls[theme]])}>
        {children}
    </Link>
);
