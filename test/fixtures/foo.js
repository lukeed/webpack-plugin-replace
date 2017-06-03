var ENV = process.env.NODE_ENV;
var FOO = DEMO_FOO;
var BAR = DEMO_BAR;

module.exports = () => `${ ENV }: ${ FOO } ${ BAR }`;
