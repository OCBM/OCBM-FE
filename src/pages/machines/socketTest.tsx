//import { CloudFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const SocketTest = () => {
  //const [sensorReadingsSocket, setSensorReadingsSocket] = useState<any>(null);
  const [sensorReadingsData, setSensorReadingsData] = useState<any>(null);

  useEffect(() => {
    const _socket: any = socketIOClient('http://localhost:9130/sensor-readings', {
      rejectUnauthorized: false,
    });
    // _socket.on('connection-success', ({ socketId }: any) => {
    //   setSensorReadingsSocket(_socket);
    // });
    // console.log('first1', _socket);
    _socket.emit('sensor-readings', {
      sensors: ['MAC-ADDRESS-001'], // sensor mac-address to listen
    });
    _socket.on('sensor-reading', (data: any) => {
      console.log('first-called', data);
      setSensorReadingsData((prevData: any) => [...prevData, data.sensorReading]);
    });
    console.log('first2', _socket);
  }, []);

  console.log('first', sensorReadingsData);

  return <div>socketTest</div>;
};

export default SocketTest;
