let path = require('path');
let dir = process.cwd();//获取当前程序运行的目录

let baseConfig = {//commonjs规范
    entry: {
        "bundle": dir + '/src/main.js'
    },
    output: {
        "filename": "[name].js",
        "path": dir + '/dist'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: ['babel-loader']
        },{
            test: /\.css$/,
            use: ['style-loader','css-loader']
        },{
            test: /\.(eot|svg|ttf|woff)$/,
            use: ['url-loader']
        },{
            test: /\.(jpg|png|gif|jpeg)$/,
            use: ['url-loader']
        }]
    },
    plugins: [],
    resolve:{
        extensions:['.js','.jsx']
    }
}

module.exports = baseConfig