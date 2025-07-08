import {
    EnhancedStore, Reducer, ReducersMapObject, UnknownAction,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { IUserSchema } from 'entities/User';
import { ILoginFormSchema } from 'features/Auth';
import { NavigateOptions } from 'react-router';
import { To } from 'react-router-dom';

/**
 * OLD REDUX
 */
declare const $CombinedState: unique symbol;
interface EmptyObject {
    readonly [$CombinedState]?: undefined
}
export type CombinedState<S> = EmptyObject & S

// =====================

export interface IStateSchema {
    user: IUserSchema;

    // Async reducers
    loginForm?: ILoginFormSchema;
}

export type StateSchemaKey = keyof IStateSchema;
export type StateAsyncSchemaKey = Exclude<(keyof IStateSchema), 'user' | 'iris'>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<IStateSchema>;
    reduce: (state: IStateSchema, action: UnknownAction) => CombinedState<IStateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<IStateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: IStateSchema;
}
