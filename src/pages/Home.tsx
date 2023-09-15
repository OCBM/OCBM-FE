// import { useBreadcrumbs } from '@/hooks';
// import Breadcrumbs from '../components/breadcrumbs';
// import Layout from '../components/layout';
import FileUploader from '@/components/fileuploader';
import { useState } from 'react';

function Home() {
  const [status, setStatus] = useState('upload');
  // const list = useBreadcrumbs();
  const handleFiles = (event) => {
    console.log(event, 'file');
    if (event?.length > 0 || event?.length > 0) setStatus('success');
  };
  return (
    // <Layout>
    <div>
      {/* <h2>Hello world</h2> */}
      {/* <Breadcrumbs crumbs={['home', ...list]} /> */}
      <FileUploader handleChange={handleFiles} fileFormat=".xlsx" multiple status={status} />
    </div>
    // </Layout>
  );
}
export default Home;
