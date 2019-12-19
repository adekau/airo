import { cont } from '../src/Continuation2';

test('cont2', () => {
    const r = cont((a: number) => a*a)
        .bind(cont(x => x.toString()))
        .bind(cont(y => y.length));
    expect(r.run(15)).toBe(3);
});
