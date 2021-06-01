let path = require('path');
let glob = require('glob');
// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');
//多頁面
function getEntry(globPath) {
    let entries = {},
        basename,
        tmp,
        pathname

    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(-3);
        console.log('tmp: ', tmp);
        pathname = basename; // 正確輸出路徑

        entries[pathname] = {
            entry: 'src/' + tmp[0] + '/' + tmp[1] + '/index.js',
            filename: '../../application/views/mpa/' + tmp[1] + '.php',
            template: 'template.php',
            chunks: ['chunk-common', `chunk-${tmp[1]}-vendors`, `${tmp[1]}`]
        };
    });
    return entries;
}

let pages = getEntry('./src/pages/**?/');
const pageKeys = Object.keys(pages)
let vueConfig = {
    // outputDir: 在npm run build时 生成文件放置的目录 type:string, default:'dist'
    // outputDir: process.env.NODE_ENV === 'production' ? '../htdocs/client' : '../htdocs/client/js',
    outputDir: '../htdocs/client/',
    //publicPath: vue 要使用靜態文件時要存取的資料夾
    publicPath: '/client',
    // 不產生sourceMap
    productionSourceMap: false,
    pages: pages,
    filenameHashing: false,
    runtimeCompiler:true,
    transpileDependencies: ['vuetify'],
    chainWebpack: (config) => {

        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimize = true;
            config.optimization.minimizer = [
                new TerserPlugin({ 
                    terserOptions: {
                        mangle: true,
                        module: false, 
                        compress: { 
                            drop_console: true 
                        } 
                    } 
                })
            ];
        } else {
            config.optimization.minimize = false;
            config.plugins.delete("hmr");
        }

        const imagesRule = config.module.rule('images');
        imagesRule.uses.clear();
        imagesRule
            .use('file-loader')
            .loader('url-loader')
            .options({
                limit: 10000,
                fallback: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]'
                    }
                }
            });
        
        config.resolve.alias
            .set('src', path.resolve(__dirname, 'src'))
            .set('api', path.resolve(__dirname, 'src/api'))
            .set('components', path.resolve(__dirname, 'src/components'))
            .set('pages', path.resolve(__dirname, 'src/pages'))
            .set('plugins', path.resolve(__dirname, 'src/plugins'))
            .set('sass', path.resolve(__dirname, 'src/sass'))
            .set('utils', path.resolve(__dirname, 'src/utils'));

        const IS_VENDOR = /[\\/]node_modules[\\/]/
        config.optimization.splitChunks({
            cacheGroups: {
                ...pageKeys.map((key) => ({
                    name: `chunk-${key}-vendors`,
                    priority: -11,
                    chunks: (chunk) => chunk.name === key,
                    test: IS_VENDOR,
                    enforce: true
                })),
                common: {
                    name: 'chunk-common',
                    priority: -20,
                    chunks: 'initial',
                    minChunks: pageKeys.length,
                    reuseExistingChunk: true,
                    enforce: true,
                }
            }
        })
    } 
};
module.exports = vueConfig;
