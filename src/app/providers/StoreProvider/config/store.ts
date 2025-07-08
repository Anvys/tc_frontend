import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { Reducer } from 'redux';
import { commonInstance } from 'shared/config/api/axios';
import { userSlice } from 'entities/User';
import { IStateSchema, ThunkExtraArg } from './IStateSchema';
import { createReducerManager } from './reducerManager';

export let __STORE__: TStore;
export function createReduxStore(
    initialState?: IStateSchema,
    asyncReducers?: ReducersMapObject<IStateSchema>,
    // navigate?: (to: To, options?: NavigateOptions) => void,
) {
    const rootReducers: ReducersMapObject<IStateSchema> = {
        ...asyncReducers,
        user: userSlice.reducer,
    };
    // console.log('Creating store');
    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: commonInstance,
        // navigate,
    };
    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<IStateSchema>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
            thunk: {
                extraArgument: extraArg,
            },
        }),
        // .concat(rtkApi.middleware),
    });
    __STORE__ = store;

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}
type TStore = ReturnType<typeof createReduxStore>
// export type TAppDispatch = typeof store.dispatch
export type TAppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
