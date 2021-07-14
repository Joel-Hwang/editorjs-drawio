module.exports = {
    entry: './src/drawio.js',
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                query: {
                  presets: [ '@babel/preset-env' ],
                },
              },
            ]
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          },
          {
            test: /\.(svg)$/,
            use: [
              {
                loader: 'raw-loader',
              }
            ]
          }
        ]
      },
      output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js',
        library: 'DrawIO',
        libraryTarget: 'umd'
      }
    };