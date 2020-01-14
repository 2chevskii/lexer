import ITokenRule from '../util/ITokenRule';
import Token from '../util/Token';
import TokenType from '../util/TokenType';

/**
 * Default tokenize rules for parsing words, float numbers and some special characters. Unrecognized chars are returned as token with `GENERIC` type
 * @type {ITokenRule<TokenType>[]}
 */
export const defaultRuleset = [
    {
        name: 'ASSIGN',
        rule: /=/
    },
    {
        name: 'BR_CLOSE',
        rule: /\]/
    },
    {
        name: 'BR_OPEN',
        rule: /\[/
    },
    {
        name: 'COLON',
        rule: /:/
    },
    {
        name: 'COMMA',
        rule: /,/
    },
    {
        name: 'DASH',
        rule: /-/
    },
    {
        name: 'DOT',
        rule: /\./
    },
    {
        name: 'ESC',
        rule: /\\/
    },
    {
        name: 'NUMBER',
        rule: /\d+\.?\d+/
    },
    {
        name: 'Q_DOUBLE',
        rule: /"/
    },
    {
        name: 'Q_SINGLE',
        rule: /'/
    },
    {
        name: 'SEMICOLON',
        rule: /;/
    },
    {
        name: 'WHITESPACE',
        rule: /\s/
    },
    {
        name: 'WORD',
        rule: /[a-zA-Zа-яА-Я]+/
    },
    {
        name: 'GENERIC',
        rule: /./
    }
];

/**
 * @export
 * @param {string} input
 * @returns {Promise<Token[]>}
 */
export async function tokenize(input);
/**
 * @export
 * @param {string} input
 * @param {ITokenRule<any>[]} rules
 * @returns {Promise<Token[]>}
 */
export async function tokenize(input, rules);
/**
 * @export
 * @param {string} input
 * @param {ITokenRule<any>[]} rules
 * @param {(tokens: Token[], error?: Error)=>any} callback
 * @returns {void}
 */
export function tokenize(input, rules, callback);
/**
 * Returns an array of tokens generated from given string
 * @export
 * @param {string} input
 * @param {ITokenRule<any>[] | undefined} [rules=defaultRuleset]
 * @param {(tokens:Token[], error?: Error) => any | undefined} [callback=undefined]
 * @returns {Promise<Token[]> | void}
 */
export function tokenize(input, rules = defaultRuleset, callback = undefined) {
    const notString = (typeof input !== 'string') ? new TypeError('Input must be a string') : undefined;
    const notArray = !(rules instanceof Array) ? new TypeError('Rules must be an array of ITokenRule objects') : undefined;

    if (callback) {
        if (notString) throw notString;
        if (notArray) throw notArray;

        tokenizeInternal(input, rules).then(tokens => callback(tokens)).catch(err => callback([], err));
    } else {
        return new Promise((res, rej) => {
            if (notString) rej(notString);
            if (notArray) rej(notArray);

            tokenizeInternal(input, rules).then(res).catch(rej);
        });
    }
}

async function tokenizeInternal(input, rules) {
    return new Promise((res, rej) => {
        setImmediate(() => {
            try {
                const result = [];

                let regexString = '';

                rules.forEach((rule, index) => {
                    if (rule.rule instanceof RegExp) {
                        regexString += `(?<${rule.name}>${rule.rule.source})`;
                    } else regexString += `(?<${rule.name}>${rule.rule})`;

                    if (index < rules.length - 1) regexString += '|';
                });

                const regex = new RegExp(regexString, 'g');

                let matcharray;

                let i = 0;

                while ((matcharray = regex.exec(input))) {
                    //@ts-ignore      //Type error in Object.values call ¯\_(ツ)_/¯
                    if (matcharray && Object.values(matcharray.groups).some(val => val !== undefined)) {
                        for (const group in matcharray.groups) {
                            if (matcharray.groups[group]) {
                                result.push(new Token(group, matcharray.groups[group], i, i += matcharray.groups[group].length));
                            }
                        }
                    } else break;
                }

                res(result);
            } catch (ex) {
                rej(ex);
            }
        });
    });
}

export default { tokenize, defaultRuleset };
