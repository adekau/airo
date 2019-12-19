// test('cont3', () => {
//     const f = func((a: number) => a * 200);
//     const c = cont(f);
//     expect(c).toBeTruthy();
//     expect(c.flatten().f.toString()).toBe(f.f.toString());
// });

// test('map', () => {
//     const f = func((a: number) => a * 200);
//     const g = func((b: number) => b.toString() + '!');
//     const c = cont(f)
//         .map(f => f.then(g));
//     expect(c.fn.f.toString()).toBe(f.then(g).f.toString());
// });

// test('bind', () => {
//     const f = func((a: number) => a * 200);
//     const g = func((b: number) => b.toString() + '!');
//     const c = cont(f)
//         .bind(f => cont(f.then(g)));
//     expect(c.fn.f.toString()).toBe(f.then(g).f.toString());
// });

// test('run', () => {
//     const c = cont(func<number, number>(a => a*a))
//         .map(f => f.then(func(t => t + 5)));
//     expect(c.run(5)).toBe(30);
// });

// test('async', () => {
//     const c = cont<One, number>(constant(50));
//     const c2 = c.map(f => func( t => console.log(apply(f, {}))));

//     expect(c2.run(50)).toStrictEqual({});
// });
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
        .bind(result => new Continuation<string>((resolve) => { return setTimeout(() => resolve(result + ' world!'), 1000); }));
    c.run((result) => {
        expect(result).toBe('hello world!');
        done();
    });
});
