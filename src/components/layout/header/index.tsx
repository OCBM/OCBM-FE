import { BellIcon } from '@/assets/icons';
import { Dropdown } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { logoutUser } from '@/redux/slices/authSlice';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import socketIOClient from 'socket.io-client';

const Header = ({ hideAvatar }: { hideAvatar: boolean }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [showOpenNotificationModal, setShowNotificationModal] = useState(false);
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

  const ALERTS_SOCKET_CONNECTION_URL = 'http://localhost:9130/alerts';

  const [alertsSocket, setAlertsSocket] = useState<any>(null);
  const [alertsData, setAlertsData] = useState<any>([]);

  useEffect(() => {
    connectToAlertsSocket();
    return () => {
      if (alertsSocket) {
        alertsSocket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (alertsSocket) {
      listenToAlerts();
    }
  }, [alertsSocket]);

  function connectToAlertsSocket() {
    const _socket = socketIOClient(ALERTS_SOCKET_CONNECTION_URL, {
      rejectUnauthorized: false,
    });
    _socket.on('connection-success', ({ socketId }) => {
      setAlertsSocket(_socket);
      console.log('alert-socketId', socketId);
    });
  }

  function listenToAlerts() {
    alertsSocket.emit('sensor-alerts', {
      sensors: ['MAC-ADDRESS-001', 'MAC-ADDRESS-002'],
    });

    alertsSocket.on('sensor-alert', (data: any) => {
      toast.error(`${data.alert.macAddress} reached ${data.alert.trigger} value`);
      setAlertsData((prevData: any) => [...prevData, data]);
    });
  }

  return (
    <>
      {/* I don't feel like there should be a padding here changing 
      <div className="flex items-center justify-end gap-5 pb-6 ">
       */}
      <div className="flex items-center justify-end gap-5">
        {/* 
        Keep this commented code as it will be used later implementation
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
        </div> */}
        {/* <div className="header-search">
          <Input
            placeholder="Search"
            leftIcon={<SearchIcon className="w-[20px] mr-[10px]" />}
            className={` ${classNames({
              ' bg-white ': hideAvatar,
            })} px-[20px] py-[10px] w-[230px] border border-solid border-[#444]`}
          /> */}
        {/* </div> */}
        <div className={` ${classNames({ invisible: hideAvatar })} flex items-center gap-4 w-[138px] justify-end `}>
          <div className="relative" onClick={() => setShowNotificationModal(!showOpenNotificationModal)}>
            <BellIcon className="shrink-0" />
            {showOpenNotificationModal ? (
              <div className="absolute h-[250px] w-[300px] left-[-110px] overflow-auto shadow-lg rounded-2xl top-10 bg-white">
                {alertsData?.length > 0 ? (
                  alertsData?.slice(-10)?.map((data: any) => (
                    <p key={data?.alert?.macAddress} className="p-3">
                      {`${data?.alert?.macAddress} reached ${data?.alert?.trigger} value. Humidity : ${data?.alert?.humidity} temperatureC: ${data?.alert?.temperatureC}`}
                    </p>
                  ))
                ) : (
                  <p className="h-full w-full flex justify-center items-center">No Notification</p>
                )}
              </div>
            ) : null}
          </div>
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
    </>
  );
};

export default Header;
