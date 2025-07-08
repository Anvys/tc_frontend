import { Configuration } from 'webpack';
import { TBuildOptions } from './types/types';

export const buildResolves = (options: TBuildOptions):Configuration['resolve'] => ({
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true,
    modules: [options.paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {},
});
