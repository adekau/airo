import { Functor, Functor1, Functor2, PipeableFunctor, PipeableFunctor1, PipeableFunctor2 } from './Functor';
import { HKT, Kind, HKTS, HKTS2, Kind2 } from './HKT';

export type Apply<F> = Functor<F> & {
    readonly ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>;
};

export type Apply1<F extends HKTS> = Functor1<F> & {
    readonly ap: <A, B>(fab: Kind<F, (a: A) => B>, fa: Kind<F, A>) => Kind<F, B>;
};

export type Apply2<F extends HKTS2> = Functor2<F> & {
    readonly ap: <E, A, B>(fab: Kind2<F, E, (a: A) => B>, fa: Kind2<F, E, A>) => Kind2<F, E, B>;
}

export type PipeableApply<F> = PipeableFunctor<F> & {
    readonly ap: <A>(fa: HKT<F, A>) => <B>(fab: HKT<F, (a: A) => B>) => HKT<F, B>;
    readonly apFirst: <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>) => HKT<F, A>;
    readonly apSecond: <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>) => HKT<F, B>;
};

export type PipeableApply1<F extends HKTS> = PipeableFunctor1<F> & {
    readonly ap: <A, B>(fa: Kind<F, A>) => (fab: Kind<F, (a: A) => B>) => Kind<F, B>;
    readonly apFirst: <B>(fb: Kind<F, B>) => <A>(fa: Kind<F, A>) => Kind<F, A>;
    readonly apSecond: <B>(fb: Kind<F, B>) => <A>(fa: Kind<F, A>) => Kind<F, B>;
};

export type PipeableApply2<F extends HKTS2> = PipeableFunctor2<F> & {
    readonly ap: <E, A, B>(fa: Kind2<F, E, A>) => (fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>;
    readonly apFirst: <E, B>(fb: Kind2<F, E, B>) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, A>;
    readonly apSecond: <E, B>(fb: Kind2<F, E, B>) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, B>;
};
