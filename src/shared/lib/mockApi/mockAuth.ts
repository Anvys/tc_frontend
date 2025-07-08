export const lsMockAuthKey = 'LS_MOCK_AUTH_KEY';

interface IAuthMeInput {
    username: string
    password: string
}

/**
 * Имитация авторизации
 * @param payload
 */
export const doMockAuth = (payload: IAuthMeInput) => {
    const localItem = localStorage.getItem(lsMockAuthKey);
    const currentDataBase = localItem ? (JSON.parse(localItem) as IUserDataBase) : null;

    if (currentDataBase) {
        const userdata = currentDataBase[payload.username];

        /**
         * Имитируем авторизация, проверяем пароль, валидность токена и если все норм возвращаем токен,
         * если фейл, то false
         */
        return (
            userdata
            && userdata.password === payload.password
            && userdata.token.includes(`${payload.username}-${payload.password}`)
            && userdata.token
        );
    }

    return false;
};

/**
 * Типа БД, хранит гдето у себя токен и если авторизация норм, то отдает его
 */
export interface IDBUser{
    password: string
    token: string
}
export type IUserDataBase = Record<string, IDBUser>

/**
 * Инициализируем базу при перезапуске странички если там пусто
 */

const initDatabase = () => {
    const localItem = localStorage.getItem(lsMockAuthKey);
    const currentDataBase = localItem ? JSON.parse(localItem) : null;

    /**
     * Если бд пустая, то заполняем дефолтом (admin/admin)
     */
    if (currentDataBase === null || currentDataBase.admin === undefined) {
        const newDB = {
            admin: { password: 'admin', token: 'sometokenforadmin-admin' },
        };

        localStorage.setItem(lsMockAuthKey, JSON.stringify(newDB));
    }
};

initDatabase();
