const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports = {
    entry : './src/index.js',
    output : {
        filename : 'bundle.js',
        path : path.resolve(__dirname, 'dist')
    },
    devtool : 'inline-source-map',
    devServer : {
        contentBase : './dist'
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /(node_modules|bower_components)/,
                use : {
                    loader : 'babel-loader',
                    options : {
                        presets : [ 'env' ]
                    }
                }
            },
            {
                test : /\.scss$/,
                use: ExtractTextPlugin.extract({
                                                   use : [ {
                                                       loader : "css-loader"
                                                   }, {
                                                       loader : "sass-loader"
                                                   } ],
                                                   // use style-loader in development
                                                   fallback : "style-loader"
                                               })
            }
        ]
    },
    plugins : [
        new ExtractTextPlugin("styles.css"),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            Popper: ['popper.js', 'default']
          }),
        new BrowserSyncPlugin(
            // BrowserSync options 
            {
              // browse to http://localhost:3000/ during development 
              host: 'localhost',
              port: 80,
              // proxy the Webpack Dev Server endpoint 
              // (which should be serving on http://localhost:3100/) 
              // through BrowserSync 
              proxy: 'http://localhost:80/'
            },
            // plugin options 
            {
              // prevent BrowserSync from reloading the page 
              // and let Webpack Dev Server take care of this 
              reload: true
            }
          )
    ]
};