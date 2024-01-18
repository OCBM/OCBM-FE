import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import socketIOClient from 'socket.io-client';
import { SENSOR_SERVICES } from '@/services/sensorServices';

Chart.register(zoomPlugin);
const SensorChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [sensorApi, setsensorApi] = useState();
  const [sensorReadingsData, setSensorReadingsData] = useState<any>([]);
  const date = new Date();
  const hours = date.getHours();
  const timeString = hours > 12 ? `${hours - 12}pm` : `${hours}am`;
  var currentDate = new Date();
  currentDate.setHours(currentDate.getHours() - 12);
  var isoString = currentDate.toISOString();
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
  }, []);
  console.log('first', sensorReadingsData);
  const fetchAllSensor = async (minTimestamp: string, macAddress: string) => {
    const res = await SENSOR_SERVICES.getSensorData(minTimestamp, macAddress);
    setsensorApi(res);
  };
  useEffect(() => {
    fetchAllSensor(`${isoString}`, 'MAC-ADDRESS-001');
  });
  console.log(sensorApi);
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [],
            datasets: [
              {
                label: 'Sensor Data',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                fill: false,
              },
            ],
          },
          options: {
            plugins: {
              zoom: {
                pan: {
                  enabled: true,
                  mode: 'x',
                },
                zoom: {
                  pinch: {
                    enabled: true,
                  },
                  wheel: {
                    enabled: true,
                  },
                  mode: 'x',
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                border: {
                  color: 'transparent',
                },
              },
              y: {
                // min: item.min,
                // max: item.max,
                // ticks: {
                //   stepSize: item.stepSize,
                //   callback: (value: any) => value + ' ' + item.value,
                //   color: (event: any) => {
                //     return event?.tick?.value === item.min || event?.tick?.value === item.max ? 'green' : 'red';
                //   },
                // },
                ticks: {
                  color: 'red',
                },
                border: {
                  dash: [10, 5],
                  color: '#A299D2',
                },
                grid: {
                  color: '#A299D2',
                },
              },
              y1: {
                // min: 0,
                // max: 60,
                // ticks: {
                //   stepSize: chartData?.stepSize,
                //   callback: (value: any) => value + ' ' + chartData?.value,
                //   color: '#A299D2',
                // },
                ticks: {
                  color: '#A299D2',
                },
                position: 'right',
                border: {
                  color: '#A299D2',
                },
                grid: {
                  color: '#A299D2',
                },
              },
            },
          },
        });
        // Mock data update - Replace with actual data fetching logic
        const interval = setInterval(() => {
          const newData = Math.random() * 100; // Mock sensor data
          const newLabel = timeString; // Mock time label
          if (chartInstance.current) {
            chartInstance?.current?.data?.labels?.push(newLabel);
            chartInstance.current.data.datasets.forEach((dataset) => {
              dataset.data.push(newData);
            });
            chartInstance.current.update();
          }
        }, 1000);

        return () => {
          clearInterval(interval);
          if (chartInstance.current) {
            chartInstance.current.destroy();
          }
        };
      }
    }
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default SensorChart;
