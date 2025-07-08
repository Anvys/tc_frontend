import { FC, ReactElement } from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import { HBlock, VBlock } from 'shared/ui/FlexBlock';
import { AuthPage } from 'pages/AuthPage';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { AppRouter } from 'app/providers/Router';
import cls from './MainLayout.module.scss';

interface IMainLayoutProps {
    className?: string
    header: ReactElement;
    // children?: React.ReactNode
}

export const MainLayout: FC<IMainLayoutProps> = (props) => {
    const { className, header } = props;
    const authData = useSelector(getUserAuthData);

    return (
        <VBlock className={cn(cls.MainLayout, {}, [className])} max hmax>
            <div className={cls.header}>{header}</div>
            <HBlock max>

                <div className={cls.content}>
                    {/* {authData?.username */}
                    {/*    ? isInited ? <AdvisorTable /> : <Spinner /> */}
                    {/*    : <AuthPage />} */}
                    {authData ? <AppRouter /> : <AuthPage />}
                </div>
                {/* <div className={cls.rightbar}>rightbar</div> */}
            </HBlock>

        </VBlock>
    );
};
