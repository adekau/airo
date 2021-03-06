import { Monad1 } from './Monad';
import { pipeable } from './Pipeable';

declare module './HKT' {
    interface HKTToKind<A> {
        IO: IO<A>
    }
};

export type IO<A> = () => A;

export const HKTId = 'IO';
export type HKTId = typeof HKTId;

export const IO: Monad1<HKTId> = {
    HKT: HKTId,

    map: (fa, f) => () => f(fa()),

    of: (a) => () => a,

    ap: (fab, fa) => () => fab()(fa()),

    bind: (fa, f) => f(fa())
};

export const {
    ap,
    apFirst,
    apSecond,
    bind,
    bindFirst,
    flatten,
    map,
    of
} = pipeable(IO);
