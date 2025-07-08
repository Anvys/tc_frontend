export type BuildMode = 'production' | 'development';

export interface TBuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    locales: string;
    buildLocales: string;
}

export interface TBuildEnv {
    mode: BuildMode;
    port: number;
    apiUrl: string;
}

export interface TBuildOptions {
    mode: BuildMode;
    paths: TBuildPaths;
    isDev: boolean;
    port: number;
    apiUrl: string;
    project: 'storybook' | 'frontend' | 'jest';
}
