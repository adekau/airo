import { Apply, Apply1, Apply2, PipeableApply } from './Apply';
import { HKT, HKTS, Kind, Kind2, HKTS2 } from './HKT';

export type Applicative<F> = Apply<F> & {
    readonly of: <A>(a: A) => HKT<F, A>;
};

export type Applicative1<F extends HKTS> = Apply1<F> & {
    readonly of: <A>(a: A) => Kind<F, A>;
};

export type Applicative2<F extends HKTS2> = Apply2<F> & {
    readonly of: <E, A>(a: A) => Kind2<F, E, A>
};
