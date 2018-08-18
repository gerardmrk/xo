declare module "AppTypes";

declare module "unchanged" {
  type PathSelector = string[] | number[] | number | string;

  export interface GetFn {
    <T>(path: PathSelector, target: T): T;
  }

  export interface GetOrFn {
    <T, F = any>(fallback: F, path: PathSelector, target: T): T;
  }

  export interface SetFn {
    <T, V = any>(path: PathSelector, value: V, target: T): T;
  }

  export interface RemoveFn {
    <T>(path: PathSelector, target: T): T;
  }

  export interface AddFn {
    <T, V = any>(path: PathSelector | null, value: V, target: T): T;
  }

  export interface MergeFn {
    <T, V = any>(path: PathSelector | null, value: V, target: T): T;
  }

  export const get: GetFn;
  export const getOr: GetOrFn;
  export const set: SetFn;
  export const remove: RemoveFn;
  export const add: AddFn;
  export const merge: MergeFn;
}
