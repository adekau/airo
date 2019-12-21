import { HKT, HKTS, Kind, HKTS2, Kind2 } from './HKT';

export type Functor<F> = {
    readonly HKT: F;
    readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
};

export type Functor1<F extends HKTS> = {
    readonly HKT: F;
    readonly map: <A, B>(fa: Kind<F, A>, f: (a: A) => B) => Kind<F, B>
};

export type Functor2<F extends HKTS2> = {
    readonly HKT: F;
    readonly map: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => B) => Kind2<F, E, B>;
};