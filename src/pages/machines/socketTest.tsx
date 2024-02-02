import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import socketIOClient from 'socket.io-client';
import { getToken } from '@/lib/axios';
import { format } from 'date-fns';
import { Config } from '@/config';
import { SENSOR_SERVICES } from '@/services/sensorServices';

const SensorChart = ({ sensorId }: { sensorId: string }) => {
  const [sensorData, setSensorData] = useState<any>([]);
  const [sensorProperties, setSensorProperties] = useState();
  // const [sensorIdList, setSensorIdList] = useState([]);

  useEffect(() => {
    const token = getToken();
    const AUTHORIZATION = `Bearer ${token}`;
    const _socket = socketIOClient(`${Config.OMNEX_SENSOR_URL}/sensor-readings`, {
      rejectUnauthorized: false,
      extraHeaders: {
        authorization: AUTHORIZATION,
      },
    });

    _socket.emit('sensor-readings', {
      sensors: sensorId, // sensor mac-address to listen
    });

    _socket.on('sensor-reading', (data: any) => {
      setSensorData((prevData: any) => [...prevData, data.sensorReading]);
    });

    return () => {
      _socket.disconnect();
    };
  }, [sensorId]);

  // const fetchAllSensors = async () => {
  //   const res = await SENSOR_SERVICES.getAllSensor();
  //   setSensorIdList(res);
  // };

  // useEffect(() => {
  //   fetchAllSensors();
  // }, []);

  const getSensorProperties = async () => {
    const res = await SENSOR_SERVICES.getSensorProperties(sensorId);
    setSensorProperties(res);
  };

  console.log(sensorProperties);

  useEffect(() => {
    getSensorProperties();
  }, [sensorId]);

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
          fillColor: '#A299D2',
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
      offsetY: 30,
    },
    stroke: {
      width: 4,
      curve: 'smooth',
      colors: ['#66bb6a'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        colorStops: [
          {
            offset: 30,
            color: '#66bb6a',
            opacity: 1,
          },
          {
            offset: 40,
            color: '#FF0000',
            opacity: 1,
          },
          {
            offset: 60,
            color: ' #66bb6a',
            opacity: 1,
          },
        ],
      },
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
    yaxis: [
      {
        max: 100,
        min: 0,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#FF1654',
        },
        labels: {
          formatter: function (value: any) {
            return parseInt(value) + ' °C';
          },
          style: {
            colors: '#FF1654',
          },
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#A299D2',
        },
        labels: {
          formatter: function (value: any) {
            return parseInt(value) + ' °C';
          },
          style: {
            colors: '#A299D2',
          },
        },
      },
    ],
    // yaxis: {
    //   max: 100,
    //   min: 0,
    //   labels: {
    //     formatter: function (value: any) {
    //       return parseInt(value) + ' °C';
    //     },
    //   },
    // },
    // legend: {
    //   show: false,
    // },
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
