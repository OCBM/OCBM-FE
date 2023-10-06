import { Breadcrumbs } from '@/components';
import { useBreadcrumbs } from '@/hooks';

function Home() {
  const list = useBreadcrumbs();

  return (
    <section>
      <h2>Hello world</h2>
      <Breadcrumbs crumbs={['home', ...list]} />
    </section>
  );
}
export default Home;
