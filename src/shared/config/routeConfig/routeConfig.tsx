import { RouteProps } from 'react-router-dom';
import { WeatherDashboard } from 'pages/WeatherPage/ui/WeatherPage/WeatherPage';

export enum AppRoutes {
    AUTH= 'auth',

    WEATHER= 'weather',

    ROOT = 'root',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.AUTH]: '/auth',

    [AppRoutes.WEATHER]: '/WEATHER',

    [AppRoutes.ROOT]: '/',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.AUTH]: {
        path: RoutePath.auth,
        element: <div> MOCK AUTH </div>,
    },

    [AppRoutes.WEATHER]: {
        path: RoutePath.weather,
        element: <WeatherDashboard />,
    },

    [AppRoutes.ROOT]: {
        path: RoutePath.root,
        element: <WeatherDashboard />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <div>not found</div>,
    },
};
