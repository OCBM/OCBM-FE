import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import socketIOClient from 'socket.io-client';
import { getToken } from '@/lib/axios';
import { ApexOptions } from 'apexcharts';

const SensorChart: React.FC = () => {
  const [sensorData, setSensorData] = useState<any>([]);

  useEffect(() => {
    const token = getToken();
    const AUTHORIZATION = `Bearer ${token}`;
    const _socket = socketIOClient(`http://13.213.123.212:9130/sensor-readings`, {
      rejectUnauthorized: false,
      extraHeaders: {
        authorization: AUTHORIZATION,
      },
    });

    _socket.emit('sensor-readings', {
      sensors: ['MAC-ADDRESS-002'], // sensor mac-address to listen
    });

    _socket.on('sensor-reading', (data: any) => {
      setSensorData((prevData: any) => [...prevData, data.sensorReading]);
    });

    return () => {
      _socket.disconnect();
    };
  }, []);

  const chartOptions: ApexOptions = {
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
      // range: '10000',
    },
    yaxis: {
      max: 100,
    },
    legend: {
      show: false,
    },
  };

  const chartSeries = [
    {
      name: 'series1',
      data: sensorData.map((sensor: any) => ({
        x: new Date(sensor.msgTimeStamp).getTime(),
        y: [10, 20, 40, 443, 43],
      })),
    },
  ];

  return (
    <div id="chart">
      <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
    </div>
  );
};

export default SensorChart;
