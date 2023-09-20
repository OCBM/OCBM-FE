// import { Route } from 'react-router-dom';
// import Home from './pages/Home';
// import { PublicRoutes } from './routes';
// import './App.css';
import { useState } from 'react';

import FileUploader from 'components/fileuploader';

function App() {
  const [status, setStatus] = useState('upload');

  const handleFile = (event) => {
    setStatus('success');
  };

  return (
    <div>
      {/* <PublicRoutes> */}
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="*" element={<h1>Not found</h1>} /> */}
      {/* </PublicRoutes> */}
      <FileUploader handleFile={handleFile} uploadStatus={status} />
    </div>
  );
}
export default App;
