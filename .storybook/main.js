const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


module.exports = {
    webpackFinal: async config => {
        config.resolve.plugins = [
            new TsconfigPathsPlugin({
                logLevel: 'INFO',
                configFile: 'tsconfig.json'
            })];

        return config;
    },
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        {
            name: 'storybook-addon-sass-postcss',
            options: {
                cssLoaderOptions: {
                    importLoaders: 1,
                    modules: {
                        mode: 'local',
                        localIdentName: '[folder]__[name]_[local]--[hash:base64:5]',
                        context: path.resolve(__dirname, "../src/components"),
                    }
                },
                postcssLoaderOptions: {
                    implementation: require('postcss'),
                },
            },
        },
    ],
    framework: '@storybook/react',
    core: {
        // builder: '@storybook/builder-webpack5'
        builder: 'webpack4'
    }
}
