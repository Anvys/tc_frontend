import { IStateSchema } from 'app/providers/StoreProvider';

// export const getSessionId = (state: IStateSchema) => state.user.authData?.session_id || '';
export const getUserAuthData = (state: IStateSchema) => state.user.authData;
// export const getUserAuthData2 = (state: IStateSchema) => state.user.test;
