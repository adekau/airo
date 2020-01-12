import { identity as idF } from './Function';
import { Monad1 } from './Monad';
import { pipeable } from './Pipeable';

declare module './HKT' {
    interface HKTToKind<A> {
        Identity: Identity<A>;
    }
};

export const HKTId = 'Identity';
export type HKTId = typeof HKTId;
export type Identity<A> = A;

export const Identity: Monad1<HKTId> = {
    HKT: HKTId,
    of: idF,
    map: (ma, f) => f(ma),
    bind: (ma, f) => f(ma),
    ap: (mab, ma) => mab(ma)
};

export const {
    ap,
    apFirst,
    apSecond,
    bind,
    bindFirst,
    map,
    of
} = pipeable(Identity);
