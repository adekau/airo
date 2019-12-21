import { Apply, Apply1, Apply2 } from './Apply';
import { HKT, HKTS, Kind, HKTS2, Kind2 } from './HKT';

export type Bindable<F> = Apply<F> & {
    readonly bind: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>;
};

export type Bindable1<F extends HKTS> = Apply1<F> & {
    readonly bind: <A, B>(fa: Kind<F, A>, f: (a: A) => Kind<F, B>) => Kind<F, B>;
};

export type Bindable2<F extends HKTS2> = Apply2<F> & {
    readonly bind: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => Kind2<F, E, B>) => Kind2<F, E, B>;
};