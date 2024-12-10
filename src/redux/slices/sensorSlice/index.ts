import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  sensorData: [],
  sensorProperties: [],
  sensorNotificationData: [],
};

const sensorSlice = createSlice({
  name: 'sensor',
  initialState,
  reducers: {
    setSensorStoreDetail: (state) => {
      const storeValue = current(state);
      function getRandomNumberInRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      const sensorPropertiesList: any = storeValue.sensorProperties;

      const prevSensorData = storeValue.sensorData;
      const _sensorArr: any = [...prevSensorData];
      const _notificationArr: any = [...storeValue.sensorNotificationData];
      for (let i = 0; i < sensorPropertiesList?.length; i++) {
        const properties = sensorPropertiesList[i];
        const _newSensorData = {
          macAddress: properties?.macAddress,
          humidity: getRandomNumberInRange(properties?.minThresholdValue - 2, properties?.maxThresholdValue + 2),
          msgTimeStamp: new Date().toISOString(),
          temperatureC: getRandomNumberInRange(properties?.minThresholdValue - 2, properties?.maxThresholdValue + 2),
          value: getRandomNumberInRange(properties?.minThresholdValue - 2, properties?.maxThresholdValue + 2),
        };
        _sensorArr.push(_newSensorData);
        if (
          _newSensorData?.humidity < properties?.minThresholdValue ||
          _newSensorData?.humidity > properties.maxThresholdValue ||
          _newSensorData?.temperatureC < properties?.minThresholdValue ||
          _newSensorData?.temperatureC > properties.maxThresholdValue
        ) {
          _notificationArr.push({
            ...properties,
            ..._newSensorData,
            status: 'new',
          });
        }
      }
      state.sensorNotificationData = _notificationArr?.slice(-30);
      state.sensorData = _sensorArr;
    },
    setSensorProperties: (state, { payload }) => {
      if (payload) {
        state.sensorProperties = payload;
        function getRandomNumberInRange(min: number, max: number) {
          return Math.floor(Math.random() * (max - min)) + min;
        }
        const sensorPropertiesList: any = payload || [];
        const sensorData: any = [];
        for (let i = 0; i < sensorPropertiesList?.length; i++) {
          const properties = sensorPropertiesList[i];
          const sensor: any = Array(9)
            .fill(0)
            ?.map((_, idx) => {
              const date = new Date();
              date.setMinutes(date.getMinutes() - idx + 1);
              return {
                macAddress: properties?.macAddress,
                humidity: getRandomNumberInRange(properties?.minThresholdValue - 2, properties?.maxThresholdValue + 2),
                msgTimeStamp: date.toISOString(),
                temperatureC: getRandomNumberInRange(
                  properties?.minThresholdValue - 2,
                  properties?.maxThresholdValue + 2,
                ),
                value: getRandomNumberInRange(properties?.minThresholdValue - 2, properties?.maxThresholdValue + 2),
              };
            })
            .sort((a, b) => (new Date(a.msgTimeStamp) as any) - (new Date(b.msgTimeStamp) as any));
          sensorData.push(...sensor);
        }
        state.sensorData = sensorData;
      }
    },
    setSensorNotificationStatus: (state, { payload }) => {
      const storeValue = current(state);
      const updateNotificationStatus: any = storeValue?.sensorNotificationData?.map((data: any) => ({
        ...data,
        status: payload,
      }));
      state.sensorNotificationData = updateNotificationStatus;
    },
  },
});

export default sensorSlice.reducer;

export const { setSensorStoreDetail, setSensorProperties, setSensorNotificationStatus } = sensorSlice.actions;
