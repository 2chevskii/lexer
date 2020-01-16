import { tokenize } from './core/lexer';

export * from './core/lexer';
export { defaultSettings as defaultTokenizeSettings } from './core/defaultRuleset';
export { ITokenRule } from './util/ITokenRule';
export { ITokenizeSettings } from './util/ITokenizeSettings';
export { Token } from './util/Token';
export { TokenType } from './util/TokenType';

export default tokenize;
//
