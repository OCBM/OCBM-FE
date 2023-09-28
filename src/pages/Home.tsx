import { useBreadcrumbs } from '@/hooks';
import Breadcrumbs from '../components/breadcrumbs';
import Layout from '../components/layout';
// import { useEffect } from 'react';

function Home() {
  const list = useBreadcrumbs();
  // useEffect(() => {
  //   throw Error('new error');
  // }, []);
  return (
    <Layout>
      <h2>Hello world</h2>
      <Breadcrumbs crumbs={['home', ...list]} />
    </Layout>
  );
}
export default Home;
