import { Monad1 } from './Monad';

declare module './HKT' {
    interface HKTToKind<A> {
        IO: IO<A>
    }
};

export type IO<A> = () => A;

export const HKTId = 'IO';
export type HKTId = typeof HKTId;

export const of = <A>(a: A): IO<A> =>
    () => a;

export const IO: Monad1<HKTId> = {
    HKT: HKTId,

    map: (fa, f) => () => f(fa()),

    of,

    ap: (fab, fa) => () => fab()(fa()),

    bind: (fa, f) => f(fa())
};
