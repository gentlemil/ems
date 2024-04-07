import { Route, Routes, Link } from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard';
import { Menu, MenuItem } from '@ems/common-ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@fortawesome/fontawesome-free';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { ReviewsPage } from './pages/ReviewsPage';
import { ErrorBoundary } from './components/ErrorBoundary';

library.add(far, fas, fab);

const queryClient = new QueryClient();

export function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <div>
          <div className="bg-slate-900 text-white py-2">
            <div className="container mx-auto py-2">
              <div role="navigation">
                <Menu>
                  <MenuItem>
                    <Link to="/">Home</Link>
                  </MenuItem>

                  <MenuItem>
                    <Link to="/reviews">Reviews</Link>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>

          <div className="flex flex-col h-screen">
            <div className="w-full mx-auto">
              <Routes>
                <Route path="/" element={<DashboardPage />} />

                <Route path="/reviews" element={<ReviewsPage />} />

                <Route
                  path="/page-2"
                  element={
                    <div>
                      <Link to="/">Click here to go back to root page.</Link>
                    </div>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>

        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
