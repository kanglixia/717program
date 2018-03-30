// build: 不用起服务，要进行压缩，代码分离
let baseConfig = require('./webpack.base');
const webpack = require('webpack');
let UglifyPlugin = webpack.optimize.UglifyJsPlugin;
let DefinePlugin = webpack.DefinePlugin;

baseConfig.plugins.push(new UglifyPlugin())
baseConfig.plugins.push(new DefinePlugin({
    "process.env":'"production"'
}))
module.exports = {
    ...baseConfig
}