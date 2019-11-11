import { Prod, times, fst, snd, swapProd } from '../src/Prod';
import { Func, func, apply } from '../src/Func';

test('prod', () => {
    const incr: Func<number, number> = func(x => x + 1);
    const isEven: Func<number, boolean> = func(x => !(x % 2));
    const f: Func<number, Prod<number, boolean>> = incr.times(isEven);
    expect(f.f(5)).toStrictEqual({ fst: 6, snd: false });
});

test('fst, snd', () => {
    const addOne = func<number, number>(x => x + 1);
    const addTwo = func<number, number>(x => x + 2);
    const tuple = addOne.times(addTwo);
    expect(tuple.f(1)).toStrictEqual({ fst: 2, snd: 3 });
    expect(tuple.then(fst()).f(1)).toBe(2);
    expect(tuple.then(snd()).f(1)).toBe(3);
});

test('func timesMap', () => {
    const incr = func<number, number>(x => x + 1);
    const decr = func<number, number>(x => x - 1);
    const isEven = func<number, boolean>(x => !(x % 2));
    const f : Func<number, Prod<number, boolean>> = (incr.times(decr)).then(incr.timesMap(isEven));
    const f2 = (incr.timesMap(decr));

    expect(f.f(1)).toStrictEqual({ fst: 3, snd: true });
    expect(f.f(2)).toStrictEqual({ fst: 4, snd: false });
    expect(f2.f({ fst: 5, snd: 15 })).toStrictEqual({ fst: 6, snd: 14 });
});

test('swap product', () => {
    const incr = func<number, number>(x => x + 1);
    const decr = func<number, number>(x => x - 1);
    const prod = incr.timesMap(decr);
    const prodSwap = prod.then(swapProd());
    expect(apply(prod, { fst: 14, snd: 26 })).toStrictEqual({ fst: 15, snd: 25 });
    expect(apply(prodSwap, { fst: 14, snd: 26 })).toStrictEqual({ fst: 25, snd: 15 });
});
