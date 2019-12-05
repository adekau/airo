import { cont } from '../src/Continuation';

test('test constant continuation', () => {
    const test = cont("hello")
        (x => cont(x(0) + "!")
        (x => x(0)));
    expect(test).toBe('hello!');
});

test('test lambda continuation', () => {
    const cows = cont((x: number) => x * x)
        (x => cont((y: number) => x(4) + y)
        (x => cont((y: string) => x(3).toString() + ' ' + y)
        (x => x("cows"))));
    expect(cows).toBe('19 cows');
});
