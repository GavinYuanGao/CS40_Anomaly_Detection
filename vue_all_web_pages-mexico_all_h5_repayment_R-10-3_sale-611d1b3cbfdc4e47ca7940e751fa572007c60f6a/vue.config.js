/**
Created by dechuan on 2020/12/23 23
 */
module.exports = {
	publicPath: '/repayment/',
	devServer: {
		hotOnly: true,
		proxy: {
			'/api': {
				target: 'http://152.32.233.196:9922/', // 墨西哥demo
				pathRewrite: {'^/api' : ''}
			}
		},
	}
}
