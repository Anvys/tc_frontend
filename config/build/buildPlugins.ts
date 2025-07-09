import webpack, { Configuration, ProgressPlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { TBuildOptions } from './types/types';

export const buildPlugins = (options: TBuildOptions): Configuration['plugins'] => {
    const { mode, paths, apiUrl } = options;
    const isDev = mode === 'development';
    // const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),

        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),

            __OPENWEATHERAPI__: JSON.stringify('https://api.openweathermap.org/data/2.5/forecast'),
            // Ключ по хорошему надо получать с бэка после авторизации, но т.к. у нас моковая, то вынесу его сюда
            __OPENWEATHERAPIKEY__: JSON.stringify('4a3e4656f4751ed2578c09eaf928f073'),
        }),

        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: true,
        }),

        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }),

    ];

    if (isDev) {
        // plugins.push(new ProgressPlugin());
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    // if (isProd) {
    //
    // }
    return plugins;
};
