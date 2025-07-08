import { FC } from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import { getUserAuthData, userSlice } from 'entities/User';
import { useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button';
import { HBlock } from 'shared/ui/FlexBlock';
import { TextM } from 'shared/ui/Text';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import cls from './NavBar.module.scss';

const { version } = require('../../../../../package.json');

interface INavBarProps {
    className?: string
    // children?: React.ReactNode
}
export const NavBar: FC<INavBarProps> = (props) => {
    const { className } = props;
    const authData = useSelector(getUserAuthData);

    const dispatch = useAppDispatch();

    const doLogout = async () => {
        dispatch(userSlice.actions.logout());
    };

    return (
        <header className={cn(cls.NavBar, {}, [className])}>

            <div>

                <ThemeSwitcher />
            </div>

            <HBlock gap="8">
                {__IS_DEV__ && <TextM text={`v${version}`} />}
                <TextM text="Тестовое задание" />
                <a href="https://igit.spb.ru/">ИГИТ</a>

            </HBlock>

            <div className={cn(cls.accountControl)}>
                <TextM text={authData?.username || '?'} />
                {authData && (
                    <Button
                        onClick={doLogout}
                    >
                        Выйти
                    </Button>
                )}
            </div>
        </header>
    );
};
