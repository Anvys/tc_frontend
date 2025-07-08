import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { doMockAuth } from 'shared/lib/mockApi/mockAuth';

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
                throw new Error('failed auth');
            }

            return response;
        } catch (e: any) {
            // __IS_DEV__ && console.log('ERR: fetchConfig', e);
            return thunkApi.rejectWithValue(('message' in e) ? e.message : 'unknown error');
        }
    },
);
