const { Configuration } = require('webpack')
const path = require('path')

/**
 * @type {Configuration} //配置智能提示
 */
const config = {
    entry: "./src/index.js",
    output: {
        filename: "lib.js",
        path: path.resolve(__dirname, './lib'),
        library: "lib",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    mode: "production",
    cache: true,
    module: {
        rules: [
            {
                test: /\.js$/,  //解析ts
                exclude: /(node_modules)/,
                use: {
                    loader: "swc-loader", //使用新技术swc-loader
                }
            }
        ]
    },

}

module.exports = config

