import axios from 'axios';
import { getLocalAuthData } from 'shared/lib/localstorage/getLocalAuthData';
import AxiosMockAdapter from 'axios-mock-adapter';

const isDev = __IS_DEV__;// process.env.NODE_ENV === 'development';
const HOST = 'localhost';
const PORT = 3124;

export const HOST_URL = !isDev ? '' : `http://${HOST}:${PORT}`;

export const commonInstance = axios.create({
    withCredentials: false,
    baseURL: `${HOST_URL}`,
});

commonInstance.interceptors.request.use((config) => {
    if (config.url !== '/api/auth' && config.url !== '/auth' && config.headers) {
        const authData = getLocalAuthData();
        config.headers.Authorization = `Bearer ${authData?.sid}`;
    }

    return config;
});

/**
 * Мокаем аксиос, т.к. бэка тут не будет
 */

// const mock = new AxiosMockAdapter(commonInstance);
// mock.onPost("/api/auth/login", { username: 'admin', password: 'admin' }).reply(200, {});
// mock.onPost("", { username: 'admin', password: 'admin' }).reply(400, {});

/**
 * =============================
 */
