const config = {
	productionSourceMap: false,
	chainWebpack: (config) => {
		config.module.rule('vue').use('vue-svg-inline-loader').loader('vue-svg-inline-loader').options({
			/* ... */
		});
	},
	configureWebpack: {
		devtool: 'source-map'
	},
	lintOnSave: process.env.VUE_APP_NODE_ENV !== 'production',
	//To make scss variables global to the components
	css: {
		loaderOptions: {
			scss: {
				additionalData: '@import "~@/assets/scss/base/_variables.scss";'
			}
		}
	},
	devServer: {
		disableHostCheck: true
	},
	runtimeCompiler: true
};

module.exports = config;
