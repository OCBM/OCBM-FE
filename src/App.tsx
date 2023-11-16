import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import GlobalErrorBoundary from './components/error';
import { ProtectedRoute, PublicRoutes } from './routes';
import { Layout } from './components';
import { SITEMAP } from './utils/sitemap';
import { Login, Plant, UsersList } from './pages';
import Addusers from './pages/users/AddUsers';
import Mastery from './pages/mastery';
import Machines from './pages/machines';
import MachineInfo from './pages/machines/machineInfo';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <GlobalErrorBoundary>
      <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
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
            <Route path={SITEMAP.mastery.index} element={<Mastery />} />
            <Route path={SITEMAP.users.addUser} element={<Addusers />} />
            <Route path={SITEMAP.users.index} element={<UsersList />} />
            <Route path={SITEMAP.plant.index} element={<Plant />} />
            <Route path={SITEMAP.machines.index} element={<Machines />} />
            <Route path={SITEMAP.machinesbyId.index} element={<MachineInfo />} />
            <Route index element={<Home />} />
            <Route path={SITEMAP.notFound} element={<h1>Not found</h1>} />
          </Route>
          <Route path={SITEMAP.auth.index} element={<Login />} />
        </PublicRoutes>
      </>
    </GlobalErrorBoundary>
  );
}
export default App;
