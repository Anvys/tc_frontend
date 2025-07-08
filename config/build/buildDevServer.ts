import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { TBuildOptions } from './types/types';

export const buildDevServer = (options: TBuildOptions): DevServerConfiguration => {
    const { port } = options;

    return {
        port,
        hot: true,
        historyApiFallback: true, // Для навигации через скрипты
        open: false, // Не открывать в браузере при запуске
    };
};
