import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import socketIOClient from 'socket.io-client';
import { getToken } from '@/lib/axios';
import { format } from 'date-fns';
import { Config } from '@/config';
import { SENSOR_SERVICES } from '@/services/sensorServices';
import { Select } from 'antd';

const SensorChart = ({ sensorId }: { sensorId: string }) => {
  const [sensorData, setSensorData] = useState<any>([]);
  const [sensorProperties, setSensorProperties] = useState();
  const [selectedDuration, setSelectedDuration] = useState('live');
  // const [sensorIdList, setSensorIdList] = useState([]);

  const fetchSensorPreviousData = async () => {
    var date = new Date();
    date.setDate(date?.getDate() - parseInt(selectedDuration));
    const timeStamp = encodeURIComponent(date?.toISOString());
    const res = await SENSOR_SERVICES?.getSensorData(timeStamp, sensorId);
    setSensorData(res);
  };

  useEffect(() => {
    const token = getToken();
    const AUTHORIZATION = `Bearer ${token}`;
    const _socket = socketIOClient(`${Config.OMNEX_SENSOR_URL}/sensor-readings`, {
      rejectUnauthorized: false,
      extraHeaders: {
        authorization: AUTHORIZATION,
      },
    });
    if (selectedDuration === 'live') {
      _socket.emit('sensor-readings', {
        sensors: [sensorId?.toUpperCase()], // sensor mac-address to listen
      });
      _socket.on('sensor-reading', (data: any) => {
        setSensorData((prevData: any) => [...prevData, data?.sensorReading]);
      });
    } else {
      _socket.disconnect();
      fetchSensorPreviousData();
    }

    return () => {
      _socket.disconnect();
    };
  }, [sensorId, selectedDuration]);

  const getSensorProperties = async () => {
    const res = await SENSOR_SERVICES.getSensorProperties(sensorId);
    setSensorProperties(res);
  };

  console.log(sensorProperties);
  console.log('sensorData', sensorData);

  useEffect(() => {
    getSensorProperties();
  }, [sensorId]);

  const chartInitialConfig: ApexOptions = {
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
          opacity: 0.3,
          strokeDashArray: 10,
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
        formatter: function (value: any) {
          return format(new Date(value), 'HH:mm, dd/MMM');
        },
      },
    },
  };
  const [temperatureChartOptions, setTemperatureChartOptions] = useState<ApexOptions>(chartInitialConfig);
  const [humidityChartOptions, setHumidityChartOptions] = useState<ApexOptions>(chartInitialConfig);

  useEffect(() => {
    setTemperatureChartOptions({
      ...chartInitialConfig,
      chart: {
        ...chartInitialConfig?.chart,
        toolbar: {
          show: selectedDuration !== 'live',
        },
        zoom: {
          enabled: selectedDuration !== 'live',
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
    });
    setHumidityChartOptions({
      ...chartInitialConfig,
      chart: {
        ...chartInitialConfig?.chart,
        toolbar: {
          show: selectedDuration !== 'live',
        },
        zoom: {
          enabled: selectedDuration !== 'live',
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
              return parseInt(value) + ' Bar';
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
              return parseInt(value) + ' Bar';
            },
            style: {
              colors: '#A299D2',
            },
          },
        },
      ],
    });
  }, [selectedDuration, sensorData]);

  return (
    <div>
      <div className="flex gap-3">
        <Select
          style={{ width: 150 }}
          placeholder="Select"
          value={selectedDuration}
          options={[
            {
              value: 'live',
              label: 'Live',
            },
            {
              value: '1',
              label: 'Last 1 day',
            },
            {
              value: '5',
              label: 'Last 5 days',
            },
            {
              value: '10',
              label: 'Last 10 days',
            },
            {
              value: '15',
              label: 'Last 15 days',
            },
          ]}
          onSelect={(value) => {
            setSelectedDuration(value);
          }}
        />
      </div>
      <div id="chart" className="flex gap-6 flex-wrap">
        <Chart
          options={temperatureChartOptions}
          series={[
            {
              name: 'Temperature',
              data: sensorData?.map((sensor: any) => ({
                x: new Date(sensor?.msgTimeStamp)?.getTime(),
                y: parseInt(sensor?.temperatureC),
              })),
            },
          ]}
          type="line"
          height={350}
          width={700}
        />
        <Chart
          options={humidityChartOptions}
          series={[
            {
              name: 'Humidity',
              data: sensorData?.map((sensor: any) => ({
                x: new Date(sensor?.msgTimeStamp)?.getTime(),
                y: parseInt(sensor?.humidity),
              })),
            },
          ]}
          type="line"
          height={350}
          width={700}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default SensorChart;
