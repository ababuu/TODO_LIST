const path = require('path');

module.exports = {
    entry: './src/index.js',
    target: "node",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
            rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
            test: /\.(eot|svg|ttf|woff|woff2?)$/,
                use: {
                    loader: 'file-loader'
                    , options: {
                        name: '../css/fonts/[name]-[hash:8].[ext]'
                    }
                },
            
        },
    ],}
};