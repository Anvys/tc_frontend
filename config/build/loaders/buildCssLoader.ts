import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const buildCssLoader = (isDev: boolean = false) => ({
    test: /\.s[ac]ss$/i,
    use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: {
                    auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                    localIdentName: isDev
                        ? '[path][name]__[local]--[hash:base64:5]'
                        : '[hash:base64:8]',

                    /**
                     * Решает проблему с дефолтным импортом scss модулей. Но изменяет названия, не сохраняя написание с заглавной.
                     */
                    namedExport: false,
                    /**
                     * Фик измененных еназваний
                     */
                    exportLocalsConvention: 'as-is',
                },
            },
        },
        {
            loader: 'sass-loader',
            options: {
                api: 'modern-compiler',
                // sassOptions: { quietDeps: true },
            },
        },

    ],
});
