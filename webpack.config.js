const path = require( 'path' );

module.exports = {
    target: "web",
    entry: './src/index.js',
    output: {
        filename: 'connly.min.js',
        path: path.resolve( __dirname, 'dist' ),
        libraryTarget: 'var',
        library: 'ConnlySDK'
    },
    devServer: {
        static: {
            directory: path.join( __dirname, 'dist' ),
        },
        compress: true,
        open: true,
        port: 9001,
        hot: true
    }
};

