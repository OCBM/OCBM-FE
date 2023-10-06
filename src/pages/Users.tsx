import { useBreadcrumbs } from '@/hooks';
import { Breadcrumbs, Button } from '@/components';
import { useNavigate } from 'react-router-dom';

function Users() {
  const list = useBreadcrumbs();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-row justify-between items-center mt-7">
        <Breadcrumbs className="pb-0" crumbs={['home', ...list]} />
        <Button
          onClick={() => {
            navigate('/userdetails/adduser');
          }}
          label="Create User"
        />
      </div>
    </>
  );
}
export default Users;
