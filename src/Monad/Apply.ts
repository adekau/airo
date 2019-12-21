import { Functor, Functor1, Functor2 } from './Functor';
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