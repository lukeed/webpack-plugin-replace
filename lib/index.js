function ReplaceText(opts) {
	opts = opts || {};
	this.options = opts;
	this.values = opts.values || opts;
}

ReplaceText.prototype.apply = function (compiler) {
	const vals = this.values;
	const keys = Object.keys(vals).filter(k => (k !== 'include') && (k !== 'exclude'));
	const RGXP = new RegExp(keys.join('|'), 'g');

	compiler.plugin('compilation', bundle => {
		bundle.plugin('optimize-modules', modules => {
			modules.forEach(mod => {
				mod._source._value = mod._source._value.replace(RGXP, key => vals[key]);
			});
		});
	});
};

module.exports = ReplaceText;
