module.exports = function (context, options) {
	return {
		name: 'custom-docusaurus-plugin',
		configureWebpack(config, isServer, utils) {
			const { getJSLoader } = utils
			return {
				module: {
					rules: [
						{
							test: /\.lrc$/i,
							use: 'raw-loader'
						}
					]
				}
			}
		}
	}
}
