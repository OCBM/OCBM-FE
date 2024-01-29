// import { useEffect, useState } from 'react';
// import socketIOClient from 'socket.io-client';

// // import './App.css';
// const SENSOR_READINGS_SOCKET_CONNECTION_URL = 'http://localhost:9130/sensor-readings';
// const ALERTS_SOCKET_CONNECTION_URL = 'http://localhost:9130/alerts';

// function App2() {
//   const [sensorReadingsSocket, setSensorReadingsSocket] = useState(null);
//   const [alertsSocket, setAlertsSocket] = useState(null);
//   const [sensorReadingsData, setSensorReadingsData] = useState([]);
//   const [alertsData, setAlertsData] = useState([]);

//   useEffect(() => {
//     return () => {
//       if (sensorReadingsSocket) {
//         sensorReadingsSocket.disconnect();
//       }
//       if (alertsSocket) {
//         alertsSocket.disconnect();
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   function connectToSensorReadingsSocket() {
//     const _socket = socketIOClient(SENSOR_READINGS_SOCKET_CONNECTION_URL, {
//       rejectUnauthorized: false,
//     });
//     _socket.on('connection-success', ({ socketId }) => {
//       setSensorReadingsSocket(_socket);
//       console.log('sensor-socketId', socketId);
//     });
//   }

//   function listenToSensorReadings() {
//     sensorReadingsSocket.emit('sensor-readings', {
//       sensors: ['MAC-ADDRESS-001'],
//     });

//     sensorReadingsSocket.on('sensor-reading', (data) => {
//       console.log('sensor-reading', data);
//       setSensorReadingsData((prevData) => [...prevData, data]);
//     });
//   }

//   function connectToAlertsSocket() {
//     const _socket = socketIOClient(ALERTS_SOCKET_CONNECTION_URL, {
//       rejectUnauthorized: false,
//     });
//     _socket.on('connection-success', ({ socketId }) => {
//       setAlertsSocket(_socket);
//       console.log('alert-socketId', socketId);
//     });
//   }

//   function listenToAlerts() {
//     alertsSocket.emit('sensor-alerts', {
//       sensors: ['MAC-ADDRESS-001'],
//     });

//     alertsSocket.on('sensor-alert', (data) => {
//       console.log('sensor-alert', data);
//       setAlertsData((prevData) => [...prevData, data]);
//     });
//   }

//   return (
//     <>
//       <h1>SENSOR</h1>
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'row',
//           justifyContent: 'space-around',
//           width: '100%',
//           height: '100%',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//         }}
//       >
//         <section className="card">
//           <h2>SENSOR SOCKET {sensorReadingsSocket?.id} </h2>
//           <button onClick={connectToSensorReadingsSocket}>Connect to Sensor Readings Socket</button>
//           <button disabled={!sensorReadingsSocket} onClick={listenToSensorReadings}>
//             Listen to Sensor Readings
//           </button>
//           <br />
//           {sensorReadingsData.map((data, index) => (
//             <div
//               key={index}
//               style={{
//                 border: '1px solid blue',
//                 margin: '5px',
//               }}
//             >
//               <p>{JSON.stringify(data)}</p>
//             </div>
//           ))}
//         </section>

//         <section className="card">
//           <h2>ALERTS SOCKET {alertsSocket?.id} </h2>
//           <button onClick={connectToAlertsSocket}>Connect to Alerts Socket</button>
//           <button disabled={!alertsSocket} onClick={listenToAlerts}>
//             Listen to Alerts
//           </button>
//           {alertsData.map((data, index) => (
//             <div
//               key={index}
//               style={{
//                 border: '1px solid yellow',
//                 margin: '5px',
//               }}
//             >
//               <p>{JSON.stringify(data)}</p>
//             </div>
//           ))}
//         </section>
//       </div>
//     </>
//   );
// }

// export default App2;
