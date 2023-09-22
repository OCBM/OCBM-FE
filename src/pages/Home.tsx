import { useBreadcrumbs } from '@/hooks';
import Breadcrumbs from '../components/breadcrumbs';
import Layout from '../components/layout';

function Home() {
  const list = useBreadcrumbs();

  return (
    <Layout>
      <h2>Hello world</h2>
      <Breadcrumbs crumbs={['home', ...list]} />
    </Layout>
  );
}
export default Home;
