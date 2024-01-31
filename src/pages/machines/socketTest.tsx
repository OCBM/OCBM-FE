import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
const SensorChart = () => {
  const [sensorData, setSensorData] = useState<any>([]);
  const [chartOptions] = useState<ApexOptions>({
    chart: {
      id: 'realtime',
      type: 'line',
      height: 350,
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    annotations: {
      yaxis: [
        {
          y: 10,
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              color: '#fff',
              background: '#00E396',
            },
            text: 'Support',
          },
        },
        {
          y: 40,
          y2: 60,
          borderColor: '#000',
          fillColor: '#FEB019',
          opacity: 0.2,
          label: {
            borderColor: '#333',
            style: {
              fontSize: '10px',
              color: '#333',
              background: '#FEB019',
            },
            text: 'Y-axis range',
          },
        },
      ],
    },
    // series: [
    //   {
    //     data: sensorData.slice(),
    //   },
    // ],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Dynamic Updating Chart',
      align: 'left',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (value) {
          return format(new Date(value), 'HH:mm, dd/MMM');
        },
      },
    },
    yaxis: {
      max: 100,
      labels: {
        formatter: function (value: any) {
          return parseInt(value) + ' °C';
        },
      },
    },
    legend: {
      show: false,
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: 'series1',
      data: [],
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Replace this with your API call to fetch sensor data
      const fakeSensorReading = {
        msgTimeStamp: new Date(),
        value: Math.random() * 100,
      };

      setSensorData((prevData: any) => {
        // Keep only the last 10 data points
        const updatedData = [...prevData, fakeSensorReading].slice(-10);
        return updatedData;
      });

      setChartSeries([
        {
          name: 'series1',
          data: sensorData.map((sensor: any) => ({
            x: new Date(sensor.msgTimeStamp).getTime(),
            y: parseInt(sensor.value),
          })),
        },
      ]);
    }, 2200);

    return () => {
      clearInterval(interval);
    };
  }, [sensorData]);

  return (
    <div>
      <div id="chart">
        <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default SensorChart;
