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
			new Lib({ hello:'world' })
		]
	}, (err, stats) => {
		if (err || stats.hasError) {
			return console.log('Build error!');
		}
	});
});

