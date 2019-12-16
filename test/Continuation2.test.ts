import { apply, func } from '../src/Func';

import { cont } from '../src/Continuation2';
import { fst } from '../src/Prod';

test('Keep Arg', () => {
    const result = apply(cont(func((x: number) => x*x)).fn, 5);
    expect(apply(fst(), result)).toBe(5);
});
