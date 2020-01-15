import ITokenRule from './ITokenRule';

/**
 * Settings determine names of tokens, patterns, and parse flags
 * @export
 * @interface ITokenizeSettings
 * @template T
 */
export interface ITokenizeSettings<T> {
    ruleset: Array<ITokenRule<T>>;
    flags: string;
}

export default ITokenizeSettings;
