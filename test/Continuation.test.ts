import { bind, cont, continuation, result } from '../src/Continuation';

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

test('bind', () => {
    const bindTest = bind(cont(5), (a) => cont(a(0) + 6));
    expect(bindTest(c => result(c))).toBe(11);
    expect(bindTest(result())).toBe(11);
});

test('continuation wrapper', () => {
    const c = continuation(cont("hello"))
        .bind(x => cont(result(x) + '!'))
        .bind(y => cont(result(y) + ' world!'));
    expect(c.cont(result())).toBe('hello! world!');
});

test('continuation wrapper lambda', () => {
    const c = continuation(cont<number, number>(x => x*2))
        .bind(double => cont<number, number>(x => double(x) + x));
    expect(c.cont(x => x(5))).toBe(15);
});
