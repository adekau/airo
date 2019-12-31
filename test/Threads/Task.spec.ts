import { Task } from "../../src/Threads/Task";

describe('Task', () => {
    describe('constructor', () => {
        it('is defined', () => {
            const t = new Task({
                id: 1,
                func: (x: number) => x * 2
            });
            expect(t.func).toBeDefined();
            expect(t.id).toBe(1);
            expect(t.state).toBe('todo');
            expect(t.startTime).toBeUndefined();
        });
    });

    it('should execute task', async () => {
        const fn = (x: number) => x * 2;
        const t = new Task({
            id: 1,
            func: fn
        });
        expect(await t.run(5)).toBe(10);
        expect(t.state).toBe('done');
    });

    it('should execute async fn', async () => {
        const mult2 = async (x: number) => x * 2;
        const t = new Task({
            id: 1,
            func: mult2
        });
        expect(await t.run(6)).toBe(12);
        expect(t.state).toBe('done');
    });

    it('handles errors', async (done) => {
        const divide5ByX = (x: number) => {
            if (x === 0)
                throw new Error('divide by 0')
            else
                return 5 / x;
        };

        const t = new Task({
            id: 1,
            func: divide5ByX
        });

        t.run(0).then(res => fail(`resolved with ${res}`))
            .catch(() => {
                expect(t.state).toBe('error');
                done();
            });
    });
});
