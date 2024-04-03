// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Route, Routes, Link } from 'react-router-dom';
import { DashboardPage } from './pages/Dashboard';
import { Menu, MenuItem } from '@ems/common-ui';

export function App() {
  return (
    <div>
      <div className="bg-slate-900 text-white py-2">
        <div className="container mx-auto">
          <div role="navigation">
            <Menu>
              <MenuItem>
                <Link to="/">Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/page-2">Page 2</Link>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
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
  );
}

export default App;
