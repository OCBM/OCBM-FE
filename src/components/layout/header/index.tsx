import { AlertsIcon, BellIcon } from '@/assets/icons';
import { Dropdown } from '@/components';
import { Config } from '@/config';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logoutUser } from '@/redux/slices/authSlice';
import { setAllPlants, setCurrentPlant } from '@/redux/slices/plantSlice';
import { PLANT_SERVICES } from '@/services/plantServices';
import { SENSOR_SERVICES } from '@/services/sensorServices';
import { Select } from 'antd';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import socketIOClient from 'socket.io-client';

const Header = ({ hideAvatar }: { hideAvatar: boolean }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loggedUser = useAppSelector((state) => state.auth?.user);
  const user = useAppSelector((state) => state.auth.user);
  const { allPlants, currentPlant } = useAppSelector((state) => state.plantRegistration);
  const [showOpenNotificationModal, setShowNotificationModal] = useState(false);
  const [sensorIdList, setSensorIdList] = useState([]);
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
    dispatch(setAllPlants([]));
    dispatch(setCurrentPlant(''));
    setTimeout(() => {
      dispatch(logoutUser());
    }, 1000);
  };

  const fetchAllSensors = async () => {
    const res = await SENSOR_SERVICES.getAllSensor();
    setSensorIdList(res);
  };

  useEffect(() => {
    fetchAllSensors();
  }, []);

  const [alertsSocket, setAlertsSocket] = useState<any>(null);
  const [alertsData, setAlertsData] = useState<any>([]);

  useEffect(() => {
    connectToAlertsSocket();
    return () => {
      if (alertsSocket) {
        alertsSocket.disconnect();
        alertsSocket.removeAllListeners();
        setAlertsSocket(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensorIdList]);

  useEffect(() => {
    if (alertsSocket) {
      listenToAlerts();
    }
  }, [alertsSocket]);

  function connectToAlertsSocket() {
    const _socket = socketIOClient(`${Config.OCBM_IOT_SOCKET_URL}/alerts`, {
      rejectUnauthorized: false,
      withCredentials: true,
      path: '/ocbm-iot/socket.io',
      extraHeaders: {
        authorization: `Bearer ${user?.accessToken}`,
      },
    });
    _socket.on('connection-status', ({ success }) => {
      if (success === true) {
        setAlertsSocket(_socket);
      } else {
        _socket.removeAllListeners();
        _socket.disconnect();
      }
    });
  }

  function listenToAlerts() {
    alertsSocket.emit('sensor-alerts', {
      sensors: sensorIdList,
    });

    alertsSocket.on('sensor-alert', (data: any) => {
      toast.error(`${data.alert.macAddress} reached ${data.alert.trigger} value`);
      setAlertsData((prevData: any) => [...prevData, data]);
    });
  }
  const fetchPlantsbyUserId = async () => {
    const res = await PLANT_SERVICES.getAllPlantByUserId(loggedUser?.userId);
    const formattedData = res?.message.map((el: any) => {
      return {
        value: el.plantId,
        label: el.plantName,
      };
    });
    dispatch(setAllPlants(formattedData));
    if (!currentPlant && formattedData) {
      dispatch(setCurrentPlant(formattedData[0].value));
    }
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
            <span className="text-[#492CE1] ">Current plant</span>
            <span className="text-[#492CE1]">{`>`}</span>
            <Select
              size="small"
              onChange={handlePlantChange}
              value={currentPlant}
              style={{ width: 200 }}
              options={allPlants}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="flex items-center justify-end gap-5">
        {/* Keep this commented code as it will be used later implementation
        <div
          className={` ${classNames({
            hidden: hideFilters,
          })} flex justify-between items-center [&>*:nth-child(4)]:border-0 [&>*:nth-child(1)]:pl-0 [&>*:nth-child(4)]:pr-0`}
        >
          {options.map((option) => (
            <div key={option?.key} className="flex border-r-2 px-[52px] border-black">
              <Dropdown
                type="secondary"
                placeholder={option?.text}
                className={`border-none`}
                inputClassName={`placeholder:text-[#444444]  ${option.className}`}
                options={[]}
              />
            </div>
          ))}
        </div>
        <div className="header-search">
          <Input
            placeholder="Search"
            leftIcon={<SearchIcon className="w-[20px] mr-[10px]" />}
            className={` ${classNames({
              ' bg-white ': hideAvatar,
            })} px-[20px] py-[10px] w-[230px] border border-solid border-[#444]`}
          />
        </div> */}
        <div className={` ${classNames({ invisible: hideAvatar })} flex items-center gap-4 w-[138px] justify-end `}>
          <div className="relative" onClick={() => setShowNotificationModal(!showOpenNotificationModal)}>
            <BellIcon className="shrink-0" />
            {showOpenNotificationModal ? (
              <div className="absolute h-[250px] w-[350px] left-[-140px] r-0 overflow-auto shadow-lg rounded-2xl top-10 bg-white z-10">
                {alertsData?.length > 0 ? (
                  alertsData?.slice(-10)?.map((data: any) => (
                    <>
                      <div className="px-4 py-3 border-b-2">
                        <p key={data?.alert?.macAddress} className="flex items-center gap-4  ">
                          {' '}
                          <AlertsIcon />
                          {`${data?.alert?.macAddress} reached ${data?.alert?.trigger} value. Humidity : ${data?.alert?.humidity} temperatureC: ${data?.alert?.temperatureC}`}
                        </p>
                      </div>
                    </>
                  ))
                ) : (
                  <p className="h-full w-full flex justify-center items-center">No Notification</p>
                )}
              </div>
            ) : null}
          </div>
          <div className="bg-[#492CE1] text-white p-3 text-center w-[32px] h-[32px] rounded-[30px] flex items-center justify-center">
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
