import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { doMockAuth } from 'shared/lib/mockApi/mockAuth';
// import { loginFormSlice } from '../../slice/slice';

interface IAuthMeInput {
    username: string
    password: string
}

interface IAuthMeResponse {
    success: boolean
    token: string
}

export const authMe = createAsyncThunk<
    string | undefined,
    IAuthMeInput,
    ThunkConfig<string>
>(
    'loginFormSlice/authMe',
    async (authData, thunkApi) => {
        try {
            const { api } = thunkApi.extra;

            const response = doMockAuth({ username: authData.username, password: authData.password });
            console.log('response', response);

            if (!response) {
            //     thunkApi.dispatch(loginFormSlice.actions.setError('Ошибка входа'));
                window.alert('Ошибка авторизации');
                throw new Error('failed auth');
            }
            // thunkApi.dispatch(loginFormSlice.actions.setError(''));
            return response;
        } catch (e: any) {
            __IS_DEV__ && console.log('ERR: fetchConfig', e, 'message' in e, e.message);
            return thunkApi.rejectWithValue(('message' in e) ? e.message : 'unknown error');
        }
    },
);
