module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    env: {
        production: {},
    },
    plugins: [
        [
            'module:react-native-dotenv',
            {
                envName: 'APP_ENV',
                moduleName: '@env',
                path: '.env',
                blocklist: null,
                allowlist: null,
                blacklist: null, // DEPRECATED
                whitelist: null, // DEPRECATED
                safe: false,
                allowUndefined: true,
                verbose: false,
            },
        ],
        ['react-native-reanimated/plugin'],
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true,
            },
        ],
        ['@babel/plugin-proposal-optional-catch-binding'],
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                cwd: 'babelrc',
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.android.js', '.android.tsx', '.ios.js', '.ios.tsx'],
                root: ['.'],
                alias: {
                    '@app': './app',
                },
            },
        ],
        'jest-hoist',
    ],
};
