import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalAuthData, removeLocalAuthData, setLocalAuthData } from 'shared/lib/localstorage/getLocalAuthData';
import { IUser, IUserSchema } from '../types/IUser';

const initialState: IUserSchema = {
    authData: undefined,
    test: 'asd',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        checkLocalStorage: (state) => {
            const localData = getLocalAuthData();
            if (localData && localData.sid) {
                state.authData = { username: localData.user || '?', session_id: localData.sid || '' };
            }
        },
        setAuthData: (state, action: PayloadAction<IUser>) => {
            console.log('setting auth data', action.payload);
            state.authData = action.payload;
            setLocalAuthData(action.payload.username, action.payload.session_id);
        },
        logout: (state) => {
            // console.log('logout');
            state.authData = undefined;
            removeLocalAuthData();
            // localStorage.removeItem(LOCAL_STORAGE_USER_DATA_KEY);
            // localStorage.removeItem(LOCAL_STORAGE_AUTH_DATA_KEY);
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(authMe.fulfilled, (state, action) => {
        //     console.log('Extra', state.authData, action.payload);
        //     // setLocalAuthData(authData.user, res.data.session_id);
        // });
    },
});

// // Action creators are generated for each case reducer function
// export const { actions: userActions } = userSlice;
// export const { reducer: userReducer } = userSlice;
