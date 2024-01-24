import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);
const SensorChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);
  // const [sensorApi, setsensorApi] = useState();
  const date = new Date();
  const hours = date.getHours();
  const timeString = hours > 12 ? `${hours - 12}pm` : `${hours}am`;
  var currentDate = new Date();
  currentDate.setHours(currentDate.getHours() - 12);
  // var isoString = currentDate.toISOString();
  // useEffect(() => {
  //   const _socket: any = socketIOClient('http://localhost:9130/sensor-readings', {
  //     rejectUnauthorized: false,
  //   });
  //   // _socket.on('connection-success', ({ socketId }: any) => {
  //   //   setSensorReadingsSocket(_socket);
  //   // });
  //   // console.log('first1', _socket);
  //   _socket.emit('sensor-readings', {
  //     sensors: ['MAC-ADDRESS-001'], // sensor mac-address to listen
  //   });
  //   _socket.on('sensor-reading', (data: any) => {
  //     console.log('first-called', data);
  //     setSensorReadingsData((prevData: any) => [...prevData, data.sensorReading]);
  //   });
  // }, []);
  // const fetchAllSensor = async (minTimestamp: string, macAddress: string) => {
  //   const res = await SENSOR_SERVICES.getSensorData(minTimestamp, macAddress);
  //   setsensorApi(res);
  // };
  // useEffect(() => {
  //   fetchAllSensor(`${isoString}`, 'MAC-ADDRESS-001');
  // }, []);
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
                min: 0,
                max: 10,
                grid: {
                  display: false,
                },
                border: {
                  color: 'transparent',
                },
              },
              y: {
                beginAtZero: true,
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
        const scroller = (scroll: any, chart: any) => {
          console.log('object', scroll, chart);
        };

        chartInstance.current.canvas.addEventListener('wheel', (event: any) => {
          scroller(event, chartInstance.current);
        });

        // Mock data update - Replace with actual data fetching logic
        const interval = setInterval(() => {
          const newData = Math.random() * 100; // Mock sensor data
          const newLabel = timeString; // Mock time label
          if (chartInstance.current) {
            chartInstance.current.data.labels.push(newLabel);
            chartInstance.current.data.datasets.forEach((dataset: any) => {
              dataset.data.push(newData);
            });

            // Update the maxTicks based on the length of labels
            const maxTicks = Math.min(5, chartInstance.current.data.labels.length);
            chartInstance.current.options.scales.x.maxTicks = maxTicks;

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
