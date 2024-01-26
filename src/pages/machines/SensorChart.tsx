import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import socketIOClient from 'socket.io-client';
import { getToken } from '@/lib/axios';

Chart.register(zoomPlugin);
const SensorChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartTempRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);
  const chartTempFInstance = useRef<any>(null);
  const [, setSensorReadingsData] = useState<any>([]);
  const [sensorData, setSensorData] = useState<any>([]);

  useEffect(() => {
    const token = getToken();
    const AUTHORIZATION = `Bearer ${token}`;
    const _socket = socketIOClient('http://13.215.76.32:9130/sensor-readings', {
      rejectUnauthorized: false,
      extraHeaders: {
        authorization: AUTHORIZATION,
      },
    });
    _socket.on('connection-status', ({ socketId, success, error }) => {
      console.log('first-called0', socketId, success, error);
      if (success === true) {
        setSensorReadingsData(_socket);
      } else {
        console.warn('else', socketId, success, error);
        _socket.removeAllListeners();
        _socket.disconnect();
      }
    });
    _socket.emit('sensor-readings', {
      sensors: ['MAC-ADDRESS-001'], // sensor mac-address to listen
    });
    _socket.on('sensor-reading', (data: any) => {
      setSensorData((prevData: any) => [...prevData, data.sensorReading]);
    });
    _socket.on('disconnect', (reason) => {
      console.log('disconnect', reason);
    });
  }, []);

  const dateFormat = (date: any) => {
    const nDate = new Date(date);
    let hours: number = nDate.getHours();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let strTime = hours + ' ' + ampm;
    return strTime;
  };

  const chartConfig: any = (chartData: any) => {
    return {
      type: 'line',
      data: chartData,
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

            // Y Axis Min and Max value
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              maxTicksLimit: 6,
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
    };
  };
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const chartData = {
          labels: sensorData?.map((sensor: any) => dateFormat(sensor?.msgTimeStamp)),
          datasets: [
            {
              label: 'Sensor Data',
              data: sensorData?.map((sensor: any) => sensor?.humidity),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              fill: false,
            },
          ],
        };
        chartInstance.current = new Chart(ctx, chartConfig(chartData));
        const scroller = (scroll: any, chart: any) => {
          console.log('object', scroll, chart);
        };

        chartInstance.current.canvas.addEventListener('wheel', (event: any) => {
          scroller(event, chartInstance.current);
        });

        return () => {
          if (chartInstance.current) {
            chartInstance.current.destroy();
          }
        };
      }
    }
  }, [sensorData]);

  useEffect(() => {
    if (chartTempRef.current) {
      const ctx = chartTempRef.current.getContext('2d');
      if (ctx) {
        const chartData = {
          labels: sensorData?.map((sensor: any) => dateFormat(sensor?.msgTimeStamp)),
          datasets: [
            {
              label: 'Sensor Data',
              data: sensorData?.map((sensor: any) => sensor?.temperatureF),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              fill: false,
            },
          ],
        };
        chartTempFInstance.current = new Chart(ctx, chartConfig(chartData));
        const scroller = (scroll: any, chart: any) => {
          console.log('object', scroll, chart);
        };

        chartTempFInstance.current.canvas.addEventListener('wheel', (event: any) => {
          scroller(event, chartTempFInstance.current);
        });

        return () => {
          if (chartTempFInstance.current) {
            chartTempFInstance.current.destroy();
          }
        };
      }
    }
  }, [sensorData]);

  return (
    <>
      <p className="uppercase text-[#444444] text-base font-medium ">Humidity</p>
      <canvas ref={chartRef} />
      <p className="uppercase text-[#444444] text-base font-medium mt-2">Temperature</p>
      <canvas ref={chartTempRef} />
    </>
  );
};

export default SensorChart;
