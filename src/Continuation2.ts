import { Func, func, apply } from './Func';

const something = <A, B>(v: Func<A, B>) => (callback: Func<Func<A, B>, B>) => apply(callback, v);
const something2 = something(func((x: number) => x * x))(func(z => z.));
