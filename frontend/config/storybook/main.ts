import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
	stories: ['../../src/**/*.mdx', '../../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'storybook-addon-pseudo-states',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	webpackFinal: (webpackConfig) => {
		// This modifies the existing image rule to exclude `.svg` files
		// since we handle those with `@svgr/webpack`.
		const imageRule = webpackConfig.module?.rules?.find((rule) => {
			if (typeof rule !== 'string' && rule.test instanceof RegExp) {
				return rule.test.test('.svg')
			}
		})
		if (typeof imageRule !== 'string' && imageRule) {
			imageRule.exclude = /\.svg$/
		}

		webpackConfig.module?.rules?.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		})

		return webpackConfig
	},
}
export default config
