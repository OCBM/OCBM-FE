import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sensorData: [],
  sensorProperties: {
    data: [],
    loading: false,
  },
  sensorNotificationData: [],
};

const sensorSlice = createSlice({
  name: 'sensor',
  initialState,
  reducers: {
    setSensorData: (state, { payload }) => {
      if (payload) {
        state.sensorData = payload;
      }
    },
    setSensorNotifications: (state, { payload }) => {
      if (payload) {
        function getRandomNumberInRange(min: number, max: number) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        console.log('first3', payload);
        const sensorPropertiesList: any = payload || [];
        const sensorData: any = [];
        for (let i = 0; i < sensorPropertiesList?.length; i++) {
          const properties = sensorPropertiesList[i];
          for (let i = 0; i < 6; i++) {
            sensorData.push({
              macAddress: properties?.macAddress,
              humidity: getRandomNumberInRange(properties?.minThresholdValue + 3, properties?.maxThresholdValue - 5),
              msgTimeStamp: new Date().toISOString(),
              temperatureC: getRandomNumberInRange(
                properties?.minThresholdValue - 3,
                properties?.maxThresholdValue + 5,
              ),
            });
          }
        }
        state.sensorData = sensorData;
        setSensorData;
      }
    },
  },
});

export default sensorSlice.reducer;

export const { setSensorData, setSensorNotifications } = sensorSlice.actions;
