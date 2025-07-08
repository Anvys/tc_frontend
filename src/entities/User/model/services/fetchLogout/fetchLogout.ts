// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ThunkConfig } from 'app/providers/StoreProvider';
// import { getSimpleHeader } from 'shared/lib/api/getHeaders';
//
// export const fetchLogout = createAsyncThunk<
//     void,
//     void,
//     ThunkConfig<string>
// >(
//     'loginFormSlice/authMe',
//     async (_, thunkApi) => {
//         try {
//             const { api } = thunkApi.extra;
//
//             const response = await api.get<string>(
//                 '/logout',
//                 // getSimpleHeader(thunkApi.getState().user.authData?.session_id || ''),
//             );
//
//             if (response.status !== 200) {
//                 throw new Error(typeof response.data === 'string' ? response.data : undefined);
//             }
//         } catch (e: any) {
//             // __IS_DEV__ && console.log('ERR: fetchConfig', e);
//             return thunkApi.rejectWithValue(('message' in e) ? e.message : 'unknown error');
//         }
//     },
// );
