const { join } = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Lib = require('../lib');

const tmp = join(__dirname, '.tmp');
const src = join(__dirname, 'fixtures');

rimraf(tmp, () => {
	webpack({
		entry: `${src}/app.js`,
		output: { path:tmp, filename:'out.js' },
		plugins: [
			new Lib({
				exclude: [/node_modules/, 'foo.js'],
				values: {
					'DEMO_FOO': 123,
					'DEMO_BAR': '"world"',
					'const FLAG': '"FLAGGG"',
					'process.env.NODE_ENV': JSON.stringify('production'),
				},
				patterns: [
					{ regex: /FOO_[^\*]{3}(\s)?/g, value:123 },
				]
			})
		]
	}, (err, stats) => {
		if (err || stats.hasErrors()) {
			return console.log('Build error!');
		}
	});
});
