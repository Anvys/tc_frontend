import { LOCAL_STORAGE_AUTH_DATA_KEY } from 'shared/const/localStorage';

interface ILocalData {
    user: string
    sid: string
}
export const getLocalAuthData = () => JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_AUTH_DATA_KEY) || 'null',
) as ILocalData | null;
export const setLocalAuthData = (user: string, sid: string) => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_DATA_KEY, JSON.stringify({ user, sid }));
};
export const removeLocalAuthData = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_DATA_KEY);
};
