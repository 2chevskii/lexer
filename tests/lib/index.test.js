const describe = require('mocha').describe,
    it = require('mocha').it,
    assume = require('assume'),
    lexer = require('../../lib/index');

describe('index', function () {
    it('Token should be a class (function)', function () {
        assume(lexer.Token).is.a('function');
    });

    it('tokenize must be a function', function () {
        assume(lexer.tokenize).is.a('function');
    });

    it('default export must be equal to tokenize func', function () {
        assume(lexer.default).eq(lexer.tokenize);
    });
});

describe('Tokenization', function () {
    let result;
    const str = 'This is a \'string42.24\' for tokeni"zation " 182378123 42.78926374...242...423 []]][awd\'""""as]1--++!_//:;///awd23[] ';

    it('Must tokenize the string without errors', async function () {
        result = await lexer.default(str);
    });

    it('result must be an array', function () {
        assume(result).is.instanceOf(Array);
    });

    it('result length must be non zero', function () {
        assume(0).lessThan(result.length);
    });

    it('result entries must be of type token', function () {
        assume(result[0]).instanceOf(lexer.Token);
    });
});
