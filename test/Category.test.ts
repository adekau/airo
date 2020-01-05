import { absurd, identity, One, powerOfZero, powerOfZeroInv, prodIdentity, prodIdentityInv } from '../src/Category';
import { apply, func } from '../src/Func';

describe('Category', () => {
    it('Absurd should not be callable', () => {
        expect(() => apply(absurd<number>(), 5)).toThrowError('Does not exist.');
    });

    it('power of zero', () => {
        const pz = apply(powerOfZero(), func<never, number>(() => 5));
        expect(pz).toEqual({});
    });

    it('power of zero inverse', () => {
        const pzi = apply(powerOfZeroInv(), {});
        expect(() => apply(pzi, 1)).toThrowError('Does not exist.');
    });

    it('prod identity', () => {
        expect(apply(prodIdentity<number>(), { fst: 5, snd: {} })).toBe(5);
    });

    it('prod identity inverse', () => {
        expect(apply(prodIdentityInv<number>(), 5)).toEqual({ fst: 5, snd: {} });
    })
});
