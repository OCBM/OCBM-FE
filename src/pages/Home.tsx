import useBreadcrumbs from '@/hooks/useBreadcrumbs';
import Breadcrumbs from '../components/breadcrumbs';
import Layout from '../components/layout';

function Home() {
  const list = useBreadcrumbs();
  return (
    <Layout>
      <div>
        <h2>Hello world</h2>
        <Breadcrumbs crumbs={['home', ...list]} />
      </div>
    </Layout>
  );
}
export default Home;
