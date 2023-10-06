import { Route } from 'react-router-dom';
import Home from './pages/Home';
import GlobalErrorBoundary from './components/error';
import { ProtectedRoute, PublicRoutes } from './routes';
import { Login } from './pages';
import { Layout } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Addusers from './pages/AddUsers';
import Users from './pages/Users';

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
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <PublicRoutes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/userdetails/adduser" element={<Addusers />} />
            <Route path="/userdetails" element={<Users />} />
            <Route path="*" element={<h1>Not found</h1>} />
          </PublicRoutes>
        </div>
      </GlobalErrorBoundary>
    </div>
  );
}
export default App;
