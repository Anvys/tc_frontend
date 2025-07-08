import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { Spinner } from 'shared/ui/Spinner/Spinner';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';

export const AppRouter = () => {
    const authData = useSelector(getUserAuthData);
    return (
        <Routes>
            {
                Object.values(routeConfig).map((v) => (
                    <Route
                        key={v.path}
                        path={v.path}
                        element={(
                            <Suspense fallback={<Spinner />}>
                                <div className="content-page">
                                    {v.element}
                                </div>
                            </Suspense>
                        )}
                    />
                ))
            }
        </Routes>
    );
};

// export const AppRouter = () => <div>routers</div>;
