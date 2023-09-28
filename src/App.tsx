import { Route } from 'react-router-dom';
import Home from './pages/Home';
import { PublicRoutes } from './routes';
import './App.css';
import GlobalErrorBoundary from 'components/error';

function App() {
  return (
    <div>
      <GlobalErrorBoundary>
        <PublicRoutes>
          <Route path="/homes" element={<Home />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </PublicRoutes>
      </GlobalErrorBoundary>
    </div>
  );
}
export default App;
