import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import GlobalErrorBoundary from './components/error';
import { ProtectedRoute, PublicRoutes } from './routes';
import { Login } from './pages';
import { Layout } from './components';
import { SITEMAP } from './utils/sitemap';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Addusers from './pages/AddUsers';

function App() {
  return (
    <div>
      <GlobalErrorBoundary>
        <div>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
          />
          <PublicRoutes>
            <Route
              path={SITEMAP.base.index}
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
            </Route>
            <Route path={'/users/add'} element={<Addusers />} />
            <Route path={SITEMAP.auth.index} element={<Login />} />
            <Route path={SITEMAP.notFound} element={<h1>Not found</h1>} />
          </PublicRoutes>
        </div>
      </GlobalErrorBoundary>
    </div>
  );
}
export default App;
