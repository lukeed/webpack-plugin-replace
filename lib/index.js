const isRegex = any => any instanceof RegExp;
const isString = any => typeof any === 'string';
const isFunction = any => typeof any === 'function';

function toFunction(val) {
	if (isRegex(val)) return str => val.test(str);
	if (isString(val)) return str => str.includes(val);
	if (isFunction(val)) return str => val(str);
}

function matchLogic(opts) {
	const includes = toFunction(opts.include) || (_ => true);
	const excludes = toFunction(opts.exclude) || (_ => false);
	return str => includes(str) && !excludes(str);
}

class ReplaceText {
	constructor(opts) {
		opts = opts || {};
		this.options = opts;
		this.isMatch = matchLogic(opts);
		this.values = opts.values || opts;
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
