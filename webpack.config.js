const webpack = require('webpack');

const definePlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'null',
    },
});

module.exports = {
    plugins: [definePlugin],
    output: {
        path: `${process.cwd()}/assets`,
        filename: 'bundle.js',
        library: 'App',
        publicPath: '/assets/',
    },
    entry: ['./main.jsx'],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            query: {
                compact: false,
            },
        },
        {
            test: /\.scss$/,
            // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap', {})
            // loader: 'style/url!file!css!sass?sourceMap',
            loader: 'style!css!sass?sourceMap',
        },
        {
            test: /\.svg$/,
            loader: 'file',
        },
        {
            test: /\.json$/,
            loader: 'json',
        },
        {
            test: /\.png$/,
            loader: 'file',
        }],
    },
    devtool: 'source-map',
};
