import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalAuthData } from 'shared/lib/localstorage/getLocalAuthData';
import { authMe } from '../services/authMe/authMe';
import { ILoginFormSchema } from '../types/loginFormSchema';

// const localUserAuthData = getLocalAuthData();
const initialState: ILoginFormSchema = {
    isLoading: false,
    username: getLocalAuthData()?.user || (__IS_DEV__ ? 'admin' : ''),
    password: (__IS_DEV__ ? 'admin' : ''),
    error: '',
};

export const loginFormSlice = createSlice({
    name: 'loginForm',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authMe.pending, (state) => {
                state.error = '';
                state.isLoading = true;
                // console.log('thunk1');
            })
            .addCase(authMe.fulfilled, (state) => {
                state.isLoading = false;
                state.error = '';
                // console.log('thunk2');
            })
            .addCase(authMe.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                // console.log('thunk', action);
            });
    },
});
