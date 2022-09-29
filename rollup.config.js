import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import {terser} from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import strip from '@rollup/plugin-strip';
import image from '@rollup/plugin-image';
import svg from 'rollup-plugin-svg';
import postcssPlugin from 'rollup-plugin-postcss';
import { copy } from '@web/rollup-plugin-copy';

import autoprefixer from 'autoprefixer';

const devMode = (process.env.NODE_ENV === 'development');

const cssPlugin = (options) => (
    postcssPlugin({
        plugins: [autoprefixer()],
        config: false,    //Do not use postcss.config.js, coz it built for storybook postcss preprocessor
        //ToDo: update postcss.config.js to work with rollup as well
        // (main problem is the class names to camelCase transformer plugin [postcss-camel-case] that have different rules about __ transformation)
        extract: devMode,
        autoModules: false,
        modules: {
            localsConvention: 'dashes',
            // globalModulePath: ['/layout.scss', 'layout.scss', './layout.scss']
        },
        use: ['sass'],
    })
);

const eslintPlugin = () => (
    eslint({
        include: ['./src/!**!/!*.ts', './src/!**!/!*.tsx']
    })
);

const replacePlugin = () => (
    replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        preventAssignment: true
    })
);

const copyPlugin = () => (
    copy({patterns: '**/*', rootDir: './public', exclude: []})
);

const getDevPlugins = (options) => (
    [
        nodeResolve(),
        commonjs({include: /node_modules/}),
        replacePlugin(),
        typescript(),
        image({exclude: '**/*.svg'}),
        svg(),
        strip(),
        cssPlugin(),
        copyPlugin(),
        serve({
            contentBase: 'dist',
            historyApiFallback: '/index.html',
            // host: 'localhost',
            port: 10001,
        }),
        livereload('dist'),
    ]
);

const getProdPlugins = (options) => (
    [
        nodeResolve(),
        commonjs({include: /node_modules/}),
        replacePlugin(),
        terser(),    //JS minimizer
        typescript(),
        image({exclude: '**/*.svg'}),
        svg(),
        strip(),
        cssPlugin({outputStyle: 'compressed'}),
        copyPlugin(),
    ]
);

const getPlugins = devMode ? getDevPlugins : getProdPlugins;

export default {
    input: ['src/index.tsx'],
    output: [
        { file: 'dist/app.r.min.js', format: 'iife' }
    ],
    plugins: getPlugins()
};
