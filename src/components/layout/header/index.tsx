import { Dropdown } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logoutUser } from '@/redux/slices/authSlice';
import { setCurrentPlant } from '@/redux/slices/plantSlice';
import { RootState } from '@/redux/store';
import { PLANT_SERVICES } from '@/services/plantServices';
import { Select } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = ({ hideAvatar }: { hideAvatar: boolean }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state: RootState) => state.auth?.user);
  const { currentPlant } = useAppSelector((state) => state.plantRegistration);
  const [plantsData, setPlantsData] = useState([]);
  const user = useAppSelector((state) => state.auth.user);
  // const options = [
  //   {
  //     key: 'plants',
  //     text: 'Plants',
  //     className: 'w-[57px]',
  //   },
  //   {
  //     text: 'Shop',
  //     key: 'shop',
  //     className: 'w-[48px]',
  //   },
  //   {
  //     text: 'Machine Line',
  //     key: 'machineline',
  //     className: 'w-[121px]',
  //   },
  //   {
  //     text: 'Machine Type',
  //     key: 'machinetype',
  //     className: 'w-[127px]',
  //   },
  // ];

  const userOptions = ['Logout'];

  const logoutBtn = () => {
    toast.success('Logged out');

    setTimeout(() => {
      dispatch(logoutUser());
    }, 1000);
  };

  const fetchPlantsbyUserId = async () => {
    const res = await PLANT_SERVICES.getAllPlantByUserId(loggedUser?.userId);
    const formattedData = res?.message.map((el: any) => {
      return {
        value: el.plantId,
        label: el.plantName,
      };
    });
    dispatch(setCurrentPlant(formattedData?.[0].value));
    setPlantsData(formattedData);
  };

  useEffect(() => {
    fetchPlantsbyUserId();
  }, []);

  const handlePlantChange = (plantId: string) => {
    dispatch(setCurrentPlant(plantId));
    navigate('/plant');
  };

  return (
    <div className="flex">
      <div className="w-full flex justify-center">
        {loggedUser?.role !== 'USER' ? (
          <div className="flex gap-3 w-full items-center justify-start">
            <span className="text-[#8B9298]">Current plant</span>
            <span className="text-[#8B9298]">{`>`}</span>
            <Select
              size="small"
              onChange={handlePlantChange}
              value={currentPlant}
              style={{ width: 200 }}
              options={plantsData}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="flex items-center justify-end gap-5">
        <div
          className={` ${classNames({ invisible: hideAvatar })} flex items-center gap-[10px] w-[138px] justify-end `}
        >
          <div className="bg-[#492CE1] text-white p-3 text-center w-[40px] h-[40px] rounded-[30px] flex items-center justify-center">
            <span className="text-center w-[40px]">{user?.name ? user?.name.charAt(0) : 'U'}</span>
          </div>
          <Dropdown
            type="secondary"
            placeholder="User type"
            value={user?.name}
            className="border-none text-center"
            inputClassName="placeholder:text-[#444444] placeholder:font-medium w-[50px] text-ellipsis overflow-hidden whitespace-nowrap"
            options={userOptions}
            handleChange={logoutBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
