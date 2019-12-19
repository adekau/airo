import { Continuation } from '../src/Continuation3';

test('bind same type', () => {
    const c = new Continuation<number>((resolve) => resolve(5)).bind<number>((x) => Continuation.of(x + 5));
    expect(c.run(Continuation.id())).toBe(10);
});

test('bind different type', () => {
    const c = new Continuation<number>((resolve) => resolve(15))
        .bind((res) => Continuation.of(res.toString() + '!'))
        .bind((res2) => new Continuation<boolean>((resolve2) => resolve2(!!res2.length)));
    expect(c.run(Continuation.id())).toBe(true);
});

test('map', () => {
    const c = Continuation.of(5)
        .map(result => result.toString() + '!');
    const result = c.run(Continuation.id());
    expect(result).toBe('5!');
})

test('async', (done) => {
    const c = Continuation.of('hello')
        .bind(result => new Continuation<string>(resolve => { return setTimeout(() => resolve(result + ' world'), 1000); }))
        .bind(result => new Continuation<string>(resolve => { return setTimeout(() => resolve(result + '!'), 1000); }));
    c.run((result) => {
        expect(result).toBe('hello world!');
        done();
    });
});
