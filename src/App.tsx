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
import ManualEntry from './pages/mastery/ManualEntry';
import NewSetStandards from './pages/setStandards/newSetStandards';
import SetStandard from './pages/setStandards';
import Reports from './pages/reports';
import ElementInfo from './pages/machines/ElementInfo';
import SensorChart from './pages/machines/SensorChart';

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
            <Route path={SITEMAP.reports.index} element={<Reports />} />
            <Route path={SITEMAP.mastery.manualEntry} element={<ManualEntry />} />
            <Route path={SITEMAP.users.addUser} element={<Addusers />} />
            <Route path={SITEMAP.users.index} element={<UsersList />} />
            <Route path={SITEMAP.plant.index} element={<Plant />} />
            <Route path={SITEMAP.machines.index} element={<Machines />} />
            <Route path={SITEMAP.machines.machinesbyId} element={<MachineInfo />} />
            <Route path={SITEMAP.machines.elementsById} element={<ElementInfo />} />
            <Route path={SITEMAP.machines.sensorById} element={<SensorChart />} />
            <Route path={SITEMAP.setStandards.NewSetStandards} element={<NewSetStandards />} />
            <Route path={SITEMAP.setStandards.index} element={<SetStandard />} />
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
