const isRegex = any => any instanceof RegExp;
const isBool = any => typeof any === 'boolean';
const isString = any => typeof any === 'string';
const isFunction = any => typeof any === 'function';

const toArray = any => Array.isArray(any) ? any : (any ? [any] : any);

function toFunction(val) {
	if (isBool(val)) return _ => val;
	if (isRegex(val)) return str => val.test(str);
	if (isString(val)) return str => str.includes(val);
	if (isFunction(val)) return str => val(str);
}

function evalArr(funcs, str) {
	let i=0, len=funcs.length;
	for (; i < len; i++) {
		if (funcs[i](str) === true) {
			return true; // match ANY cond
		}
	}
	return false;
}

class ReplaceText {
	constructor(opts) {
		opts = Object.assign({ include:true, exclude:false }, opts);

		const includes = toArray(opts.include).map(toFunction);
		const excludes = toArray(opts.exclude).map(toFunction);

		this.options = opts;
		this.values = opts.values || opts;

		this.isMatch = str => evalArr(includes, str) && !evalArr(excludes, str);
	}

	apply(compiler) {
		const vals = this.values;
		const keys = Object.keys(vals).filter(k => (k !== 'include') && (k !== 'exclude'));
		const RGXP = new RegExp(keys.join('|'), 'g');
		const isMatch = this.isMatch;

		compiler.plugin('compilation', bundle => {
			bundle.plugin('optimize-modules', modules => {
				modules.forEach(mod => {
					if (isMatch(mod.resource)) {
						mod._source._value = mod._source._value.replace(RGXP, key => vals[key]);
					}
				});
			});
		});
	}
}

module.exports = ReplaceText;
