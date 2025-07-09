import { IDBUser, lsMockAuthKey } from 'shared/lib/mockApi/mockAuth';

interface IAuthMeInput {
    username: string
    password: string
}

const mockGenerateToken = (payload: IAuthMeInput) => `sometokenfor${payload.username}-${payload.password}`;

export const doMockRegister = (payload: IAuthMeInput): null | IDBUser => {
    const localItem = localStorage.getItem(lsMockAuthKey);
    const currentDataBase = localItem ? JSON.parse(localItem) : null;

    /**
     * Если пользователя нет в базе
     */
    if (currentDataBase[payload.username] === undefined) {
        currentDataBase[payload.username] = {
            password: payload.password,
            token: mockGenerateToken(payload),
        };
        localStorage.setItem(lsMockAuthKey, JSON.stringify(currentDataBase));
        return currentDataBase[payload.username];
    }
    window.alert('Имя пользователя занято');

    return null;
};
