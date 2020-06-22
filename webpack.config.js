const path = require('path');

module.exports = {
    mode: "development",
    entry: {
        build: ['./src/scripts/app.js'],
        "pages/homepage": ['./src/scripts/pages/homepage.js'],
        "pages/contacts": ['./src/scripts/pages/contacts.js']
    },
    output: {
        filename: "./[name].js"
    },
    devtool: "sourcemap",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ "@babel/preset-env" ]
                    }
                }
            }
        ]
    }
}