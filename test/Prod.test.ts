import { Prod, times } from '../src/Prod';
import { Func, func } from '../src/Func';

test('prod', () => {
    const incr: Func<number, number> = func(x => x + 1);
    const isEven: Func<number, boolean> = func(x => !(x % 2));
    const f: Func<number, Prod<number, boolean>> = incr.times(isEven);
    expect(f.f(5)).toStrictEqual({ fst: 6, snd: false });
});
