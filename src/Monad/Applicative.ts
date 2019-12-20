import { Apply, Apply1 } from './Apply';
import { HKT, HKTS, Kind } from './HKT';

export type Applicative<F> = Apply<F> & {
    readonly of: <A>(a: A) => HKT<F, A>;
};

export type Applicative1<F extends HKTS> = Apply1<F> & {
    readonly of: <A>(a: A) => Kind<F, A>;
}
