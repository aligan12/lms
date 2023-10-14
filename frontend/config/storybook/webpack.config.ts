import path from 'path'
import webpack from 'webpack'

import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { IBuildPath } from '../build/types/config'

export default ({ config }: { config: webpack.Configuration }) => {
	const paths: IBuildPath = {
		build: '',
		entry: '',
		html: '',
		src: path.resolve(__dirname, '..', '..', 'src'),
	}
	config.resolve?.modules && config.resolve.modules.push(paths.src)
	config.resolve?.extensions && config.resolve?.extensions.push('.ts', '.tsx')
	config.module?.rules && config.module?.rules.push(buildCssLoader(true))

	return config
}
