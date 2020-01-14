
/**
 * Unit, which represents mathed pattern
 * @export
 * @class Token
 * @template T
 */
export class Token<T> {
    type: T;
    value: string;
    start: number;
    end: number;

    constructor(name: T, value: string, start: number, end: number) {
        this.type = name;
        this.value = value;
        this.start = start;
        this.end = end;
    }
}

export default Token;
