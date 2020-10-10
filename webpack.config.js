module.exports = {
    entry: './main.js',
    devtool: 'source-map',
    mode: 'production',
   
    output: {
        filename: './bundle.js'
    },
    
    module: {
        rules: [
           {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
          }
        ]
    }
};
   