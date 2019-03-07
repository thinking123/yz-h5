const remUnit = process.env.remUnit

const px2rem = require('postcss-px2rem')

const postcss = px2rem({
    remUnit: remUnit
})

module.exports = {
    devServer: {
        proxy: 'http://psbc.ysmine.com:8088'
    },
    css: {
        loaderOptions: {
            sass: {
                // @/ is an alias to src/
                data: `@import "@/assets/css/variables.scss";`
            },
            postcss: {
                plugins: [
                    postcss
                ]
            }
        }
    },

}
