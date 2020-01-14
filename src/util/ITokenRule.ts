
/**
 * Rule for token generation
 * @export
 * @interface ITokenRule
 * @template TName
 */
export interface ITokenRule<TName> {
    name: TName;
    rule: string | RegExp;
}

export default ITokenRule;
