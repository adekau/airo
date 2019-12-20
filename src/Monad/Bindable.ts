import { Apply, Apply1 } from './Apply';
import { HKT, HKTS, Kind } from './HKT';

export type Bindable<F> = Apply<F> & {
    readonly bind: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>;
};

export type Bindable1<F extends HKTS> = Apply1<F> & {
    readonly bind: <A, B>(fa: Kind<F, A>, f: (a: A) => Kind<F, B>) => Kind<F, B>;
};
