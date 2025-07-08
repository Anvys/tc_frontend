import ReactDOM from 'react-dom/client';
import { App } from 'app/App';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
import 'app/styles/index.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <ThemeProvider>
        <ErrorBoundary>
            <BrowserRouter>
                <StoreProvider>
                    <App />
                </StoreProvider>
            </BrowserRouter>
        </ErrorBoundary>
    </ThemeProvider>,
);

export { useAppDispatch } from 'shared/hooks/useAppDispatch';
