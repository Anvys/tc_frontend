import { ModuleOptions } from 'webpack';
import { TBuildOptions } from './types/types';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export const buildLoaders = (options: TBuildOptions): ModuleOptions['rules'] => {
    const isDev = options.mode === 'development';

    const scssLoader = buildCssLoader(true);
    const svgrLoader = {
        test: /\.svg$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                },
            },
        ],
    };
    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    return [
        fileLoader,
        svgrLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        scssLoader,

    ];
};
