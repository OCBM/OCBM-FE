import { Route } from 'react-router-dom';
import Home from './pages/Home';
import { PublicRoutes } from './routes';
import Dropdown from './components/dropdown';

function App() {
  const dataOptions = [
    {
      id: 1,
      text: 'Alert Data',
    },
    {
      id: 2,
      text: 'Warn Data',
    },
  ];
  return (
    <div>
      <PublicRoutes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </PublicRoutes>
      <Dropdown
        options={dataOptions}
        handleChange={function (val: string): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Dropdown
        type="secondary"
        options={dataOptions}
        handleChange={function (val: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
}
export default App;
