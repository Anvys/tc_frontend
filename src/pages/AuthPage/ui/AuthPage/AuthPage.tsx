import { FC } from 'react';
import { cn } from 'shared/lib/classNames/classNames';
import { LoginForm } from 'features/Auth';
import { Page } from 'shared/ui/Page';
import { VBlock } from 'shared/ui/FlexBlock';

export const AuthPage: FC = () => (
    <Page className={cn('', {}, [])}>
        <VBlock max hmax justify="center" align="center">
            <LoginForm />
        </VBlock>
    </Page>
);

export default AuthPage;
