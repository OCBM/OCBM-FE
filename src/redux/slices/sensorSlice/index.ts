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
        let _default_dec_number = properties?.minOperatingRange - properties?.minThresholdValue || 1;
        _default_dec_number = _default_dec_number < 0 ? _default_dec_number * -1 : _default_dec_number;
        let _default_inc_number = properties?.maxOperatingRange - properties?.maxThresholdValue || 1;
        _default_inc_number = _default_inc_number < 0 ? _default_inc_number * -1 : _default_inc_number;
        const _newSensorData = {
          macAddress: properties?.macAddress,
          humidity: getRandomNumberInRange(
            properties?.minThresholdValue - _default_dec_number,
            properties?.maxThresholdValue + _default_inc_number,
          ),
          msgTimeStamp: new Date().toISOString(),
          temperatureC: getRandomNumberInRange(
            properties?.minThresholdValue - _default_dec_number,
            properties?.maxThresholdValue + _default_inc_number,
          ),
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
      console.log('first6', _notificationArr);
      state.sensorNotificationData = _notificationArr;
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
          let _default_dec_number = properties?.minOperatingRange - properties?.minThresholdValue || 1;
          _default_dec_number = _default_dec_number < 0 ? _default_dec_number * -1 : _default_dec_number;
          let _default_inc_number = properties?.maxOperatingRange - properties?.maxThresholdValue || 1;
          _default_inc_number = _default_inc_number < 0 ? _default_inc_number * -1 : _default_inc_number;
          const sensor: any = Array(10)
            .fill(0)
            ?.map(() => ({
              macAddress: properties?.macAddress,
              humidity: getRandomNumberInRange(
                properties?.minThresholdValue - _default_dec_number,
                properties?.maxThresholdValue + _default_inc_number,
              ),
              msgTimeStamp: new Date().toISOString(),
              temperatureC: getRandomNumberInRange(
                properties?.minThresholdValue - _default_dec_number,
                properties?.maxThresholdValue + _default_inc_number,
              ),
            }));
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
