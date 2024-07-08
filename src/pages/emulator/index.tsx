import { Button, Form, InputNumber, message } from 'antd';
import { faker } from '@faker-js/faker';
import { SENSOR_SERVICES } from '@/services/sensorServices';
import { useEffect, useState } from 'react';

const Emulator = () => {
  const [form] = Form.useForm();
  const [sendLive, setSendLive] = useState(false);
  const humiditySeed = [5, 10, 15, 60, 85];
  const temperatureSeed = [5, 30, 15, 70, 80];
  const macAddressSeed = ['MAC-ADDRESS-008'];
  const simulateDataPublishingForInvestmentCasting = () => {
    const mockData = {
      humidity: humiditySeed[faker.number.int({ min: 0, max: 4 })],
      temperatureC: temperatureSeed[faker.number.int({ min: 0, max: 4 })],
      temperatureF: faker.number.float({ min: 0, max: 100, precision: 2 }),
      dewPointC: faker.number.float({ min: 0, max: 100, precision: 2 }),
      dewPointF: faker.number.float({ min: 0, max: 100, precision: 2 }),
    };
    form.setFieldsValue(mockData);
  };
  const handleSubmit = async (data: any) => {
    const mockData = {
      moduleLane: faker.string.alphanumeric(12),
      macAddress: macAddressSeed[faker.number.int({ min: 0, max: macAddressSeed.length - 1 })],
      msgTimeStamp: new Date().toISOString(),
      ...data,
    };
    const res = await SENSOR_SERVICES.postSensorData(mockData);
    if (res) {
      message.success('Posted successfully');
    }
  };

  const generateMock = async () => {
    const mockData = {
      humidity: humiditySeed[faker.number.int({ min: 0, max: 4 })],
      temperatureC: temperatureSeed[faker.number.int({ min: 0, max: 4 })],
      temperatureF: faker.number.float({ min: 0, max: 100, precision: 2 }),
      dewPointC: faker.number.float({ min: 0, max: 100, precision: 2 }),
      dewPointF: faker.number.float({ min: 0, max: 100, precision: 2 }),
      moduleLane: faker.string.alphanumeric(12),
      macAddress: macAddressSeed[faker.number.int({ min: 0, max: macAddressSeed.length - 1 })],
      msgTimeStamp: new Date().toISOString(),
    };
    const res = await SENSOR_SERVICES.postSensorData(mockData);
    if (res) {
      message.success('Posted successfully');
    }
  };

  // const sendLive = () => {
  //   setInterval(generateMock, 7000);
  // };

  useEffect(() => {
    let data: any;
    if (sendLive) {
      data = setInterval(generateMock, 1000);
    }
    return () => {
      clearInterval(data);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendLive]);

  return (
    <div className="flex flex-col">
      <span className="text-center">Sensor Data Emulator</span>
      <Button className="my-5" onClick={() => simulateDataPublishingForInvestmentCasting()}>
        Generate Data
      </Button>
      <Button className="my-5" onClick={() => setSendLive(!sendLive)}>
        Emulate Live Data
      </Button>
      <Form form={form} layout={'vertical'} onFinish={(ev) => handleSubmit(ev)}>
        <Form.Item
          name="humidity"
          label="Humidity"
          rules={[
            { required: true, message: 'Please enter humidity' },
            { type: 'number', message: 'Humidity must be a number' },
          ]}
        >
          <InputNumber className="w-48" placeholder="Enter humidity" type="number" />
        </Form.Item>
        <Form.Item
          name="temperatureC"
          label="Temperature (C)"
          rules={[
            { required: true, message: 'Please enter temperature in Celsius' },
            { type: 'number', message: 'Temperature must be a number' },
          ]}
        >
          <InputNumber className="w-48" placeholder="Enter temperature in Celsius" type="number" />
        </Form.Item>
        <Form.Item
          name="temperatureF"
          label="Temperature (F)"
          rules={[
            { required: true, message: 'Please enter temperature in Fahrenheit' },
            { type: 'number', message: 'Temperature must be a number' },
          ]}
        >
          <InputNumber className="w-48" placeholder="Enter temperature in Fahrenheit" type="number" />
        </Form.Item>
        <Form.Item
          name="dewPointC"
          label="Dew Point (C)"
          rules={[
            { required: true, message: 'Please enter dew point in Celsius' },
            { type: 'number', message: 'Dew point must be a number' },
          ]}
        >
          <InputNumber className="w-48" placeholder="Enter dew point in Celsius" type="number" />
        </Form.Item>
        <Form.Item
          name="dewPointF"
          label="Dew Point (F)"
          rules={[
            { required: true, message: 'Please enter dew point in Fahrenheit' },
            { type: 'number', message: 'Dew point must be a number' },
          ]}
        >
          <InputNumber className="w-48" placeholder="Enter dew point in Fahrenheit" type="number" />
        </Form.Item>
        <Form.Item>
          <Button className="!bg-[#rgb(96 91 255)]" htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Emulator;
