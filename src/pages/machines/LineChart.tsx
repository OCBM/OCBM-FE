import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);
const SensorChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

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
          },
        });

        // Mock data update - Replace with actual data fetching logic
        const interval = setInterval(() => {
          const newData = Math.random() * 100; // Mock sensor data
          const newLabel = new Date().toLocaleTimeString(); // Mock time label
          if (chartInstance.current) {
            chartInstance?.current?.data?.labels?.push(newLabel);
            chartInstance.current.data.datasets.forEach((dataset) => {
              dataset.data.push(newData);
            });
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
