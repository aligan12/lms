import path from 'path'
import { ConcatenationScope } from 'webpack'

import { buildWebpackConfig } from './config/build/BuildWebpackConfig'
import { IBuildEnv, IBuildPath } from './config/build/types/config'

export default (env: IBuildEnv) => {
	const mode = env.mode || 'development'
	const PORT = env.port || 3000
	const isDev: boolean = mode === 'development'

	const paths: IBuildPath = {
		static: 'https://test.org/example/',
		build: path.resolve(__dirname, 'build'),
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		html: path.resolve(__dirname, 'public', 'index.html'),
		src: path.resolve(__dirname, 'src'),
	}

	const config = buildWebpackConfig({
		mode,
		isDev,
		paths,
		port: PORT,
	})

	return config
}
