import { useState } from 'react';
import { UploadWarningIcon } from '@/assets/icons';
import { Button, Modal } from '@/components';
import { useAppDispatch } from '@/hooks';
import { logoutUser } from '@/redux/slices/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const logoutBtn = () => {
    toast.success('Logged out');
    setTimeout(() => {
      dispatch(logoutUser());
    }, 1000);
  };
  return (
    <div className="w-full flex justify-between items-center">
      <h1>Header</h1>
      <Button label="Logout" onClick={() => setIsOpen(!isOpen)} />
      <Modal isOpen={isOpen}>
        <div className="flex flex-col items-center justify-center py-[50px] px-[86px]">
          <div className="flex flex-col items-center justify-center">
            <UploadWarningIcon />
            <p className="italic text-2xl font-medium w-[60%] text-center pt-9 pb-10">Are you sure want to logout?</p>
          </div>
          <div className="flex gap-3 w-full">
            <Button onClick={() => setIsOpen(!isOpen)} variant="secondary" label="Cancel" className="w-full" />
            <Button variant="primary" label="Yes" className="w-full" onClick={logoutBtn} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
