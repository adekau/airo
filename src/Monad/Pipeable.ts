import { Apply, Apply1, Apply2, PipeableApply, PipeableApply1, PipeableApply2 } from './Apply';
import { Bindable, Bindable1, Bindable2, PipeableBindable, PipeableBindable1, PipeableBindable2 } from './Bindable';
import { Functor, Functor1, Functor2, PipeableFunctor, PipeableFunctor1, PipeableFunctor2 } from './Functor';
import { HKT, HKTS, HKTS2 } from './HKT';

export function pipe<T1, T2>(fn1: (t1: T1) => T2): (t1: T1) => T2;
export function pipe<T1, T2, T3>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3): (t1: T1) => T3;
export function pipe<T1, T2, T3, T4>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => T4): (t1: T1) => T4;
export function pipe<T1, T2, T3, T4>(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4
): (t1: T1) => T4;
export function pipe<T1, T2, T3, T4, T5>(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5
): (t1: T1) => T5;
export function pipe<T1, T2, T3, T4, T5, T6>(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6
): (t1: T1) => T6;
export function pipe<T1, T2, T3, T4, T5, T6, T7>(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7
): (t1: T1) => T7;
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8>(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8
): (t1: T1) => T8;
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8,
    fn8: (t8: T8) => T9
): (t1: T1) => T9;
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8,
    fn8: (t8: T8) => T9,
    fn9: (t9: T9) => T10
): (t1: T1) => T10;
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8,
    fn8: (t8: T8) => T9,
    fn9: (t9: T9) => T10,
    fn10: (t10: T10) => T11
): (t1: T1) => T11;
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8,
    fn8: (t8: T8) => T9,
    fn9: (t9: T9) => T10,
    fn10: (t10: T10) => T11,
    fn11: (t11: T11) => T12
): (t1: T1) => T12;
export function pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8,
    fn8: (t8: T8) => T9,
    fn9: (t9: T9) => T10,
    fn10: (t10: T10) => T11,
    fn11: (t11: T11) => T12,
    fn12: (t12: T12) => T13
): (t1: T1) => T13;
export function pipe(
    fn1: Function,
    fn2?: Function,
    fn3?: Function,
    fn4?: Function,
    fn5?: Function,
    fn6?: Function,
    fn7?: Function,
    fn8?: Function,
    fn9?: Function,
    fn10?: Function,
    fn11?: Function,
    fn12?: Function
): Function {
    const args = arguments;
    return function (argument: unknown): unknown {
        switch(args.length) {
            case 1:
                return fn1(argument);
            case 2:
                return fn2!(fn1(argument));
            case 3:
                return fn3!(fn2!(fn1(argument)));
            case 4:
                return fn4!(fn3!(fn2!(fn1(argument))));
            case 5:
                return fn5!(fn4!(fn3!(fn2!(fn1(argument)))));
            case 6:
                return fn6!(fn5!(fn4!(fn3!(fn2!(fn1(argument))))));
            case 7:
                return fn7!(fn6!(fn5!(fn4!(fn3!(fn2!(fn1(argument)))))));
            case 8:
                return fn8!(fn7!(fn6!(fn5!(fn4!(fn3!(fn2!(fn1(argument))))))));
            case 9:
                return fn9!(fn8!(fn7!(fn6!(fn5!(fn4!(fn3!(fn2!(fn1(argument)))))))));
            case 10:
                return fn10!(fn9!(fn8!(fn7!(fn6!(fn5!(fn4!(fn3!(fn2!(fn1(argument))))))))));
            case 11:
                return fn11!(fn10!(fn9!(fn8!(fn7!(fn6!(fn5!(fn4!(fn3!(fn2!(fn1(argument)))))))))));
            case 12:
                return fn12!(fn11!(fn10!(fn9!(fn8!(fn7!(fn6!(fn5!(fn4!(fn3!(fn2!(fn1(argument))))))))))));
            default:
                throw Error('Unexpected number of arguments to `pipe`.');
        }
    };
}

pipe((x: number) => x + 1, x => 5, x => 'hi', x => ({ something: 5 }));

const isFunctor = <F>(x: unknown): x is Functor<F> =>
    Object.prototype.hasOwnProperty.call(x, 'map')
    && typeof (x as any).map === 'function';

const isApply = <F>(x: unknown): x is Apply<F> =>
    Object.prototype.hasOwnProperty.call(x, 'ap')
    && typeof (x as any).ap === 'function';

const isBindable = <F>(x: unknown): x is Bindable<F> =>
    Object.prototype.hasOwnProperty.call(x, 'bind')
    && typeof (x as any).bind === 'function';

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
        const map: PipeableFunctor<F>['map'] = f => fa =>
            I.map(fa, f);
        r.map = map;
    }

    if (isApply<F>(I)) {
        const ap: PipeableApply<F>['ap'] = fa => fab =>
            I.ap(fab, fa);

        const apFirst: PipeableApply<F>['apFirst'] = fb => fa =>
            I.ap(I.map(fa, a => () => a), fb);

        const apSecond: PipeableApply<F>['apSecond'] = <B>(fb: HKT<F, B>) => fa =>
            I.ap(I.map(fa, () => (b: B) => b), fb);

        r.ap = ap;
        r.apFirst = apFirst;
        r.apSecond = apSecond;
    }

    if (isBindable<F>(I)) {
        const bind: PipeableBindable<F>['bind'] = f => fa =>
            I.bind(fa, f);

        const bindFirst: PipeableBindable<F>['bindFirst'] = f => fa =>
            I.bind(fa, a => I.map(f(a), () => a));

        const flatten: PipeableBindable<F>['flatten'] = mma =>
            I.bind(mma, a => a);

        r.bind = bind;
        r.bindFirst = bindFirst;
        r.flatten = flatten;
    }

    return r;
}
