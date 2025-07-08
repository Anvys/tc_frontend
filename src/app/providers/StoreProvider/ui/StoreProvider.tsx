import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { createReduxStore } from '../config/store';
import { IStateSchema } from '../config/IStateSchema';

// eslint-disable-next-line import/no-mutable-exports
export let _STORE_: ReturnType<typeof createReduxStore>;
interface IStoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<IStateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>
}

export const StoreProvider = (props: IStoreProviderProps) => {
    const {
        children,
        initialState,
        asyncReducers,
    } = props;

    // const navigate = undefined;// useNavigate();
    // console.log('Store provider');

    const store = createReduxStore(
        initialState as IStateSchema,
        asyncReducers as ReducersMapObject<IStateSchema>,
        // navigate,
    );

    _STORE_ = store;

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
