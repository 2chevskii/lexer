import ITokenizeSettings from '../util/ITokenizeSettings';
import TokenType from '../util/TokenType';

/**
 * @type {ITokenizeSettings<TokenType>}
 */
export const defaultSettings = {
    ruleset: [
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
    ],
    flags: 'g'
};

export function stringFromRule(rule) {
    if (rule.rule instanceof RegExp) return `(?<${rule.name}>${rule.rule.source})`;
    else return `(?<${rule.name}>${rule.rule})`;
}

export default { defaultSettings, stringFromRule };
