import { Func, apply, func } from './Func';
import { Prod, snd } from './Prod';

import { identity } from './Category';

export type ContOverloads = {
    <A, B>(c: Func<A, B>): Cont<A, B>;
    <A, B>(c: (_: A) => B): Cont<A, B>;
}

export type Cont<A, B> = {
    fn: Func<A, Prod<A, B>>;
    bind: <C>(this: Cont<A, B>, c: Cont<B, C>) => Cont<A, C>;
    run: (this: Cont<A, B>, val: A) => B;
};

export const cont: ContOverloads = <A, B>(c: any): Cont<A, B> => ({
    // id_A * (A -> B) = A * B
    fn: typeof c === 'function' ? identity<A>().times<B>(func(c)) : identity<A>().times<B>(c),

    // To be correct, this probably needs to be A => Cont<B, C>.
    bind: function <C>(this: Cont<A, B>, c: Cont<B, C>): Cont<A, C> {
        return cont(
            this.fn
                .then(snd())
                .then(c.fn
                    .then(snd())
                )
        );
    },

    // (A -> B) -> B
    run: function(this: Cont<A, B>, val: A): B {
        return apply(this.fn.then(snd()), val);
    }
});

export const contOf = <B>(val: B): Cont<B, B> => cont(_ => val);
