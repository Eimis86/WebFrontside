module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'react',
        'jsx-a11y'
    ],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:storybook/recommended'
    ],
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
    },
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
    },
    rules: {
        'indent': [
            'error',
            4,
            { 'SwitchCase': 1 }
        ],
        'quotes': [ 'error', 'single' ],
        'semi': [ 'error', 'always' ],
        'no-var': 'error',
        'jsx-quotes': [ 'error', 'prefer-single' ],
        'no-console': 'error',
        //'no-extra-parens': 'warn',

        '@typescript-eslint/member-delimiter-style': [
            'error', {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: true
                }
            }
        ],
        '@typescript-eslint/ban-ts-comment': 'error',
        //'@typescript-eslint/generic-type-naming': 'warn',
        //'@typescript-eslint/no-extra-parens': 'warn',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/array-type': ['warn', { array: true }],
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
        '@typescript-eslint/no-empty-function': 'off',

        'react/prop-types': 'off',
        'react/display-name': 'off',

        "@typescript-eslint/interface-name-prefix": 'off'
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};