/**
 * Created by Binlin.
 * Date 2016/9/26
 * Time 9:29
 */
'use strict';
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TransferWebpackPlugin from 'transfer-webpack-plugin';
import Clean from 'clean-webpack-plugin';
import 'whatwg-fetch';

import args from "node-args";
const development = 'DEVELOPMENT';
const production = 'PRODUCTION';
const ENV = args.env || development;

let config = {
    entry:{
        main  : './resource/index.jsx',
        vendor:['react','jquery','lodash','whatwg-fetch']
    },
    output:{
        path: './dist',
        filename:'[name].bundle.js',
        publicPath: ''
    },
    resolve:{
        alias:{

        },
        root: path.join(__dirname, 'example'),
        extensions: ['', '.js','.jsx'],
    },
    module:{
        loaders:[
            {
                test: /\.js[x]?$/,
                //exclude: /(node_modules|lib)/,
                exclude: /node_modules/,
                loader: 'babel-loader' ,
                query:{
                    presets:['es2015','stage-0','react'],
                    plugins:['transform-runtime']
                },
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            {test: /\.(png|jpg|gif)$/,loader: "url?limit=2500" },
            {test: /\.(eot|woff|woff2|svg|ttf|otf)([\?]?.*)$/, loader: "file-loader" },
        ]
    },
    plugins:[
        new Clean(['dist']),
        new TransferWebpackPlugin([
            {from: 'images', to: 'images'},
            {from: '../project', to: 'project'},
            {from: '../wx'}
        ], path.join(__dirname, 'resource')),
        new webpack.ProvidePlugin({
            _ : 'lodash',
            $ : 'jquery',
            jQuery : 'jquery',
            React:'react',
            classNames:'classnames'
        }),
        new ExtractTextPlugin('[name].bundle.css'),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new HtmlWebpackPlugin({
            title:'binlin.site',
            template: './resource/index.ejs',
            hash: true,
            minify: {
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true
            }
        })
    ],
    devtool: ENV==production ? '' : '#source-map'
}

let collection = ((pluginItems)=>{
  let {plugins} = config;
  plugins = [...plugins,...pluginItems];
  Object.assign(config,{plugins});
});

const productionPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress:{
      warnings:false
    }
  }),
  new webpack.DefinePlugin({
    "process.env": { 
        NODE_ENV: JSON.stringify("production") 
    }
  })
];

switch (ENV){
  case development:
    break;
  case production:
    collection(productionPlugins);
    break;
  default:
    break;
}

module.exports = config;