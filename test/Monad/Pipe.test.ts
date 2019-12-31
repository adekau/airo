import { Just, map, of } from '../../src/Monad/Maybe';
import { pipe } from '../../src/Monad/Pipeable';

const incrX = (x: number) => (v: number) => v + x;
const decrX = (x: number) => (v: number) => v - x;
const stringify = (v: number) => v.toString();
const exclaim = (v: string) => v + '!';

it('simple pipe', () => {
    const newFn = pipe(
        incrX(5),
        decrX(2),
        stringify,
        exclaim
    );
    expect(newFn(5)).toBe('8!');
});

it('monad pipe', () => {
    const newFn = pipe(
        of<number>(),
        map(incrX(5))
    );
    expect(newFn(4)).toEqual(Just(9));
});
