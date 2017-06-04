import mri from 'mri';
import foo from './foo';

mri([]);

console.log(`
	ENV: process.env.NODE_ENV
	BAR: DEMO_BAR
	${ foo() }
`);
