/**
 * Created by abayjanov on 29.10.2024
 */
import { FC, ReactNode } from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import cls from './Page.module.scss';

export interface IPageProps {
    className?: string
    children?: ReactNode
}

export const Page: FC<IPageProps> = (props) => {
    const { className, children } = props;
    return (
        <main className={cn(cls.Page, {}, [className])}>
            {children}
        </main>
    );
};
