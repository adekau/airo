export type HKT<TId, V> = {
    readonly _HKT: TId;
    readonly _val: V;
};

/**
 * Valid HKT Ids are merged into this (https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
 * from module declarations in monad files.
 * @example
 * ```
 * declare module './HKT' {
 *     interface HKTToKind<A> {
 *         SomeMonadName: SomeMonadName<A>
 *     }
 * };
 * ```
 */
export interface HKTToKind<A> {}
export type HKTS = keyof HKTToKind<any>;
export type Kind<TId extends HKTS, A> = TId extends HKTS ? HKTToKind<A>[TId] : any;
