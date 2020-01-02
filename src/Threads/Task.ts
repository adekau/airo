import { MonadF1 } from "../Monad/Monad";

declare module '../Monad/HKT' {
    interface HKTToKindF<A> {
        Task: Task<A>
    }
};

const HKTId = 'Task';
type HKTId = typeof HKTId;

export interface ITaskOptions<T> {
    /**
     * Task id, used for keeping track of tasks in a thread pool.
     */
    id: number;

    /**
     * Function to execute when `Task.run` is called.
     */
    func: T | string;
};

/**
 * A deferred computation that can be run asynchronously or in parallel on a thread.
 * @param opts The options to use on Task creation.
 */
export class Task<T extends (...args: any[]) => any> implements ITaskOptions<T> {
    private _promise: Promise<ReturnType<T>>;
    /**
     * Completes the task with a value.
     * @param value the value to complete the task with.
     */
    public resolve: (value?: ReturnType<T> | PromiseLike<ReturnType<T>> | undefined) => void;
    /**
     * Fails the task with a reason.
     * @param reason an explanation of why the task failed.
     */
    public reject: (reason?: unknown) => void;
    public static taskCounter: number = 0;
    public id: number;
    public func: T | string;
    public state: 'todo' | 'running' | 'done' | 'error';
    public startTime: Date | undefined;

    constructor(opts: ITaskOptions<T>) {
        this.id = opts.id;
        this.func = opts.func;
        this._promise = new Promise((resolve, reject) => {
            this.resolve = (value?: ReturnType<T> | PromiseLike<ReturnType<T>> | undefined) => {
                this.state = 'done';
                resolve(value);
            };

            this.reject = (reason?: unknown) => {
                this.state = 'error';
                reject(reason);
            };
        });
        this.state = 'todo';
        this.startTime = undefined;
    }

    public static getNextId(): number {
        return ++Task.taskCounter;
    }

    /**
     * Runs the task.
     * @param args Arguments to run the task's function with.
     * @returns Promise<T>
     */
    public run(...args: Parameters<T>): Promise<T> {
        this.state = 'running';
        this.startTime = new Date();

        try {
            const result = typeof this.func === 'function'
                ? this.func(...args)
                : eval(`(${this.func})`);

            this.state = 'done';
            this.resolve(result);
        } catch (e) {
            this.state = 'error';
            this.reject(e);
        }
        return this.done();
    }

    map<B extends (..._: any[]) => any>(
        this: Task<T>,
        f: (a: T) => B
    ): Task<B> {
        return TaskMonad.map(this, f);
    }

    ap(this: Task<T>, fa: Task<Parameters<T>[0]>): Task<ReturnType<T>> {
        return TaskMonad.ap(this, fa);
    }

    bind<B extends (..._: any[]) => any>(this: Task<T>, f: (a: T) => Task<B>): Task<B> {
        return TaskMonad.bind(this, f);
    }

    /**
     * Returns a promise that completes when the task is done, or fails when the task fails.
     * @returns Promise<T>
     */
    public async done(): Promise<ReturnType<T>> {
        return this._promise
            .then((v: ReturnType<T>) => (this.state = 'done', v))
            .catch((e: any) => {
                this.state = 'error';
                throw e;
            });
    }
};

export const TaskMonad: MonadF1<HKTId> = {
    HKT: HKTId,

    map<A extends (..._: any[]) => any, B extends (..._: any[]) => any>(
        fa: Task<A>,
        f: (a: A) => B
    ): Task<B> {
        const newFunc = f(typeof fa.func === 'function' ? fa.func : eval(`(${fa.func})`));
        return new Task({
            id: fa.id,
            func: newFunc
        });
    },

    // task that wraps a function that takes a function and returns a function
    ap<A extends (..._: any[]) => any, B extends (..._: any[]) => any>(fab: Task<(a: A) => B>, fa: Task<A>): Task<B> {
        let newFn: B;
        if (typeof fab.func === 'function')
            newFn = fab.func(typeof fa.func === 'function' ? fa.func : eval(`(${fa.func})`));
        else
            throw new Error('Task returning a function must not use a string as its `func` property.');
        return new Task({
            id: Task.getNextId(),
            func: newFn
        });
    },

    of<A extends (..._: any[]) => any>(a: A): Task<A> {
        return new Task({
            id: Task.getNextId(),
            func: a
        });
    },

    bind<A extends (..._: any[]) => any, B extends (..._: any[]) => any>(fa: Task<A>, f: (a: A) => Task<B>): Task<B> {
        return f(typeof fa.func === 'function' ? fa.func : eval(`(${fa.func})`));
    }
}
