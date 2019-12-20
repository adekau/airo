import { Cont } from '../src/Continuation';

test('bind same type', () => {
    const c = new Cont<number>((resolve) => resolve(5)).bind<number>((x) => Cont.of(x + 5));
    expect(c.run(Cont.id())).toBe(10);
});

test('bind different type', () => {
    const c = new Cont<number>((resolve) => resolve(15))
        .bind((res) => Cont.of(res.toString() + '!'))
        .bind((res2) => new Cont<boolean>((resolve2) => resolve2(!!res2.length)));
    expect(c.run(Cont.id())).toBe(true);
});

test('map', () => {
    const c = Cont.of(5)
        .map(result => result.toString() + '!');
    const result = c.run(Cont.id());
    expect(result).toBe('5!');
})

test('async', (done) => {
    const c = Cont.of('hello')
        .bind(result => new Cont<string>(resolve => { return setTimeout(() => resolve(result + ' world'), 250); }))
        .bind(result => new Cont<string>(resolve => { return setTimeout(() => resolve(result + '!'), 250); }));
    c.run((result) => {
        expect(result).toBe('hello world!');
        done();
    });
});
