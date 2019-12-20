import { Functor, Functor1 } from './Functor';
import { HKT, Kind, HKTS } from './HKT';

export type Apply<F> = Functor<F> & {
    readonly ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>;
};

export type Apply1<F extends HKTS> = Functor1<F> & {
    readonly ap: <A, B>(fab: Kind<F, (a: A) => B>, fa: Kind<F, A>) => Kind<F, B>;
};
