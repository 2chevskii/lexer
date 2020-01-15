import { defaultSettings, stringFromRule } from './defaultRuleset';
import ITokenizeSettings from '../util/ITokenizeSettings';
import Token from '../util/Token';
import TokenType from '../util/TokenType';

/**
 * Asynchronously tokenizes given string following provided (or default) tokenization rules
 * @export
 * @param {string} input
 * @returns {Promise<Array<Token<TokenType>>>}
 */
export async function tokenize(input: string): Promise<Array<Token<TokenType>>>;
/**
 * Asynchronously tokenizes given string following provided (or default) tokenization rules
 * @export
 * @template T
 * @param {string} input
 * @param {ITokenizeSettings<T>} settings
 * @returns {Promise<Array<Token<T>>>}
 */
export async function tokenize<T>(input: string, settings: ITokenizeSettings<T>): Promise<Array<Token<T>>>;
/**
 * Asynchronously tokenizes given string following provided (or default) tokenization rules
 * @export
 * @template T
 * @param {string} input
 * @param {ITokenizeSettings<T>} settings
 * @param {(((result: Array<Token<T>> | undefined, error: Error | undefined) => any) | undefined)} callback
 */
export function tokenize<T>(input: string, settings: ITokenizeSettings<T>, callback: ((result: Array<Token<T>> | undefined, error: Error | undefined) => any) | undefined): void;
/**
 * Asynchronously tokenizes given string following provided (or default) tokenization rules
 * @export
 * @template T
 * @param {string} input
 * @param {ITokenizeSettings<T>} [settings=<any>defaultSettings]
 * @param {(((result?: Array<Token<T>>, error?: Error) => any) | undefined)} [callback]
 * @returns {(Promise<Array<Token<T>>> | void)}
 */
export function tokenize<T>(
    input: string,
    settings: ITokenizeSettings<T> = <any>defaultSettings,
    callback?: ((result?: Array<Token<T>>, error?: Error) => any) | undefined
): Promise<Array<Token<T>>> | void {
    const promise = new Promise<Array<Token<T>>>((resolve, reject) => {
        if (typeof input !== 'string') reject(new TypeError('Input must be a string'));
        else if (typeof settings !== 'object') reject(new TypeError('Rules must be an array of ITokenRule objects'));
        else _tokenize(input, settings).then(resolve).catch(reject);
    });

    if (!callback) return promise;

    promise.then(tokens => callback(tokens)).catch(error => callback(undefined, error));
}

async function _tokenize<T>(input: string, settings: ITokenizeSettings<T>): Promise<Array<Token<T>>> {
    return new Promise<Array<Token<T>>>((resolve, reject) => {
        try {
            const tokens: Array<Token<T>> = new Array<Token<T>>();
            const rules = settings.ruleset;

            let strRegex = '';

            const rLength = rules.length;
            const rLengthRdcd = rules.length - 1;

            for (let i = 0; i < rLength; i++) {
                strRegex += stringFromRule(rules[i]);

                if (i < rLengthRdcd) strRegex += '|';
            }

            const regex = new RegExp(strRegex, settings.flags);

            let matchArray: RegExpMatchArray | null = null;

            let pos = 0;

            const next = () => {
                setImmediate(() => {
                    try {
                        matchArray = regex.exec(input);

                        //                              //Type error in Object.values call even tho it works flawless ¯\_(ツ)_/¯
                        if (matchArray && matchArray.groups && Object.values(<any>matchArray.groups).some(val => val !== undefined)) {
                            for (const name in matchArray.groups) {
                                const group = matchArray.groups[name];
                                if (!group) continue;

                                // weird fucking TS stop complaining
                                tokens.push(<any>(new Token(name, group, pos, pos += group.length - 1)));
                                pos++;
                            }

                            next();
                        } else {
                            resolve(tokens);
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
            };

            next();
        } catch (error) {
            reject(error);
        }

    });
}

export default tokenize;
