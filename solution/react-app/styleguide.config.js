module.exports = {
    components: ['src/components/**/*.tsx', 'src/pages/**/*.tsx'],
    webpackConfig: {
        module: {
            rules: [
                {
                    test: /\.tsx?$/, // Add this rule
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                '@babel/preset-typescript', // Ensure this preset is included
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-object-rest-spread',
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-syntax-dynamic-import',
                                '@babel/plugin-proposal-optional-chaining',
                                '@babel/plugin-proposal-nullish-coalescing-operator',
                            ],
                        },
                    },
                },
                {
                    test: /\.css$/, // Add this rule
                    use: ['style-loader', 'css-loader'],
                },
                // ... (keep your existing rules for .jsx files)
            ],
        },
        // ... (other webpack config)
    },
    // ... (other configuration options)
};
