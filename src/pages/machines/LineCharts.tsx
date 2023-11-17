import { Line } from 'react-chartjs-2';

function LineCharts({ item }: any) {
  const data: any = {
    type: 'line',
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
      },
      y: {
        min: item.min,
        max: item.max,
        ticks: {
          stepSize: item.stepSize,
          callback: (value: any) => value + ' ' + item.value,
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
