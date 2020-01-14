const lexer = require('../lib/lexer');

const tokenize = lexer.tokenize;

const testString = `This is a test string with ' single'quotes '"double quotes ",42.42....[]]][]\\\\'=+++==a1123!  :;;: `;

console.time('before_start');

tokenize(testString, lexer.defaultRuleset, tokens => {
    console.time('after_end');
    console.log(JSON.stringify(tokens, null, '\t'));
});

console.time('after_start');
