import { MainLayout } from 'shared/layouts/MainLayout/MainLayout';
import { NavBar } from 'widgets/NavBar';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { userSlice } from 'entities/User';

export function App() {
    const dispatch = useAppDispatch();

    /**
     * Проверяем локальное хранилище на наличие авторизации
     */
    useEffect(() => {
        dispatch(userSlice.actions.checkLocalStorage());
    }, []);

    return (
        <MainLayout header={<NavBar />} />
    );
}
