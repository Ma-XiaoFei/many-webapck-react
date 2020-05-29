
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const webpack = require('webpack')

module.exports = {
    mode:'development',
    entry: {
        home: './src/index.js',
        a:'./src/A.js'
    },
    // watch:true,
    // watchOptions:{
    //     aggregateTimeout: 300,
    // poll: 1000
    // },
    // devtool:'source-map',
    // devtool:'eval-source-map',
    // devtool:'cheap-module-source-map',
    // devtool:'cheap-module-eval-source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    plugins:[
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        
        new CleanWebpackPlugin(),
        new webpack.BannerPlugin('晓飞'),
        new htmlWebpackPlugin({
            title:'home',
            template: './index.html',
            filename:'index.html',
            minify:{
                removeAttributeQuotes: true,
                collapseBooleanAttributes:true,
                // collapseWhitespace:true,
            },
            chunks:['home'],
            showErrors: true



        }),
        new htmlWebpackPlugin({
            title:'a',
            template: './index.html',
            filename:'a.html',
            minify:{
                removeAttributeQuotes: true,
                collapseBooleanAttributes:true,
                // collapseWhitespace:true,

            },
            chunks:['a']
        }),
        new webpack.DefinePlugin({
            flag: '"sdsfds"'
        }),
        new webpack.IgnorePlugin(/\.\/local/, /moment/), //忽略 文件 不去编译 优化项
        new webpack.HotModuleReplacementPlugin(),
        new webpack.HashedModuleIdsPlugin()
    ],
    devServer:{
        port: 9000,
        open:true,
        proxy:{
            '/':{
                target: 'https://gwpre.sina.cn',
                // pathReWrite: {'/api':''},
                // secure: false
                changeOrigin:true
            }
        },
        hot: true,
        overlay: true
    },

    resolve:{
        extensions: ['.js','.jsx', '.json'],
        alias:{     //重命名路径
           '@': path.resolve(__dirname, 'src/')
        }
    },
    module:{
        rules:[
            {
                test: /(js|jsx)$/,
                exclude: /node_modules/,
                use:{
                    
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env', '@babel/preset-react'],
                        plugins:[
                            ["import", { libraryName: "antd", libraryDirectory: 'es', style: "css" }] // `style: true` 会加载 less 文件
                        ],
                        
    
                    }
                }
            },
            {
                test: /css$/,
                loader: ['style-loader', 'css-loader']
            }
        ],
        noParse:/lodash|jquery/     // 考虑这个库没有去别的依赖包 就不去解析这个库 ，优化项
    }
}