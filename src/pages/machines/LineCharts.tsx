/* eslint-disable @typescript-eslint/no-unused-expressions */
// import { setLabels } from 'node_modules/react-chartjs-2/dist/utils';
import { Chart } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

function LineCharts({ item }: any) {
  const [chartData, setChartData] = useState<any>();
  const lineRef: any = useRef();

  useEffect(() => {
    setChartData(item);
  }, [item]);
  const labels = ['dju32', 'ad6b2', '0f23f', 'asd4c'];

  const data: any = {
    labels,
    datasets: [
      {
        data: [10, 20, 20, 40, 60],
        backgroundColor: 'transparent',
        borderColor: 'green',
        fill: true,
        pointBorderWidth: 4,
        cubicInterpolationMode: 'monotone',
        tension: 0.5,
        pointBorderColor: 'transparent',
      },
      // {
      //   label: 'Cubic interpolation (default)',
      //   data: chartData?.user.data,
      //   borderColor: chartData?.user.borderColor,
      //   backgroundColor: 'transparent',
      //   fill: false,
      //   pointBorderWidth: 4,
      //   tension: 0.5,
      //   pointBorderColor: 'transparent',
      // },
    ],
  };
  const options: any = {
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
        min: chartData?.min,
        max: chartData?.max,
        ticks: {
          stepSize: chartData?.stepSize,
          callback: (value: any) => value + ' ' + chartData?.value,
          color: (event: any) => {
            return event?.tick?.value === chartData?.min || event?.tick?.value === chartData?.max ? 'red' : 'green';
          },
        },
        border: {
          dash: [10, 5],
          color: 'transparent',
        },
        grid: {
          color: '#A299D2',
        },
      },
      y1: {
        min: 0,
        max: 60,
        ticks: {
          stepSize: chartData?.stepSize,
          callback: (value: any) => value + ' ' + chartData?.value,
          color: '#A299D2',
        },
        position: 'right',
        border: {
          color: 'transparent',
        },
        grid: {
          color: '#A299D2',
        },
      },
    },
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newData = Math.random() * 100; // Mock sensor data
  //     const newLabel = new Date().toLocaleTimeString(); // Mock time label
  //     if (lineRef.current) {
  //       lineRef?.current?.data?.labels?.push(newLabel);
  //       lineRef.current.data.datasets.forEach((dataset: any) => {
  //         dataset.data.push(newData);
  //       });
  //       lineRef.current.update();
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(interval);
  //     if (lineRef.current) {
  //       lineRef.current.destroy();
  //     }
  //   };
  // }, [chartData]);
  setInterval(() => {
    const newData = Math.random() * 100; // Mock sensor data
    const newLabel = new Date().toLocaleTimeString(); // Mock time label
    if (lineRef.current) {
      lineRef?.current?.data?.labels?.push(newLabel);
      lineRef.current.data.datasets.forEach((dataset: any) => {
        dataset.data.push(newData);
      });
      lineRef.current.update();
    }
  }, 1000);
  // function addData(data: any) {
  //   // lineRef.current.data.labels.push(label);
  //   lineRef.current.data.datasets.forEach((dataset: any) => {
  //     dataset.data.push(data);
  //   });
  //   lineRef.current.update();
  // }

  // setInterval(function () {
  //   // const newLabel = (Math.random() + 1).toString(36).substring(7);
  //   const newData = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  //   addData(newData);
  // }, 1000);
  // console.log('first', lablePosition);
  return <Line ref={lineRef} data={data} options={options} />;
}

export default LineCharts;
// import React, { useRef, useEffect } from 'react';
// import Chart from 'chart.js/auto';
// import zoomPlugin from 'chartjs-plugin-zoom';

// Chart.register(zoomPlugin);
// const SensorChart: React.FC = () => {
//   const chartRef = useRef<HTMLCanvasElement>(null);
//   const chartInstance = useRef<Chart | null>(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       const ctx = chartRef.current.getContext('2d');

//       if (ctx) {
//         chartInstance.current = new Chart(ctx, {
//           type: 'line',
//           data: {
//             labels: [],
//             datasets: [
//               {
//                 label: 'Sensor Data',
//                 data: [],
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgb(75, 192, 192)',
//                 fill: false,
//               },
//             ],
//           },
//           options: {
//             plugins: {
//               zoom: {
//                 pan: {
//                   enabled: true,
//                   mode: 'x',
//                 },
//                 zoom: {
//                   pinch: {
//                     enabled: true,
//                   },
//                   wheel: {
//                     enabled: true,
//                   },
//                   mode: 'x',
//                 },
//               },
//             },
//           },
//         });

//         // Mock data update - Replace with actual data fetching logic
//         const interval = setInterval(() => {
//           const newData = Math.random() * 100; // Mock sensor data
//           const newLabel = new Date().toLocaleTimeString(); // Mock time label
//           if (chartInstance.current) {
//             chartInstance?.current?.data?.labels?.push(newLabel);
//             chartInstance.current.data.datasets.forEach((dataset) => {
//               dataset.data.push(newData);
//             });
//             chartInstance.current.update();
//           }
//         }, 1000);

//         return () => {
//           clearInterval(interval);
//           if (chartInstance.current) {
//             chartInstance.current.destroy();
//           }
//         };
//       }
//     }
//   }, []);

//   return <canvas ref={chartRef}></canvas>;
// };

// export default SensorChart;
