import { apply, Func, func } from '../src/Func';
import { swapSum } from '../src/Sum';

describe('Function Sum', () => {
    it('sum', () => {
        const isEven: Func<number, boolean> = func(x => !(x % 2));
        const not: Func<boolean, boolean> = func(x => !x);
        const f = not.plus(isEven);
        expect(f.f({ kind: 'left', value: false })).toBe(true);
        expect(f.f({ kind: 'right', value: 11 })).toBe(false);
    });

    it('mapped sum', () => {
        const incr: Func<number, number> = func(x => x + 1);
        const not: Func<boolean, boolean> = func(x => !x);
        const f = incr.plusMap(not);
        expect(f.f({ kind: 'left', value: 5 })).toEqual({ kind: 'left', value: 6 });
        expect(f.f({ kind: 'right', value: true })).toEqual({ kind: 'right', value: false });
    });

    it('swap sum', () => {
        const incr: Func<number, number> = func(x => x + 1);
        const not: Func<boolean, boolean> = func(x => !x);
        const sum = incr.plusMap(not);
        const sumSwap = sum.then(swapSum());

        expect(apply(sum, { kind: 'left', value: 5 })).toEqual({ kind: 'left', value: 6 });
        expect(apply(sum, { kind: 'right', value: true })).toEqual({ kind: 'right', value: false });

        expect(apply(sumSwap, { kind: 'left', value: 5 })).toEqual({ kind: 'right', value: 6 });
        expect(apply(sumSwap, { kind: 'right', value: true })).toEqual({ kind: 'left', value: false });
    });
});
