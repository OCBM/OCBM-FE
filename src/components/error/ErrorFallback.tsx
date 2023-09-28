import Layout from 'components/layout';

function ErrorFallback() {
  return (
    <Layout>
      <div className="h-[100vh] flex items-center justify-center">
        <h2 className="text-black text-[20px]">Something went wrong</h2>
      </div>
    </Layout>
  );
}
export default ErrorFallback;
