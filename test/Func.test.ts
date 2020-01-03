import { Func, func } from '../src/Func';

describe('Func wrapper', () => {
    it('Increment function', () => {
        const incr: Func<number, number> = func(x => x + 1);
        expect(incr.f(5)).toBe(6);
    });

    it('Is Even', () => {
        const isEven: Func<number, boolean> = func(x => !(x % 2));
        expect(isEven.f(10)).toBe(true);
        expect(isEven.f(11)).toBe(false);
    });

    it('Negation', () => {
        const not: Func<boolean, boolean> = func(x => !x);
        expect(not.f(true)).toBe(false);
        expect(not.f(false)).toBe(true);
    });

    it('Composition', () => {
        const incr: Func<number, number> = func(x => x + 1);
        const double: Func<number, number> = func(x => x * 2);
        const incrDouble: Func<number, number> = incr.then(double);
        expect(incrDouble.f(5)).toBe(12);
    });

    it('Composition the other way', () => {
        const incr: Func<number, number> = func(x => x + 1);
        const double: Func<number, number> = func(x => x * 2);
        const doubleAfterIncr: Func<number, number> = double.after(incr);
        expect(doubleAfterIncr.f(5)).toBe(12);
    })

    it('Different range type', () => {
        const incr: Func<number, number> = func(x => x + 1);
        const double: Func<number, number> = func(x => x * 2);
        const isEven: Func<number, boolean> = func(x => !(x % 2));
        const isIncrDoubleEven: Func<number, boolean> = incr.then(double).then(isEven);
        expect(isIncrDoubleEven.f(5)).toBe(true);
    });

    // test just shows that typescript does a pretty good job inferring types
    it('Infer', () => {
        const something = func((x: number) => `Your number is ${x}`);
        const something2 = something.then(func(x => x.length));
        expect(something2.f(5)).toBe(16);
    });
});
