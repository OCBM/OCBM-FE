import { Route } from 'react-router-dom';
import Home from './pages/Home';
import GlobalErrorBoundary from './components/error';
import { ProtectedRoute, PublicRoutes } from './routes';
import { Login } from './pages';
import { Layout } from './components';
import './App.css';

function App() {
  return (
    <div>
      <GlobalErrorBoundary>
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
          <Route path="*" element={<h1>Not found</h1>} />
        </PublicRoutes>
      </GlobalErrorBoundary>
    </div>
  );
}
export default App;
