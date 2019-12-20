import { HKT, HKTS, Kind } from './HKT';

export type Functor<F> = {
    readonly HKT: F;
    readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}

export type Functor1<F extends HKTS> = {
    readonly HKT: F;
    readonly map: <A, B>(fa: Kind<F, A>, f: (a: A) => B) => Kind<F, B>
}
