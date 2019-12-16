import { Func, apply } from './Func';
import { Prod, snd } from './Prod';

import { identity } from './Category';

const something = <A, B>(v: Func<A, B>) => (callback: Func<Func<A, B>, B>) => apply(callback, v);
// const something2 = something(func((x: number) => x * x))(func(z => z.));

export type Cont<A, B> = {
    fn: Func<A, Prod<A, B>>;

};

export const cont = <A, B>(c: Func<A, B>): Cont<A, B> => ({
    fn: identity<A>().times<B>(c),

    bind: function <C>(this: Cont<A, B>, fn: Func<A, Cont<C, B>>): Cont<C, B> {
        this.fn.then(snd())
    }
});
