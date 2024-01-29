import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';

const AntdChart: React.FC = () => {
  const [sensorReadingsData, setSensorReadingsData] = useState<any>([]);

  useEffect(() => {
    // Mock data update - Replace with actual data fetching logic
    const interval = setInterval(() => {
      const newData = {
        time: new Date().toISOString(),
        value: Math.random() * 100, // Mock sensor data
      };

      setSensorReadingsData((prevData: any) => [...prevData, newData]);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const config = {
    data: sensorReadingsData.slice(-50),
    xField: 'time',
    yField: 'value',
    seriesField: 'type',
    xAxis: {
      type: 'time',
      mask: 'HH:mm:ss a',
      tickCount: 10,
    },
    yAxis: {
      label: {
        formatter: (val: any) => `${val}`, // Customize the y-axis labels as needed
      },
    },
    animation: false, // Disable animation for smoother updates
  };

  return <Line {...config} />;
};

export default AntdChart;
