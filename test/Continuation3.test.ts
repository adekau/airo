import { cont } from '../src/Continuation3';
import { func, apply } from '../src/Func';
import { One, constant } from '../src/Category';

test('cont3', () => {
    const f = func((a: number) => a * 200);
    const c = cont(f);
    expect(c).toBeTruthy();
    expect(c.flatten().f.toString()).toBe(f.f.toString());
});

test('map', () => {
    const f = func((a: number) => a * 200);
    const g = func((b: number) => b.toString() + '!');
    const c = cont(f)
        .map(f => f.then(g));
    expect(c.fn.f.toString()).toBe(f.then(g).f.toString());
});

test('bind', () => {
    const f = func((a: number) => a * 200);
    const g = func((b: number) => b.toString() + '!');
    const c = cont(f)
        .bind(f => cont(f.then(g)));
    expect(c.fn.f.toString()).toBe(f.then(g).f.toString());
});

test('run', () => {
    const c = cont(func<number, number>(a => a*a))
        .map(f => f.then(func(t => t + 5)));
    expect(c.run(5)).toBe(30);
});

test('async', () => {
    const c = cont<One, number>(constant(50));
    const c2 = c.map(f => func( t => console.log(apply(f, {}))));

    expect(c2.run(50)).toStrictEqual({});
});
