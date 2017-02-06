module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'app.bundle.js'
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}