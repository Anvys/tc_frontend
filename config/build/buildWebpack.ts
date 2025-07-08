import { Configuration } from 'webpack';
import { buildPlugins } from './buildPlugins';
import { TBuildOptions } from './types/types';
import { buildLoaders } from './buildLoaders';
import { buildDevServer } from './buildDevServer';
import { buildResolves } from './buildResolves';

export const buildWebpack = (options: TBuildOptions): Configuration => {
    const { mode, paths } = options;
    const isDev = mode === 'development';

    return {
        mode,
        entry: paths.entry,
        // entry: {
        //     main: paths.entryMain,
        // },
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            // publicPath: '/',
            clean: true,
        },
        resolve: buildResolves(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
    };
};
