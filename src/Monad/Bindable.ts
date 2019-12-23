import { Apply, Apply1, Apply2, PipeableApply, PipeableApply1, PipeableApply2 } from './Apply';
import { HKT, HKTS, HKTS2, Kind, Kind2 } from './HKT';

export type Bindable<F> = Apply<F> & {
    readonly bind: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>;
};

export type Bindable1<F extends HKTS> = Apply1<F> & {
    readonly bind: <A, B>(fa: Kind<F, A>, f: (a: A) => Kind<F, B>) => Kind<F, B>;
};

export type Bindable2<F extends HKTS2> = Apply2<F> & {
    readonly bind: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => Kind2<F, E, B>) => Kind2<F, E, B>;
};

export type PipeableBindable<F> = PipeableApply<F> & {
    readonly bind: <A, B>(f: (a: A) => HKT<F, B>) => (fa: HKT<F, A>) => HKT<F, B>;
    readonly bindFirst: <A, B>(f: (a: A) => HKT<F, B>) => (fa: HKT<F, A>) => HKT<F, A>;
    readonly flatten: <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>;
};

export type PipeableBindable1<F extends HKTS> = PipeableApply1<F> & {
    readonly bind: <A, B>(f: (a: A) => Kind<F, B>) => (fa: Kind<F, A>) => Kind<F, B>;
    readonly bindFirst: <A, B>(f: (a: A) => Kind<F, B>) => (fa: Kind<F, A>) => Kind<F, A>;
    readonly flatten: <A>(mma: Kind<F, Kind<F, A>>) => Kind<F, A>;
};

export type PipeableBindable2<F extends HKTS2> = PipeableApply2<F> & {
    readonly bind: <E, A, B>(f: (a: A) => Kind2<F, E, B>) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>;
    readonly bindFirst: <E, A, B>(f: (a: A) => Kind2<F, E, B>) => (fa: Kind2<F, E, A>) => Kind2<F, E, A>;
    readonly flatten: <E, A>(mma: Kind2<F, E, Kind2<F, E, A>>) => Kind2<F, E, A>;
};
