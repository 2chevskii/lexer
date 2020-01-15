
/**
 * Unit, which represents mathed pattern
 * @export
 * @class Token
 * @template T
 */
export class Token<T> {
    readonly type: T;
    readonly value: string;
    readonly start: number;
    readonly end: number;

    constructor(name: T, value: string, start: number, end: number) {
        this.type = name;
        this.value = value;
        this.start = start;
        this.end = end;
    }

    static create<T>(type: T, value: string, start: number, end: number) {
        return new Token<T>(type, value, start, end);
    }

    get length() {
        return this.value.length;
    }
}

export default Token;
