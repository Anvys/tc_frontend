import { FC, lazy } from 'react';
import { IAuthFormProps } from './AuthForm';

export const LoginFormAsync = lazy <FC<IAuthFormProps>>(() => import('./AuthForm'));
