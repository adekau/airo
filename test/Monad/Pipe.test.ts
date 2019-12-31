import { Just, map, of } from '../../src/Monad/Maybe';
import { pipe } from '../../src/Monad/Pipeable';

const incrX = (x: number) => (v: number) => v + x;
const decrX = (x: number) => (v: number) => v - x;
const stringify = (v: number) => v.toString();
const exclaim = (v: string) => v + '!';

describe('Pipe', () => {
    it('simple pipe', () => {
        const mb = pipe(
            5,
            incrX(5),
            decrX(2),
            stringify,
            exclaim
        );
        expect(mb).toBe('8!');
    });

    it('monad pipe', () => {
        const mb = pipe(
            4,
            of(),
            map(incrX(5))
        );
        expect(mb).toEqual(Just(9));
    });

    it('throws error with 0 args', (done) => {
        try {
            expect((pipe as any)());
        } catch {
            done();
            return;
        }
        fail('Should not execute pipe');
    });
});
