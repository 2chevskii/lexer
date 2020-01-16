<!-- omit in toc -->
# Lexer [![][codacybadge]][codacydashboard] [![][licensebadge]][license] ![toplangbadge][] ![ghtagbadge][]

Tool designed to make tokenizing strings with regexes fast and easy

- [Install](#install)
- [Use](#use)
  - [Import package](#import-package)
  - [Basic tokenization](#basic-tokenization)
  - [Creating own tokenization rules](#creating-own-tokenization-rules)
  - [Passing own tokenization settings](#passing-own-tokenization-settings)
- [Compile for different ECMAScript version](#compile-for-different-ecmascript-version)

- [x] Asynchronous
- [x] Simple
- [x] Tokens are named
- [x] Tokens contain their start and end position in the source string
- [x] Works with TypeScript
- [x] Works in both NodeJS and browser
- [x] Zero dependencies - no additional packages to download

## Install
Just `npm i @rustworkshop/lexer` and you are good to go!

## Use
### Import package
You can import this package either through `require` or `ES6 imports`:
```js
import * as lexer from '@rustworkshop/lexer'
// or
const lexer = require('@rustworkshop/lexer')
```
### Basic tokenization
Main function of this package is `tokenize<T>`, which accepts 1..3 arguments and returns either `Promise<Token<T>>` or `void` (depends on if the callback is present)

This function is also exported as `default`, so `import tokenize from '@rustworkshop/lexer'` will allow to use it as well
```js
import tokenize from '@rustworkshop/lexer'

tokenize("Hello world!").then(tokens => console.log(tokens))
// output
[
  Token { type: 'WORD', value: 'Hello', start: 0, end: 4 },
  Token { type: 'WHITESPACE', value: ' ', start: 5, end: 5 },
  Token { type: 'WORD', value: 'world', start: 6, end: 10 },
  Token { type: 'GENERIC', value: '!', start: 11, end: 11 }
]
```

### Creating own tokenization rules
Tokenization rule is an object that follows the exported interface `ITokenRule`:
```ts
interface ITokenRule<TName> {
    name: TName;
    rule: string | RegExp;
}
```
String is compared to every rule in passed settings, producing tokens on every execution

*Note that even if the string is passed as `rule` field in these objects, the regex is created afterwards => `(?<name>rule)`, so the `rule` field as a string must not contain slashes (`/`) at the start/end.*

### Passing own tokenization settings
Tokenization settings must be an object (represented by ITokenizeSettings exported interface) which contains two fields: ruleset - an array of ITokenRule objects, and flags - string of regex engine flags
```ts
interface ITokenizeSettings<T> {
    ruleset: Array<ITokenRule<T>>;
    flags: string;
}
```
By creating your own settings you can use custom type as name of token to have autocompletion while checking it (if your editor supports TypeScript autocompletion ofc)

## Compile for different ECMAScript version
By default this package is compiled for ECMA2017 target version, and source code is not provided with NPM package. However - if you want to raise or downgrade version (must be >= ES5 because of getters usage, which are not supported by ES3 compilation target in TS), you would want to:
1. Clone this repo: `git clone https://github.com/2chevskii/lexer.git`
2. Change the target version in `tsconfig.json` (or use `-t <version>` compilation flag while running `tsc` command)
3. Compile: `npm run build` (if you have skipped step 2 - run `tsc -p tsconfig.json -t <version>`)
4. Test: `npm test`
5. Use the package (either from the folder directly or by running `npm pack` and using generated tarball)

[codacybadge]: https://api.codacy.com/project/badge/Grade/e6dd7f48bdd64447b79eeffbd3570a0c
[codacydashboard]: https://app.codacy.com/manual/2chevskii/lexer?utm_source=github.com&utm_medium=referral&utm_content=2chevskii/lexer&utm_campaign=Badge_Grade_Dashboard
[licensebadge]: https://img.shields.io/github/license/2chevskii/lexer?color=red
[license]: https://github.com/2chevskii/lexer/blob/master/LICENSE
[toplangbadge]: https://img.shields.io/github/languages/top/2chevskii/lexer?color=steelblue
[ghtagbadge]: https://img.shields.io/github/v/tag/2chevskii/lexer?color=hotpink&label=version
