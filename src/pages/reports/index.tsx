import { useEffect, useState } from 'react';
import { DownloadIcon } from '@/assets/icons';
import { Button, DateRangePicker, Dropdown } from '@/components';
import { SENSOR_SERVICES } from '@/services/sensorServices';
import { REPORTS_SERVICE } from '@/services/reportsService';
import { LoadingOutlined } from '@ant-design/icons';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

const Reports = () => {
  const [sensor, setSensor] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [sensorList, setSensorList] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validation
    if (!sensor) {
      alert('Please select a sensor');
      return;
    }
    if (!dateRange.start || !dateRange.end) {
      alert('Please select a date range');
      return;
    }
    if (dateRange.start.getTime() > dateRange.end.getTime()) {
      alert('Start date should be less than end date');
      return;
    }
    setLoading(true);
    const res = await REPORTS_SERVICE.getAllReports({
      minTimestamp: dateRange.start.toISOString(),
      maxTimestamp: dateRange.end.toISOString(),
      macAddress: sensor,
    });
    if (res) {
      setLoading(false);
    }
  };
  const fetchAllSensors = async () => {
    const res = await SENSOR_SERVICES.getAllSensor();
    setSensorList(res);
  };

  useEffect(() => {
    fetchAllSensors();
  }, []);

  const handleError = () => {
    if (!sensor) {
      setError(true);
    } else if (!dateRange.start || !dateRange.end) {
      setError(true);
    } else if (dateRange.start.getTime() > dateRange.end.getTime()) {
      setError(true);
    } else {
      setError(false);
    }
  };

  useEffect(() => {
    handleError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensor, dateRange.start, dateRange.end]);

  return (
    <div className="shadow-md w-full p-8 rounded-[16px] mx-auto mb-8 overflow-x-hidden">
      <h2 className="text-[24px] text-[#444444] font-medium">CBM Date History</h2>
      <form onSubmit={handleSubmit}>
        <div className="w-[95%] mx-auto">
          <div className="flex justify-between flex-row w-full gap-[20px] mt-5  mb-9">
            <Dropdown
              label="Sensors"
              className="w-[270px] border-[1px] h-[50px] px-3"
              placeholder="Enter Sensor data Type"
              mandatory={true}
              options={sensorList}
              handleChange={(e: string) => setSensor(e)}
              value={sensorList?.find((shop: string) => shop === sensor)}
            />
          </div>
          <div className="flex justify-between flex-row w-full gap-[20px] mt-5  mb-9">
            <div className="flex justify-center items-center w-full flex-col">
              <span className="text-[#492CE1] text-[14px] font-medium flex self-start">
                Date Period
                <span className="text-[#D95117]">*</span>
              </span>
              <div className="flex gap-4 self-start mt-2">
                <DateRangePicker
                  className="w-[300px] h-[50px]"
                  placeholder={'From in DD/MM/YYYY'}
                  onChange={(date) => setDateRange({ ...dateRange, start: date ? date.toDate() : null })}
                />
                <DateRangePicker
                  className="w-[300px] h-[50px]"
                  placeholder={'From in DD/MM/YYYY'}
                  onChange={(date) => setDateRange({ ...dateRange, end: date ? date.toDate() : null })}
                />
              </div>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              leftIcon={loading ? <LoadingOutlined /> : <DownloadIcon />}
              variant="primary"
              className="py-3 px-6 rounded-2xl tracking-[0.32px] text-base leading-4 font-medium"
              label="Add"
              disabled={error}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reports;
