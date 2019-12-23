import { Apply, Apply1, Apply2, PipeableApply, PipeableApply1, PipeableApply2 } from './Apply';
import { Bindable, Bindable1, Bindable2, PipeableBindable, PipeableBindable1, PipeableBindable2 } from './Bindable';
import { Functor, Functor1, Functor2, PipeableFunctor1, PipeableFunctor2, PipeableFunctor } from './Functor';
import { HKTS, HKTS2, HKT } from './HKT';

const isFunctor = <F>(x: unknown): x is Functor<F> =>
    Object.prototype.hasOwnProperty.call(x, 'map') && typeof (x as any).map === 'function';

const isApply = <F>(x: unknown): x is Apply<F> =>
    Object.prototype.hasOwnProperty.call(x, 'ap') && typeof (x as any).ap === 'function';

const isBindable = <F>(x: unknown): x is Bindable<F> =>
    Object.prototype.hasOwnProperty.call(x, 'bind') && typeof (x as any).bind === 'function';

export function pipeable<F extends HKTS2, I>(
    I: { HKT: F } & I
): (I extends Bindable2<F> ? PipeableBindable2<F> :
    I extends Apply2<F> ? PipeableApply2<F> :
    I extends Functor2<F> ? PipeableFunctor2<F> :
    {});
export function pipeable<F extends HKTS, I>(
    I: { HKT: F } & I
): (I extends Bindable1<F> ? PipeableBindable1<F> :
    I extends Apply1<F> ? PipeableApply1<F> :
    I extends Functor1<F> ? PipeableFunctor1<F> :
    {});
export function pipeable<F, I>(
    I: { HKT: F } & I
): (I extends Bindable<F> ? PipeableBindable<F> :
    I extends Apply<F> ? PipeableApply<F> :
    I extends Functor<F> ? PipeableFunctor<F> :
    {});
export function pipeable<F, I>(
    I: { HKT: F } & I
): any {
    const r: any = {};
    if (isFunctor<F>(I)) {
        const map: PipeableFunctor<F>['map'] = f => fa => I.map(fa, f);
        r.map = map;
    }

    if (isApply<F>(I)) {
        const ap: PipeableApply<F>['ap'] = fa => fab => I.ap(fab, fa);
        const apFirst: PipeableApply<F>['apFirst'] = fb => fa => I.ap(I.map(fa, a => () => a), fb);
        const apSecond: PipeableApply<F>['apSecond'] = <B>(fb: HKT<F, B>) => fa => I.ap(I.map(fa, () => (b: B) => b), fb);
        r.ap = ap;
        r.apFirst = apFirst;
        r.apSecond = apSecond;
    }

    if (isBindable<F>(I)) {
        const bind: PipeableBindable<F>['bind'] = f => fa => I.bind(fa, f);
        const bindFirst: PipeableBindable<F>['bindFirst'] = f => fa => I.bind(fa, a => I.map(f(a), () => a));
        const flatten: PipeableBindable<F>['flatten'] = mma => I.bind(mma, a => a);
        r.bind = bind;
        r.bindFirst = bindFirst;
        r.flatten = flatten;
    }

    return r;
}
