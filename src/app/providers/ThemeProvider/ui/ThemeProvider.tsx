import {
    FC, ReactNode, useMemo, useState,
} from 'react';
import { EGlobalThemes, LS_THEME_KEY, ThemeContext } from 'app/providers/ThemeProvider/lib/ThemeContext';

const defaultTheme = localStorage.getItem(LS_THEME_KEY) as EGlobalThemes || EGlobalThemes.DEFAULT;

interface IThemeProviderProps {
    initialTheme?: EGlobalThemes
    children?: ReactNode | undefined
}
export const ThemeProvider: FC<IThemeProviderProps> = (props) => {
    const {
        initialTheme = EGlobalThemes.DEFAULT,
        children,
    } = props;
    const [theme, setTheme] = useState<EGlobalThemes>(() => initialTheme || defaultTheme);

    const defaultValue = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={defaultValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
