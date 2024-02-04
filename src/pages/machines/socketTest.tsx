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
  const [sensorProperties, setSensorProperties] = useState<any>();
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
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 4,
      curve: 'smooth',
      // colors: ['#66bb6a'],
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

  const getYaxisIndexPosition = (min: number, max: number, incrementValue: number, value: number) => {
    const arr: any = [];
    for (let i = min; i <= max + incrementValue; i += incrementValue) {
      arr.push(i);
    }
    return arr?.indexOf(value);
  };

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
      fill: {
        type: 'gradient',
        gradient: {
          type: 'vertical',
          colorStops: [
            {
              offset: 10,
              color: '#14A87B',
              opacity: 1,
            },
            {
              offset: 30,
              color: ' #FA4C4C',
              opacity: 1,
            },
          ],
        },
      },
      annotations: {
        yaxis: [
          {
            y: sensorProperties?.minThresholdValue,
            borderColor: '#A299D2',
            opacity: 1,
            strokeDashArray: 10,
            label: {
              borderColor: 'none',
              style: {
                fontSize: '10px',
                color: '#A299D2',
                background: 'none',
              },
              text: `${sensorProperties?.minThresholdValue} °C`,
            },
          },
          {
            y: sensorProperties?.maxThresholdValue,
            borderColor: '#A299D2',
            opacity: 1,
            strokeDashArray: 10,
            label: {
              borderColor: 'none',
              style: {
                fontSize: '10px',
                color: '#A299D2',
                background: 'none',
              },
              text: `${sensorProperties?.maxThresholdValue} °C`,
            },
          },
        ],
      },
      yaxis: [
        {
          stepSize: 20,
          min: 0,
          max: 100,
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            formatter: function (value: any, option: any) {
              if (option?.w?.config?.yaxis?.[0]?.labels?.style?.colors?.[0]) {
                const pos = getYaxisIndexPosition(0, 100, 20, value);
                if (value < sensorProperties?.minThresholdValue || value > sensorProperties?.maxThresholdValue) {
                  option.w.config.yaxis[0].labels.style.colors[pos] = '#FA4C4C';
                } else {
                  option.w.config.yaxis[0].labels.style.colors[pos] = '#14A87B';
                }
              }
              return parseInt(value) + ' °C';
            },
            style: {
              colors: ['#14A87B'],
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
      fill: {
        type: 'gradient',
        gradient: {
          type: 'vertical',
          colorStops: [
            {
              offset: 10,
              color: '#14A87B',
              opacity: 1,
            },
            {
              offset: 30,
              color: ' #FA4C4C',
              opacity: 1,
            },
          ],
        },
      },
      annotations: {
        yaxis: [
          {
            y: sensorProperties?.minThresholdValue,
            borderColor: '#A299D2',
            opacity: 1,
            strokeDashArray: 10,
            label: {
              borderColor: 'none',
              style: {
                fontSize: '10px',
                color: '#A299D2',
                background: 'none',
              },
              text: `${sensorProperties?.minThresholdValue} Bar`,
            },
          },
          {
            y: sensorProperties?.maxThresholdValue,
            borderColor: '#A299D2',
            opacity: 1,
            strokeDashArray: 10,
            label: {
              borderColor: 'none',
              style: {
                fontSize: '10px',
                color: '#A299D2',
                background: 'none',
              },
              text: `${sensorProperties?.maxThresholdValue} Bar`,
            },
          },
        ],
      },
      yaxis: [
        {
          stepSize: 20,
          min: 0,
          max: 100,
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            formatter: function (value: any, option: any) {
              if (option?.w?.config?.yaxis?.[0]?.labels?.style?.colors?.[0]) {
                const pos = getYaxisIndexPosition(0, 100, 20, value);
                if (value < sensorProperties?.minThresholdValue || value > sensorProperties?.maxThresholdValue) {
                  option.w.config.yaxis[0].labels.style.colors[pos] = '#FA4C4C';
                } else {
                  option.w.config.yaxis[0].labels.style.colors[pos] = '#14A87B';
                }
              }
              return parseInt(value) + ' Bar';
            },
            style: {
              colors: ['#14A87B'],
            },
          },
        },
      ],
    });
  }, [selectedDuration, sensorData, sensorProperties]);

  return (
    <div className="w-full h-full">
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
            setSensorData([]);
            setSelectedDuration(value);
          }}
        />
      </div>
      <div id="chart" className="flex gap-6 flex-wrap mt-3 w-full">
        <div className="w-[48%]">
          <h1 className="uppercase text-[#444444] text-[18px] font-medium mb-2">Temperature</h1>
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
          />
        </div>
        <div className="w-[48%]">
          <h1 className="uppercase text-[#444444] text-[18px] font-medium mb-2">Humidity</h1>
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
          />
        </div>
      </div>
      <div id="html-dist" />
    </div>
  );
};

export default SensorChart;
