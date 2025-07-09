import {
    FC, FormEvent, useState, MouseEvent,
} from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import { HBlock, VBlock } from 'shared/ui/FlexBlock';
import { Form } from 'react-aria-components';
import { FieldInput } from 'shared/ui/FieldInput';
import { Button } from 'shared/ui/Button';
import { userSlice } from 'entities/User';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { doMockRegister } from 'shared/lib/mockApi/mockRegister';
import { FocusableElement } from '@react-types/shared';
import { useSelector } from 'react-redux';
import { IStateSchema } from 'app/providers/StoreProvider';
import { TextM } from 'shared/ui/Text';
import cls from './AuthForm.module.scss';
import { authMe } from '../../model/services/authMe/authMe';

export interface IAuthFormProps {
    className?: string
    // children?: React.ReactNode
}

export const AuthForm: FC<IAuthFormProps> = (props) => {
    const { className } = props;
    const [username, setUsername] = useState<string>(() => (__IS_DEV__ ? 'admin' : ''));
    const [password, setPassword] = useState<string>(() => (__IS_DEV__ ? 'admin' : ''));

    const dispatch = useAppDispatch();
    const error = useSelector((state: IStateSchema) => state.loginForm?.error || '');

    const doHandleRegister = async (e: MouseEvent<FocusableElement>) => {
        e.preventDefault();

        if (username.length === 0 || password.length === 0) {
            window.alert('Заполните все поля');
            return;
        }
        // console.log('register');

        const result = doMockRegister({ username, password });

        // console.log('result', result);

        if (result && result.token.length > 0) {
            dispatch(userSlice.actions.setAuthData({ username, session_id: result.token }));
        }
    };

    const doHandleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log('submit');

        const result = await dispatch(authMe({ username, password }));

        // console.log('result', result);

        if (result.meta.requestStatus === 'fulfilled' && result.payload) {
            dispatch(userSlice.actions.setAuthData({ username, session_id: result.payload }));
        }
    };

    return (
        <Form onSubmit={doHandleLogin} className={cn(cls.AuthForm, {}, [className])}>
            <VBlock gap="8">
                <FieldInput label="Логин" value={username} onChange={setUsername} />
                <FieldInput label="Пароль" value={password} onChange={setPassword} type="password" />
                <HBlock justify="end" max gap="8">
                    <Button type="button" onClick={doHandleRegister}>Регистрация</Button>
                    <Button type="submit">Войти</Button>
                </HBlock>
                {error && <TextM text={error} /> }
            </VBlock>
        </Form>
    );
};

export default AuthForm;
