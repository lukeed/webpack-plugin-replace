const { readFileSync } = require('fs');
const { join } = require('path');
const test = require('tape');
const fn = require('../lib');

const file = join(__dirname, '.tmp', 'out.js');

test('ReplaceText', t => {
	t.equal(typeof fn, 'function', 'exports a function');
	t.end();
});

test('Usage', t => {
	const str = readFileSync(file, 'utf8');
	t.true(/DEMO_FOO/g.test(str), 'respects `foo.js` exclusion (via config)');
	t.true(/const FLAG/g.test(str), 'respects `node_module` exclusion (via config)');
	t.false(/FOO_/g.test(str), 'replaces all `FOO_*` patterns via RegExp (via config)');
	t.false(/process.env.NODE_ENV/g.test(str), 'replaces all `process.env.NODE_ENV` occurrences (via config)');
	t.end();
});
