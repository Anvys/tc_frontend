import webpack from 'webpack';
import path from 'path';
import { buildWebpack } from './config/build/buildWebpack';
import { TBuildEnv, BuildMode, TBuildPaths } from './config/build/types/types';

function getApiUrl(mode: BuildMode, apiUrl?: string) {
    if (apiUrl) {
        return apiUrl;
    }
    if (mode === 'production') {
        return '/api';
    }

    return 'http://localhost:3124';
}

export default (env: TBuildEnv) => {
    const paths: TBuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        locales: path.resolve(__dirname, 'public', 'locales'),
        buildLocales: path.resolve(__dirname, 'build', 'locales'),
    };

    const mode = env?.mode || 'development';
    const PORT = env?.port || 3000;
    const apiUrl = getApiUrl(mode, env?.apiUrl);

    const isDev = mode === 'development';

    const config: webpack.Configuration = buildWebpack({
        mode,
        paths,
        isDev,
        port: PORT,
        apiUrl,
        project: 'frontend',
    });

    return config;
};
