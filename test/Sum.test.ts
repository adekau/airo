import { Func, func } from '../src/Func';

test('sum', () => {
    const isEven: Func<number, boolean> = func(x => !(x % 2));
    const not: Func<boolean, boolean> = func(x => !x);
    const f = not.plus(isEven);
    expect(f.f({kind: 'left', value: false})).toBe(true);
    expect(f.f({kind: 'right', value: 11})).toBe(false);
});

test('mapped sum', () => {
    const incr: Func<number, number> = func(x => x + 1);
    const not: Func<boolean, boolean> = func(x => !x);
    const f = incr.plusMap(not);
    expect(f.f({ kind: 'left', value: 5 })).toStrictEqual({ kind: 'left', value: 6 });
    expect(f.f({ kind: 'right', value: true })).toStrictEqual({ kind: 'right', value: false });
});
