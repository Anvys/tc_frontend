import { FC } from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { EGlobalThemes } from 'app/providers/ThemeProvider/lib/ThemeContext';
import cls from './ThemeSwitcher.module.scss';

interface IThemeSwitchProps {
    className?: string
    // children?: React.ReactNode
}

export const ThemeSwitcher: FC<IThemeSwitchProps> = (props) => {
    const { className } = props;
    const { theme, doToggleTheme } = useTheme();
    return (
        <div
            className={cn(cls.ThemeSwitch, { active: theme === EGlobalThemes.DEFAULT }, [className])}
            onClick={doToggleTheme}
        >
            {theme === EGlobalThemes.DEFAULT ? 'Светлая' : 'Темная'}
        </div>
    );
};
