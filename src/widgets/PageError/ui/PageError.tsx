import { FC } from 'react';
import { cn } from 'shared/lib/classNames/classNames';
// import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button';
import cls from './PageError.module.scss';

export interface IPageErrorProps {
    className?: string
    // children?: React.ReactNode
}

export const PageError: FC<IPageErrorProps> = (props) => {
    const { className } = props;
    // const { t } = useTranslation();
    const doReloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };
    return (
        <div className={cn(cls.PageError, {}, [className])}>
            <p>Произошла непредвиденная ошибка</p>
            <Button onClick={doReloadPage}>
                Обновить страницу
            </Button>
        </div>
    );
};
