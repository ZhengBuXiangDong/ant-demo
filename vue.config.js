const path = require('path')
module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [{
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    }]
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-sprite-loader',
                    include: [
                        path.resolve('@/assets/svg/')
                    ]
                },
            ]
        }
    }
}