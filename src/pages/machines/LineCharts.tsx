/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Line } from 'react-chartjs-2';

function LineCharts({ item }: any) {
  const data: any = {
    labels: ['4am', '8am', '12pm', '4pm', '8pm', '0am', '4am', '8am', '12pm', '4pm', '8pm', '0am'],
    datasets: [
      {
        label: 'Cubic interpolation (monotone)',
        data: item.data,
        borderColor: item.borderColor,
        backgroundColor: 'transparent',
        fill: true,
        pointBorderWidth: 4,
        cubicInterpolationMode: 'monotone',
        tension: 0.5,
        pointBorderColor: 'transparent',
      },
      {
        label: 'Cubic interpolation (default)',
        data: item.user.data,
        borderColor: item.user.borderColor,
        backgroundColor: 'transparent',
        fill: false,
        pointBorderWidth: 4,
        tension: 0.5,
        pointBorderColor: 'transparent',
      },
    ],
  };
  const options: any = {
    plugins: {
      legend: false,
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
        min: item.min,
        max: item.max,
        ticks: {
          stepSize: item.stepSize,
          callback: (value: any) => value + ' ' + item.value,
          color: (event: any) => {
            return event?.tick?.value === item.min || event?.tick?.value === item.max ? 'green' : 'red';
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
          stepSize: item.stepSize,
          callback: (value: any) => value + ' ' + item.value,
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
  return (
    <>
      <div>
        <Line data={data} options={options}></Line>
      </div>
    </>
  );
}

export default LineCharts;
